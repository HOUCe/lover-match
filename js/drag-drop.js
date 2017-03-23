import $ from 'jquery';
class DragDrop {
    constructor(opt) {
        this.selector = opt.selector;
        this.dragStart = opt.dragStart;
        this.dragging = opt.dragging;
        this.dragEnd = opt.dragEnd;
        this.element = typeof this.selector === 'object' ? this.selector : $('#' + this.selector);
        // this.elementWidth = this.element.width();
        // this.elementHeight = this.element.height();
        // this.limitLeft = opt.limitLeft || 0;
        // this.limitRight = opt.limitRight || $(window).width();
        // this.limitTop = opt.limitTop || 0;
        // this.limitBottom = opt.limitBottom || $(window).height();

        // 点击的位置信息
        this.startX = 0;
        this.startY = 0;
        // 元素的位置信息
        this.sourceX = 0;
        this.sourceY = 0;

        this.isTouch = "ontouchend" in document ? true : false;
        if (this.isTouch) {
            alert('拖拽目前只支持PC端！')
        }

        // 获取transform的兼容写法
        this.transform = this.getTransform();

        this.init();
    }
    init() {
        var me = this;

        // var eStart = this.isTouch ? 'touchstart'  : 'mousedown';
        // var eMove = this.isTouch ? 'touchmove'   : 'mousemove';
        // var eEnd  = this.isTouch ? 'touchend'    : 'mouseup';
        var eStart = this.isTouch ? 'touchstart'  : 'mousedown';
        var eMove = this.isTouch ? 'touchmove'   : 'mousemove';
        var eEnd  = this.isTouch ? 'touchend'    : 'mouseup';

        this.element.on(eStart, function (e) {
            me.dragStart && me.dragStart();
            me.startX = e.pageX;
            me.startY = e.pageY;

            const pos = me.getPosition();
            me.sourceX = pos.x;
            me.sourceY = pos.y;

            function moveHandler(e) {
                let currentX = e.pageX;
                let currentY = e.pageY;

                var distanceX = currentX - me.startX;
                var distanceY = currentY - me.startY;

                var destinationX = (me.sourceX + distanceX).toFixed();
                var destinationY = (me.sourceY + distanceY).toFixed();

                me.setPostion({
                    x: destinationX,
                    y: destinationY
                });

                me.dragging && me.dragging({destinationX, destinationY, e, target:me.element});
            }
            function endHandler() {
                $(document).off(eMove);
                $(document).off(eEnd);
                me.dragEnd && me.dragEnd({target:me.element});
            }

            $(document).on(eMove, moveHandler);
            $(document).on(eEnd, endHandler);
        })
    }
    setPostion(pos) {
        // let elementOffsetLeft = this.element.offset().left;
        // let elementOffsetTop = this.element.offset().top;
        // console.log(elementOffsetLeft, elementOffsetLeft + this.elementWidth);
        // console.log(elementOffsetTop, elementOffsetTop + this.elementHeight)
        // if (elementOffsetLeft < this.limitLeft || (elementOffsetLeft + this.elementWidth) > this.limitRight) {
        //     return;
        // }
        // if (elementOffsetTop < this.limitTop || (elementOffsetTop + this.elementHeight) > this.limitBottom) {
        //     return;
        // }
        // let limitX = this.winWidth - this.elementWidth;
        // if ( pos.x > limitX) {
        //     pos.x = limitX;
        // }

        if (this.transform) {
            this.element.css(this.transform, 'translate('+ pos.x +'px, '+ pos.y +'px)');
        }
        else {
            this.element.css('left', pos.x + 'px');
            this.element.css('top', pos.y + 'px');
        }
    }
    getTransform() {
        let transform = '';
        let divStyle = document.createElement('div').style;
        let transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
        var i = 0;
        let len = transformArr.length;

        for(; i < len; i++)  {
            if(transformArr[i] in divStyle) {
                return transform = transformArr[i];
            }
        }

        return transform;
    }
    getPosition() {
        var pos = {x: 0, y: 0};

        if (this.transform) {
            var transformValue = this.element.css(this.transform);
            if (transformValue == 'none') {
                this.element.css(this.transform, 'translate(0, 0)');
            } 
            else {
                var temp = transformValue.match(/-?\d+/g);
                pos = {
                    x: parseInt(temp[4].trim()),
                    y: parseInt(temp[5].trim())
                }
            }
        }
        else {
           if(this.element.css('position') === 'static') {
                this.element.css('position', 'absolute');
            } 
            else {
                pos = {
                    x: parseInt(this.element.css('left') ? this.element.css('left') : 0),
                    y: parseInt(this.element.css('top') ? this.element.css('top') : 0)
                }
            } 
        }
        return pos;
    }
}


export default DragDrop;
import $ from 'jquery';
import DD from './drag-drop.js';

let ele1 = $('.cover1');
let ele2 = $('.cover2');
let ele3 = $('.cover3');
let ele4 = $('.cover4');
let ele5 = $('.cover5');
let ele6 = $('.cover6');
let ele7 = $('.cover7');
let ele8 = $('.cover8');
let detailEle = $("#detail");
let attemptsEle = $("#attempts");
let correctEle = $("#correct");

let transform = getTransform();

let attempts = 0;
let correct = 0;

const captions = [];
    captions[11] = "So it's gonna be forever, Or it's gonna go down in flames. <br><br>You can tell me when it's over.If the high was worth the pain.<br><br>Got a long list of ex-lovers.They'll tell you I'm insane.<br><br>Cause you know I love the players.And you love the game.";
    captions[12] = "“Because you are beautiful. <br>I enjoy looking at beautiful people, and I decided a while ago not to deny myself the simpler pleasures of existence” <br><br><br>“Right, of course. But you keep the promise anyway. Thats what love is. Love is keeping the promise anyway.”";
    captions[13] = "“And yes, love at first sight does exist,” <br><br><br>she says, addressing an imaginary younger Victoria. <br><br><br>“It will happen to you in the Manchester United players’ lounge—although you will get a little drunk, so exact details are hazy.”";
    captions[14] = "Mia: “It's pretty strange that we keep running into one another.” <br><br>Sebastian: “Maybe it means something.”<br><br>Mia: “I doubt it.”<br><br>Sebastian: “Yeah, I didn't think so.”";
const allNames = ['0', '1', '2', '3'];

const dd1 = new DD({
    selector: 'cover1',
    dragging(opt) {
        let offsetX = ele1.offset().left;
        let offsetY = ele1.offset().top;
        draggingHandler(offsetX, offsetY);
    },
    dragEnd(opt) {
        let dragTarget = opt.target;
        dragEndHandler(dragTarget);
    }
});

const dd2 = new DD({
    selector: 'cover2',
    dragging: function (opt) {
        let offsetX = ele2.offset().left;
        let offsetY = ele2.offset().top;
        draggingHandler(offsetX, offsetY);
    },
    dragEnd: function (opt) {
        let dragTarget = opt.target;
        dragEndHandler(dragTarget);
    }
});

var dd3 = new DD({
    selector: 'cover3',
    dragging: function (opt) {
        let offsetX = ele3.offset().left;
        let offsetY = ele3.offset().top;
        draggingHandler(offsetX, offsetY);
    },
    dragEnd: function (opt) {
        let dragTarget = opt.target;
        dragEndHandler(dragTarget);
    }
});

var dd4 = new DD({
    selector: 'cover4',
    dragging: function (opt) {
        let offsetX = ele4.offset().left;
        let offsetY = ele4.offset().top;
        draggingHandler(offsetX, offsetY);
    },
    dragEnd: function (opt) {
        let dragTarget = opt.target;
        dragEndHandler(dragTarget);
    }
});



function getTransform () {
    let transform = '';
    let divStyle = document.createElement('div').style;
    let transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
    let i = 0;
    let len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            return transform = transformArr[i];
        }
    }

    return transform;
};

function showInfo (index) {
    detailEle.show();
    detailEle.animate({ opacity: '1' }, 500);

    // var img = new Image();
    // img.src = "imgs/" + index + ".jpg";
    // img.style.width = '263px';
    // $("#detail #photoCon").empty().append(img);
    $('#photoCon').removeClass().addClass('result'+index);

    Typed.new("#desc", {
        strings: [captions[index]],
        stringsElement: null,
        // typing speed
        typeSpeed: 10,
        // time before typing starts
        startDelay: 1000,
        // backspacing speed
        backSpeed: 0,
        // shuffle the strings
        shuffle: false,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // null = infinite
        loopCount: null,
        // show cursor
        showCursor: false,
        // character for cursor
        cursorChar: "|",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    });
};

function dragEndHandler(dragTarget) {
    let dropTarget = $('.selected');
    let dragIndex = +dragTarget.attr('index') + 10;
    let dropIndex = +dropTarget.attr('index');
    if (dragIndex === dropIndex) {
        attempts ++;
        correct ++;
        attemptsEle.text(attempts);
        correctEle.text(correct);

        showInfo(dropIndex);

        dropTarget.click(function() {
            showInfo(dropIndex);
        });

        dragTarget.siblings('.title').hide();
        dropTarget.css('opacity', 1);
    }
    else {
        dropTarget.removeClass('selected');
        dropTarget.find('.messagewrong').css("display", "inline").delay(1500).fadeOut( "slow" );
        dragTarget.css(transform, '');
        attempts ++;
        attemptsEle.text(attempts);
    }
};

function draggingHandler(offsetX, offsetY) {
    if (offsetX > 60 &&  offsetX < 154 && offsetY > 244 && offsetY < 448) {
        ele5.addClass('selected');
    }
    else {
        ele5.removeClass('selected');
    }
    if (offsetX >= 154 &&  offsetX < 300 && offsetY > 244 && offsetY < 448) {
        ele6.addClass('selected');
    }
    else {
        ele6.removeClass('selected');
    }
    if (offsetX >= 300 &&  offsetX < 447 && offsetY > 244 && offsetY < 448) {
        ele7.addClass('selected');
    }
    else {
        ele7.removeClass('selected');
    }
    if (offsetX >= 447 &&  offsetX < 622 && offsetY > 244 && offsetY < 448) {
        ele8.addClass('selected');
    }
    else {
        ele8.removeClass('selected');
    }
};

$("#closebtn").click(function() {
    detailEle.hide();
    detailEle.animate({ opacity: '0' }, 500);
    if (correct === 4) {
        $('.result').show();
        Typed.new(".result", {
            strings: ["It took you " + attempts + " attempts to match them all. Share your score!"],
            stringsElement: null,
            // typing speed
            typeSpeed: 10,
            // time before typing starts
            startDelay: 1000,
            // backspacing speed
            backSpeed: 0,
            // shuffle the strings
            shuffle: false,
            // time before backspacing
            backDelay: 200,
            // loop
            loop: false,
            // null = infinite
            loopCount: null,
            // show cursor
            showCursor: false,
            // character for cursor
            cursorChar: "|",
            // attribute to type (null == text)
            attr: null,
            // either html or text
            contentType: 'html',
            // call when done callback function
            callback: function() {},
            // starting callback function before each string
            preStringTyped: function() {},
            //callback for every typed string
            onStringTyped: function() {},
            // callback for reset
            resetCallback: function() {}
        });
    }
});
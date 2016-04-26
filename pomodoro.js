

$(document).ready(function() {
var handle, sTime, bTime,session,time;

function setTimer(time, display) {
    var minutes = parseInt(time / 60, 10);
    var seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.text(minutes + ":" + seconds);
}

function startTimer(duration, display, status,sessionStatus) {
     time = duration - 1;

    handle = setInterval(function() {
    status ? sessionStatus.text("Session Time!") : sessionStatus.text("Break Time!");
        setTimer(time, display);
        if (--time < 0) {
        
            if(status){
                time = bTime*60;
                status = !status;
                session = status;
                
            }
            else{
                time = sTime*60;
                status = !status;
                session = status;
            }
        }
    }, 1000);
}

    sTime = 5;
    bTime = 3;
    session = true;

    var timer = $('.timer'),
        sessionTime = $('.sessionTime'),
        breakTime = $('.breakTime'),
        plus = $('.plus'),
        minus = $('.minus'),
        sessionStatus = $('.sessionStatus');

    sessionTime.text(sTime);
    breakTime.text(bTime);
    setTimer(sTime*60, timer);
    startTimer((sTime)*60, timer, session, sessionStatus);

    plus.click(function() {
        if ($(this).prev().hasClass("sessionTime")) {
                sTime++;
                $(this).prev().text(sTime);
            if (session) {
                clearInterval(handle);
                handle = 0;
                setTimer(sTime*60,timer);
                startTimer(sTime*60,timer,session,sessionStatus);
            }
        } else {
                bTime++;
                $(this).prev().text(bTime);
                if(!session){
                clearInterval(handle);
                handle = 0;
                setTimer(bTime*60,timer);
                startTimer(bTime*60,timer,session,sessionStatus);
                }
        }
    });
    minus.click(function() {
        if ($(this).next().hasClass("sessionTime")) {
            if (sTime > 1) {
                sTime--;
                $(this).next().text(sTime);
            }
           if (session) {
                clearInterval(handle);
                handle = 0;
                setTimer(sTime*60,timer);
                startTimer(sTime*60,timer,session,sessionStatus);
            }
        } else {
            if (bTime > 1) {
                bTime--;
                $(this).next().text(bTime);
            }
            if(!session){
                clearInterval(handle);
                handle = 0;
                setTimer(bTime*60,timer);
                startTimer(bTime*60,timer,session,sessionStatus);
                }
        }
    });
    var timerToggle=true;
    timer.click(function(){
        if(timerToggle){
        clearInterval(handle);
        handle = 0;
    }
    else{
        startTimer(time+1, timer,session,sessionStatus);
   
        }
        timerToggle = !timerToggle;
    });


});

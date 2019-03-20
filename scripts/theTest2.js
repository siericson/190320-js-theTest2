/*eslint-env browser*/

/*
Project scope:
-Start timer when keypress is detected inside of the text area element
-Compare text entered with original text (need to know length and to match the string)
-On the timer, we need to be tracking how long user takes
-Be constantly updating the timer based on the time it takes
-Stop timer when entries match
-At any time we want user to be able to start over (reset button)
-Change text area box styling color to indicate feedback
*/

const TESTWRAPPER = document.querySelector('.testWrapper');
const TESTAREA = document.querySelector('#testArea');
const ORIGTEXT = document.querySelector('#origText p').innerHTML;
const RESETBTN = document.querySelector('#reset');
const THETIMER = document.querySelector('.timer');

var timer = [0,0,0,0];
var interval; // declaring a global variable
var timerRunning = false;

// helper function to add leading zero
function leadingZero(time) {
    if (time<=9) {
        time = '0' + time;    
    }
    return time;
}

// timer function
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);    
    THETIMER.innerHTML = currentTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3]/100)/60); // give us minutes
    timer[1] = Math.floor((timer[3]/100) - (timer[0]*60)); // give us seconds
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

//match the text area entered with original text
function spellCheck() {
    let textEntered = TESTAREA.value;
    let ORIGTEXTMatch = ORIGTEXT.substring(0, textEntered.length);
    if(textEntered == ORIGTEXT) {
        TESTWRAPPER.style.borderColor = '#1ccc9e';
        clearInterval(interval);
    } else {
        if(textEntered == ORIGTEXTMatch) {
            TESTWRAPPER.style.borderColor = '#5499d0';
        } else {
            TESTWRAPPER.style.borderColor = '#91496A';
        }
    }
        
//    console.log(textEntered);
}

// start the time
function start() {
    let textEnteredLength = TESTAREA.value.length;
    if(textEnteredLength === 0 && !timerRunning) {
        //setInterval(runTimer, 10);
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// reset all
function reset() {
    clearInterval(interval);
    interval = null;
    console.log('Reset button has been pressed');
    var timer = [0,0,0,0];
    timerRunning = false;
    THETIMER.innerHTML = '00:00:00';
    TESTAREA.value = '';
    TESTWRAPPER.style.borderColor = '#888';
}

TESTAREA.addEventListener('keypress', start, false);
TESTAREA.addEventListener('keyup', spellCheck, false);
RESETBTN.addEventListener('click', reset, false);





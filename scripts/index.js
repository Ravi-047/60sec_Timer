

// getting all the necessary DOM Elements 

const circle = document.querySelectorAll(".circle");
const timer = document.querySelector(".timer");
const addTimeBtn = document.querySelector(".add_time");
const skipTimeBtn = document.querySelector(".skip_time");
const clearTimeBtn = document.querySelector(".clear_time");
const restartTimeBtn = document.querySelector(".restart_time");

// Iitial Timer settings
const min = 0;
const sec = 61; // to visible the 1 min timer;
let countDown;

const minute = min * 60000;
const second = sec * 1000;
const time = minute + second;
let futureTime = Date.now() + time;

// start the timer loop
const startTime = setInterval(countDownTimer);

function countDownTimer() {
    const currentTime = Date.now();
    countDown = futureTime - currentTime
    const circleProgress = (countDown / time) * 360;

    // Adjust circle display based on time remaining
    if (circleProgress > 180) {
        circle[2].style.display = "none";
        circle[0].style.transform = "rotate(180deg)";
        circle[1].style.transform = `rotate(${circleProgress}deg)`;
    }
    else {
        circle[2].style.display = `block`;
        circle[0].style.transform = `rotate(${circleProgress}deg)`;
        circle[1].style.transform = `rotate(${circleProgress}deg)`;
    }

    // Update the timer display with the minutes and seconds
    const inMin = Math.floor((countDown / 60000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const inSec = Math.floor((countDown / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

    timer.innerHTML = `
        <div>${inMin}</div>
        <div class="colon">:</div>
        <div>${inSec}</div>
    `
    // Check if he timer has reached zero and stop the timer
    if (countDown < 0) {
        clearInterval(startTime);
        circle[0].style.display = 'none';
        circle[1].style.display = 'none';
        circle[2].style.display = 'none';

        //Reset the timer display
        timer.innerHTML = `
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
        `
    }
}



// Function to add extra time to the timer
function addTime() {
    if (countDown >= 50000) {
        futureTime += time - countDown;
    } else {
        futureTime += 10000;
    }
}

// Function to subtract time from the timer
function skipTime() {
    futureTime -= 5000;
}

// Function to reset the timer to zero
function skip() {
    futureTime = 0;
}

// Function to reload the page and restart the timer
function restart() {
    location.reload();
}

// Event listener for "Add(+10s)" button click
addTimeBtn.addEventListener('click', () => {
    addTime();
});

// Event listener for "Skip(-5s)" button click
skipTimeBtn.addEventListener('click', () => {
    skipTime();
});

// Event listener for "Clear" button click
clearTimeBtn.addEventListener('click', () => {
    skip();
});

// Event listener for "Restart" button click
restartTimeBtn.addEventListener('click', () => {
    restart();
});


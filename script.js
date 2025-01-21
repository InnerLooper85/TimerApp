let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modeText = document.getElementById('mode-text');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    toggleButton.classList.toggle('btn-blue', isWorkTime);
    toggleButton.classList.toggle('btn-orange', !isWorkTime);
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        // Update the browser tab title
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro Timer`;

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
            switchMode();
            resetTitle(); // Reset the title when timer completes
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    toggleButton.textContent = 'Switch to Break';
    toggleButton.classList.add('btn-blue');
    toggleButton.classList.remove('btn-orange');
    updateDisplay(timeLeft);
    startButton.textContent = 'Start';
    resetTitle();
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        resetTitle(); // Reset title when paused
    }
});

resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', () => {
    if (timerId === null) {
        switchMode();
    }
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(timeLeft);

function updateTimer() {
    if (isRunning) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        timeLeft = Math.max(0, duration - elapsedTime);

        if (timeLeft === 0) {
            handleTimerComplete();
        }

        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
        
        // Update the browser tab title
        document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro Timer`;

        if (timeLeft > 0) {
            requestAnimationFrame(updateTimer);
        }
    }
}

// Add this to reset the title when timer is reset or stopped
function resetTitle() {
    document.title = 'Pomodoro Timer';
}

// Make sure to call resetTitle() in your reset function and when the timer completes
function reset() {
    // ... existing reset code ...
    resetTitle();
}

function handleTimerComplete() {
    // ... existing completion code ...
    resetTitle();
}
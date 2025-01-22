let timeLeft;
let timerId = null;
let isWorkTime = true;
let WORK_TIME;
let BREAK_TIME;

// Get all DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modeText = document.getElementById('mode-text');
const modal = document.getElementById('setup-modal');
const startAppButton = document.getElementById('start-app');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

// Define all functions first
function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTimes() {
    WORK_TIME = parseInt(workTimeInput.value) * 60;
    BREAK_TIME = parseInt(breakTimeInput.value) * 60;
    timeLeft = WORK_TIME;
    updateDisplay(timeLeft);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    modal.classList.add('show');
    modeText.textContent = 'Work Time';
    toggleButton.textContent = 'Switch to Break';
    toggleButton.classList.add('btn-blue');
    toggleButton.classList.remove('btn-orange');
    startButton.textContent = 'Start';
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
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        return;
    }
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro Timer`;

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            if (isWorkTime) {
                alert('Work time is over! Take a break!');
            } else {
                alert('Get back to work!');
            }
            switchMode();
            startButton.textContent = 'Start';
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

// Initialize the app
function initializeApp() {
    WORK_TIME = parseInt(workTimeInput.value) * 60;
    BREAK_TIME = parseInt(breakTimeInput.value) * 60;
    timeLeft = WORK_TIME;
    modal.classList.remove('show');
    updateDisplay(timeLeft);
}

// Add event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', switchMode);
startAppButton.addEventListener('click', initializeApp);

// Initialize when page loads
window.onload = function() {
    WORK_TIME = parseInt(workTimeInput.value) * 60;
    BREAK_TIME = parseInt(breakTimeInput.value) * 60;
    timeLeft = WORK_TIME;
    updateDisplay(timeLeft);
    modal.classList.add('show');
};
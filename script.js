// Function to get current time in HH:MM:SS format
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Add leading zeros if necessary
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    return `${h}:${m}:${s} ${ampm}`;
}
// Function to update clock time
function updateClock() {
    const currentTimeElement = document.getElementById('currentTime');
    currentTimeElement.textContent = getCurrentTime();
}

// Function to add zero padding to single-digit numbers
function addZeroPadding(num) {
    return num < 10 ? '0' + num : num;
}

// Function to populate hour and minute select dropdowns
function populateSelectDropdowns() {
    const hourDropdown = document.getElementById('hour');
    const minuteDropdown = document.getElementById('minute');

    for (let hour = 1; hour <= 12; hour++) {
        hourDropdown.innerHTML += `<option value="${addZeroPadding(hour)}">${addZeroPadding(hour)}</option>`;
    }

    for (let minute = 0; minute < 60; minute++) {
        minuteDropdown.innerHTML += `<option value="${addZeroPadding(minute)}">${addZeroPadding(minute)}</option>`;
    }
}

// Function to set alarm
function setAlarm() {
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const ampm = document.getElementById('ampm').value;

    // Validate selected time
    if (hour === 'Hour' || minute === 'Minute' || ampm === 'AM/PM') {
        alert('Please select a valid time for the alarm.');
        return;
    }

    const alarmTime = `${hour}:${minute} ${ampm}`;

    const alarmsList = document.getElementById('alarmsList');
    const alarmItem = document.createElement('li');
    alarmItem.textContent = `Alarm is set for ${alarmTime}`;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        alarmsList.removeChild(alarmItem);
    });
    alarmItem.appendChild(deleteButton);

    alarmsList.appendChild(alarmItem);

    // Set alarm timeout
    const timeToAlarm = getTimeToAlarm(hour, minute, ampm);
    setTimeout(() => {
        // Play alarm sound
        const alarmSound = document.getElementById('alarmSound');
        alarmSound.play();

        // Show alert
        const confirmed = window.confirm(`Alarm! It's ${alarmTime}. Press OK to dismiss.`);
        if (!confirmed) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
    }, timeToAlarm);
}

// Function to calculate time to alarm in milliseconds
function getTimeToAlarm(alarmHour, alarmMinute, ampm) {
    const now = new Date();
    const alarmTime = new Date(now.toDateString() + ' ' + alarmHour + ':' + alarmMinute + ' ' + ampm);
    let timeDiff = alarmTime.getTime() - now.getTime();

    // If the alarm time is in the past, add a day
    if (timeDiff < 0) {
        timeDiff += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    return timeDiff;
}

// Function to initialize the app
function initializeApp() {
    // Update clock every second
    setInterval(updateClock, 1000);

    // Populate select dropdowns
    populateSelectDropdowns();

    // Add event listener to set alarm button
    document.getElementById('setAlarmBtn').addEventListener('click', setAlarm);
}

// Call initializeApp function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);






const notificationTitle = 'Please Drink Water';
const notificationMessage = 'Now the time is to drink water to maintain your health. By - Harshvardhan';

// Convert hours to milliseconds for the setInterval function
const intervalTime = 60 * 60 * 1000; // 1 hour

// Reference to the status paragraph and start button
const status = document.getElementById('status');
const startButton = document.getElementById('start-button');

let notificationInterval;  // Variable to store the interval ID

// Handle start/stop button click
startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start Reminder') {
        startNotifications();
    } else {
        stopNotifications();
    }
});

// Function to start notifications
function startNotifications() {
    // Request permission to send notifications
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            status.textContent = 'Notifications started! You will be reminded every hour.';
            startButton.textContent = 'Stop Reminder';
            sendNotification(); // Immediately send a notification
            notificationInterval = setInterval(sendNotification, intervalTime); // Start interval
        } else {
            status.textContent = 'Permission to send notifications denied.';
        }
    });
}

// Function to stop notifications
function stopNotifications() {
    clearInterval(notificationInterval); // Clear the interval
    status.textContent = 'Notifications stopped.';
    startButton.textContent = 'Start Reminder';
}

// Function to send a notification
function sendNotification() {
    if (Notification.permission === 'granted') {
        new Notification(notificationTitle, {
            body: notificationMessage,
            icon: 'water-icon.jpeg' // Path to your icon file
        });
    }
}

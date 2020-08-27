const hasSWSupport = 'serviceWorker' in navigator;
const hasNotificationSupport = 'Notification' in window;


const requestNotificationPermission = () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'default') {
        Notification.requestPermission();
    }
};

const show_notification = message => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'granted') {
        navigator.serviceWorker.ready
            .then(registration => registration.showNotification('Pomodoro Timer', {
                body: message,
                icon: './assets/android-chrome-512x512.png',
                tag: 'pomodoroTimer',
                renotify: true,
            }));
    }
};

export { requestNotificationPermission, show_notification };
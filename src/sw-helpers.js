const hasSWSupport = 'serviceWorker' in navigator;
const hasNotificationSupport = 'Notification' in window;


const requestNotificationPermission = () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'default') {
        Notification.requestPermission();
    }
};

const show_rest = () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'granted') {
        navigator.serviceWorker.ready
            .then(registration => registration.showNotification('Pomodoro Timer', {
                body: `It's time to take a break!`,
                icon: './assets/android-chrome-512x512.png',
                tag: 'pomodoroTimer',
                renotify: true,
            }));
    }
};

const show_work= () => {
    if (hasSWSupport && hasNotificationSupport && Notification.permission === 'granted') {
        navigator.serviceWorker.ready
            .then(registration => registration.showNotification('Pomodoro Timer', {
                body: `It's time to get to work again`,
                icon: './assets/android-chrome-512x512.png',
                tag: 'pomodoroTimer',
                renotify: true,
            }));
    }
};

export { requestNotificationPermission, show_rest, show_work };
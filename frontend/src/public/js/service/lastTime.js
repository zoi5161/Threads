import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch');

export default function lastTime() {
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastVisit;

        if (timeDifference > 3600000) { // 3600,000 milliseconds = 1 hour
            localStorage.removeItem('lastVisit');
            return 'Login';
        } else {
            localStorage.setItem('lastVisit', currentTime);
            return 'Home';
        }
    } else {
        localStorage.setItem('lastVisit', Date.now());
        return 'Home';
    }
}


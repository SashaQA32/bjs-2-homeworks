"use strict"

class AlarmClock {
    constructor() {
        this.alarmCollection = [],
            this.timerId = null
    }

    addClock(time, callback, id) {
        if (isNaN(id)) {
            throw new Error('error text');
        } else if (this.alarmCollection.find(item => item.id === id) !== undefined) {
            return console.error("звонок уже существует");

        } else {
            return this.alarmCollection.push({
                id,
                time,
                callback
            });
        }
    }

    removeClock(id) {
        let startLength = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter(item => item.id !== id);
        return (startLength > this.alarmCollection.length);
    }

    getCurrentFormattedTime() {
        let recordTime = (number) => {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        let nowTime = new Date();
        return recordTime(nowTime.getHours()) + ':' + recordTime(nowTime.getMinutes());
    }

    start() {
        let checkClock = (alarm) => {
            if (alarm.time === this.getCurrentFormattedTime()) {
                return alarm.callback();
            }
        }
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach(alarm => checkClock(alarm));
            }, 60);
        }
        return;
    }

    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        this.alarmCollection.forEach(item => console.log(item.id + ':' + item.time));
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase() {
    let testAlarm = new AlarmClock;
    testAlarm.start();
    testAlarm.addClock('10:30', () => console.log('Какой сегодня день?'), 1);
    testAlarm.addClock('10:31', () => console.log('Сегодня день дедлайна'), 2);
    testAlarm.addClock('10:32', () => console.log('ААА как все успеть?'), 3);
    testAlarm.addClock('10:33', () => console.log('Скоро обед, нужно пойти покушать'), 4);
    testAlarm.printAlarms();
    testAlarm.removeClock(4);
    testAlarm.addClock('10:34', () => {
        testAlarm.stop();
        console.log('Работай! Иначе не успеешь!');
    }, 5);
    testAlarm.printAlarms();
}
testCase();
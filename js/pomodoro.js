const pomodoro = {
  workTime: 25 * 60,  // Default work time of 25 minutes
  breakTime: 5 * 60,  // Default break time of 5 minutes

  working: true,
  counting: false,

  breakTimeElement: document.querySelector('.break-time span'),
  clockElement: document.querySelector('.clock'),
  workTimeElement: document.querySelector('.work-time span'),

  incBreakButton: document.getElementById('incBreak'),
  decBreakButton: document.getElementById('decBreak'),
  incWorkButton: document.getElementById('incWork'),
  decWorkButton: document.getElementById('decWork'),

  startButton: document.getElementById('start'),
  resetButton: document.getElementById('reset'),

  attachEventHandlers: function() {
    this.incBreakButton.addEventListener('click', this.incrementBreakTime.bind(this));
    this.decBreakButton.addEventListener('click', this.decrementBreakTime.bind(this));
    this.incWorkButton.addEventListener('click', this.incrementWorkTime.bind(this));
    this.decWorkButton.addEventListener('click', this.decrementWorkTime.bind(this));

    this.startButton.addEventListener('click', this.start.bind(this));
    this.resetButton.addEventListener('click', this.reset.bind(this));
  },

  decrementBreakTime: function() {
    if (this.breakTime > 60) {
      this.breakTime -= 60;
      this.setTime(this.breakTimeElement, this.breakTime);
    }
  },

  decrementWorkTime: function() {
    if (this.workTime > 60) {
      this.workTime -= 60;
      this.setTime(this.workTimeElement, this.workTime);
    }
  },

  getTimeString: function(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return this.zeroPad(minutes) + ':' + this.zeroPad(seconds);
  },

  incrementBreakTime: function() {
    this.breakTime += 60;
    this.setTime(this.breakTimeElement, this.breakTime);
  },

  incrementWorkTime: function() {
    this.workTime += 60;
    this.setTime(this.workTimeElement, this.workTime);
  },

  init: function(addTriggers) {
    this.currentTime = this.workTime;

    this.setTime(this.clockElement, this.currentTime);
    this.setTime(this.breakTimeElement, this.breakTime);
    this.setTime(this.workTimeElement, this.workTime);

    if (addTriggers) {
      this.attachEventHandlers();
    }
  },

  reset: function() {
    this.counting = false;
    this.working = true;
    this.workTime = 25 * 60;
    this.breakTime = 5 * 60;

    if (this.interval) {
      clearInterval(this.interval);
      this.startButton.textContent = 'Start';
    }
    
    this.init(false);
  },

  setTime: function(element, time) {
    element.textContent = this.getTimeString(time);
  },

  start: function() {
    if (this.counting) {
      clearInterval(this.interval);
      this.startButton.textContent = 'Start';
      this.counting = false;
    } else {
      this.interval = setInterval(this.updateTime.bind(this), 1000);
      this.startButton.textContent = 'Stop';
      this.counting = true;
    }
  },

  updateTime: function() {
    this.currentTime -= 1;
    this.setTime(this.clockElement, this.currentTime);
  },

  zeroPad: function(n) {
    if (n < 10) {
      return '0' + n;
    }

    return n;
  }
};

pomodoro.init(true);

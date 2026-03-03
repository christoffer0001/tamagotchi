class Timer {
  constructor(interval, repeat, label, active) {
    this.label = label;
    this.notice = false;
    this.repeat = repeat;
    this.active = active;
    this.interval = interval;
    this.timeStamp = Date.now();
  }

  tick() {
    if (Date.now() - this.timeStamp > this.interval) {
      this.notice = true;
      this.timeStamp = Date.now();
      if (this.repeat != true) {
        this.active = false;
      }
    }
  }
}

let hunger;
let diciplineFactor;
let light;
let health;
let age;

let timers = [];

function setup() {
  createCanvas(1200, 720);

  //Var assign
  hunger = 10;
  age = 0;
  diciplineFactor = 0;
  light = true;
  health = 10;

  timers.push(new Timer(50000, true, "hunger", true)); //Hunger timer
  timers.push(new Timer(100000, true, "starving", false)); //Starvation timer
  timers.push(new Timer(60000, true, "ageing", true)); // Ageing timer
}

function draw() {
  background(220);
  for (let i = 0; i < timers.length; i++) {
    timers[i].tick();

    //Auto huger logic
    if (timers[i].notice == true && timers[i].label == "hunger") {
      hunger -= 1;
      console.log("Hunger: " + hunger);

      timers[i].timeStamp = Date.now();
      timers[i].notice = false;
    }

    //Removes inactive timers (exept "starving")
    if (timers[i].active == false && timers[i].label != "starving") {
      timers.splice(i, 1);
    }

    //If starving, start starving timer
    if (timers[i].label == "starving" && hunger <= 0 && timers[i].active == false) {
      timers[i].active = true;
    }

    //Check starvation timer
    if (timers[i].label == "starving" && timers[i].notice == true) {
      health -= 1;
      console.log(health);
    }

    timers[i].tick(); //Placeres nederst i for-loop, da repeat ikke må køres før nyt timestamp
  }

  //Handle 0 life
  if (health < 0) {
    console.log("Death and destruction has yet to come!!!");
  }
}

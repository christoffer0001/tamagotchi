let tamagotchi;

let timers = [];

let food, lightBulb, playIcon, medicineIcon, cleanIcon, healthSpecturmIcon, diciplineIcon;

let displayFoodOptions = false;

function preload() {
  food = loadImage("Assets/eat.png");
  lightBulb = loadImage("Assets/night_day.png");
  playIcon = loadImage("Assets/play.png");
  medicineIcon = loadImage("Assets/medicine.png");
  cleanIcon = loadImage("Assets/cleaning.png");
  healthSpecturmIcon = loadImage("Assets/healthSpectrum.png");
  diciplineIcon = loadImage("Assets/discipline.png");
}

function setup() {
  createCanvas(900, 720);

  timers.push(new Timer(50000, true, "hunger", true)); //Hunger timer
  timers.push(new Timer(100000, true, "starving", false)); //Starvation timer
  timers.push(new Timer(60000, true, "ageing", true)); // Ageing timer

  tamagotchi = new Tamagotchi();
}

function draw() {
  background(220);
  for (let i = 0; i < timers.length; i++) {
    timers[i].tick();

    //Auto hunger logic
    if (timers[i].notice == true && timers[i].label == "hunger") {
      tamagotchi.hunger -= 1;
      console.log("Hunger: " + tamagotchi.hunger);

      timers[i].timeStamp = Date.now();
      timers[i].notice = false;
    }

    //Removes inactive timers (exept "starving"), (prb. needs modification)
    if (timers[i].active == false && timers[i].label != "starving") {
      timers.splice(i, 1);
    }

    //If starving, start starving timer
    if (timers[i].label == "starving" && tamagotchi.hunger <= 0 && timers[i].active == false) {
      timers[i].active = true;
    }

    //Check starvation timer
    if (timers[i].label == "starving" && timers[i].notice == true) {
      tamagotchi.health -= 1;
      timers[i].timeStamp = Date.now();
      timers[i].notice = false;
      console.log(tamagotchi.health);
    }

    timers[i].tick(); //Placeres nederst i for-loop, da repeat ikke må køres før nyt timestamp
  }

  //Handle 0 life
  if (tamagotchi.health < 0) {
    console.log("Death and destruction has yet to come!!!");
  }

  //btn for feeding
  noStroke();

  //Upper btns
  //Food btn (with options)
  if (displayFoodOptions) {
    rect(width / 2 - 110 * 2, height / 2 - 80 / 2, 110, 80);

    textSize(35);
    text("Snack", width / 2 - 100 * 2.15, height / 2 + 35 / 3);

    rect(width / 2 + 110 * 0.8, height / 2 - 80 / 2, 110, 80);
    text("Meal", width / 2 + 100 * 1.05, height / 2 + 35 / 3);
  } else {
    image(food, width / 12, height / 20, 110, 80);
  }

  image(lightBulb, (width / 12) * 2 + width / 7, height / 20, 110, 80);
  image(playIcon, (width / 12) * 3 + (width / 7) * 2, height / 20, 110, 80);
  image(medicineIcon, (width / 12) * 4 + (width / 7) * 3, height / 20, 110, 80);

  //Lower btns
  image(cleanIcon, width / 12, height - height / 20 - 80, 110, 80);
  image(healthSpecturmIcon, (width / 12) * 2 + width / 7, height - height / 20 - 80, 110, 80);
  image(diciplineIcon, (width / 12) * 3 + (width / 7) * 2, height - height / 20 - 80, 110, 80);
  rect((width / 12) * 4 + (width / 7) * 3, height - height / 20 - 80, 110, 80);
}

//press function to btns
function mousePressed() {
  //if click on btn for feeding
  if (mouseX > width / 12 && mouseX < width / 12 + 110 && mouseY > height / 20 && mouseY < height / 20 + 80 && displayFoodOptions != true) {
    //Opens optionsbar
    displayFoodOptions = true;
  }
  //Chooses snack option
  else if (mouseX > width / 2 - 110 * 2 && mouseX < width / 2 - 110 * 2 + 110 && mouseY > height / 2 - 80 / 2 && mouseY < height / 2 - 80 / 2 + 80 && displayFoodOptions) {
    tamagotchi.hunger += 1;
    displayFoodOptions = false;
  }
  //Chooses meal option
  else if (mouseX > width / 2 + 110 * 0.8 && mouseX < width / 2 + 110 * 0.8 + 110 && mouseY > height / 2 - 80 / 2 && mouseY < height / 2 - 80 / 2 + 80 && displayFoodOptions) {
    tamagotchi.hunger += 2;
    displayFoodOptions = false;
  }
}

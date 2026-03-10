let tamagotchi;

let timers = [];

let foodIcon, lightBulbIcon, playIcon, medicineIcon, cleanIcon, healthSpecturmIcon, diciplineIcon;

let displayFoodOptions = false;

let btnHeight;
let btnWidth;
let btnGapX;
let btnGapY;
let btnGapY2;

function preload() {
  foodIcon = loadImage("Assets/eat.png");
  lightBulbIcon = loadImage("Assets/night_day.png");
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

  btnHeight = height / 9;
  btnWidth = width / 8.18;
  btnGapX = width / 9.78; // The gap between the btns on the x-axis
  btnGapY = height / 20; // The gap between the btn and the boarder of the canvas
  btnGapY2 = height / 6.21; // The gap between the top of the btn and the boarder of the canvas

  //Upper btns
  //Food btn logic:
  if (displayFoodOptions) {
    //Option 1
    rect(width / 2 - btnWidth * 2, height / 2 - btnHeight / 2, btnWidth, btnHeight);

    textSize(height / 20.57);
    text("Snack", width / 2 - btnWidth * 1.95, height / 2 + btnHeight * 0.15);

    //Option 2
    rect(width / 2 + btnWidth, height / 2 - btnHeight / 2, btnWidth, btnHeight);
    text("Meal", width / 2 + btnWidth * 1.1, height / 2 + btnHeight * 0.15);
  } else {
    //No optionbar open
    image(foodIcon, btnGapX, btnGapY, btnWidth, btnHeight);
  }

  image(lightBulbIcon, 2 * btnGapX + btnWidth, btnGapY, btnWidth, btnHeight);
  image(playIcon, 3 * btnGapX + 2 * btnWidth, btnGapY, btnWidth, btnHeight);
  image(medicineIcon, 4 * btnGapX + 3 * btnWidth, btnGapY, btnWidth, btnHeight);

  //Lower btns
  image(cleanIcon, btnGapX, height - btnGapY2, btnWidth, btnHeight);
  image(healthSpecturmIcon, 2 * btnGapX + btnWidth, height - btnGapY2, btnWidth, btnHeight);
  image(diciplineIcon, 3 * btnGapX + 2 * btnWidth, height - btnGapY2, btnWidth, btnHeight);
  rect(4 * btnGapX + 3 * btnWidth, height - btnGapY2, btnWidth, btnHeight);
}

//press function to btns
function mousePressed() {
  //if click on btn for feeding
  if (mouseX > btnGapX && mouseX < btnGapX + btnWidth && mouseY > btnGapY && mouseY < btnGapY + btnHeight && displayFoodOptions != true) {
    //Opens optionsbar
    displayFoodOptions = true;
  }
  //Chooses snack option
  else if (mouseX > width / 2 - btnWidth * 2 && mouseX < width / 2 - btnWidth * 2 + btnWidth && mouseY > height / 2 - btnHeight / 2 && mouseY < height / 2 - btnHeight / 2 + btnHeight && displayFoodOptions) {
    tamagotchi.hunger += 1;
    displayFoodOptions = false;
  }
  //Chooses meal option
  else if (mouseX > width / 2 + btnWidth * 0.8 && mouseX < width / 2 + btnWidth * 0.8 + btnWidth && mouseY > height / 2 - btnHeight / 2 && mouseY < height / 2 - btnHeight / 2 + btnHeight && displayFoodOptions) {
    tamagotchi.hunger += 2;
    displayFoodOptions = false;
  }
}

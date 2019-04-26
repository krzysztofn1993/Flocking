let flock = [];

function setup() {
    createCanvas(640,400);
    for (let index = 0; index < 200; index++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(51);
    let oldSpeeds = flock;
    for (let index = 0; index < flock.length; index++) {
        flock[index].boundaries();
        flock[index].flock(oldSpeeds);
        flock[index].show();
        flock[index].update();
    }
  }
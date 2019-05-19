let flock = [];
let vw = 640;
let vh = 640;
let amoutOfBoids = 200;
var boids = 200;
var repeling;
var speed;
var pos;
var capacity = 32;
var qts = true;
var frameR = 0;
var perception = 25;
var strW = 4;

console.log(' to hide qtree set qts = false');
console.log(' to change no of boids set boids to integer');
console.log(' to hide qtree set qts = false');
console.log(' to set capacity of qtree set capacity');
console.log(' to change perception of boids set perception');
console.log('to change width change strW');

function setup() {
    createCanvas(vw, vh);

    for (let index = 0; index < amoutOfBoids; index++) {
        flock.push(new Boid());
    }
    repeling = createSlider(0, 3, 0.8, 0.1);
    speed = createSlider(0, 3, 0.9, 0.1);
    pos = createSlider(0, 3, 0.6, 0.1);
    repeling.position(50, vh + 50);
    speed.position(200, vh + 50);
    pos.position(350, vh + 50);
    fill(0);
    text('repeling', 50, vh - 20);
    text('speed', 200, vh - 20);
    text('pos', 350, vh - 20);
}
function draw() {
    background(51);
    if (amoutOfBoids !== boids) {
        amoutOfBoids = boids;
        flock = [];
        for (let index = 0; index < amoutOfBoids; index++) {
            flock.push(new Boid());
        }
    }
    let rep = repeling.value();
    let sp = speed.value();
    let ps = pos.value();
    let boundary = new Rectangle(vw / 2, vh / 2, vw, vh);
    let qt = new Qtree(boundary, capacity);

    for (let index = 0; index < amoutOfBoids; index++) {
        let point = new Point(flock[index].position.x, flock[index].position.y, flock[index]);
        qt.insert(point);
    }

    for (let index = 0; index < amoutOfBoids; index++) {
        let range = new Circle(flock[index].position.x, flock[index].position.y, perception);
        let nb = qt.query(range, []);
        if (nb.length == 0) {
            continue;
        }
        flock[index].boundaries();
        flock[index].flock(nb);
        flock[index].update(rep, sp, ps);
        flock[index].show(strW);
    }
    frameR++;
    if (frameR == 150) {
        frameR = 0;
        console.log(frameRate());
        console.log(' to hide qtree set qts = false');
        console.log(' to change no of boids set boids to integer');
        console.log(' to hide qtree set qts = false');
        console.log(' to set capacity of qtree set capacity');
        console.log(' to change perception of boids set perception');
        console.log('to change width change strW');
    }
    if (qts == true) {
        qt.show();
    }
}

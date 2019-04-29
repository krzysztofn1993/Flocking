class Boid {

    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 1.5));
        this.acc = createVector();
        this.maxSpeed = random(2.5, 4.5);
        this.maxForce = 1.4;
        this.repelingMult = 1;
        this.avgPosMult = 1;
        this.avgSpeedMult = 1;
        this.perception = 25;
    }

    boundaries () {
        if (this.position.x > width ) {
            this.position.x = 0;
        } else if (this.position.x < 0 ) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0 ) {
            this.position.y = height;
        }
    }

    show (str) {
        strokeWeight(str);
        stroke(255);
        point(this.position.x, this.position.y)
    }

    update (rep, speed, pos) {
        this.repelingMult = rep;
        this.avgPosMult = pos;
        this.avgSpeedMult = speed;
        this.position.add(this.velocity);
        this.velocity.add(this.acc);
        this.velocity.setMag(this.maxSpeed);
    }

    flock (boids) {
        this.acc.set(0,0);
        let forces = this.align(boids);
        forces.repeling.mult(this.repelingMult);
        this.acc.add(forces.repeling);
        forces.avgSpeed.mult(this.avgSpeedMult);
        this.acc.add(forces.avgSpeed);
        forces.avgPos.mult(this.avgPosMult);
        this.acc.add(forces.avgPos);
    }

    align (boids) {
        let avgSpeed = createVector();
        let avgPos = createVector();
        let repeling = createVector();
        let nearObjects = 0;
        for (let index = 0; index < boids.length; index++) {
            let currentDistance = this.position.dist(boids[index].userData.position)
            if (this != boids[index].userData) {
                nearObjects++;
                avgSpeed.add(boids[index].userData.velocity);
                avgPos.add(boids[index].userData.position);
                repeling.add(p5.Vector.sub(this.position, boids[index].userData.position).div(currentDistance));
            }
        }
        if (nearObjects != 0) {

            avgSpeed.div(nearObjects);
            avgSpeed.sub(this.velocity);
            avgSpeed.limit(this.maxForce);

            avgPos.div(nearObjects);
            avgPos.sub(this.position);
            avgPos.setMag(this.maxSpeed);
            avgPos.sub(this.velocity);
            avgPos.limit(this.maxForce);
            
            repeling.div(nearObjects);
            repeling.setMag(this.maxSpeed);
            repeling.sub(this.velocity);
            repeling.limit(this.maxForce);
        }

        return {
            avgSpeed: avgSpeed,
            avgPos: avgPos,
            repeling: repeling
        };
    }
}
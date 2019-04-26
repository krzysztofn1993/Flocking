class Boid {

    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 1.5));
        this.acc = createVector();
        this.maxForce = 0.7;
        this.maxSpeed = 3;
    }

    boundaries () {
        if (this.position.x > width ) {
            this.position.x = 0;
        } else if (this.position.x < 0 ) {
            this.position.x = width;
        }
        if (this.position.y > height ) {
            this.position.y = 0;
        } else if (this.position.y < 0 ) {
            this.position.y = height;
        }
    }

    show () {
        strokeWeight(6);
        stroke(255);
        point(this.position.x, this.position.y)
    }

    update () {
        this.position.add(this.velocity);
        this.velocity.add(this.acc);
        this.velocity.setMag(this.maxSpeed);
    }

    flock (boids) {
        this.acc.set(0,0);
        let forces = this.align(boids);
        forces.repeling.mult(1.5);
        this.acc.add(forces.repeling);
        this.acc.add(forces.avgSpeed);
        this.acc.add(forces.avgPos);
    }

    align (boids) {
        let distance = 50;
        let avgSpeed = createVector();
        let avgPos = createVector();
        let repeling = createVector();
        let nearObjects = 0;
        for (let index = 0; index < boids.length; index++) {
            let currentDistance = this.position.dist(boids[index].position)
            if (this != boids[index] && currentDistance < distance) {
                nearObjects++;
                avgSpeed.add(boids[index].velocity);
                avgPos.add(boids[index].position);
                repeling.add(p5.Vector.sub(this.position, boids[index].position).div(currentDistance));
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
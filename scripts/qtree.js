class Qtree {

    constructor (boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.divided = false;
        this.points = [];
    }

    insert (point) {
        if (!this.boundary.contains(point)) {
            return;
        }
        if (this.points.length < this.capacity && !this.divided) {
            this.points.push(point);
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            this.insertParentPoints(point);
        }
    }
    
    subdivide () {
        let halfWidth = this.boundary.w/2;
        let halfHeight = this.boundary.h/2;
        
        let nw = new Rectangle(this.boundary.x - halfWidth, this.boundary.y - halfHeight, halfWidth, halfHeight);
        let ne = new Rectangle(this.boundary.x + halfWidth, this.boundary.y - halfHeight, halfWidth, halfHeight);
        let sw = new Rectangle(this.boundary.x - halfWidth, this.boundary.y + halfHeight, halfWidth, halfHeight);
        let se = new Rectangle(this.boundary.x + halfWidth, this.boundary.y + halfHeight, halfWidth, halfHeight);
        
        this.nortwest = new Qtree(nw, this.capacity);
        this.norteast = new Qtree(ne, this.capacity);
        this.southwest = new Qtree(sw, this.capacity);
        this.southeast = new Qtree(se, this.capacity);
        
        this.divided = true;
        
        for (let index = 0; this.points.length != 0; index++) {
            let point = this.points.shift();
            this.insertParentPoints(point);
        }
    }
    
    insertParentPoints (point) {
        this.nortwest.insert(point);
        this.norteast.insert(point);
        this.southwest.insert(point);
        this.southeast.insert(point);
    }
    
    query(range, found) {
        if (found === undefined) {
            var found = [];
        }
        if(this.boundary.intersects(range)) {
            return found;
        } else {
            if (this.divided) {
                this.nortwest.query(range, found);
                this.norteast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }
            for (let index = 0; index < this.points.length; index++) {
                if (range.contains(this.points[index])) {
                    found.push(this.points[index]);
                }
            }
        }
        return found;
    }
    
    show() {
        stroke(255);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        
        if (this.divided) {
            this.nortwest.show();
            this.norteast.show();
            this.southwest.show();
            this.southeast.show();
        }
    }
}
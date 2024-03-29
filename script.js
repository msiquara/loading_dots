let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cwidth = 120;
let cheight = 100;

canvas.width = cwidth;
canvas.height = cheight;

let all_dots = [];
let dot;

class Dot {
    constructor(x, y, r, color, speed, alpha) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.speed = speed;
        this.dx = 1.5 * this.speed;
        this.alpha = alpha;
        this.dalpha = 0.02; //alpha speed change
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);    
        ctx.fillStyle = this.color;
        ctx.fill(); //fill circle
        ctx.closePath();
    }

    update(ctx) {        
        this.draw();

        //fade in
        if (this.x <= 10) {
            this.alpha += this.dalpha;
            this.color = 'rgba(255, 255, 255,' + this.alpha + ')';
        }
        
        //move foward
        if (this.alpha >= .96){
            this.x += this.dx;
        }

        //fade out
        if (this.x >= cwidth - 12){  
            this.alpha -= this.dalpha;
            this.color = 'rgba(255, 255, 255,' + this.alpha + ')';   
        }   

        //back to begin
        if (this.alpha <= 0.15){
            this.x = 10;
        }
    }
}

let moveDot = function() {
    requestAnimationFrame(moveDot);
    ctx.clearRect(0, 0, cwidth, cheight);
    for (let i = 0; i < 3; i++){
        all_dots[i].update();
    }    
}

//create dots

dot = new Dot(10, 50, 10, "rgba(255,255,255,.24)", 1.2, 0.24);
all_dots.push(dot);
    
dot = new Dot(35, 50, 10, "rgba(255,255,255,1)", 1.2, 1);
all_dots.push(dot);

dot = new Dot(cwidth-18, 50, 10, "rgba(255,255,255,1)", 1.2, 1);
all_dots.push(dot);

moveDot();
const container = document.getElementById("container")

//class to create a ball
class Ball {
    constructor(){
        this.color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
        this.size = 80;
        this.ball = document.createElement("div");
    }

    setup(){
        this.ball.style.borderRadius = "50%"
        this.ball.style.backgroundColor = this.color
        this.ball.style.position = "absolute"
        this.ball.style.width = `${this.size}px`
        this.ball.style.height = `${this.size}px`
        container.appendChild(this.ball)
    }

    updateCoors(x, y){
        this.ball.style.left = `${x - this.size/2}px`
        this.ball.style.top = `${y - this.size/2}px`
    }

    updateText(text){
        this.ball.style.display = "flex"
        this.ball.style.justifyContent = "center"
        this.ball.style.alignItems = "center"
        this.ball.style.textAlign = "center"
        this.ball.style.fontSize = "22px"
        this.ball.style.color = "white"
        this.ball.appendChild(document.createTextNode(text))
    }
}

//create balls
let ball ;
for (let r = 0; r < 3; r++){
    for (let c = 0; c < 20; c++){
        ball = new Ball
        ball.setup()
        ball.updateCoors(100 + 80*c, 40+ 80*r)
        ball.updateText(r*20 + c )
    }
}

//class to create and update a line
class Line {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.alpha = 0;
        this.line = document.createElement('div')
    }

    setup(){
        container.appendChild(this.line)
    }

    update(x1, y1, x2, y2){
        let a = x1 - x2
        let b = y1 - y2
        this.length = Math.sqrt(a*a + b*b);

        let sx = (x1 + x2)/2
        let sy = (y1+ y2)/2;

        this.x = sx - this.length/2;
        this.y = sy
        
        this.alpha = Math.PI - Math.atan2(-b, a);
        this.updateStyle()
    }

    updateStyle(){
        let styles = 'border: 1px solid black;'
                + 'width: ' + this.length + 'px;'
                + 'height: 0px;'
                + '-moz-transform: rotate(' + this.alpha + 'rad); '
                + '-webkit-transform: rotate(' + this.alpha + 'rad); '
                + '-o-transform: rotate(' + this.alpha + 'rad); '
                + '-ms-transform: rotate(' + this.alpha + 'rad); '
                + 'display: inline-block;'
                + 'position: absolute; '
                + 'top: ' + this.y + 'px; '
                + 'left: ' + this.x + 'px; '
        this.line.setAttribute('style', styles)
    }
}


let mouseX = null;
let mouseY = null;
const line = new Line;
line.setup()

const mainBall = new Ball;
mainBall.setup()
mainBall.updateText("^")

function onMouseUpdate(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    
    //update position of line
    line.update(mouseX, mouseY, window.innerWidth/2, window.innerHeight - 10)
    //update position of ball
    mainBall.updateCoors(mouseX, mouseY)
}

function throwMainBall(){
    const k = (mouseX - window.innerWidth/2)/(mouseY - window.innerHeight + 10)
    const b = mouseY - mouseX*k
    const cutLineY = 240
    const cutLineX = (cutLineY - b)/k

    mainBall.updateCoors(cutLineX, cutLineY)
}


document.addEventListener('mousemove', onMouseUpdate, false);
container.addEventListener('click', throwMainBall, false);
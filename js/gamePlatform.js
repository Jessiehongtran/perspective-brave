const container = document.getElementById("container")

const platformPos = {
    x: 100,
    y: 100
}
const platformWidth = 100
const platformHeight = 20
const platformSpeed = 50; 

class Platform{
    constructor(x, y, w, h, speed, platform){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.platform = platform;
        this.width = w;
        this.height = h; 
    }

    setup(){
        this.platform.style.width = `${this.width}px`
        this.platform.style.height = `${this.height}px`
        this.platform.style.backgroundColor = 'grey'
        this.platform.style.borderRadius = '20px'
        this.platform.style.position = 'absolute'
        this.platform.style.left = `${this.x}px`
        this.platform.style.top = `${this.y}px`
        container.appendChild(this.platform)
    }

    moveRight(){
        this.x += 5
        this.platform.style.left = `${this.x}px`
        setTimeout(this.moveRight.bind(this), this.speed)
    }

    moveLeft(){
        this.x -= 5
        this.platform.style.left = `${this.x}px`
        setTimeout(this.moveLeft.bind(this), this.speed)
    }

}

const platforms = []

for (let i = 0; i < 4; i++){
    if (i%2 === 0){
        platforms.push(new Platform(0, 100 + 100*i*2, platformWidth, platformHeight, platformSpeed, document.createElement("div")))
        platforms[i].setup()
        platforms[i].moveRight()
    } else {
        platforms.push(new Platform(window.innerWidth, 100 + 100*i*2, platformWidth, platformHeight, platformSpeed, document.createElement("div")))
        platforms[i].setup()
        platforms[i].moveLeft()
    }

}


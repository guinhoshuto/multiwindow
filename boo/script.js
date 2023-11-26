import { start, screenInfo } from '/main.js'

const startBtn = document.querySelector("#start")
const q = new URLSearchParams(window.location.search);
const body = document.querySelector('body')
let img = document.createElement("img")
let c;

startBtn.addEventListener("click", () => {
    window.open(
        `${window.location.href}?c=mario`, 
        '_blank',
        {
            height: 100,    
            left: 500,    
        }
    )
    window.open(
        `${window.location.href}?c=boo`, 
        '_blank'
    )
})

window.localStorage.setItem('isPeeking', 'no')
class Mario{
    constructor(){
        this.x;
        this.y;
        this.distance;
        this.screenId;
        this.imgSrc = '/boo/assets/mario.webp'
    }

    draw(){
        img.src = this.imgSrc;
        img.id="mario"
    }

    peek(){
        img.addEventListener('mouseover', () => {
            window.localStorage.setItem('isPeeking', 'yes')
            img.setAttribute('style', 'transform: scale(-1, 1)')
        });
        img.addEventListener('mouseleave', () => {
            window.localStorage.setItem('isPeeking', 'no')
            img.setAttribute('style', 'transform: scale(1, 1)')
        });
    }
}

class Boo{
    constructor(){
        this.x
        this.y
        this.distance
        this.screenId
        this.imgSrc = 'boo.png'
        this.hideImgSrc = 'boo_hide.webp'
    }

    draw(){
        img.src = `/boo/assets/${this.imgSrc}`;
    }

    isMarioPeeking(){
        if(window.localStorage.getItem('isPeeking') === 'yes' ){
            this.hide()
        } else {
            img.src = `/boo/assets/${this.imgSrc}`;
        }
    }

    hide(){
        img.src = `/boo/assets/${this.hideImgSrc}`;
    }
}

if(q.has('c')){
    if(q.get('c') === 'mario'){
        const mario = new Mario()
        mario.draw()
        setInterval(mario.peek, 10)
    } else if(q.get('c') === 'boo'){
        const boo = new Boo()
        boo.draw()
        setInterval(boo.isMarioPeeking, 10)
    }
    body.appendChild(img)
}


start()
import { start, screenInfo } from '../main.js'

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

    draw(){
        img.src = "assets/mario.webp"
        img.id="mario"
    }

    peek(){
        img.addEventListener('mouseover', () => {
            window.localStorage.setItem('isPeeking', 'yes')
            img.setAttribute('style', 'transform: scale(-1, 1)')
        })
        img.addEventListener('mouseleave', () => {
            window.localStorage.setItem('isPeeking', 'no')
            img.setAttribute('style', 'transform: scale(1, 1)')
        })
    }
}

class Boo{
    draw(){
        img.src = "assets/boo.png"
    }

    hide(){
        img.src = 'assets/boo.png'
        if(window.localStorage.getItem('isPeeking') === 'yes' ){
            console.log('uai')
            img.src = 'assets/boo_hide.webp'
        }
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
        setInterval(boo.hide, 10)
    }
    body.appendChild(img)
}


start()
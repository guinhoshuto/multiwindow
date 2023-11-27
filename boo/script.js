import { start, screenInfo, getScreenDetails, screenId } from '/main.js'

start()
const startBtn = document.querySelector("#start")
const q = new URLSearchParams(window.location.search);
const body = document.querySelector('body')
let img = document.createElement("img")
let c;

startBtn.addEventListener("click", () => {
    window.open(
        `${window.location.href}?c=mario`, 
        'mario',
        "height=510, width=321, left=960, top=100, status=0"
    )
    window.open(
        `${window.location.href}?c=boo`, 
        'boo',
        "height=165, width=196, left=1500, status=0"
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

    init(){
        img.src = this.imgSrc;
        img.id="mario"
        this.setScreenId()
    }

    setScreenId(){
        window.localStorage.setItem('mario', JSON.stringify({screenId: screenId}))
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
    constructor(screenId){
        this.x
        this.y
        this.distance
        this.screenId = screenId
        this.imgSrc = 'boo.png'
        this.hideImgSrc = 'boo_hide.webp'
        this.isMarioToTheLeft
    }

    setDetails(){
        const details = getScreenDetails();
        this.x = details.screenX;
        this.y = details.screenY;
    }


    getMarioLocation(){
        const { screenId } = JSON.parse(window.localStorage.getItem('mario'));
        return JSON.parse(window.localStorage.getItem(screenId));
    }

    checkIfIsMarioToTheLeft(){
        const marioLocation = this.getMarioLocation();
        if(marioLocation.screenX > this.x){
            this.isMarioToTheLeft = false
            img.setAttribute('style', 'transform: scale(-1, 1)')
        } else {
            this.isMarioToTheLeft = true
            img.setAttribute('style', 'transform: scale(1, 1)')
        }

    }

    isMarioPeeking(){
        this.checkIfIsMarioToTheLeft();
        if(!this.isMarioToTheLeft){
            img.setAttribute('style', 'transform: scale(-1, 1)');
        }
        if(window.localStorage.getItem('isPeeking') === 'yes' ){
            img.src = `/boo/assets/boo_hide.webp`;
        } else {
            img.src = `/boo/assets/boo.png`;
        }
    }

    init(){
        window.localStorage.setItem('boo', JSON.stringify({screenId: screenId}));
        this.setDetails();
        this.checkIfIsMarioToTheLeft();
        console.log(this.isMarioToTheLeft, this.x)
        img.src = `/boo/assets/${this.imgSrc}`;
    }


    update(){
        this.setDetails();
        this.setScreenId();
        this.checkIfIsMarioToTheLeft();
        img.src = `/boo/assets/${this.imgSrc}`;
        console.log(this.isMarioToTheLeft, this.x);
    }

    hide(){
        img.src = `/boo/assets/${this.hideImgSrc}`;
    }

}

if(q.has('c')){
    if(q.get('c') === 'mario'){
        const mario = new Mario()
        mario.init()
        setInterval(mario.peek, 10)
    } else if(q.get('c') === 'boo'){
        const boo = new Boo();
        boo.init(screenId);
        setInterval(boo.update, 10);
        setInterval(boo.isMarioPeeking, 10);
    }
    body.appendChild(img)
}


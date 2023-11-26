import { start } from '../main.js'

const video = document.querySelector('video')

function populateWebcam(){
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        if(!video) return
        video.width = window.screen.availWidth
        video.height = window.screen.availHeight
        video.srcObject = stream
        video.play();
    })
}

function updateScreen(){
    video.setAttribute('style', `transform: translate(-${window.screenX}px, -${window.screenY}px)`)
    // body.setAttribute('style', `background: rgb(${window.screenX}, ${window.screenY}, ${window.height})`)
}

setInterval(updateScreen, 10)

start()
populateWebcam()
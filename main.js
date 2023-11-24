const video = document.querySelector('video')
const info = document.querySelector('#info')
const body = document.querySelector('body')

function getScreenId(){
    const existingScreens = Object.keys(window.localStorage)
        .filter(key => key.startsWith('screen-'))
        .map(key => parseInt(key.replace('screen-', '')))
        .sort((a,b) => a-b);
    return existingScreens.at(-1) + 1 || 1
}

const screenId = `screen-${getScreenId()}`

function screenInfo(){
    const info = JSON.parse(window.localStorage.getItem(screenId))
    return `
        screenX: ${info.screenX}<br/>
        screenY: ${info.screenY}<br/>
        screenW: ${info.screenW}<br/>
        screenH: ${info.screenH}<br/>
        width: ${info.width}<br/>
        height: ${info.height}<br/>
        updated: ${info.updated}
    `
}

function setScreenDetails(){
    const windowDetails = {
        screenX: window.screenX,
        screenY: window.screenY,
        screenW: window.screen.availWidth,
        screenH: window.screen.availHeight,
        width: window.outerWidth,
        height: window.outerHeight,
        updated: Date.now()
    }
    window.localStorage.setItem(screenId, JSON.stringify( windowDetails))
    info.innerHTML = screenInfo();
    console.log(window.localStorage.getItem(screenId))
    // console.log(screenInfo())
}

function populateWebcam(){
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        if(!video) return
        video.width = window.screen.availWidth
        video.height = window.screen.availHeight
        video.srcObject = stream
        video.play();
    })
}

function removeOld(){
    const screens = Object.entries(window.localStorage)
        .filter(([key]) => key.startsWith('screen-'))
        .map(([key, value]) => [key, JSON.parse(value)])
    for(const [key, screen] of screens){
        if(Date.now() - screen.updated > 1000){
            localStorage.removeItem(key)
        }
    }
}

function updateScreen(){
    video.setAttribute('style', `transform: translate(-${window.screenX}px, -${window.screenY}px)`)
    // body.setAttribute('style', `background: rgb(${window.screenX}, ${window.screenY}, ${window.height})`)
}

setInterval(setScreenDetails, 10)
setInterval(removeOld, 10)
setInterval(updateScreen, 10)
populateWebcam()
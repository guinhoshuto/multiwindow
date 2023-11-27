const info = document.querySelector('#info')
const body = document.querySelector('body')

function getScreenId(){
    const existingScreens = Object.keys(window.localStorage)
        .filter(key => key.startsWith('screen-'))
        .map(key => parseInt(key.replace('screen-', '')))
        .sort((a,b) => a-b);
    return existingScreens.at(-1) + 1 || 1
}

export const screenId = `screen-${getScreenId()}`

export function screenInfo(){
    const info = JSON.parse(window.localStorage.getItem(screenId))
    return `
        id: ${screenId}<br/>
        screenX: ${info.screenX}<br/>
        screenY: ${info.screenY}<br/>
        screenW: ${info.screenW}<br/>
        screenH: ${info.screenH}<br/>
        width: ${info.width}<br/>
        height: ${info.height}<br/>
        updated: ${info.updated}
    `
}

export function getScreenDetails(){
    return  {
        screenX: window.screenX,
        screenY: window.screenY,
        screenW: window.screen.availWidth,
        screenH: window.screen.availHeight,
        width: window.outerWidth,
        height: window.outerHeight,
        updated: Date.now()
    }
}

function setScreenDetails(){
    const windowDetails = getScreenDetails()
    window.localStorage.setItem(screenId, JSON.stringify( windowDetails))
    info.innerHTML = screenInfo();
    // console.log(window.localStorage.getItem(screenId))
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


export function start(){
    setInterval(setScreenDetails, 10)
    setInterval(removeOld, 10)
}

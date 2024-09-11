const layout1 = document.querySelector(".layout1")
const layout2 = document.querySelector(".layout2")
const slider = document.querySelector(".slider")
const options = [...document.querySelectorAll(".option")]
const option1 = document.querySelector("#option1")
const option2 = document.querySelector("#option2")
const stopwatchStart = document.querySelector("#start")
const stopwatchReset = document.querySelector("#reset")
const stopwatchContent = document.querySelector("#stopwatchContent")

let stopwatchRunning = false
let interval
let startTime = 0
let pauseStart = 0

const getOptionWidth = ()=>
{
    slider.style.left = `${options[0].offsetLeft}px`
    slider.style.width = `${options[0].clientWidth}px`
    setTimeout(() => {
        slider.style.opacity = 1
    }, 200);
}

const timeFunc = ()=>
{

    const date = new Date()
    let time
    const timeNow = Math.floor(date.getTime()/10)
    time = String(timeNow-startTime)
    const seconds = time.slice(0,-2)
    const milliSeconds = [time.at(-2), time.at(-1)]
    if(seconds.length < 2)
    {
        stopwatchContent.innerHTML = `0${seconds || "0"}:${milliSeconds[0]||"0"}${milliSeconds[1]||"0"}`

    }
    else
    {
        stopwatchContent.innerHTML = `${seconds}:${milliSeconds[0]||"0"}${milliSeconds[1]||"0"}`
    }
}

const startStopStopwatch = (e)=>
{
    const date = new Date()
    if(!stopwatchRunning)
    {
        if(startTime)
        {
            const pauseEnd = Math.floor(date.getTime()/10)
            startTime += (pauseEnd - pauseStart)
        }
        else
        {
            startTime = Math.floor(date.getTime()/10)
        }
        stopwatchRunning = true
        stopwatchStart.innerHTML = "STOP"
        stopwatchStart.classList.add("stop")

        interval = setInterval(() => {
            timeFunc()
        }, 10);
    }
    else
    {
        clearInterval(interval)
        if(startTime)
        {
            pauseStart = Math.floor(date.getTime()/10)
        }
        stopwatchStart.innerHTML = "START"
        stopwatchStart.classList.remove("stop")
        stopwatchRunning = false
    }
}

const resetStopwatch=()=>
{
    stopwatchStart.innerHTML = "START"
    stopwatchStart.classList.remove("stop")
    stopwatchContent.innerHTML = `00:00`
    clearInterval(interval)
    startTime = 0
    pauseStart = 0
    stopwatchRunning = false
}


stopwatchStart.addEventListener("click",startStopStopwatch)
stopwatchReset.addEventListener("click",resetStopwatch)
stopwatchStart.addEventListener("focus",(e)=>{e.target.blur()})
stopwatchReset.addEventListener("focus",(e)=>{e.target.blur()})

getOptionWidth()



const start2 = document.querySelector("#start2")
const reset2 = document.querySelector("#reset2")
const hours = document.querySelector("#hours")
const minutesTimer = document.querySelector("#minutes")
const secondsTimer = document.querySelector("#seconds")
const counterElement = document.querySelector(".counter")
const timerRunContent = document.querySelector(".timerContent")
const animateBodyElement = document.querySelector(".bodyAnimateElement")
const btnUpDown = [...document.querySelectorAll(".svg")]
const inputs = [...document.querySelectorAll(".numberInput")]
const sound = new Audio('./marimba-ringtone-5-185156.mp3')
let timerRunning = false
let timerInitialHours = 0
let timerInitialMinutes = 0
let timerInitialSeconds = 0
let timerEnd = false
let timerInterval

const changeInputValue = (e)=>
{
    const input = e.target.closest(".inputContainer").children[0]
    let value = Number(input.value)
    if(e.target.closest("svg").classList.contains("up"))
    {
        input.value = value+=1
        if(input.classList.contains("limit") && input.value >=60)
        {
            input.value = 59
        }
    }
    else if(e.target.closest("svg").classList.contains("down"))
    {
        if(value != 0)
        {
            input.value = value-=1
        }
    }
    
}

const inputValueChanged = (e)=>
{
    if(e.target.value < 0 || e.target.value == "")
    {
        e.target.value = 0
    }
    if(e.target.classList.contains("limit") && e.target.value >=60)
    {
            e.target.value = 59
    }
}

const timerContentDisplay = ()=>
{
    if(timerInitialHours < 10)
    {
        if(timerInitialMinutes <10)
        {
            if(timerInitialSeconds < 10)
            {
                timerRunContent.innerHTML = `0${timerInitialHours}:0${timerInitialMinutes}:0${timerInitialSeconds}`
                
            }
            else
            {
                timerRunContent.innerHTML = `0${timerInitialHours}:0${timerInitialMinutes}:${timerInitialSeconds}`

            }

        }
        else
        {
            if(timerInitialSeconds < 10)
            {
                timerRunContent.innerHTML = `0${timerInitialHours}:${timerInitialMinutes}:0${timerInitialSeconds}`
                
            }
            else
            {
                timerRunContent.innerHTML = `0${timerInitialHours}:${timerInitialMinutes}:${timerInitialSeconds}`

            }
        }
    }
    else
    {
        if(timerInitialMinutes <10)
        {
            if(timerInitialSeconds < 10)
            {
                timerRunContent.innerHTML = `${timerInitialHours}:0${timerInitialMinutes}:0${timerInitialSeconds}`
                
            }
            else
            {
                timerRunContent.innerHTML = `${timerInitialHours}:0${timerInitialMinutes}:${timerInitialSeconds}`

            }

        }
        else
        {
            if(timerInitialSeconds < 10)
            {
                timerRunContent.innerHTML = `${timerInitialHours}:${timerInitialMinutes}:0${timerInitialSeconds}`
                
            }
            else
            {
                timerRunContent.innerHTML = `${timerInitialHours}:${timerInitialMinutes}:${timerInitialSeconds}`

            }
        }
    }
    
}

const timerEnded = ()=>
{
    timerEnd = true
    clearInterval(timerInterval)
    reset2.style.display = `none`
    animateBodyElement.classList.add("bodyTimerEnded")
    start2.classList.add("btnAnimation")
    sound.currentTime = 0
    sound.play()
    sound.loop = true
}

const timerStart = ()=>
{
    timerRunContent.style.display = 'flex'
    timerContentDisplay()
   
    timerInterval = setInterval(()=>{
        timerInitialSeconds -= 1
        if(timerInitialSeconds == -1 && timerInitialMinutes != 0)
        {
            timerInitialMinutes -=1
            timerInitialSeconds=59
           
        }
        if(timerInitialMinutes == 0 && timerInitialHours != 0 && timerInitialSeconds == -1)
        {
           
            timerInitialSeconds = 59
            timerInitialHours -=1
            timerInitialMinutes = 59
        }
        if(timerInitialSeconds == 0 && timerInitialMinutes == 0 && timerInitialHours == 0)
        {
            timerEnded()
        }
        timerContentDisplay()
    },1000)
}

const timerBtnClicked=()=>
{
    timerEnd = false
    sound.pause()
    animateBodyElement.classList.remove("bodyTimerEnded")
    timerRunContent.style.display = 'none'
    reset2.style.display = `block`
    start2.classList.remove("btnAnimation")
}

const startStopTimer = ()=>
{
    if(timerEnd)
    {
        timerBtnClicked()
    }
    if(!timerRunning)
    {
        timerRunning = true
        start2.innerHTML = "STOP"
        start2.classList.add("stop")
        timerInitialHours = Number(hours.value)
        timerInitialMinutes = Number(minutesTimer.value)
        timerInitialSeconds = Number(secondsTimer.value)
        if(timerInitialHours == 0 && timerInitialMinutes == 0 && timerInitialSeconds == 0)
        {
            timerRunning = false
            start2.innerHTML = "START"
            start2.classList.remove("stop")
        }
        else
        {
            timerStart()
        }
        
    }
    else
    {
        clearInterval(timerInterval)
        inputs[0].value = timerInitialHours
        inputs[1].value = timerInitialMinutes
        inputs[2].value = timerInitialSeconds
        timerRunning = false
        start2.innerHTML = "START"
        start2.classList.remove("stop")
    }
}

const resetTimer = ()=>
{
    clearInterval(timerInterval)
    timerRunning = false
    start2.innerHTML = "START"
    start2.classList.remove("stop")
    timerInitialHours = 0
    timerInitialMinutes = 0
    timerInitialSeconds = 0
    timerRunContent.style.display = 'none'
    inputs.forEach(x=>x.value = 0)
   
}

inputs.forEach(x=>x.addEventListener("change",inputValueChanged))
btnUpDown.forEach(x=>x.addEventListener("click",changeInputValue))
start2.addEventListener("click",startStopTimer)
reset2.addEventListener("click",resetTimer)

start2.addEventListener("focus",(e)=>{e.target.blur()})
reset2.addEventListener("focus",(e)=>{e.target.blur()})

const eventClick = (e)=>
{
    if(e.code == "Space")
    {
        startStopStopwatch()
    }
}

const firstLayout = ()=>
{
    
    option1.classList.remove("optionHover")
    option2.classList.add("optionHover")
    layout1.style.transform = `translate(0%)`
    layout1.style.opacity = 1
    layout2.style.transform = `translate(0%)`
    layout2.style.opacity = 0
    resetTimer()
    timerBtnClicked()
    localStorage.setItem("page",JSON.stringify("stopwatch"))
    window.addEventListener("keyup",eventClick)
    slider.style.left = `${options[0].offsetLeft}px`
    slider.style.width = `${options[0].clientWidth}px`
 
    
}
const secondLayout = ()=>
{

    option2.classList.remove("optionHover")
    option1.classList.add("optionHover")
    layout1.style.transform = `translate(-100%)`
    layout1.style.opacity = 0
    layout2.style.transform = `translate(-100%)`
    layout2.style.opacity = 1
    resetStopwatch()
    localStorage.setItem("page",JSON.stringify("timer"))
    window.removeEventListener("keyup",eventClick)
    slider.style.left = `${options[1].offsetLeft}px`
    slider.style.width = `${options[1].clientWidth}px`
}

option1.addEventListener("click",firstLayout)
option2.addEventListener("click",secondLayout)
window.addEventListener("resize",getOptionWidth)


const storageCheck = ()=>
{
    const page = JSON.parse(localStorage.getItem("page"))
    if(page === "timer")
    {
        secondLayout()
    }
    else
    {
        firstLayout()
    }
}
storageCheck()
window.addEventListener("resize",storageCheck)
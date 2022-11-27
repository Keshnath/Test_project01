const btn = document.getElementById('btn');
const timer = document.getElementById('timer');
const color = function(){
    btn.innerText = "Stop";
    btn.style.background = "red";
}
const time = function(){
    count++;
    let hr = Math.floor(count / 3600);
    let min = Math.floor((count - (hr * 3600))/ 60);
    let sec = count % 60 ;

    if(sec < 10){
        sec = '0'+sec;
    }
    if(min  < 10){
        min = '0' + min;
    }
    if(hr < 10){
        hr = '0'+ hr;
    }

    timer.innerText = `${hr}:${min}:${sec}`
    
}

let flag = 0
let count = 0;
let interval = null;


btn.addEventListener('click',()=>{
    if(!flag){
        flag = 1
        color();
        if(interval){
            return 
        }
        interval = setInterval(time , 1000)
        
    }
    else{
        btn.innerText = "Start";
        btn.style.background = "green";
        flag = 0
        clearInterval(interval)
        interval = null
        count = 0
        timer.innerHTML = "00:00:00"
    }
    
})



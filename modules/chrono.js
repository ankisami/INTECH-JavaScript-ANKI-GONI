var sec = 0;
var min = 0;
var hours = 0;
var timeout;
var time = document.getElementById("timer");
var btnstop = document.getElementById("pauseBtn");

function reset(){
    h1.textContent = "00:00:00";
}
function updateTimer(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {s
            min = 0;
            hours++;
        }
    }
    h1.textContent = (hours > 9 ? hours : "0" + hours)+ ":" + (min > 9 ? min : "0" + min)+ ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}
export function startTimer() {
    timeout = setTimeout(updateTimer, 1000);
}
export function clear(){
    clearTimeout(timeout);
}
btnstop.onclick = function() {
    clearTimeout(timeout);
}
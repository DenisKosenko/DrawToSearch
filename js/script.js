

window.addEventListener('load', function () {

    let canvas = document.getElementById('sketchpad');
    let context = canvas.getContext('2d');
    let isIdle = true;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    

    function drawstart(event) {
        context.beginPath();
        context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        isIdle = false;
    }

    function drawmove(event) {
        if (isIdle) return;
        context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        context.stroke();
    }

    function drawend(event) {
        if (isIdle) return;
        drawmove(event);
        isIdle = true;
        //context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function touchstart(event) { drawstart(event.touches[0]) }
    function touchmove(event) { drawmove(event.touches[0]); event.preventDefault(); }
    function touchend(event) { drawend(event.changedTouches[0]) }

    canvas.addEventListener('touchstart', touchstart, false);
    canvas.addEventListener('touchmove', touchmove, false);
    canvas.addEventListener('touchend', touchend, false);        

    canvas.addEventListener('mousedown', drawstart, false);
    canvas.addEventListener('mousemove', drawmove, false);
    canvas.addEventListener('mouseup', drawend, false);

    reset.onclick = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    search.onclick = function() {
        let textVelue = document.getElementById('text').value;
        //window.location.href = 'https://www.google.com.ua/';
        window.location = '/search?q='+value; 
    };

}, false);



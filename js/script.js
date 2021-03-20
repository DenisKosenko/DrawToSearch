

window.addEventListener('load', function () {

    let canvas = document.getElementById('sketchpad');
    let submit = document.getElementById('submit');
    let context = canvas.getContext('2d');
    let isIdle = true;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function save(){
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href=image;
    }

    function drawstart(event) {
        context.beginPath();
        context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        isIdle = false;
        //clearTimeout(timer);
    }

    function drawmove(event) {
        if (isIdle) return;
        context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        context.stroke();
        //clearTimeout(timer);
    }

    function drawend(event) {
        if (isIdle) return;
        drawmove(event);
        isIdle = true;
        //timer = setTimeout(save, 5000);
        let cleanCanvas = isCanvasBlank(canvas)
        if(!cleanCanvas){
            submit.innerText = 'Convert';
        }else{
            submit.innerText = 'Search';
        }
        return cleanCanvas;
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
        submit.innerText = 'Search';
    };

    submit.onclick = function() {
        if(submit.innerText == 'Search'){
            let textVelue = document.getElementById('text').value;
            let form = document.getElementById('myForm');
            let search = 'https://duckduckgo.com/' + textVelue;
            form.setAttribute("action", search);
        }else{
alert(1)
        }
        
    };

    function isCanvasBlank(canvas) {
        var blank = document.createElement('canvas');
        blank.width = canvas.width;
        blank.height = canvas.height;
        return canvas.toDataURL() == blank.toDataURL();
    }

}, false);



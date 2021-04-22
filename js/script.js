

window.addEventListener('load', function () {

    let canvas = document.getElementById('sketchpad');
    let submit = document.getElementById('submit');
    let context = canvas.getContext('2d');
    let isIdle = true;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    async function save(){
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        searchText = await Recognition(image)
        return searchText
    }

    async function Recognition(image){
        let searchText = await Tesseract.recognize(
            image,
            'eng',
            { logger: m => console.log(m)}
        ).then(({data: {text}}) => {
            console.log(text);
            return(text)
        })
        return searchText
    }

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
        //save()
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

    submit.onclick = async function() {

        let textVelue = document.getElementById('text').value;
        if(submit.innerText == 'Search'){
            submit.type = 'submit'
            let form = document.getElementById('myForm');
            let search = 'https://duckduckgo.com/' + textVelue;
            form.setAttribute("action", search);
        }else{
            submit.type = 'button';
            document.getElementById('text').value = await save()
            //document.getElementById('text').value = ''
            context.clearRect(0, 0, canvas.width, canvas.height);
            submit.innerText = 'Search';
        }
    };

    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function(){window.scrollTo(x, y);};

    function isCanvasBlank(canvas) {
        var blank = document.createElement('canvas');
        blank.width = canvas.width;
        blank.height = canvas.height;
        return canvas.toDataURL() == blank.toDataURL();
    }

}, false);



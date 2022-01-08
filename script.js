let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;
let cable = ['#F0E90E','#6BFAF2','#22E600','#FA1EE8','#F01701','#F59200'];
let cablesize = 26;
let cablewidth = 60; 
let padding = 120;
let distance = (canvas.height - padding) / cable.length;

let leftcables = sortcables();
let rightcables = sortcables();
leftcablescoordinates();
rightcablescoordinates();

let lineWidth = 4;

const taskstate = {
    selectedcable : null    
}

const mousePos = {
    x: 0,
    y: 0,
    isclicked: false,
}

canvas.addEventListener('mousedown',(e) => {
    mousePos.x = e.layerX;
    mousePos.y = e.layerY;
    mousePos.isclicked = true;

    checkcolorselected();
})  

canvas.addEventListener('mouseup',(e) => {
    mousePos.isclicked = false;
    taskstate.selectedcolor = null
})

canvas.addEventListener('mousemove',(e) => {
    if (mousePos.isclicked){
        mousePos.x = layerX;
        mousePos.y = layerY;
    }
})



function main() {
    clearCanvas();
    drawBackground();
    drawLeftHandle();
    drawRightHandle();
    drawcables();
    drawcableligature();

    requestAnimationFrame(main);
}

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0,canvas.height / 2,canvas.width,canvas.height / 2);

    gradient.addColorStop(0,'#333');
    gradient.addColorStop(0.5,'#666');
    gradient.addColorStop(1,'#333');

    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeRect(lineWidth/2,lineWidth/2,canvas.width - lineWidth,canvas.height - lineWidth);
}

function drawLeftHandle() {
    ctx.fillStyle = '#555';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    ctx.fillRect(lineWidth/2,lineWidth/2,40,canvas.height - lineWidth);
    ctx.strokeRect(lineWidth/2,lineWidth/2,40,canvas.height - lineWidth)
}

function drawRightHandle() {
    ctx.fillStyle = '#555';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lineWidth;

    ctx.fillRect(canvas.width - 40 - (lineWidth/2),lineWidth/2,40,canvas.height);
    ctx.strokeRect(canvas.width - 40 - (lineWidth/2),lineWidth/2,40,canvas.height - lineWidth);
}

function sortcables() {
    let localcables = cable.slice();
    return cable.map(cab => {
        const selectedcable = localcables[Math.floor(Math.random()*localcables.length)];
        localcables = localcables.filter(lcable => lcable !== selectedcable);
        return {
            color: selectedcable
        }
    })
}

function rightcablescoordinates() {
    rightcables.forEach((cab,index) => {
        cab.x = canvas.width +10 - cablewidth;
        cab.y = distance * (index + 1);
        cab.w = cablewidth - (12);
        cab.h = cablesize - (2);
    });
}

function leftcablescoordinates() {
    leftcables.forEach((cab,index) => {
        cab.x = 2;
        cab.y = distance * (index + 1);
        cab.w = cablewidth - (10);
        cab.h = cablesize - (2);
    });
}

function drawcables() {
    leftcables.forEach(cab => {
        ctx.fillStyle = cab.color;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = lineWidth;
        ctx.fillRect(cab.x,cab.y,cab.w,cab.h);
        ctx.strokeRect(cab.x,cab.y,cab.w,cab.h);
    });
    rightcables.forEach(cab => {
        ctx.fillStyle = cab.color;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = lineWidth;
        ctx.fillRect(cab.x,cab.y,cab.w,cab.h);
        ctx.strokeRect(cab.x,cab.y,cab.w,cab.h);
    });
}

function checkcolorselected() {
    leftcables.forEach(cab => {
        if (
            cab.x < mousePos.x &&
            cab.x + cab.w > mousePos.x &&
            cab.y < mousePos.y &&
            cab.y + cab.h > mousePos.y
        ) {
            taskstate.selectedcable = cab;
        }
    });
}



main()
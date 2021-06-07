let color = '#FFF'
let strokeWidth = 4
let socket;

socket = io.connect('https://damp-spire-04585.herokuapp.com');

function setup(){
    const cv =createCanvas(800,600)
    // cv.position(600, 100)
    cv.background(0)
    cv.parent('canvas-container')
    const color_picker = select('#pickcolor')
    const color_btn = select('#color-btn')
    const color_holder = select('#color-holder')
    const stroke_width_picker = select('#stroke-width-picker')
    const stroke_btn = select('#stroke-btn')

    color_btn.mousePressed(() => {
        // Checking if the input is a valid hex color
        if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color_picker.value())) {
            color = color_picker.value()
            color_holder.style('background-color', color)
        }
        else {console.log('Enter a valid hex value')}
    })
    
    // Adding a mousePressed listener to the button
    stroke_btn.mousePressed(() => {
        const width = parseInt(stroke_width_picker.value())
        if (width > 0) strokeWidth = width
    })

    socket.on('transmit-mouse', data => {
        stroke(data.color)
        strokeWeight(data.strokeWidth)
        line(data.x, data.y, data.px, data.py)
    })
}
function mouseDragged() {
    stroke(color)
    strokeWeight(strokeWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)
    sendmouse(mouseX, mouseY,pmouseX, pmouseY )
}
// Sending data to the socket
function sendmouse(x, y, pX, pY) {
    const data = {
     x: x,
     y: y,
     px: pX,
     py: pY,
     color: color,
     strokeWidth: strokeWidth,
    }
    socket.emit('mouse', data)
}






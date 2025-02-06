const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);

    drawMarkers();
    drawTime();

    ctx.translate(-radius, -radius);
}

function drawMarkers() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
        let angle = (i * Math.PI) / 6;
        let x1 = Math.cos(angle) * (radius - 10);
        let y1 = Math.sin(angle) * (radius - 10);
        let x2 = Math.cos(angle) * (radius - 30);
        let y2 = Math.sin(angle) * (radius - 30);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawTime() {
    const now = new Date();
    let hour = now.getHours() % 12;
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let hourAngle = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
    let minuteAngle = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
    let secondAngle = (second * Math.PI) / 30;

    drawHand(hourAngle, radius * 0.5, 5, "white");
    drawHand(minuteAngle, radius * 0.75, 3, "white");
    drawHand(secondAngle, radius * 0.9, 2, "red");
}

function drawHand(angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle - Math.PI / 2) * length, Math.sin(angle - Math.PI / 2) * length);
    ctx.stroke();
}

function updateClock() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    drawClock();
    requestAnimationFrame(updateClock);
}

updateClock();
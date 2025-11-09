const body = document.body;

let lastTouch

body.addEventListener('touchstart', (e) => {
    lastTouch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
});

body.addEventListener('touchmove', (e) => {
    let currentTouch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    lastTouch = currentTouch;
    scan(currentTouch.x, currentTouch.y);
});

const scan = (touchEndX, touchEndY) => {
    const scanner = document.createElement('div');
    scanner.classList.add('scanner');
    scanner.style.left = `${touchEndX}px`;
    scanner.style.top = `${touchEndY - 2000/2}px`;
    body.appendChild(scanner);
    setTimeout(() => {
        body.removeChild(scanner);
    }, 300);
}
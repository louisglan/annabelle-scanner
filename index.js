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
    scan(currentTouch, lastTouch);
});

const scan = (currentTouch, lastTouch) => {
    for (let i = 0; i < 10; i++) {
        const interpolatedTouch = {
            x: lastTouch.x + (currentTouch.x - lastTouch.x) * (i / 10),
            y: lastTouch.y + (currentTouch.y - lastTouch.y) * (i / 10)
        };
        createScanner(interpolatedTouch);
    }
}

const createScanner = (touch) => {
    const scanner = document.createElement('div');
    scanner.classList.add('scanner');
    scanner.style.left = `${touch.x}px`;
    scanner.style.top = `${touch.y - 2000/2}px`;
    body.appendChild(scanner);
    setTimeout(() => {
        body.removeChild(scanner);
    }, 300);
}
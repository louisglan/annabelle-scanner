const body = document.body;
const logo = document.getElementById('google-logo');

const drawCanvas = () => {
    const canvas = document.getElementById("animation-canvas")
    const context = canvas.getContext("2d");
    const frameCount = 34;
    const currentFrame = index => (`./assets/frame_${index.toString().padStart(2, '0')}_delay-0.07s.png`);

    const images = [];
    let loaded = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loaded++;
        };
        images.push(img);
    }

    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true,
        }
    });

    canvas.width = 1920;
    canvas.height = 1080;

    function renderFrame(index) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[index], 0, 0);
    }

    tl.fromTo("#google-logo",
        { scale: 0, x: 0, opacity: 0 },
        { scale: 1, x: 300, opacity: 1, duration: 1 }
    ).to("#google-logo", {
        x: 800,
        opacity: 0,
        duration: 1
    })
}
drawCanvas();

body.addEventListener('touchstart', (e) => {
    let touch = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    scan(touch);
});

const scan = (touch) => {
    const scanner = document.createElement('div');
    scanner.classList.add('scanner');
    scanner.style.left = `${-1000}px`;
    scanner.style.top = `${0}px`;
    body.appendChild(scanner);
    setTimeout(() => {
        body.removeChild(scanner);
    }, 300);
}
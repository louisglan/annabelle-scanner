const totalFrames = 35;
const framePath = (i) =>
  `assets/frame_${String(i).padStart(2, "0")}_delay-0.07s.png`;

const googleLogo = document.getElementById("googleLogo");
const gifFrame = document.getElementById("gifFrame");
const tbc = document.getElementById("tbc");

function animate() {
  const scrollMax = document.body.scrollHeight - innerHeight;
  const progress = window.scrollY / scrollMax; // 0 → 1

  if (progress < 0.15) {
    const p = progress / 0.15;
    googleLogo.style.opacity = p;
    googleLogo.style.transform = `scale(${p}) translateX(0px)`;
  } else if (progress < 0.3) {
    googleLogo.style.opacity = 1;
    const p = (progress - 0.15) / 0.15;
    googleLogo.style.transform = `scale(1) translateX(${p * 400}px)`;
  } else {
    googleLogo.style.opacity = 0; // hide afterwards
  }

  if (progress < 0.3) {
    gifFrame.style.opacity = 0;
  } else if (progress < 0.35) {
    const p = (progress - 0.3) / 0.05;
    gifFrame.style.opacity = p;
    gifFrame.style.transform = `translateY(${-200 + 200 * p}px)`;
  } else if (progress < 0.6) {
    const p = (progress - 0.35) / 0.25;
    const frameIndex = Math.min(totalFrames - 1, Math.floor(p * totalFrames));
    gifFrame.src = framePath(frameIndex);
    gifFrame.style.opacity = 1;
    gifFrame.style.transform = `translateY(0px)`;
  } else {
    gifFrame.style.opacity = 0; // fade out for step 3
  }

  if (progress >= 0.6) {
    const p = (progress - 0.6) / 0.4;
    tbc.style.opacity = p;
    tbc.style.transform = `translateX(-50%) scale(${0.5 + p * 0.8})`;
  } else {
    tbc.style.opacity = 0;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

body.addEventListener("touchstart", (e) => {
  let touch = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };
  scan(touch);
});

const scan = (touch) => {
  const scanner = document.createElement("div");
  scanner.classList.add("scanner");
  scanner.style.left = `${0}px`;
  scanner.style.top = `${0}px`;
  body.appendChild(scanner);
  setTimeout(() => {
    body.removeChild(scanner);
  }, 300);
};

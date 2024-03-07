const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  // Toggle 'sticky' class based on scroll position.
  header.classList.toggle("sticky", window.scrollY > 1);

  // Add or remove 'scrolled' class based on scroll position.
  if (window.scrollY > 1) {
    // You can adjust the value to fit your needs
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("open");
};
window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("open");
};

let x1 = 0,
  y1 = 0;
window.client;
const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  ),
  dist_to_draw = 50,
  delay = 1000,
  fsize = ["1.1rem", "1.4rem", ".8rem", "1.7rem"],
  colors = ["#E23636", "#F9F3EE", "#E1F8DC", "#B8AFE6", "#AEE1CD", "#5EB0E5"],
  rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  selRand = (o) => o[rand(0, o.length - 1)],
  distanceTo = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
  shouldDraw = (x, y) => distanceTo(x1, y1, x, y) >= dist_to_draw,
  addStr = (x, y) => {
    const str = document.createElement("div");
    str.innerHTML = "&#10022;";
    str.className = "star";
    str.style.top = `${y + rand(-20, 20)}px`;
    str.style.left = `${x}px`;
    str.style.color = selRand(colors);
    str.style.fontSize = selRand(fsize);
    document.body.appendChild(str);
    //console.log(rand(0, 3));
    const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);
    //console.log(vh, y, fs);
    //console.log((y+fs)>vh?vh-y:fs);
    str.animate(
      {
        translate: `0 ${y + fs > vh ? vh - y : fs}px`,
        opacity: 0,
        transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`,
      },
      {
        duration: delay,
        fill: "forwards",
      }
    );
    //could add a animation terminate listener, but why add the additional load
    setTimeout(() => {
      str.remove();
    }, delay);
  };

addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  if (shouldDraw(clientX, clientY)) {
    addStr(clientX, clientY);
    x1 = clientX;
    y1 = clientY;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("glowing-header");
  let lastX, lastY;
  let timer, interval;

  function createSparkle(x, y, isBombEffect = false) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    header.appendChild(sparkle);

    const size = Math.random() * 18 + 5; // Random size between 7 and 22
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    if (isBombEffect) {
      const angle = Math.random() * 360;
      const distance = Math.random() * 100 + 25; // Random distance between 25 and 125
      const translateX = distance * Math.cos((angle * Math.PI) / 180);
      const translateY = distance * Math.sin((angle * Math.PI) / 180);
      sparkle.style.setProperty("--translateX", `${translateX}px`);
      sparkle.style.setProperty("--translateY", `${translateY}px`);
      sparkle.style.animation = "moveBombStar 1s forwards";
    } else {
      sparkle.style.animation = "fadeAndRotate 1s forwards";
    }

    setTimeout(() => sparkle.remove(), 1000); // Remove sparkle after 1 second
  }

  function triggerBombEffect() {
    for (let i = 0; i < 10; i++) {
      createSparkle(lastX, lastY, true); // true indicates bomb effect
    }
  }

  header.addEventListener("mousemove", function (e) {
    lastX = e.pageX - header.offsetLeft;
    lastY = e.pageY - header.offsetTop;

    clearTimeout(timer);
    clearInterval(interval); // Clear the interval when the mouse moves

    createSparkle(lastX, lastY);

    timer = setTimeout(() => {
      interval = setInterval(triggerBombEffect, 500); // Repeat the bomb effect every 500ms
    }, 10000);
  });
  header.addEventListener("click", function (e) {
    const clickX = e.pageX - header.offsetLeft;
    const clickY = e.pageY - header.offsetTop;
    triggerBombEffect(clickX, clickY); // Trigger bomb effect on click
  });
});

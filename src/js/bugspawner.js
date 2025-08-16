let idleBugs = [];

function spawnBug(isIdle = true) {
  if (isIdle && gameActive) return;

  let bug = document.createElement("img");
  bug.src = "/bugs/bug1.svg";
  bug.classList.add("bug");
  bug.style.zIndex = 0;

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  bug.style.left = x + "px";
  bug.style.top = y + "px";

  document.getElementById("bug-container").appendChild(bug);

  let speed = 1 + Math.random() * 1.5;
  let angle = Math.random() * Math.PI * 2;
  let wiggleTime = 0;

  function updateRotation() {
    let wiggle = Math.sin(wiggleTime) * 0.2;
    bug.style.transform = `rotate(${angle + Math.PI / 2 + wiggle}rad)`;
  }

  if (!isIdle) {
    bug.addEventListener("click", function () {
      if (!gameActive) return;
      bug.remove();
      score++;
      updateScore();
    });
  }

  function moveBug() {
    wiggleTime += 0.2;
    if (Math.random() < 0.01) angle += ((Math.random() - 0.5) * Math.PI) / 2;

    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    bug.style.left = x + "px";
    bug.style.top = y + "px";
    updateRotation();

    if (
      x < -50 ||
      y < -50 ||
      x > window.innerWidth + 50 ||
      y > window.innerHeight + 50
    ) {
      bug.remove();
      return;
    }
    requestAnimationFrame(moveBug);
  }

  moveBug();

  if (isIdle) {
    idleBugs.push(bug);
    if (idleBugs.length > 5) {
      idleBugs.shift().remove();
    }
  }
}

function clearBugs() {
  document.querySelectorAll(".bug").forEach((bug) => bug.remove());
  idleBugs = [];
}

for (let i = 0; i < 5; i++) spawnBug(true);

setInterval(() => {
  if (!gameActive) spawnBug(true);
}, 2000);

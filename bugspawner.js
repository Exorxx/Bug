let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').textContent = highScore;

let timedMode = false;
let timeLeft = 60;
let timerInterval = null;
let spawnInterval = null; // dynamic spawn
let baseSpawnTime = 500; // starting spawn time in ms

function updateScore() {
  document.getElementById('score').textContent = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('high-score').textContent = highScore;
  }
}

function spawnBug() {
  const bug = document.createElement('img');
  bug.src = '/bugs/bug1.svg';
  bug.classList.add('bug');

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  bug.style.left = x + 'px';
  bug.style.top = y + 'px';

  document.getElementById('bug-container').appendChild(bug);

  let speed = 1 + Math.random() * 1.5; 
  let angle = Math.random() * Math.PI * 2;
  let wiggleTime = 0;

  function updateRotation() {
    const wiggle = Math.sin(wiggleTime) * 0.2; 
    bug.style.transform = `rotate(${angle + Math.PI / 2 + wiggle}rad)`;
  }

  bug.addEventListener('click', () => {
    bug.remove();
    score++;
    updateScore();
  });

  function moveBug() {
    wiggleTime += 0.2;

    if (Math.random() < 0.01) {
      angle += (Math.random() - 0.5) * Math.PI / 2;
    }

    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    bug.style.left = x + 'px';
    bug.style.top = y + 'px';
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
}

function clearBugs() {
  document.querySelectorAll('.bug').forEach(bug => bug.remove());
}

function startNormalMode() {
  timedMode = false;
  score = 0;
  updateScore();
  document.getElementById('timer').style.display = 'none';
  clearInterval(timerInterval);
  clearInterval(spawnInterval);
}

function startTimedMode() {
  timedMode = true;
  score = 0;
  updateScore();
  timeLeft = 60;
  document.getElementById('time-left').textContent = timeLeft;
  document.getElementById('timer').style.display = 'block';

  // Reset bugs
  clearBugs();
  for (let i = 0; i < 5; i++) {
    spawnBug();
  }

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;

    // progressively increase difficulty
    let difficultyFactor = Math.max(100, baseSpawnTime - (60 - timeLeft) * 6);
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnBug, difficultyFactor);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      alert(`Time's up! You squashed ${score} bugs!`);
      startNormalMode();
    }
  }, 1000);
}

// Start normal mode bug spawning
spawnInterval = setInterval(spawnBug, baseSpawnTime);

// Initial 5 bugs
for (let i = 0; i < 5; i++) {
  spawnBug();
}

document.getElementById('start-timed').addEventListener('click', startTimedMode);

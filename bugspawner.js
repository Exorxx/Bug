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
    // Correct for SVG facing direction
    const wiggle = Math.sin(wiggleTime) * 0.2; // ±0.2 rad (~11°) wiggle
    bug.style.transform = `rotate(${angle + Math.PI / 2 + wiggle}rad)`;
  }

  // Click to smash
  bug.addEventListener('click', () => {
    bug.remove();
    console.log('Bug smashed!');
  });

  function moveBug() {
    // Slight wiggle motion
    wiggleTime += 0.2;

    // Occasionally change direction (about 1% chance each frame)
    if (Math.random() < 0.01) {
      angle += (Math.random() - 0.5) * Math.PI / 2; // turn up to ±90°
    }

    // Move forward
    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    bug.style.left = x + 'px';
    bug.style.top = y + 'px';
    updateRotation();

    // Remove if off-screen
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

// Spawn a new bug every 1 seconds
setInterval(spawnBug, 1000);

// Start with 5 bugs
for (let i = 0; i < 5; i++) {
  spawnBug();
}

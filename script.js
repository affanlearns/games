const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 400, w: 30, h: 30, color: "green" };
let bullets = [];
let enemies = [{ x: 600, y: 400, w: 30, h: 30, color: "red", alive: true }];
let file = { x: 750, y: 100, w: 20, h: 20, color: "yellow", collected: false };

let keys = { left: false, right: false, up: false };

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawEnemies() {
  enemies.forEach(e => {
    if (e.alive) {
      ctx.fillStyle = e.color;
      ctx.fillRect(e.x, e.y, e.w, e.h);
    }
  });
}

function drawBullets() {
  bullets.forEach(b => {
    ctx.fillStyle = "white";
    ctx.fillRect(b.x, b.y, 10, 4);
  });
}

function drawFile() {
  if (!file.collected) {
    ctx.fillStyle = file.color;
    ctx.fillRect(file.x, file.y, file.w, file.h);
  }
}

function update() {
  if (keys.left) player.x -= 3;
  if (keys.right) player.x += 3;
  if (keys.up) player.y -= 3;

  bullets.forEach((b, i) => {
    b.x += 5;
    enemies.forEach(e => {
      if (
        e.alive &&
        b.x < e.x + e.w &&
        b.x + 10 > e.x &&
        b.y < e.y + e.h &&
        b.y + 4 > e.y
      ) {
        e.alive = false;
        bullets.splice(i, 1);
      }
    });
  });

  // Collect file
  if (
    !file.collected &&
    player.x < file.x + file.w &&
    player.x + player.w > file.x &&
    player.y < file.y + file.h &&
    player.y + player.h > file.y
  ) {
    file.collected = true;
    alert("🎯 Mission Complete! File Collected.");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemies();
  drawBullets();
  drawFile();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.getElementById("left").addEventListener("touchstart", () => keys.left = true);
document.getElementById("left").addEventListener("touchend", () => keys.left = false);
document.getElementById("right").addEventListener("touchstart", () => keys.right = true);
document.getElementById("right").addEventListener("touchend", () => keys.right = false);
document.getElementById("up").addEventListener("touchstart", () => keys.up = true);
document.getElementById("up").addEventListener("touchend", () => keys.up = false);

document.getElementById("shoot").addEventListener("click", () => {
  bullets.push({ x: player.x + player.w, y: player.y + player.h / 2 });
});

gameLoop();

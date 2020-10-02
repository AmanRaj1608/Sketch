// Select all class and id from the page
const canvas = document.querySelector('#sketch');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.shake');
const MAX = 30;

// Using JS object destructing to create and assign values
const { width, height } = canvas;

// Random Dot on canvas from where it will start
let x = Math.ceil(Math.random() * (width/MAX-1))*MAX + MAX/2;
let y = Math.ceil(Math.random() * (height/MAX-1))*MAX + MAX/2;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MAX;

// Adding a color to it using Mother-effing hsl https://mothereffinghsl.com/
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Draw function
function draw({ key }) {
  hue += 1;
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
  // console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);

  // Where the Arrow goes
  if (key === 'ArrowUp' && y>MAX/2) {
    y -= MAX;
  } else if (key === 'ArrowDown' && y<((height/MAX-1)*MAX + MAX/2)) {
    y += MAX;
  } else if (key === 'ArrowRight' && x<((width/MAX-1)*MAX + MAX/2)) {
    x += MAX;
  } else if (key === 'ArrowLeft' && x>MAX/2) {
    x -= MAX;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// Listen to Arroy keys
window.addEventListener('keydown', function(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
});

btn.addEventListener('click', function() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      console.log('Done the shake!');
      canvas.classList.remove('shake');
    },
    { once: true }
  );

  // New Random Position for Pointer after "clear it!"
  x = Math.ceil(Math.random() * (width/MAX-1))*MAX + MAX/2;
  y = Math.ceil(Math.random() * (height/MAX-1))*MAX + MAX/2;

  // New Random Color for Pointer
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
});

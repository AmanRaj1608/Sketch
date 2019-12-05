// Select all class and id from the page
const canvas = document.querySelector('#sketch');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('.shake');

// Using JS object destructing to create and assign values
const { width, height } = canvas;

// Random Dot on canvas from where it will start
const x = Math.ceil(Math.random() * width);
const y = Math.ceil(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;

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
  console.log(hue);
  ctx.strokeStyle = `hsl(${Math.random * 360}, 100%, 50%)`;
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
    'animationed',
    function() {
      console.log('Shake and Clear Done');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
});

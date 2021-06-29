var $countDown = document.querySelector('h1');
var timer = 4;
function countDown() {
  if (timer <= 4 && timer >= 1) {
    $countDown.textContent = timer--;
  } else {
    $countDown.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(countDown);
  }
};
setInterval(countDown, 1000);

var count = 3;
var timer = setInterval(function () {

  if (count <= 3 && count > 0) {
    console.log(count);
    count--;
  } else {
    console.log('Blast Off');
    clearInterval(timer);
  }

}, 1000);

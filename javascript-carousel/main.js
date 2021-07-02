var $arrow_left = document.querySelector('.fa-chevron-left');
var $arrow_right = document.querySelector('.fa-chevron-right');
var $circles = document.querySelector('.circles');
var $img = document.querySelector('img');
var $li = document.querySelectorAll('.circle');

var images = [
  {
    item: "0",
    src: "images/001.png"
  },

  {
    item: "1",
    src: "images/004.png"
  },

  {
    item: "2",
    src: "images/007.png"
  },

  {
    item: "3",
    src: "images/025.png"
  },

  {
    item: "4",
    src: "images/039.png"
  }

];

$circles.addEventListener('click', function (e) {

    if (e.target.matches('.circle')) {
      for (var i = 0; i < $circles.children.length; i++) {
        if ($li[i] === e.target) {
          $img.setAttribute('src', images[i].src);
          $li[i].className = 'circle fas fa-circle';
        } else {
          $li[i].className = 'circle far fa-circle';
        }
      }
    }
    clearInterval(timer);
  })

var num = 0;
$arrow_right.addEventListener('click', function () {
  if (num === images.length - 1) {
    num = -1;
  }
  num++;
  $img.setAttribute('src', images[num].src);

  for (var i = 0; i < $li.length; i++) {
    if (images[num].item === $li[i].getAttribute('index')) {
      $li[i].className = 'circle fas fa-circle';
    } else {
      $li[i].className = 'circle far fa-circle';
    }

  }
})

$arrow_left.addEventListener('click', function () {
  if (num === 0) {
    num = images.length;
  }
  num--;
  $img.setAttribute('src', images[num].src);

  for (var i = $li.length - 1; i >= 0; i--) {
    if (images[num].item === $li[i].getAttribute('index')) {
      $li[i].className = 'circle fas fa-circle';
    } else {
      $li[i].className = 'circle far fa-circle';
    }
  }
})

var timer = setInterval(function () {
  $arrow_right.click();
}, 3000);

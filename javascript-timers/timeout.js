var $greeting = document.querySelector('h1');
function greeting() {
  $greeting.textContent = "Hello There";
}
setTimeout(greeting, 2000);

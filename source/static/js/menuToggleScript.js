var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.menu');


function handleMenuButtonClick() {
    menuButton.classList.toggle('open');
    menu.classList.toggle('open');
}

menuButton.addEventListener('click', handleMenuButtonClick);
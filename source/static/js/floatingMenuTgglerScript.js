  function handleMenuToggle() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menuContent = document.querySelector('.menu-content');
    menuToggle.classList.toggle('open');
    menuContent.classList.toggle('open');
  }
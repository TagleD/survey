const toggleSwitch = document.getElementById('toggle');
  const label = document.getElementById('label');

  toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
      label.textContent = 'Тест';
    } else {
      label.textContent = 'Опрос';
    }
  });
function displayErrorMessage() {
    const errorMessage = document.getElementById('empty-gaps-errorMessage');
    errorMessage.classList.add('active');

    setTimeout(function () {
        errorMessage.classList.remove('active');
    }, 2000);
}

function showFloatingErrorMessage() {
  const errorMessageContainer = document.getElementById('too-few-forms-errorMessage');
  errorMessageContainer.classList.add('active');

  setTimeout(function () {
    errorMessageContainer.classList.remove('active');
  }, 2000);
}

export { displayErrorMessage, showFloatingErrorMessage };
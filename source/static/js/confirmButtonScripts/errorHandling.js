function displayErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('active');

    setTimeout(function () {
        errorMessage.classList.remove('active');
    }, 2000);
}

export { displayErrorMessage };
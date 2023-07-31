function displayErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('active');

    setTimeout(function () {
        errorMessage.classList.remove('active');
    }, 2000);
}

function checkFormFields() {
    const textareaElements = document.querySelectorAll('#formContainer textarea:not(#surveyDescription)');
    const inputElements = document.querySelectorAll('#formContainer input[type="text"]');
    const confirmSaveButton = document.getElementById('confirmSaveButton');

    const areTextareaFieldsFilled = Array.from(textareaElements).every(element => element.value.trim() !== '');
    const areInputFieldsFilled = Array.from(inputElements).every(element => element.value.trim() !== '');

    if (areTextareaFieldsFilled && areInputFieldsFilled) {
        confirmSaveButton.classList.add('confirm-save-button-active');
        confirmSaveButton.classList.remove('confirm-save-button-disabled');
    } else {
        confirmSaveButton.classList.add('confirm-save-button-disabled');
        confirmSaveButton.classList.remove('confirm-save-button-active');
    }
}

function handleButtonClick(event) {
    const confirmSaveButton = document.getElementById('confirmSaveButton');
    if (confirmSaveButton.classList.contains('confirm-save-button-disabled')) {
        event.preventDefault();
        displayErrorMessage();
    }
}

const textareaElements = document.querySelectorAll('#formContainer textarea:not(#surveyDescription)');
const inputElements = document.querySelectorAll('#formContainer input[type="text"]');

textareaElements.forEach(textarea => textarea.addEventListener('input', checkFormFields));
inputElements.forEach(input => input.addEventListener('input', checkFormFields));

const confirmSaveButton = document.getElementById('confirmSaveButton');
confirmSaveButton.addEventListener('click', handleButtonClick);
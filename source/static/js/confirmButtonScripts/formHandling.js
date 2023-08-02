function checkFormFields() {
    const textareaElements = document.querySelectorAll('#formContainer textarea:not(#survey-description)');
    const inputElements = document.querySelectorAll('#formContainer input[type="text"]');
    const checkboxes = document.querySelectorAll('#formContainer input[type="checkbox"]:not(#toggle)');
    const confirmSaveButton = document.getElementById('confirmSaveButton');

    const areTextareaFieldsFilled = Array.from(textareaElements).every(element => element.value.trim() !== '');
    const areInputFieldsFilled = Array.from(inputElements).every(element => element.value.trim() !== '');
    const checkboxIsChecked = Array.from(checkboxes).every(element => element.checked);

    if (areTextareaFieldsFilled && areInputFieldsFilled && checkboxIsChecked) {
        confirmSaveButton.classList.add('confirm-save-button-active');
        confirmSaveButton.classList.remove('confirm-save-button-disabled');
    } else {
        confirmSaveButton.classList.add('confirm-save-button-disabled');
        confirmSaveButton.classList.remove('confirm-save-button-active');
    }
}

function getFormData() {
    const surveyType = document.getElementById('toggle').checked ? 'QUIZ' : 'SURVEY';
    const name = document.getElementById('survey-name').value;
    const description = document.getElementById('survey-description').value;
    const dateOfCreation = new Date().toISOString();

    const questionList = [];

    const forms = document.querySelectorAll('#formContainer form');
    forms.forEach(form => {
        const questionType = form.querySelector('input[type="checkbox"]') ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE';
        const question = form.querySelector('.question-form-control').value;

        const answerOptions = form.querySelectorAll('.answer-options-container textarea');
        const answerList = Array.from(answerOptions).map(option => option.value);

        const rightAnswersList = Array.from(answerOptions)
            .filter(option => option.previousElementSibling.checked)
            .map(option => option.value);

        const questionData = {
            questionType,
            question,
            answerList,
            rightAnswersList,
        };

        questionList.push(questionData);
    });

    return {
        surveyType,
        name,
        description,
        dateOfCreation,
        questionList,
    };
}

function handleButtonClick(event) {
    const confirmSaveButton = document.getElementById('confirmSaveButton');
    if (confirmSaveButton.classList.contains('confirm-save-button-disabled')) {
        event.preventDefault();
        displayErrorMessage();
    } else if (confirmSaveButton.classList.contains('confirm-save-button-active')) {
        const confirmSaveButton = document.getElementById('confirmSaveButton');
        confirmSaveButton.addEventListener('click', function () {
            const jsonData = getFormData();
            console.log(jsonData);

            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then(response => response.json())
                .then(data => {
                    // Обработка ответа от сервера (если необходимо)
                    console.log('Форма успешно отправлена на сервер!');
                })
                .catch(error => {
                    // Обработка ошибки (если необходимо)
                    console.error('Ошибка при отправке формы на сервер:', error);
                });
        });
    }
}

function setupFormHandlers() {
  const textareaElements = document.querySelectorAll('#formContainer textarea:not(#surveyDescription)');
  const inputElements = document.querySelectorAll('#formContainer input[type="text"]');
  const checkboxes = document.querySelectorAll('#formContainer input[type="checkbox"]');

  textareaElements.forEach(textarea => textarea.addEventListener('input', checkFormFields));
  inputElements.forEach(input => input.addEventListener('input', checkFormFields));
  checkboxes.forEach(input => input.addEventListener('checkbox', checkFormFields));

  const confirmSaveButton = document.getElementById('confirmSaveButton');
  confirmSaveButton.addEventListener('click', handleButtonClick);
}

export { getFormData, setupFormHandlers };
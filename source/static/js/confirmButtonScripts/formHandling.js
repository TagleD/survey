import {displayErrorMessage, showFloatingErrorMessage} from "./errorHandling.js";

function getQuestionType(questionContent) {
    switch (questionContent) {
        case "Вопрос со множественным выбором":
            return "MULTIPLE_CHOICE";
        case "Вопрос с единственным выбором":
            return "SINGLE_CHOICE";
        case "Свободный ответ":
            return "TEXT_FIELD";
        case "Раздел":
            return "SECTION";
        default:
            return null;
    }
}

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

function getFormData(forms) {
    const surveyType = document.getElementById('toggle').checked ? 'QUIZ' : 'SURVEY';
    const name = document.getElementById('survey-name').value;
    const description = document.getElementById('survey-description').value;
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0').toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0').toString();
    const year = currentDate.getFullYear().toString().toString();

    const hours = currentDate.getHours().toString().padStart(2, '0').toString();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0').toString();

    let questionList = [];

    const dateOfCreation = day + "." + month + "." + year + " " + hours + ":" + minutes;

    let questionIDCounter = 1;

    forms.forEach(form => {
        const ID = questionIDCounter;

        const questionContent = form.querySelector('.question-type').textContent;
        const questionType = getQuestionType(questionContent);
        const question = form.querySelector('.question-form-control').value;

        const sectionDescriptionContainer = form.querySelector('.section-description-container');
        let description = '';

        if (sectionDescriptionContainer) {
            const descriptionTextarea = sectionDescriptionContainer.querySelector('textarea');
            if (descriptionTextarea) {
                description = descriptionTextarea.value;
            }
        }

        const answerOptionsContainer = form.querySelector('.answer-options-container');
        let answerFields = [];
        if (answerOptionsContainer) {
            answerFields = answerOptionsContainer.querySelectorAll('textarea');
        }

        const answerList = Array.from(answerFields).map(option => option.value);

        const rightAnswersList = Array.from(answerFields)
            .filter(option => option.previousElementSibling && option.previousElementSibling.checked)
            .map(option => option.value);

        const questionData = {
            ID,
            questionType,
            question,
            description,
            answerList,
            rightAnswersList,
        };

        questionIDCounter++;

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
    const forms = document.querySelectorAll('#formContainer form');
    const confirmSaveButton = document.getElementById('confirmSaveButton');

    if (forms.length === 0) {
        event.preventDefault();
        showFloatingErrorMessage();
        return;
    }

    if (confirmSaveButton.classList.contains('confirm-save-button-disabled')) {
        event.preventDefault();
        displayErrorMessage();
    } else if (confirmSaveButton.classList.contains('confirm-save-button-active')) {
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
    checkboxes.forEach(input => input.addEventListener('change', checkFormFields));

    const confirmSaveButton = document.getElementById('confirmSaveButton');
    confirmSaveButton.addEventListener('click', handleButtonClick);
}

export { getFormData, setupFormHandlers };
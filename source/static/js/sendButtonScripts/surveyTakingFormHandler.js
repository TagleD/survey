// import {displayErrorMessage, showFloatingErrorMessage} from "../confirmButtonScripts/errorHandling";
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

function getTakenQuestionType(input, textarea) {

    if (input && input.type === 'radio') {
        return 'SINGLE_CHOICE';
    } else if (input && input.type === 'checkbox') {
        return 'MULTIPLE_CHOICE';
    } else if (textarea) {
        return 'TEXT_FIELD';
    } else {
        return 'SECTION';
    }

}

function getTakenFormData() {
    const surveyType = document.getElementsById('survey-type');
    const name = document.getElementById('survey-name').value;
    const description = document.getElementById('survey-description').value;
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0').toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0').toString();
    const year = currentDate.getFullYear().toString().toString();

    const hours = currentDate.getHours().toString().padStart(2, '0').toString();
    const minutes = currentDate.getMinutes().toString().padStart(2, '0').toString();

    let questionList = [];

    const forms = document.querySelectorAll('.modal-content form');

    const dateOfCreation = day + "." + month + "." + year + " " + hours + ":" + minutes;

    let questionIDCounter = 1;

    forms.forEach(form => {
        const ID = questionIDCounter;

        const input = form.querySelector('input[type="radio"], input[type="checkbox"]');
        const textarea = form.querySelector('textarea');

        const questionType = getTakenQuestionType(input, textarea);
        const question = form.querySelector('.question-form-control').textContent;

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
            answerFields = answerOptionsContainer.querySelectorAll('.form-control, .textarea-form-control');
        }

        const answerList = Array.from(answerFields).map(option => option.value);

        const rightAnswersList = Array.from(answerFields)
            .filter(option => (option.previousElementSibling && option.previousElementSibling.checked)
                || option.tagName == 'textarea')
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
    const confirmSaveButton = document.getElementById('answer-submit-button');

    if (forms.length === 0) {
        event.preventDefault();
        showFloatingErrorMessage();
        return;
    }

    if (confirmSaveButton.classList.contains('send-button-disabled')) {
        event.preventDefault();
        displayErrorMessage();
    } else if (confirmSaveButton.classList.contains('send-button-active')) {
        confirmSaveButton.addEventListener('click', function () {
            const jsonData = getFormData();
            console.log('тест');
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

export {getTakenFormData, setupFormHandlers};
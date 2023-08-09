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
    const id = document.getElementById('survey-id').innerText;
    const surveyType = document.getElementById("survey-name").getAttribute('survey-type');
    const name = document.getElementById("survey-name").textContent;
    const description = ""; //document.getElementById('survey-description').value;
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

        const answerList = Array.from(answerFields).map(option => {
            if (option.tagName === 'P') {
                return option.textContent; // Если это <p>, берем текст содержимого
            } else if (option.tagName === 'TEXTAREA') {
                return option.value; // Если это <textarea>, берем значение
            } else if (option.tagName === 'INPUT' && (option.type === 'radio' || option.type === 'checkbox')) {
                return option.nextElementSibling.textContent; // Если это radio/checkbox, берем текст следующего элемента (например, <p>)
            }
        });

        const rightAnswersList = Array.from(answerFields)
            .filter(option => option.previousElementSibling && option.previousElementSibling.checked)
            .map(option => {
                if (option.tagName === 'P') {
                    return option.textContent; // Если это <p>, берем текст содержимого
                } else if (option.tagName === 'TEXTAREA') {
                    return option.value; // Если это <textarea>, берем значение
                } else if (option.tagName === 'INPUT' && (option.type === 'radio' || option.type === 'checkbox')) {
                    return option.nextElementSibling.textContent; // Если это radio/checkbox, берем текст следующего элемента (например, <p>)
                }
            });
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
        id,
        surveyType,
        name,
        description,
        dateOfCreation,
        questionList,
    };
}

// Находим кнопку по классу
const sendButton = document.querySelector('.send-button-active');

// Добавляем обработчик события при клике на кнопку
sendButton.addEventListener('click', function () {
    // Вызываем функцию, чтобы получить данные формы
    const formData = getTakenFormData();
    console.log(formData);
    // Отправляем данные на сервер в формате JSON
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/survey/answer_add`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Обработка успешной отправки
                console.log('Данные успешно отправлены на сервер.');
            } else {
                // Обработка ошибки отправки
                console.error('Произошла ошибка при отправке данных на сервер.');
            }
        }
    };
    xhr.send(JSON.stringify(formData));
});

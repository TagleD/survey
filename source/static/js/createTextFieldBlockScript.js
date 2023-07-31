function createSvgButton(svgData, ariaLabel, onClickHandler) {
    const button = document.createElement("button");
    button.innerHTML = svgData;
    button.setAttribute("aria-label", ariaLabel);
    button.classList.add("btn-svg");
    button.addEventListener("click", onClickHandler);

    return button;
}

function createTextFieldForm() {
    const formContainer = document.getElementById('formContainer');
    const formCount = formContainer.children.length + 1;

    const newForm = document.createElement('form');
    newForm.classList.add('survey-question', 'text-center', 'survey-element', 'pt-4', 'px-3', 'element-colors');

    const questionContainer = document.createElement('div');
    questionContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3', 'radio-item');

    const deleteFormButton = document.createElement('button');
    deleteFormButton.innerHTML = '✖';
    deleteFormButton.classList.add('btn-svg', 'me-3');
    deleteFormButton.type = 'button';
    deleteFormButton.setAttribute('aria-label', 'Закрыть');
    deleteFormButton.addEventListener('click', (event) => {
        event.preventDefault();
        formContainer.removeChild(newForm);
    });
    questionContainer.appendChild(deleteFormButton);
    questionContainer.appendChild(deleteFormButton);

    const questionField = document.createElement('textarea');
    questionField.classList.add('question-form-control');
    questionField.placeholder = 'Введите вопрос';
    questionField.rows = 3;
    questionContainer.appendChild(questionField);

    newForm.appendChild(questionContainer);

    const answerOptionsContainer = document.createElement('div');
    answerOptionsContainer.classList.add('answer-options-container');

    createRadioAnswerOption(answerOptionsContainer, true, formCount);

    newForm.appendChild(answerOptionsContainer);
    formContainer.appendChild(newForm);

    const addButton = createSvgButton(
        '<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000000"/></svg>',
        'Добавить',
        (event) => {
            event.preventDefault();
            createRadioAnswerOption(answerOptionsContainer, false, formCount);
        }
    );
    newForm.appendChild(addButton);
}

const createTextFieldFormBtn = document.getElementById('createTextFieldFormBtn');
createTextFieldFormBtn.addEventListener('click', createTextFieldForm);
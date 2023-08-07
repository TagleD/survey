function createSvgButton(svgData, ariaLabel, onClickHandler) {
    const button = document.createElement("button");
    button.innerHTML = svgData;
    button.setAttribute("aria-label", ariaLabel);
    button.classList.add("btn-svg");
    button.addEventListener("click", onClickHandler);

    return button;
}

function createRadioForm() {
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


    const questionType = document.createElement('div');
    questionType.textContent = 'Вопрос с единственным выбором';
    questionType.classList.add('question-type');
    questionContainer.appendChild(questionType);


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

    const addButton = createSvgButton('<svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000000"/></svg>', 'Добавить', (event) => {
        event.preventDefault();
        createRadioAnswerOption(answerOptionsContainer, false, formCount);
    });
    newForm.appendChild(addButton);
}

function createRadioAnswerOption(parentContainer, checked, formCount) {
    const answerGroup = parentContainer.querySelectorAll('textarea');
    const answerIndex = answerGroup.length + 1;

    const answerContainer = document.createElement('div');
    answerContainer.classList.add('d-flex', 'align-items-center', 'mb-2', 'answer-option-wrapper');

    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = `radioQuestion_${formCount}`;
    radioButton.checked = checked;
    answerContainer.appendChild(radioButton);

    const answerField = document.createElement('textarea');
    answerField.classList.add('form-control');
    answerField.for = `radioQuestion_${formCount}`;
    answerField.placeholder = `Введите вариант ответа`;
    answerField.rows = 1;
    answerContainer.appendChild(answerField);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '✖';
    deleteButton.classList.add('btn-svg', 'ms-2');
    deleteButton.type = 'button';
    answerContainer.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        parentContainer.removeChild(answerContainer);
        const updatedAnswerGroup = parentContainer.querySelectorAll('textarea');
        // updateMaxInputValue(updatedAnswerGroup);

        const allDeleteButtons = parentContainer.querySelectorAll('.btn-svg');
        if (allDeleteButtons.length > 1) {
            allDeleteButtons.forEach((button) => {
                button.disabled = false;
            });
        } else {
            allDeleteButtons.forEach((button) => {
                button.disabled = true;
            });
        }
    });

    parentContainer.appendChild(answerContainer);

    const allDeleteButtons = parentContainer.querySelectorAll('.btn-svg');
    if (allDeleteButtons.length > 1) {
        allDeleteButtons.forEach((button) => {
            button.disabled = false;
        });
    } else {
        allDeleteButtons.forEach((button) => {
            button.disabled = true;
        });
    }
}

const createRadioFormBtn = document.getElementById('createRadioFormBtn');
createRadioFormBtn.addEventListener('click', createRadioForm);
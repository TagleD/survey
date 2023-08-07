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

    const deleteFormButton = createSvgButton('✖', 'Закрыть', (event) => {
        event.preventDefault();
        formContainer.removeChild(newForm);
    });

    const questionType = document.createElement('div');
    questionType.textContent = 'Свободный ответ';
    questionType.classList.add('question-type');

    const questionField = document.createElement('textarea');
    questionField.classList.add('question-form-control');
    questionField.placeholder = 'Введите вопрос';
    questionField.rows = 3;

    questionContainer.appendChild(deleteFormButton);
    questionContainer.appendChild(questionType);
    questionContainer.appendChild(questionField);
    newForm.appendChild(questionContainer);

    formContainer.appendChild(newForm);
}

const createTextFieldFormBtn = document.getElementById('createTextFieldFormBtn');
createTextFieldFormBtn.addEventListener('click', createTextFieldForm);

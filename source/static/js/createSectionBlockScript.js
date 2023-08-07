function createSvgButton(svgData, ariaLabel, onClickHandler) {
    const button = document.createElement("button");
    button.innerHTML = svgData;
    button.setAttribute("aria-label", ariaLabel);
    button.classList.add("btn-svg");
    button.addEventListener("click", onClickHandler);
    return button;
}

function createSectionForm() {
    formCounter++;

    const formContainer = document.getElementById('formContainer');
    const formCount = formContainer.children.length + 1;

    const newForm = document.createElement('form');
    newForm.id = `form_${formCounter}`;
    newForm.classList.add('survey-question', 'text-center', 'survey-element', 'pt-4', 'px-3', 'element-colors');

    const sectionContainer = document.createElement('div');
    sectionContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3', 'radio-item');

    const deleteFormButton = createSvgButton('✖', 'Закрыть', (event) => {
        event.preventDefault();
        formContainer.removeChild(newForm);
    });
    sectionContainer.appendChild(deleteFormButton);

    const questionType = document.createElement('div');
    questionType.textContent = 'Раздел';
    questionType.classList.add('question-type');
    sectionContainer.appendChild(questionType);

    const sectionName = document.createElement('textarea');
    sectionName.classList.add('question-form-control');
    sectionName.for = `sectionQuestion_${formCount}`;
    sectionName.placeholder = `Введите название раздела`;
    sectionName.rows = 1;
    sectionContainer.appendChild(sectionName);

    const answerOptionsContainer = document.createElement('div');
    answerOptionsContainer.classList.add('section-description-container');

    const descriptionField = document.createElement('textarea');
    descriptionField.classList.add('question-form-control');
    descriptionField.placeholder = 'Введите описание раздела';
    descriptionField.rows = 3;

    answerOptionsContainer.appendChild(descriptionField);

    sectionContainer.appendChild(answerOptionsContainer);

    newForm.appendChild(sectionContainer);
    formContainer.appendChild(newForm);
}

const createSectionFormBtn = document.getElementById('createSectionFormBtn');
createSectionFormBtn.addEventListener('click', createSectionForm);
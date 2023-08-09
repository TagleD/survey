var submitButton = document.getElementById('submitButton');
var forms = document.querySelectorAll('.survey-question');

function updateButtonState() {
    var allFormsValid = true;

    forms.forEach(function (form) {
        var radioInputs = form.querySelectorAll('input[type="radio"]');
        var checkboxInputs = form.querySelectorAll('input[type="checkbox"]');
        var textareas = form.querySelectorAll('textarea');
        var maxAllowed = parseInt(form.getAttribute('data-max-allowed'));

        var radioCheckedCount = 0;
        for (var i = 0; i < radioInputs.length; i++) {
            if (radioInputs[i].checked) {
                radioCheckedCount++;
            }
        }

        var checkboxCheckedCount = 0;
        for (var i = 0; i < checkboxInputs.length; i++) {
            if (checkboxInputs[i].checked) {
                checkboxCheckedCount++;
            }
        }

        var filledTextareaCount = 0;
        for (var i = 0; i < textareas.length; i++) {
            if (textareas[i].value.trim() !== '') {
                filledTextareaCount++;
            }
        }

        if ((radioInputs.length === 0 || radioCheckedCount === 1) &&
            (checkboxInputs.length === 0 || checkboxCheckedCount <= maxAllowed) &&
            (textareas.length === 0 || filledTextareaCount === textareas.length)) {
            form.valid = true;
        } else {
            form.valid = false;
            allFormsValid = false;
        }
    });

    if (allFormsValid) {
        submitButton.classList.remove('send-btn-disabled');
        submitButton.classList.add('send-btn-active');
    } else {
        submitButton.classList.remove('send-btn-active');
        submitButton.classList.add('send-btn-disabled');
    }
}

forms.forEach(function (form) {
    form.addEventListener('change', updateButtonState);
    form.addEventListener('input', updateButtonState);
});

updateButtonState();
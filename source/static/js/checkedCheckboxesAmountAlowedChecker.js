var forms = document.querySelectorAll('.checkbox-form');

forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
        var checkboxes = form.querySelectorAll('.checkbox');
        var maxAllowed = parseInt(form.getAttribute('data-max-allowed'));
        var checkedCount = 0;

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedCount++;
            }

            if (checkedCount > maxAllowed) {
                alert('Выберите не более ' + maxAllowed + ' опций.');
                event.preventDefault();
                return;
            }
        }

        if (checkedCount < maxAllowed) {
            alert('Выберите как минимум ' + maxAllowed + ' опции.');
            event.preventDefault();
        }
    });
});
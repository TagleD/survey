const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const form = this.parentElement;
        form.remove();
    });
});

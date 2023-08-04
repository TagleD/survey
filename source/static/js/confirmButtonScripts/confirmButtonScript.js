import {getFormData, setupFormHandlers} from './formHandling.js';
import {displayErrorMessage} from './errorHandling.js';
import {sendDataToServer} from './serverCommunication.js';

setupFormHandlers();

const confirmSaveButton = document.getElementById('confirmSaveButton');
confirmSaveButton.addEventListener('click', function () {
    if (document.querySelectorAll('#formContainer form').length !== 0) {
        const jsonData = getFormData();
        if (confirmSaveButton.classList.contains('confirm-save-button-active')) {
            sendDataToServer(jsonData)
                .then(responseData => {
                    console.log('Form successfully sent to the server!');
                    window.location.href = "/";
                })
                .catch(error => {
                    console.error('Error while sending the form to the server:', error);
                });
        } else {
            displayErrorMessage();
        }
    }
});


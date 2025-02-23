document.addEventListener('DOMContentLoaded', function () {
    let signupForm = document.querySelector('.formStyle')

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission
            let isValid = validateForm()
            if (isValid) {
                // If validation passes, redirect to the next page
                window.location.href = '/year-semester-selection'
            }
        })
    }

    function validateForm() {
        let degree = getSelectedValue('[name="degree"]')
        let department = getSelectedValue('[name="department"]')
        let template = getSelectedValue('[name="template"]')
        let academicYear = getInputValue('AcademicYearAndMonth')
        let currentSemester = getSelectedValue('[name="currentSemester"]')
        let conditionsCheckbox = document.querySelector('[name="conditionsCheckbox"]')

        // Check if all fields are filled
        if (!degree || !department || !template || !academicYear || !currentSemester) {
            showCustomAlert('יש למלא את כל השדות בטופס')
            return false
        }

        // Check if the checkbox is checked
        if (!conditionsCheckbox.checked) {
            showCustomAlert('יש לאשר את תנאי השימוש ומדיניות הפרטיות')
            return false
        }

        return true; // Form is valid
    }

    function getInputValue(name) {
        return document.querySelector(`[name="${name}"]`).value.trim()
    }

    function getSelectedValue(selector) {
        let element = document.querySelector(selector)
        return element && element.value ? element.value : ''
    }

    function showCustomAlert(message) {
        const alertBox = document.getElementById('Alert')
        const alertMessage = document.getElementById('alertMessage')
        const closeButton = document.getElementById('alertCloseButton')

        if (!alertBox || !alertMessage || !closeButton) {
            console.error("Custom alert elements are not properly defined.")
            return
        }

        alertMessage.textContent = message;
        alertBox.classList.remove('hidden')

        closeButton.addEventListener('click', () => {
            alertBox.classList.add('hidden')
        })
    }
})



document.addEventListener('DOMContentLoaded', function () {
    let signupForm = document.querySelector('.formStyle')

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault() // Prevent default form submission

            let isValid = validateForm()

            if (isValid) {
                // Save the first name to Local Storage
                let firstName = getInputValue('firstName')
                localStorage.setItem('firstName', firstName)
                // If validation passes, sending data and redirect to the next page

                let email = getInputValue('Email')
                let studentID = getInputValue('StudentID')
                let lastName = getInputValue('lastName')
                let password = getInputValue('Password')

                // sending fetch POST - signInPersonalDetails request with the user details to the server side
                signInFirstStep(email, studentID, firstName, lastName, password)
            }
        })
    }

    function signInFirstStep(email, studentID, firstName, lastName, password) {
        fetch('/signin-personal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, studentID, firstName, lastName, password })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.href = result.redirect
            } else {
                showCustomAlert(result.message)
            }
        })
        .catch(error => {
            console.error("Error:", error)
            showCustomAlert("אירעה שגיאה בעת הזנת הפרטים, נסו שנית")
        })
    }

    function validateForm() {
        let email = getInputValue('Email')
        let firstName = getInputValue('firstName')
        let lastName = getInputValue('lastName')
        let studentID = getInputValue('StudentID')
        let password = getInputValue('Password')

        // Check if all fields are filled
        if (!email || !firstName || !lastName || !studentID || !password) {
            showCustomAlert('יש למלא את כל השדות')
            return false
        }

        // Validate first name
        if (!isValidName(firstName) || !isValidName(lastName)) {
            showCustomAlert('השם חייב להיות מורכב מאותיות בלבד')
            return false
        }

        // Validate email format with specific domain
        if (!isValidEmail(email)) {
            showCustomAlert('כתובת המייל אינה תקינה, יש להשתמש בכתובת עם הסיומת post.bgu.ac.il@')
            return false
        }

        // Validate student ID format (exactly 9 digits)
        if (!isValidStudentID(studentID)) {
            if (!/^[0-9]{9}$/.test(studentID)) {
                showCustomAlert('תעודת הזהות חייבת להכיל בדיוק 9 ספרות')
            } else if (/^0{9}$/.test(studentID)) {
                showCustomAlert('תעודת הזהות לא יכולה להכיל רק אפסים')
            }
            return false
        }

        // Validate password length (minimum 6 characters)
        if (!isValidPassword(password)) {
            showCustomAlert('הסיסמה חייבת להכיל לפחות 6 תווים')
            return false
        }
        return true // Form is valid
    }

    function getInputValue(name) {
        return document.querySelector(`input[name="${name}"]`).value.trim()
    }

    function isValidName(name) {
        name = name.trim()
        let nameRegex = /^[א-תA-Za-z]+$/
        return nameRegex.test(name) // Check
    }

    function isValidEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._-]+@post\.bgu\.ac\.il$/
        return emailRegex.test(email)
    }

    function isValidStudentID(studentID) {
        if (!/^[0-9]{9}$/.test(studentID)) {
            return false
        }
        else if (/^0{9}$/.test(studentID)) {
            return false
        }
        return true
    }

    function isValidPassword(password) {
        return password.length >= 6
    }
})

// Custom Alert Presenting Function
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
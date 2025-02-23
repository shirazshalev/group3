// document.querySelector('.mainButton').addEventListener("click", (e) => {
//     e.preventDefault()
//     window.location.href = "SignIn.html"
// })

document.addEventListener('DOMContentLoaded', function () {
    let signupForm = document.querySelector('.formStyle')

    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = validateForm()

            if (isValid) {
                // Save the full name to Local Storage
                let fullName = getInputValue('fullName')
                localStorage.setItem('fullName', fullName)
                // If validation passes, redirect to the next page
                window.location.href = '/signin'
            }
        })
    }

    function validateForm() {
        let email = getInputValue('Email')
        let fullName = getInputValue('fullName')
        let userName = getInputValue('userName')
        let studentID = getInputValue('StudentID')
        let password = getInputValue('Password')

        // Check if all fields are filled
        if (!email || !fullName || !userName || !studentID || !password) {
            showCustomAlert('יש למלא את כל השדות')
            return false
        }

        // Validate full name
        if (!isValidFullName(fullName)) {
            showCustomAlert('השם המלא חייב לכלול לפחות שני חלקים ורק אותיות')
            return false
        }

        // Validate username
        if (!isValidUserName(userName)) {
            showCustomAlert('שם המשתמש האוניברסיטאי חייב להיות מורכב מאותיות באנגלית בלבד')
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

    function isValidFullName(fullName) {
        fullName = fullName.trim()
        let nameParts = fullName.split(/\s+/)
        if (nameParts.length < 2) {
            return false; // Must include at least two parts
        }
        let nameRegex = /^[א-תA-Za-z]+$/
        return nameParts.every(part => nameRegex.test(part)) // Check each part
    }

    function isValidUserName(userName) {
        let userNameRegex = /^[a-zA-Z]+$/ // Only letters in english
        return userNameRegex.test(userName)
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

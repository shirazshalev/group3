// document.addEventListener('DOMContentLoaded', function () {
//     let loginForm = document.querySelector('.formStyle');
//
//     if (loginForm) {
//         loginForm.addEventListener('submit', function (event) {
//             event.preventDefault(); // Prevent default form submission
//
//             let isValid = validateForm();
//
//             if (isValid) {
//                 // If validation passes, redirect to the next page
//                 window.location.href = '/index';
//             }
//         });
//     }
//
//     function validateForm() {
//         let email = getInputValue('Email');
//         let password = getInputValue('Password');
//         let studentID = getInputValue('StudentID');
//
//         // Check if all fields are filled
//         if (!email || !password || !studentID) {
//             showCustomAlert('יש למלא את כל השדות');
//             return false;
//         }
//
//         // Validate email format with specific domain
//         if (!isValidEmail(email)) {
//             showCustomAlert('כתובת המייל אינה תקינה, יש להשתמש בכתובת עם הסיומת post.bgu.ac.il@');
//             return false;
//         }
//
//         // Validate student ID format (exactly 9 digits)
//         if (!isValidStudentID(studentID)) {
//             if (!/^[0-9]{9}$/.test(studentID)) {
//                 showCustomAlert('תעודת הזהות חייבת להכיל בדיוק 9 ספרות');
//             } else if (/^0{9}$/.test(studentID)) {
//                 showCustomAlert('תעודת הזהות לא יכולה להכיל רק אפסים');
//             }
//             return false;
//         }
//
//         // Validate password length (minimum 6 characters)
//         if (!isValidPassword(password)) {
//             showCustomAlert('הסיסמה חייבת להכיל לפחות 6 תווים');
//             return false;
//         }
//
//         return true; // Form is valid
//     }
//
//     function getInputValue(name) {
//         return document.querySelector(`input[name="${name}"]`).value.trim();
//     }
//
//     function isValidEmail(email) {
//         // Email should belongs BGU domain
//         let emailRegex = /^[a-zA-Z0-9._-]+@post\.bgu\.ac\.il$/;
//         return emailRegex.test(email); // Validate format
//     }
//
//
//     function isValidStudentID(studentID) {
//         // ID should contain exact 9 digits
//         if (!/^[0-9]{9}$/.test(studentID)) {
//             return false;
//         }
//         // Not only zeros
//         if (/^0{9}$/.test(studentID)) {
//             return false;
//         }
//         return true;
//     }
//
//     function isValidPassword(password) {
//         return password.length >= 6;
//     }
// });
//
// // Custom Alert Presenting Function
// function showCustomAlert(message) {
//     const alertBox = document.getElementById('Alert')
//     const alertMessage = document.getElementById('alertMessage')
//     const closeButton = document.getElementById('alertCloseButton')
//
//     if (!alertBox || !alertMessage || !closeButton) {
//         console.error("Custom alert elements are not properly defined.")
//         return
//     }
//
//     // Set the message
//     alertMessage.textContent = message
//
//     // Show the alert
//     alertBox.classList.remove('hidden')
//
//     // Close the alert when the button is clicked
//     closeButton.addEventListener('click', () => {
//         alertBox.classList.add('hidden')
//     })
// }

document.addEventListener('DOMContentLoaded', function () {
    let loginForm = document.querySelector('.formStyle');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = validateForm();

            if (isValid) {
                let email = getInputValue('Email');
                let password = getInputValue('Password');
                let student_id = getInputValue('StudentID');

                // sending fetch POST - login request with the user details to the server side
                loginUser(email, password, student_id);
            }
        });
    }

    function validateForm() {
        let email = getInputValue('Email');
        let password = getInputValue('Password');
        let studentID = getInputValue('StudentID');

        // Check if all fields are filled
        if (!email || !password || !studentID) {
            showCustomAlert('יש למלא את כל השדות');
            return false;
        }

        // Validate email format with specific domain
        if (!isValidEmail(email)) {
            showCustomAlert('כתובת המייל אינה תקינה, יש להשתמש בכתובת עם הסיומת post.bgu.ac.il@');
            return false;
        }

        // Validate student ID format (exactly 9 digits)
        if (!isValidStudentID(studentID)) {
            if (!/^[0-9]{9}$/.test(studentID)) {
                showCustomAlert('תעודת הזהות חייבת להכיל בדיוק 9 ספרות');
            } else if (/^0{9}$/.test(studentID)) {
                showCustomAlert('תעודת הזהות לא יכולה להכיל רק אפסים');
            }
            return false;
        }

        // Validate password length (minimum 6 characters)
        if (!isValidPassword(password)) {
            showCustomAlert('הסיסמה חייבת להכיל לפחות 6 תווים');
            return false;
        }

        return true; // Form is valid
    }

    function loginUser(email, password, studentID) {
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, studentID })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.href = result.redirect;
            } else {
                showCustomAlert(result.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showCustomAlert("אירעה שגיאה בעת התחברות, נסו שנית");
        });
    }

    function getInputValue(name) {
        return document.querySelector(`input[name="${name}"]`).value.trim();
    }

    function isValidEmail(email) {
        // Email should belongs BGU domain
        let emailRegex = /^[a-zA-Z0-9._-]+@post\.bgu\.ac\.il$/;
        return emailRegex.test(email); // Validate format
    }


    function isValidStudentID(studentID) {
        // ID should contain exact 9 digits
        if (!/^[0-9]{9}$/.test(studentID)) {
            return false;
        }
        // Not only zeros
        if (/^0{9}$/.test(studentID)) {
            return false;
        }
        return true;
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }
});

// Custom Alert Presenting Function
function showCustomAlert(message) {
    const alertBox = document.getElementById('Alert')
    const alertMessage = document.getElementById('alertMessage')
    const closeButton = document.getElementById('alertCloseButton')

    if (!alertBox || !alertMessage || !closeButton) {
        console.error("Custom alert elements are not properly defined.")
        return
    }

    // Set the message
    alertMessage.textContent = message

    // Show the alert
    alertBox.classList.remove('hidden')

    // Close the alert when the button is clicked
    closeButton.addEventListener('click', () => {
        alertBox.classList.add('hidden')
    })
}
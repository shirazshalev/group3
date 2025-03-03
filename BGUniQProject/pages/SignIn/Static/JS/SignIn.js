// Opening selection lists on mouse click event
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btnSelect').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const choiceLists = btn.parentElement.querySelector('.choiceLists')
            if (choiceLists) {
                const isHidden = choiceLists.classList.toggle("hiddenList")
                choiceLists.classList.toggle("openList", !isHidden)
            }
        })
    })

    document.querySelectorAll('.listItem').forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedText = e.target.textContent
            const selectedValue = e.target.getAttribute("data-value") // Get actual value
            const choiceLists = e.target.closest('.choiceLists')
            const btn = choiceLists?.previousElementSibling
            const hiddenInput = choiceLists?.parentElement.querySelector('input[type="hidden"]')
            if (btn && btn.classList.contains("btnSelect")) {
                btn.querySelector("span").textContent = selectedText
                btn.classList.add("selected")
            }
            if (hiddenInput) {
                hiddenInput.value = selectedValue // Store the selected value
            }
            choiceLists?.classList.add("hiddenList")
            choiceLists?.classList.remove("openList")
        })
    })
})

document.addEventListener('DOMContentLoaded', function () {
    let signupForm = document.querySelector('.formStyle')
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault() // Prevent default form submission
            let isValid = validateForm()
            if (isValid) {
                let degree = getInputValue('degree')
                let department = getInputValue('department')
                let template = getInputValue('template')
                let academicYear = getInputValue('AcademicYearAndMonth')
                let currentSemester = getInputValue('semester')
                // sending fetch POST - signIn request with the user details to the server side
                signInSecondStep(degree, department, template, academicYear, currentSemester)
            }
        })
    }

    function signInSecondStep(degree, department, template, academicYear, currentSemester){
        fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ degree, department, template, academicYear, currentSemester })
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
        let degree = getInputValue('degree')
        let department = getInputValue('department')
        let template = getInputValue('template')
        let academicYear = getInputValue('AcademicYearAndMonth')
        let currentSemester = getInputValue('semester')
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
        return true // Form is valid
    }

    function getInputValue(name) {
        let input = document.querySelector(`[name="${name}"]`)
        return input ? input.value.trim() : ''
    }

    function showCustomAlert(message) {
        const alertBox = document.getElementById('Alert')
        const alertMessage = document.getElementById('alertMessage')
        const closeButton = document.getElementById('alertCloseButton')
        if (!alertBox || !alertMessage || !closeButton) {
            console.error("Custom alert elements are not properly defined.")
            return
        }
        alertMessage.textContent = message
        alertBox.classList.remove('hidden')
        closeButton.addEventListener('click', () => {
            alertBox.classList.add('hidden')
        })
    }

    // Term of use Popup Window
    const termsOfUse = document.querySelector('#terms')
    const popupTermsWindow = document.querySelector('.popupTermsWindow')
    termsOfUse.addEventListener('click', (e) => {
        e.preventDefault()
        popupTermsWindow.classList.remove("hiddenWindow")
        popupTermsWindow.classList.add("openWindow")
    })
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('closeIcon')) {
            e.preventDefault()
            popupTermsWindow.classList.add("hiddenWindow")
            popupTermsWindow.classList.remove("openWindow")
        }
    })
})
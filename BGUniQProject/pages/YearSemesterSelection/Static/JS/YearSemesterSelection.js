// Map for translate hebrew detail into an english variable
const yearMap = {
    "שנה א׳": "yearA",
    "שנה ב׳": "yearB",
    "שנה ג׳": "yearC",
    "שנה ד׳": "yearD"
}

const semesterMap = {
    "סמסטר א׳": "semesterA",
    "סמסטר ב׳": "semesterB",
    "סמסטר קיץ": "semesterSummer"
}

// Storage courses data in organized way by year and semester
const coursesData = {
    yearA: {semesterA: [], semesterB: [], semesterSummer: []},
    yearB: {semesterA: [], semesterB: [], semesterSummer: []},
    yearC: {semesterA: [], semesterB: [], semesterSummer: []},
    yearD: {semesterA: [], semesterB: [], semesterSummer: []}
}
let selectedYear = null // save the chosen year by the user
let selectedSemester = null // save the chosen semester by the user

// Event listener for choosing year and semester
// Select all buttons in the table
const YearSemesterButtons = document.querySelectorAll('#YearSemesterSection .SemesterYearButton')

YearSemesterButtons.forEach((button) => {
    button.addEventListener('click', () => {

        // Check if button belongs to year or semester and save the chosen details
        if (button.textContent.includes('שנה')) {
            selectedYear = yearMap[button.textContent.trim()] // translate and save the selected year
        } else if (button.textContent.includes('סמסטר')) {
            selectedSemester = semesterMap[button.textContent.trim()] // translate and save the selected semester
        }

        // Keeping showing the chosen detail in light orange
        const row = button.closest('tr')
        const buttonsInRow = row.querySelectorAll('.SemesterYearButton') // Get all buttons in the same row
        // Remove the active class from all buttons in the same row
        buttonsInRow.forEach((btn) => btn.classList.remove('active'))
        // Add the active class to the clicked button
        button.classList.add('active')

        console.log(`Selected Year: ${selectedYear}, Selected Semester: ${selectedSemester}`)
    })
})


// Event listener to the "ContinueSection" --> moving to the GPA calculator Page
document.getElementById('ContinueBTN').addEventListener('click', () => {
    // Check if a year and semester have been selected
    if (!selectedYear || !selectedSemester) {
        showCustomAlert("יש לבחור שנת לימוד וסמסטר נוכחיים לפני שתמשיכו הלאה")
        return // Stop the transition
    }
    // If both year and semester are selected, navigate to the next page
    window.location.href = `/gpa-calculator`
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

    // Set the message
    alertMessage.textContent = message

    // Show the alert
    alertBox.classList.remove('Hidden')

    // Close the alert when the button is clicked
    closeButton.addEventListener('click', () => {
        alertBox.classList.add('Hidden')
    })
}

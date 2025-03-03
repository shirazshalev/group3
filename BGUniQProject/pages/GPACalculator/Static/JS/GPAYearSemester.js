// Event listener to the "ContinueSection"
document.getElementById('ContinueBTN').addEventListener('click', () => {
    // Hide the Continue Button section
    // Check if selectedYear and selectedSemester exist in coursesData
    if ((selectedYear && selectedSemester) && (coursesData[selectedYear] && coursesData[selectedYear][selectedSemester])) {
        document.getElementById('ContinueSection').classList.add('hidden')
        // Show the Calculator Section
        document.getElementById('CalculatorSection').classList.remove('hidden')
        const textElement = document.querySelector('#YearSemesterSection p')
        if (textElement) {
            textElement.textContent = "להזנה נוספת עבור שנה ו/או סמסטר שונים יש לרענן את העמוד"
        }
        // Changing year and semester buttons
        const YearSemesterButtons = document.querySelectorAll('.SemesterYearButton')
        YearSemesterButtons.forEach(button => {
            button.classList.add('disabled')
        })
    } else {
        showCustomAlert("עבור הזנת הקורסים- יש לבחור תחילה שנה וסמסטר")
    }
})

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
    "סמסטר קיץ": "semesterC"
}

// Storage courses data in organized way by year and semester
const coursesData = {
    yearA: {semesterA: [], semesterB: [], semesterC: []},
    yearB: {semesterA: [], semesterB: [], semesterC: []},
    yearC: {semesterA: [], semesterB: [], semesterC: []},
    yearD: {semesterA: [], semesterB: [], semesterC: []}
}
let selectedYear = null // save the chosen year by the user
let selectedSemester = null // save the chosen semester by the user

// Event listener for choosing year and semester
// Select all buttons in the table

function getCourseName(row) {
    const courseSelectSpan = row.querySelector('.btnSelect span')
    const manualInput = row.querySelector('.manualCourseInput')
    if (manualInput && manualInput.value.trim() !== "") {
        return { text: manualInput.value.trim(), element: manualInput, isManual: true }
    }
    if (courseSelectSpan) {
        return { text: courseSelectSpan.textContent.trim(), element: courseSelectSpan, isManual: false }
    }
    return { text: "", element: null, isManual: false }
}

document.addEventListener("DOMContentLoaded", () => {
    // Event listener for choosing year and semester
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

    // Event listener - Save Button
    const saveButton = document.querySelector('#SaveButton')
    saveButton.addEventListener('click', (e) => {
        if (!selectedYear || !selectedSemester) {
            showCustomAlert("יש לבחור שנה וסמסטר לפני שמירת הקורסים")
            return
        }
        // check if validations error are exist
        const errorMessages = document.querySelectorAll('.error-message')
        const hasErrors = Array.from(errorMessages).some((error) => error.textContent.trim() !== "")
        if (hasErrors) {
            showCustomAlert("פרטי הקורסים לא תקינים, יש לתקנם לפני השמירה")
            return
        }
        // Check if selectedYear and selectedSemester exist in coursesData
        if (!coursesData[selectedYear] || !coursesData[selectedYear][selectedSemester]) {
            showCustomAlert("השנה או הסמסטר שנבחרו לא מזוהים במערכת")
            return
        }
        // Array to store course objects for the selected semester and year
        const CoursesArray = coursesData[selectedYear][selectedSemester]
        CoursesArray.length = 0 // Clear previous data for this semester
        // Flag to track if any row is incomplete
        let incompleteRowFound = false
        // Get all rows in the courses table
        const rows = document.querySelectorAll("#CoursesTable tbody tr")
        // Loop through each row
        rows.forEach(row => {
            // Get inputs in the row
            const courseData = getCourseName(row)
            const courseNameInput = courseData.text
            const courseElement = courseData.element
            const isManual = courseData.isManual
            const creditsInput = row.querySelector('input[type="number"][step="0.5"]')
            const gradeInput = row.querySelector('input[type="number"][step="1"]')
            // Check if all fields are filled
            if (
                courseNameInput === "" ||
                creditsInput.value.trim() === "" ||
                gradeInput.value.trim() === ""
            ) {
                incompleteRowFound = true // Set flag if any field is empty
                row.classList.add("incomplete-row") // Highlight the row (optional, add CSS)
            } else {
                // Create a course object if all fields are filled
                const course = {
                    courseName: courseNameInput,
                    credits: creditsInput.value.trim(),
                    grade: gradeInput.value.trim()
                }
                // Add the course object to the array
                CoursesArray.push(course)

                if (isManual && courseElement) {
                    courseElement.setAttribute("readonly", "true")
                } else if (!isManual && courseElement) {
                    courseElement.parentElement.classList.add("locked-course")
                    courseElement.parentElement.style.pointerEvents = "none"
                    courseElement.parentElement.style.opacity = "0.7"
                }

                // Make the inputs readonly
                creditsInput.setAttribute("readonly", "true")
                creditsInput.setAttribute("readonly", "true")
                gradeInput.setAttribute("readonly", "true")
                creditsInput.parentElement.style.opacity = "0.7"
                gradeInput.parentElement.style.opacity = "0.7"
                // Remove any previous highlighting
                row.classList.remove("incomplete-row")
            } // End of else condition
        }) // End of the loop through each row
        if (incompleteRowFound) {
            // Show an alert if any row is incomplete
            showCustomAlert("יש למלא את כל הפרטים על הקורס לפני שמירת הנתונים")
            return // Stop saving
        }
        insertCoursesDataToDB()
        showCustomAlert("הנתונים נשמרו בהצלחה, כדי לערוך מחדש יש ללחוץ על שלושת הנקודות המופיעות בצד")
        // Log the array of course objects (optional)
        console.log("Saved courses for", selectedYear, selectedSemester, CoursesArray)
        return // Stop saving
    }) // End of the Save button click event listener
}) // Dom

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
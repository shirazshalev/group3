// Interactive validation of the user input while loading the page
document.querySelectorAll("#CoursesTable tbody tr").forEach((row) => {
    attachValidationListeners(row)
})

// Event listener to follow the additional actions menu (3 dots menu)
document.addEventListener('click', (event) => {
    const button = event.target.closest('.ExtraActionsButton')

    if (button) {
        const menu = button.nextElementSibling
        const row = button.closest('tr')

        // Show or hide the menu
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block'

        // Attach actions to menu items
        const menuItems = menu.querySelectorAll('.menu-item')
        menuItems.forEach((item) => {
            item.addEventListener('click', () => {
                handleAction(item.getAttribute('data-action'), row)
            })
        })
    } else {
        // Close all menus if clicked outside
        document.querySelectorAll('.PopupActionsMenu').forEach((menu) => {
            menu.style.display = 'none'
        })
    }
})

// Event listener to the "Add Course" button
document.getElementById('AddCourseButton').addEventListener('click', addCourse)

// Event listener to the "ContinueSection"
document.getElementById('ContinueBTN').addEventListener('click', () => {
    // Hide the Continue Button section
    document.getElementById('ContinueSection').classList.add('hidden')
    // Show the Calculator Section
    document.getElementById('CalculatorSection').classList.remove('hidden')
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

// Event listener to the Save Button
const saveButton = document.getElementById("SaveButton")

saveButton.addEventListener("click", function () {
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
        const courseNameInput = row.querySelector('input[list]')
        const creditsInput = row.querySelector('input[type="number"][step="0.5"]')
        const gradeInput = row.querySelector('input[type="number"][step="1"]')

        // Check if all fields are filled
        if (
            courseNameInput.value.trim() === "" ||
            creditsInput.value.trim() === "" ||
            gradeInput.value.trim() === ""
        ) {
            incompleteRowFound = true // Set flag if any field is empty
            row.classList.add("incomplete-row") // Highlight the row (optional, add CSS)
        } else {
            // Create a course object if all fields are filled
            const course = {
                courseName: courseNameInput.value.trim(),
                credits: creditsInput.value.trim(),
                grade: gradeInput.value.trim()
            }

            // Add the course object to the array
            CoursesArray.push(course)
            // Make the inputs readonly
            courseNameInput.setAttribute("readonly", "true")
            creditsInput.setAttribute("readonly", "true")
            gradeInput.setAttribute("readonly", "true")
            // Remove any previous highlighting
            row.classList.remove("incomplete-row")

        } // End of else condition
    }) // End of the loop through each row

    if (incompleteRowFound) {
        // Show an alert if any row is incomplete
        showCustomAlert("יש למלא את כל הפרטים על הקורס לפני שמירת הנתונים")
        return // Stop saving
    }

    showCustomAlert("הנתונים נשמרו בהצלחה, כדי לערוך מחדש יש ללחוץ על שלוש הנקודות המופיעות בצד")
    // Log the array of course objects (optional)
    console.log("Saved courses for", selectedYear, selectedSemester, CoursesArray)
    return // Stop saving

}) // End of the Save button click event listener

// Function to handle actions triggered from the Extra actions menu
function handleAction(action, row) {
    switch (action) {
        case 'PtorCredits':
            console.log('הוגדר כפטור נק״ז')
            showCustomAlert("הקורס הוגדר בהצלחה כפטור נק״ז")
            break
        case 'delete':
            console.log('הקורס נמחק')
            // Remove row from the table
            row.remove()
            // Remove the course from the coursesData array
            const courseNameToDelete = row.querySelector('input[list]').value.trim()
            const coursesArray = coursesData[selectedYear][selectedSemester]
            const updatedCoursesArray = coursesArray.filter(course => course.courseName !== courseNameToDelete)
            coursesData[selectedYear][selectedSemester] = updatedCoursesArray
            console.log(`Updated courses after deletion:`, coursesData[selectedYear][selectedSemester])
            break
        case 'edit':
            console.log('הקורס עודכן')
            const inputs = row.querySelectorAll('input')
            inputs.forEach(input => {
                input.removeAttribute('readonly') //Allow Editing
            })
            break
        case 'details':
            console.log('פעולות נוספות הוצגו')
            break
        default:
            console.log('פעולה אינה ידועה')
    }
}

// Function to add a new course row to the table
function addCourse() {
    // Get the table body where new rows will be appended
    const tableBody = document.getElementById('CoursesTable').getElementsByTagName('tbody')[0]

    // Create a new row
    const newRow = document.createElement('tr')

    // Create the actions cell (3 dots menu)
    const ExtraActionsCell = document.createElement('td')
    ExtraActionsCell.innerHTML = `
        <div class="PopupMenuContainer">
            <button class="ExtraActionsButton">...</button>
             <div class="PopupActionsMenu" style="display: none">
                    <div class="menu-item" data-action="PtorCredits">הגדר כפטור נק״ז</div>
                    <div class="menu-item" data-action="delete">מחק קורס</div>
                    <div class="menu-item" data-action="edit">ערוך קורס</div>
                    <div class="menu-item" data-action="details">פרטים נוספים</div>
            </div>
        </div>
    `

    // Create the course name cell with a dropdown list
    const CourseNameCell = document.createElement('td')
    CourseNameCell.classList.add('tdInput') // Add the 'tdInput' class for style
    CourseNameCell.innerHTML = `
       <div class="InputCourseContainer">
            <input list="CourseNames" placeholder=""/>
            <img src="../static/SVG/triangle-down.svg" alt="arrow" class="ArrowIcon"/>
            <span class="error-message"></span>
        </div>
        <datalist id="CourseNames">
            <option value="הנדסת איכות"></option>
            <option value="ניהול פרויקטים"></option>
            <option value="אוטומציה וייצור ממוחשב"></option>
            <option value="יסודות המימון"></option>
        </datalist>
    `

    // Create the credits cell with a number input
    const CreditsCell = document.createElement('td')
    CreditsCell.classList.add('tdInput') // Add the 'tdInput' class for style
    CreditsCell.innerHTML = `
        <input type="number" step="0.5" min="0" max="10"/>
        <span class="error-message"></span>`

    // Create the final grade cell with a number input
    const FinalGradeCell = document.createElement('td')
    FinalGradeCell.classList.add('tdInput') // Add the 'tdInput' class for style
    FinalGradeCell.innerHTML = `
        <input type="number" step="1" min="0" max="100"/>
        <span class="error-message"></span>`

    // Create the Grade By Components cell with buttons
    const GradeByComponentsCell = document.createElement('td')
    GradeByComponentsCell.classList.add('tdInput') // Add the 'tdInput' class for style
    GradeByComponentsCell.innerHTML = `
                            <button class="GPAButton">ציון לפי מרכיבים</button>
                            <div class="ComponentPopupHidden" id="ComponentPopup">
                                <div class="PopupHeader">
                                    <div class="titels">
                                        <label>מרכיב ציון</label>
                                        <label>%</label>
                                        <label>ציון המרכיב</label>
                                    </div>
                                    <div class="closeButton">
                                        <button id="closePopupBtn">
                                            <img src="../static/SVG/x.svg" alt="Close" class="closeIcon">
                                        </button>
                                    </div>
                                </div>
                                <div class="PopupBody">
                                    <div class="GradeComponentRow">
                                        <div class="ComponentInRow">
                                            <select class="ComponentsDropdown">
                                                <option value="" disabled selected>בחרו מרכיב ציון</option>
                                                <option value="FinalGradeExamA">מבחן סופי - מועד א׳</option>
                                                <option value="FinalGradeExamB">מבחן סופי - מועד ב׳</option>
                                                <option value="Project">פרויקט</option>
                                                <option value="Exercises">תרגילי בית</option>
                                                <option value="Other">אחר</option>
                                            </select>
                                        </div>
                                        <div class="ComponentInRow">
                                            <input type="number" step="1" min="0" max="100"
                                                   class="ComponentPercentage"/>
                                        </div>
                                        <div class="ComponentInRow">
                                            <input type="number" step="1" min="0" max="100" class="ComponentGrade"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="PopupFooter">
                                    <button id="SaveComponentGrade" class="ActionButton">שמור</button>
                                    <button id="CancelComponentGrade" class="ActionButton">מחק</button>
                                    <button id="AddComponentBTN" class="ActionButton">+ מרכיב ציון נוסף</button>
                                </div>
                            </div>`

    // Create the binary pass cell with buttons
    const BinaryPassCell = document.createElement('td')
    BinaryPassCell.classList.add('tdInput') // Add the 'tdInput' class for style
    BinaryPassCell.innerHTML = `
        <button class="GPAButton">עובר בינארי</button>
        <span class="error-message"></span>`

    // Append all cells to the new row
    newRow.appendChild(ExtraActionsCell)
    newRow.appendChild(CourseNameCell)
    newRow.appendChild(CreditsCell)
    newRow.appendChild(FinalGradeCell)
    newRow.appendChild(GradeByComponentsCell)
    newRow.appendChild(BinaryPassCell)

    // Append the new row to the table body
    tableBody.appendChild(newRow)

    // Attach validation listeners to the new row
    attachValidationListeners(newRow)

    // Attach event listener to the new "ציון לפי מרכיבים" button
    attachListenersToRow(newRow)
}

document.getElementById("AddCourseButton").addEventListener("click", addCourse)

// Add event listeners to all input fields dynamically when a row is added
function attachValidationListeners(row) {
    const courseNameInput = row.querySelector('input[list]')
    const creditsInput = row.querySelector('input[type="number"][step="0.5"]')
    const gradeInput = row.querySelector('input[type="number"][step="1"]')

    // Add event listeners for real-time validation
    courseNameInput.addEventListener('input', () => validateCourseName(courseNameInput))
    creditsInput.addEventListener('input', () => validateCredits(creditsInput))
    gradeInput.addEventListener('input', () => validateGrade(gradeInput))
}

// Validate course name (must be unique)
function validateCourseName(input) {
    const errorSpan = input.parentElement.querySelector('.error-message') || createErrorSpan(input)
    const allCourseNames = Array.from(document.querySelectorAll('input[list]')).map(el => el.value.trim())
    const duplicate = allCourseNames.filter(name => name === input.value.trim()).length > 1

    if (duplicate) {
        errorSpan.textContent = 'הקורס כבר קיים הסמסטר, נא לתקן'
        input.classList.add('invalid')
    } else {
        errorSpan.textContent = ''
        input.classList.remove('invalid')
    }
}

// Validate credits (0.5 to 10, multiples of 0.5)
function validateCredits(input) {
    const errorSpan = input.parentElement.querySelector('.error-message') || createErrorSpan(input)
    const value = parseFloat(input.value)

    if (isNaN(value)) {
        errorSpan.textContent = 'יש להזין מספר בלבד'
        input.classList.add('invalid')
    } else if (value < 0.5 || value > 10) {
        errorSpan.textContent = 'נק"ז בין 0.5 ל-10 בלבד'
        input.classList.add('invalid')
    } else if (value % 0.5 !== 0) {
        errorSpan.textContent = 'נק"ז בכפולות של 0.5'
        input.classList.add('invalid')
    } else {
        errorSpan.textContent = ''
        input.classList.remove('invalid')
    }
}

// Validate grade (integer between 0 and 100)
function validateGrade(input) {
    const errorSpan = input.parentElement.querySelector('.error-message') || createErrorSpan(input)
    const value = parseFloat(input.value) // Use parseFloat to handle decimal inputs for validation

    if (isNaN(value)) {
        errorSpan.textContent = 'יש להזין מספרים בלבד'
        input.classList.add('invalid')
    } else if (value < 0 || value > 100) {
        errorSpan.textContent = 'ציון בין 0 ל-100 בלבד'
        input.classList.add('invalid')
    } else if (!Number.isInteger(value)) {
        errorSpan.textContent = 'ציון שלם בלבד'
        input.classList.add('invalid')
    } else {
        errorSpan.textContent = '' // Clear the error if input is valid
        input.classList.remove('invalid')
    }
}

// Helper function to create an error span if it doesn't exist
function createErrorSpan(input) {
    const errorSpan = document.createElement('span')
    errorSpan.classList.add('error-message')
    errorSpan.style.color = 'red'
    errorSpan.style.fontSize = '0.8rem'
    input.parentElement.appendChild(errorSpan)
    return errorSpan
}

// ------------------------------------- Grade By Components Popup Window Scripts -------------------------------------
// Show popup when "ציון לפי מרכיבים" button is clicked
document.querySelector('.GPAButton').addEventListener('click', () => {
    const popup = document.getElementById('ComponentPopup')
    popup.classList.add('show')
})

// Close popup when "X" button is clicked
document.getElementById('closePopupBtn').addEventListener('click', () => {
    const popup = document.getElementById('ComponentPopup')
    popup.classList.remove('show')
})

// Add a new component row dynamically
document.getElementById('AddComponentBTN').addEventListener('click', () => {
    const popupBody = document.querySelector('.PopupBody')
    const newRow = document.createElement('div')
    newRow.classList.add('GradeComponentRow')
    newRow.innerHTML = `
        <div class="ComponentInRow">
            <select class="ComponentsDropdown">
                <option value="" disabled selected>בחרו מרכיב ציון</option>
                <option value="FinalGradeExamA">מבחן סופי - מועד א׳</option>
                <option value="FinalGradeExamB">מבחן סופי - מועד ב׳</option>
                <option value="Project">פרויקט</option>
                <option value="Exercises">תרגילי בית</option>
                <option value="Other">אחר</option>
            </select>
        </div>
        <div class="ComponentInRow">
            <input type="number" step="1" min="0" max="100" class="ComponentPercentage"/>
        </div>
        <div class="ComponentInRow">
            <input type="number" step="1" min="0" max="100" class="ComponentGrade"/>
        </div>
    `
    popupBody.appendChild(newRow)
})


// Clear the last component row when "מחק" button is clicked
document.getElementById('CancelComponentGrade').addEventListener('click', () => {
    const popupBody = document.querySelector('.PopupBody')
    const rows = popupBody.querySelectorAll('.GradeComponentRow')
    if (rows.length > 0) {
        rows[rows.length - 1].remove()
    }
})


// Save the component grades when "שמור" button is clicked
document.getElementById('SaveComponentGrade').addEventListener('click', () => {
    const componentRows = document.querySelectorAll('.GradeComponentRow')
    const grades = []
    componentRows.forEach(row => {
        const dropdown = row.querySelector('.ComponentsDropdown').value
        const percentage = row.querySelector('.ComponentPercentage').value
        const grade = row.querySelector('.ComponentGrade').value
        if (dropdown && percentage && grade) {
            grades.push({dropdown, percentage, grade})
        }
    })

    console.log('Saved Component Grades:', grades) // Replace with actual save logic
})

// validation and calculation of the course final grade
// Event listener for "Save" button
document.getElementById('SaveComponentGrade').addEventListener('click', () => {
    const rows = document.querySelectorAll('.PopupBody .GradeComponentRow')
    const errorMessages = [] // Store error messages
    let totalPercentage = 0 // To check sum of percentages
    const gradeData = []
    let hasFinalGradeExamB = false // Flag to check if Moad B exists
    let finalExamWeights = {} // To store weights of Moad A and Moad B

    // Validate each row
    rows.forEach((row, index) => {
        const componentDropdown = row.querySelector('.ComponentsDropdown')
        const percentageInput = row.querySelector('.ComponentPercentage')
        const gradeInput = row.querySelector('.ComponentGrade')

        const componentValue = componentDropdown.value
        const percentageValue = parseFloat(percentageInput.value)
        const gradeValue = parseFloat(gradeInput.value)

        // Check if Moad B exists
        if (componentValue === 'FinalGradeExamB') {
            hasFinalGradeExamB = true
        }

        // Store weights for Moad A and Moad B
        if (componentValue === 'FinalGradeExamA' || componentValue === 'FinalGradeExamB') {
            finalExamWeights[componentValue] = percentageValue
        }

        // Validate dropdown (component must be selected)
        if (!componentValue) {
            errorMessages.push(`שורה ${index + 1}: יש לבחור מרכיב ציון`)
        }

        // Validate percentage (0-100)
        if (isNaN(percentageValue) || percentageValue < 0 || percentageValue > 100) {
            errorMessages.push(`שורה ${index + 1}: נדרש משקל מרכיב בין 0 ל-100`)
        } else {
            totalPercentage += percentageValue
        }

        // Validate grade (0-100)
        if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
            errorMessages.push(`שורה ${index + 1}: נדרש ציון בין 0 ל-100`)
        }

        // Validate unique components
        if (gradeData.some(item => item.component === componentValue)) {
            errorMessages.push(`שורה ${index + 1}: לא ניתן להזין את אותו מרכיב פעמיים`)
        }

        // If all validations pass, add data to gradeData
        if (componentValue && !isNaN(percentageValue) && percentageValue >= 0 && percentageValue <= 100 &&
            !isNaN(gradeValue) && gradeValue >= 0 && gradeValue <= 100 &&
            !gradeData.some(item => item.component === componentValue)) {
            gradeData.push({component: componentValue, percentage: percentageValue, grade: gradeValue})
        }
    })

    // Check if Moad A and Moad B weights are identical if both exist
    if ('FinalGradeExamA' in finalExamWeights && 'FinalGradeExamB' in finalExamWeights) {
        if (finalExamWeights['FinalGradeExamA'] !== finalExamWeights['FinalGradeExamB']) {
            errorMessages.push(`משקל מועד א׳ ו-ב׳ צריך להיות זהה`)
        }
    }

    // Adjust total percentage and grade data to ignore Moad A if Moad B exists
    const filteredGradeData = hasFinalGradeExamB ? gradeData.filter(item => item.component !== 'FinalGradeExamA') : gradeData

    // Calculate total percentage based on filtered data
    totalPercentage = filteredGradeData.reduce((sum, item) => sum + item.percentage, 0)

    // Ensure total percentage is 100
    if (totalPercentage !== 100) {
        errorMessages.push(`סך המשקלים צריך להיסכם ל-100`)
    }

    // Display errors or calculate weighted average
    if (errorMessages.length > 0) {
        showCustomAlert(errorMessages.join('\n'))
    } else {
        const weightedAverage = calculateWeightedAverage(filteredGradeData)
        showCustomAlert(`הציון המשוקלל הוא: ${weightedAverage}`)
        // Update the course grade in the main calculator
        document.querySelector('.GPAButton').closest('tr').querySelector('input[type="number"][step="1"]').value = weightedAverage.toFixed(2)
        document.getElementById('closePopupBtn').click() // close popup
    }
})

// Function to calculate weighted average
function calculateWeightedAverage(data) {
    let totalWeight = 0
    let weightedSum = 0

    data.forEach(item => {
        weightedSum += item.percentage * item.grade / 100
        totalWeight += item.percentage
    })

    return totalWeight === 100 ? weightedSum : 0 // Return 0 if percentages are invalid
}

// functionality for grade by components after add course button is clicked
function attachListenersToRow(row) {
    const gpaButton = row.querySelector(".GPAButton")
    const popup = row.querySelector(".ComponentPopupHidden")
    const closeButton = popup.querySelector("#closePopupBtn")
    const addComponentButton = popup.querySelector("#AddComponentBTN")
    const saveComponentButton = popup.querySelector("#SaveComponentGrade")
    const cancelComponentButton = popup.querySelector("#CancelComponentGrade")

    // Open popup
    gpaButton.addEventListener("click", () => {
        popup.classList.add("show")
    })

    //Close popup
    closeButton.addEventListener("click", () => {
        popup.classList.remove("show")
    })

    // Add new component to the popup window
    addComponentButton.addEventListener("click", () => {
        const popupBody = popup.querySelector(".PopupBody")
        const newRow = document.createElement("div")
        newRow.classList.add("GradeComponentRow")
        newRow.innerHTML = `
            <div class="ComponentInRow">
                <select class="ComponentsDropdown">
                    <option value="" disabled selected>בחרו מרכיב ציון</option>
                    <option value="FinalGradeExamA">מבחן סופי - מועד א׳</option>
                    <option value="FinalGradeExamB">מבחן סופי - מועד ב׳</option>
                    <option value="Project">פרויקט</option>
                    <option value="Exercises">תרגילי בית</option>
                    <option value="Other">אחר</option>
                </select>
            </div>
            <div class="ComponentInRow">
                <input type="number" step="1" min="0" max="100" class="ComponentPercentage"/>
            </div>
            <div class="ComponentInRow">
                <input type="number" step="1" min="0" max="100" class="ComponentGrade"/>
            </div>
        `
        popupBody.appendChild(newRow)
    })

    // Clear the last component row when "מחק" button is clicked
    cancelComponentButton.addEventListener("click", () => {
        const popupBody = popup.querySelector(".PopupBody")
        const rows = popupBody.querySelectorAll('.GradeComponentRow')
        if (rows.length > 0) {
            rows[rows.length - 1].remove()
        }
    })

    // Save components in popup when clicking on save after validations check
    saveComponentButton.addEventListener("click", () => {
        const componentRows = popup.querySelectorAll(".GradeComponentRow")
        const grades = []
        const errorMessages = []
        let totalPercentage = 0

        componentRows.forEach((row, index) => {
            const dropdown = row.querySelector(".ComponentsDropdown").value
            const percentage = parseFloat(row.querySelector(".ComponentPercentage").value)
            const grade = parseFloat(row.querySelector(".ComponentGrade").value)

            if (!dropdown) {
                errorMessages.push(`שורה ${index + 1}: יש לבחור מרכיב ציון`)
            }
            if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                errorMessages.push(`שורה ${index + 1}: משקל המרכיב צריך להיות בין 0 ל-100`)
            } else {
                totalPercentage += percentage
            }
            if (isNaN(grade) || grade < 0 || grade > 100) {
                errorMessages.push(`שורה ${index + 1}: הציון צריך להיות בין 0 ל-100`)
            }
            if (dropdown && !isNaN(percentage) && percentage >= 0 && percentage <= 100 && !isNaN(grade) && grade >= 0 && grade <= 100) {
                grades.push({dropdown, percentage, grade})
            }
        })

        if (totalPercentage !== 100) {
            errorMessages.push(`סך המשקלים צריך להיסכם ל-100`)
        }

        if (errorMessages.length > 0) {
            showCustomAlert(errorMessages.join("\n"))
        } else {
            const weightedAverage = calculateWeightedAverage(grades)
            showCustomAlert(`הציון המשוקלל הוא: ${weightedAverage}`)
            popup.classList.remove("show")

            row.querySelector('input[type="number"][step="1"]').value = weightedAverage.toFixed(2)
        }
    })
}

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
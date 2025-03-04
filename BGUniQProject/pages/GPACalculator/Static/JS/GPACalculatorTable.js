// Interactive validation of the user input while loading the page
document.querySelectorAll("#CoursesTable tbody tr").forEach((row) => {
    attachValidationListeners(row)
})
document.querySelectorAll("#CoursesTable tbody tr").forEach(attachValidationListeners)

const courses = [
    {id: 1, name: "מבוא לכלכלה", credits: 3.5},
    {id: 2, name: "מבוא למערכות מידע", credits: 3.0},
    {id: 3, name: "מבוא לחשבונאות פיננסית", credits: 3.5},
    {id: 4, name: "מבוא להנדסת תעשיה וניהול", credits: 1.0},
    {id: 5, name: "חדו״א 1 להנדסה", credits: 5.0},
    {id: 6, name: "מבוא למתמטיקה דיסקרטית", credits: 3.5},
    {id: 7, name: "אלגברה ליניארית להנדסה", credits: 4.5},
    {id: 8, name: "חקר ביצועים 1", credits: 3.5},
    {id: 9, name: "גרפיקה הנדסית וממוחשבת", credits: 1.5},
    {id: 10, name: "מבוא לתכנות", credits: 4.0},
    {id: 11, name: "מבוא להסתברות", credits: 3.5},
    {id: 12, name: "חדו״א להנדסת תעשיה וניהול 2", credits: 4.0},
    {id: 13, name: "משוואות דיפרנציאליות רגילות", credits: 3.5},
    {id: 14, name: "סדנת כתיבה מדעית", credits: 0.5},
    {id: 15, name: "חקר ביצועים 2", credits: 3.5},
    {id: 16, name: "תכנון ופקוח על היצור 1", credits: 4.0},
    {id: 17, name: "פיתוח תוכנה מונחה עצמים", credits: 3.5},
    {id: 18, name: "אמידה ומבחני השערות", credits: 3.5},
    {id: 19, name: "יסודות האלגוריתמים והסיבוכיות", credits: 3.5},
    {id: 20, name: "פיסיקה 1ב", credits: 3.5},
    {id: 21, name: "תכנון ופקוח על היצור 2", credits: 4.0},
    {id: 22, name: "בסיסי נתונים", credits: 3.5},
    {id: 23, name: "הנדסת שיטות ותהליכים ארגוניים", credits: 4.0},
    {id: 24, name: "מבוא להנ׳ מכונות ותהליכי ייצור", credits: 3.5},
    {id: 25, name: "פיסיקה 2ב", credits: 3.5},
    {id: 26, name: "אנגלית מתקדמים ב׳", credits: 2.0},
    {id: 27, name: "מבוא להנדסת גורמי אנוש", credits: 3.0},
    {id: 28, name: "מבוא לקבלת החלטות", credits: 3.0},
    {id: 29, name: "מבוא להנדסת חשמל", credits: 3.5},
    {id: 30, name: "סימולציה", credits: 4.0},
    {id: 31, name: "סדנת מיומנויות בתקשורת בינאישית", credits: 0.5},
    {id: 32, name: "ניתוח ועיצוב מע׳-מידע", credits: 3.5},
    {id: 33, name: "מודלים של רגרסיה ליניארית", credits: 3.5}
]

// Event listener for opening selection lists dynamically
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".btnSelect")
        if (btn) {
            e.preventDefault()
            const container = btn.parentElement
            let choiceLists = container.querySelector(".choiceLists")
            // Toggle dropdown visibility
            if (choiceLists.classList.contains("openList")) {
                choiceLists.classList.add("hiddenList")
                choiceLists.classList.remove("openList")
                return
            }
            // Close other dropdowns
            document.querySelectorAll(".choiceLists.openList").forEach(list => {
                list.classList.add("hiddenList")
                list.classList.remove("openList")
            })
            // Clear and populate dropdown dynamically
            choiceLists.innerHTML = ""
            const ul = document.createElement("ul")
            ul.classList.add("theList")

            courses.forEach(course => {
                const li = document.createElement("li")
                li.classList.add("listItem")
                li.textContent = course.name
                li.setAttribute("data-value", course.id)
                // Selecting a course
                li.addEventListener("click", (e) => {
                    const selectedText = e.target.textContent
                    const selectedValue = e.target.getAttribute("data-value")
                    const btnSpan = btn.querySelector("span")
                    const hiddenInput = container.querySelector('input[type="hidden"]')
                    if (btnSpan) btnSpan.textContent = selectedText
                    if (hiddenInput) hiddenInput.value = selectedValue
                    // Close dropdown
                    choiceLists.classList.add("hiddenList")
                    choiceLists.classList.remove("openList")
                })
                ul.appendChild(li)
            })
            choiceLists.appendChild(ul)
            choiceLists.classList.remove("hiddenList")
            choiceLists.classList.add("openList")
        }
    })
})

document.addEventListener("click", (e) => {
    if (!e.target.closest(".btnSelect") && !e.target.closest(".choiceLists")) {
        document.querySelectorAll(".choiceLists.openList").forEach(list => {
            list.classList.add("hiddenList")
            list.classList.remove("openList")
        })
    }
})

document.addEventListener("dblclick", (e) => {
    const btn = e.target.closest(".btnSelect")
    if (btn) {
        e.stopPropagation()
        const container = btn.parentElement
        let inputField = container.querySelector('.manualCourseInput')
        // Hide dropdown if open
        container.querySelector('.choiceLists').classList.add("hiddenList")
        if (!inputField) {
            inputField = document.createElement('input')
            inputField.type = 'text'
            inputField.classList.add('manualCourseInput')
            inputField.placeholder = "הקלד שם קורס"
            inputField.dir = "rtl"
            btn.style.display = "none"
            container.appendChild(inputField)
            inputField.focus()
            inputField.addEventListener('blur', () => saveManualInput(inputField, btn))
            inputField.addEventListener('keydown', (event) => {
                if (event.key === "Enter") {
                    event.preventDefault()
                    saveManualInput(inputField, btn)
                }
            })
        }
    }
})

// Function to save manual input and restore button
const saveManualInput = (inputField, btn) => {
    if (inputField.value.trim() !== "") {
        btn.querySelector("span").textContent = inputField.value.trim()
    }
    inputField.remove()
    btn.style.display = "flex" // Show dropdown button again
}

// Adding new row
const addNewCourseRow = () => {
    const tableBody = document.querySelector("#CoursesTable tbody")
    // Create a new row
    const newRow = document.createElement("tr")

    // Create the first cell (Popup menu)
    const popupCell = document.createElement("td")
    const popupContainer = document.createElement("div")
    popupContainer.classList.add("PopupMenuContainer")
    const extraActionsButton = document.createElement("button")
    extraActionsButton.classList.add("extraActionsButton")
    extraActionsButton.textContent = "..."
    const popupMenu = document.createElement("div")
    popupMenu.classList.add("PopupActionsMenu")
    // List of popup menu actions
    const menuItems = [
        {action: "PtorCredits", text: "הגדר כפטור נק״ז"},
        {action: "delete", text: "מחק קורס"},
        {action: "edit", text: "ערוך קורס"},
        {action: "details", text: "פרטים נוספים"}
    ]
    menuItems.forEach(item => {
        const menuItem = document.createElement("div")
        menuItem.classList.add("menu-item")
        menuItem.setAttribute("data-action", item.action)
        menuItem.textContent = item.text
        popupMenu.appendChild(menuItem)
    })
    popupContainer.appendChild(extraActionsButton)
    popupContainer.appendChild(popupMenu)
    popupCell.appendChild(popupContainer)
    newRow.appendChild(popupCell)

    // Create the second cell (Course selection)
    const courseCell = document.createElement("td")
    courseCell.classList.add("tdInput", "ThickTd")
    const inputContainer = document.createElement("div")
    inputContainer.classList.add("InputCourseContainer")
    const btnSelect = document.createElement("div")
    btnSelect.classList.add("btnSelect")
    const btnText = document.createElement("span")
    btnText.textContent = "הקלד קורס או בחר מהרשימה"
    const arrowIcon = document.createElement("img")
    arrowIcon.src = "../static/SVG/triangle-down.svg"
    arrowIcon.alt = "arrow"
    arrowIcon.classList.add("ArrowIcon")
    btnSelect.appendChild(btnText)
    btnSelect.appendChild(arrowIcon)

    const choiceLists = document.createElement("div")
    choiceLists.classList.add("choiceLists", "hiddenList")
    const hiddenInput = document.createElement("input")
    hiddenInput.type = "hidden"
    hiddenInput.name = "course"
    const errorMessage = document.createElement("span")
    errorMessage.classList.add("error-message")

    inputContainer.appendChild(btnSelect)
    inputContainer.appendChild(choiceLists)
    inputContainer.appendChild(hiddenInput)
    inputContainer.appendChild(errorMessage)
    courseCell.appendChild(inputContainer)
    newRow.appendChild(courseCell)

    // Create the third cell (Credits input)
    const creditsCell = document.createElement("td")
    creditsCell.classList.add("tdInput")
    const creditsInput = document.createElement("input")
    creditsInput.type = "number"
    creditsInput.step = "0.5"
    creditsInput.min = "0"
    creditsInput.max = "10"
    creditsCell.appendChild(creditsInput)
    creditsCell.appendChild(errorMessage.cloneNode())
    newRow.appendChild(creditsCell)

    // Create the fourth cell (Final grade input)
    const gradeCell = document.createElement("td")
    gradeCell.classList.add("tdInput")
    const gradeInput = document.createElement("input")
    gradeInput.type = "number"
    gradeInput.step = "1"
    gradeInput.min = "0"
    gradeInput.max = "100"
    gradeCell.appendChild(gradeInput)
    gradeCell.appendChild(errorMessage.cloneNode())
    newRow.appendChild(gradeCell)

    // Create the fifth cell (Component grade button)
    const componentCell = document.createElement("td")
    componentCell.classList.add("tdInput", "gradeByComponents")
    const componentButton = document.createElement("button")
    componentButton.classList.add("GPAButton")
    componentButton.textContent = "ציון לפי מרכיבים"
    const popupComponentsWindow = document.createElement("div")
    popupComponentsWindow.classList.add("popupComponentsWindow", "hiddenWindow")

    //createComponentsPopupWindow(popupComponentsWindow)
    componentButton.addEventListener('click', () => {
        createComponentsPopupWindow(popupComponentsWindow)
        popupComponentsWindow.classList.remove("hiddenWindow")
        popupComponentsWindow.classList.add('openWindow')
    })

    componentCell.appendChild(componentButton)
    componentCell.appendChild(popupComponentsWindow)
    newRow.appendChild(componentCell)

    // Create sixth cell (Binary pass button)
    const binaryPassCell = document.createElement("td")
    binaryPassCell.classList.add("tdInput")
    const binaryButton = document.createElement("button")
    binaryButton.classList.add("GPAButton")
    binaryButton.textContent = "עובר בינארי"
    const binaryButtonSpan = document.createElement("span")
    binaryButtonSpan.classList.add("error-message")
    binaryPassCell.append(binaryButton, binaryButtonSpan)
    newRow.appendChild(binaryPassCell)

    // Append the new row to the table
    tableBody.appendChild(newRow)
    // Attach validation listeners to the new row
    attachValidationListeners(newRow)
    // Attach event listener to the new "Grade by components" button
    attachListenersToRow(newRow)

    if (typeof attachGPAButtonListeners === "function") {
        attachGPAButtonListeners()
    }
}

// Attach event listener to the "Add Course" button
document.addEventListener("DOMContentLoaded", () => {
    const addCourseButton = document.getElementById("AddCourseButton")
    if (addCourseButton) {
        addCourseButton.addEventListener("click", addNewCourseRow)
    } else {
        console.error("Error: AddCourseButton not found in the document.")
    }
})

// Event listener to follow the additional actions menu (3 dots menu)
document.addEventListener('click', (event) => {
    const button = event.target.closest('.extraActionsButton')
    if (button) {
        const menu = button.nextElementSibling
        const row = button.closest('tr')
        // Show or hide the menu
        const openMenus = document.querySelectorAll('.PopupActionsMenu[style="display: block;"]')
        if (openMenus.length > 0) {
            openMenus.forEach(openMenu => {
                openMenu.style.display = 'none'
            })
        }
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'
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


// ----------------------------------Validations----------------------------------
document.addEventListener("input", () => validateAllCourseNames())
// Add event listeners to all input fields dynamically when a row is added
function attachValidationListeners(row) {
    const courseSelectSpan = row.querySelector('.btnSelect span')
    const manualInput = row.querySelector('.manualCourseInput')
    const creditsInput = row.querySelector('input[type="number"][step="0.5"]')
    const gradeInput = row.querySelector('input[type="number"][step="1"]')
    // Add event listeners for real-time validation
    if (courseSelectSpan) {
        new MutationObserver(() => validateAllCourseNames()).observe(courseSelectSpan, { childList: true })
    }
    if (manualInput) {
        manualInput.addEventListener("input", () => validateAllCourseNames())
    }
    creditsInput.addEventListener('input', () => validateCredits(creditsInput))
    gradeInput.addEventListener('input', () => validateGrade(gradeInput))
}

function validateAllCourseNames() {
    const allCourseNames = Array.from(document.querySelectorAll('.btnSelect span'))
        .map(el => el.textContent.trim())
        .filter(name => name !== "הקלד קורס או בחר מהרשימה")
    document.querySelectorAll("#CoursesTable tbody tr").forEach(row => {
        const courseSelectSpan = row.querySelector('.btnSelect span')
        if (!courseSelectSpan) return
        const courseName = courseSelectSpan.textContent.trim()
        const errorSpan = row.querySelector('.error-message') || createErrorSpan(row)
        const duplicate = allCourseNames.filter(name => name === courseName).length > 1
        if (duplicate) {
            errorSpan.textContent = 'הקורס כבר קיים בסמסטר- נא לתקן'
            row.classList.add('invalid')
        } else {
            errorSpan.textContent = ''
            row.classList.remove('invalid')
        }
    })
}

// Validate credits (0.5 to 10, multiples of 0.5)
function validateCredits(input) {
    const errorSpan = input.parentElement.querySelector('.error-message') || createErrorSpan(input)
    const value = parseFloat(input.value)
    if (isNaN(value)) {
        errorSpan.textContent = 'יש להזין מספר בלבד'
        input.classList.add('invalid')
    } else if (value < 0.5 || value > 10) {
        errorSpan.textContent = 'בין 0.5 ל-10 בלבד'
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
        errorSpan.textContent = 'ציון בין 0 ל-100'
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
            // Make all inputs editable
            const inputs = row.querySelectorAll('input')
            inputs.forEach(input => {
                input.removeAttribute('readonly') //Allow Editing
                input.parentElement.style.opacity = "1"
            })

            // Restore course name selection
            const courseData = getCourseName(row)
            const courseElement = courseData.element
            const isManual = courseData.isManual
            if (isManual && courseElement) {
                courseElement.removeAttribute("readonly") // Allow editing manual input
                courseElement.style.pointerEvents = "auto"
                courseElement.style.opacity = "1"
            } else if (!isManual && courseElement) {
                // Restore dropdown functionality
                courseElement.parentElement.classList.remove("locked-course")
                courseElement.parentElement.style.pointerEvents = "auto"
                courseElement.parentElement.style.opacity = "1"
            }

            break
        case 'details':
            console.log('פעולות נוספות הוצגו')
            break
        default:
            console.log('פעולה אינה ידועה')
    }
}

// Media Query
const finalGradeTitle = document.querySelector('.tdFinalGrade')
const originalTitle = finalGradeTitle.textContent
const updateTitleBasedOnWidth = () => {
    if (window.innerWidth < 800) {
        finalGradeTitle.textContent = 'ציון'
    } else {
        finalGradeTitle.textContent = originalTitle
    }
}
updateTitleBasedOnWidth()
window.addEventListener('resize', (e) => {
    e.preventDefault()
    updateTitleBasedOnWidth()
})
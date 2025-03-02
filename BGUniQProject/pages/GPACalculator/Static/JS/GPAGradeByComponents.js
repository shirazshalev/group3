// Function to handle dropdown functionality in first cell
function firstCellEventListener(firstCell) {
    if (!firstCell) return

    firstCell.addEventListener('click', (e) => {
        e.preventDefault()
        // Remove any existing dropdowns before opening a new one
        document.querySelectorAll(".customDropdown").forEach(dropdown => dropdown.remove())

        // Create dropdown menu
        const dropdownList = document.createElement("ul")
        dropdownList.classList.add("customDropdown")
        // Define options
        const options = [
            { value: "FinalGradeExamA", text: "מבחן סופי - מועד א׳" },
            { value: "FinalGradeExamB", text: "מבחן סופי - מועד ב׳" },
            { value: "Project", text: "פרויקט" },
            { value: "Exercises", text: "תרגילי בית"},
            { value: "Other", text: "אחר"}
        ]
        options.forEach(option => {
            const listItem = document.createElement("li")
            listItem.classList.add("listItem")
            listItem.textContent = option.text
            listItem.setAttribute("data-value", option.value)
            listItem.addEventListener("click", (e) => {
                e.stopPropagation() // Prevent event bubbling
                firstCell.textContent = option.text // Set selected option text
                firstCell.setAttribute("data-value", option.value) // Save selected value
                dropdownList.remove() // Close dropdown
            })
            dropdownList.appendChild(listItem)
        })

        // Append dropdown to firstCell
        firstCell.appendChild(dropdownList)
    })
}

// Function to create the popup window dynamically
// Grade By Components pop-up window HTML:
function createComponentsPopupWindow(popupComponentsWindow) {
    popupComponentsWindow.innerHTML = ""

    // Close button:
    const closeButton = document.createElement('div') // <div></div>
    closeButton.classList.add('closeButton') // creating new class
    const closeBtn = document.createElement('button') // <button></button>
    closeBtn.id = 'closePopupBtn' // creating new id
    const closeButtonIcon = document.createElement('img') // <img></img>
    closeButtonIcon.src = "../static/SVG/x.svg" // Fixed incorrect file name
    closeButtonIcon.classList.add('closeIcon') // creating new class
    // Hierarchical tag structure:
    closeBtn.appendChild(closeButtonIcon) // img son of button
    closeButton.appendChild(closeBtn) // button son of div
    popupComponentsWindow.appendChild(closeButton) // div is internal Element of the popupWindow

    // Popup window content:
    const popupTable = document.createElement('table') // <table></table>
    popupTable.classList.add('additionalComponents') // creating new class

    const colgroup = document.createElement('colgroup')
    const col1 = document.createElement('col1')
    col1.style.width = "60%"
    const col2 = document.createElement('col2')
    col2.style.width = "20%"
    const col3 = document.createElement('col3')
    col3.style.width = "20%"
    colgroup.append(col1, col2, col3)
    popupTable.appendChild(colgroup)

    const popupComponentsHeader = document.createElement('thead') // <thead></thead>
    popupComponentsHeader.classList.add('popupHeader') // creating new class
    const popupTitles = document.createElement('tr') // <tr></tr>
    popupTitles.classList.add('titles') // creating new class
    const firstCellTitle = document.createElement('th') // <th></th>
    firstCellTitle.classList.add('componentName') // creating new class
    firstCellTitle.textContent = `מרכיב ציון`
    const secondCellTitle = document.createElement('th') // <th></th>
    secondCellTitle.classList.add('componentWeight') // creating new class
    secondCellTitle.textContent = `%`
    const thirdCellTitle = document.createElement('th') // <th></th>
    thirdCellTitle.classList.add('componentGrade') // creating new class
    thirdCellTitle.textContent = `ציון המרכיב`
    // Hierarchical tag structure:
    popupTitles.append(firstCellTitle, secondCellTitle, thirdCellTitle) // td sons of tr
    popupComponentsHeader.appendChild(popupTitles) // tr son of thead

    // Table body:
    const tableBody = document.createElement('tbody') // <tbody></tbody>
    tableBody.classList.add('PopupBody') // creating new class
    const bodyRow = document.createElement('tr') // <tr></tr>
    bodyRow.classList.add('GradeComponentRow') // creating new class
    const firstCell = document.createElement('td') // <td></td>
    firstCell.classList.add('ComponentInRow', 'componentsList') // creating new classes
    firstCell.style.width = "60%"
    firstCell.textContent = `בחר מרכיב`
    firstCellEventListener(firstCell)

    const secondCell = document.createElement('td') // <td></td>
    secondCell.classList.add('ComponentInRow') // creating new class
    secondCell.style.width = "20%"
    const thirdCell = document.createElement('td') // <td></td>
    thirdCell.classList.add('ComponentInRow') // creating new class
    thirdCell.style.width = "20%"

    const inputWeight = document.createElement('input')
    inputWeight.type = 'number'
    inputWeight.step = "1"
    inputWeight.min = "0"
    inputWeight.max = "100"
    inputWeight.classList.add('ComponentPercentage') // creating new class
    const inputGrade = document.createElement('input')
    inputGrade.type = 'number'
    inputGrade.step = "1"
    inputGrade.min = "0"
    inputGrade.max = "100"
    inputGrade.classList.add('ComponentGrade') // creating new class

    // Hierarchical tag structure:
    secondCell.appendChild(inputWeight)
    thirdCell.appendChild(inputGrade)

    bodyRow.append(firstCell, secondCell, thirdCell) // th sons of tr
    tableBody.appendChild(bodyRow) // tr son of tbody
    popupTable.append(popupComponentsHeader, tableBody)
    popupComponentsWindow.appendChild(popupTable)

    const popupFooter = document.createElement('div') // <div></div>
    popupFooter.classList.add('popupFooter') // creating new class
    const actionButtonSave = document.createElement('button') // <button></button>
    actionButtonSave.id = 'SaveComponentGrade' // creating new id
    actionButtonSave.classList.add('ActionButton') // creating new class
    actionButtonSave.textContent = `שמור`
    const actionButtonDelete = document.createElement('button') // <button></button>
    actionButtonDelete.id = 'CancelComponentGrade' // creating new id
    actionButtonDelete.classList.add('ActionButton') // creating new class
    actionButtonDelete.textContent = `מחק`
    const actionButtonAddComponent = document.createElement('button') // <button></button>
    actionButtonAddComponent.id = 'AddComponentBTN' // creating new id
    actionButtonAddComponent.classList.add('ActionButton') // creating new class
    actionButtonAddComponent.textContent = `+ מרכיב ציון נוסף`
    // Hierarchical tag structure:
    popupFooter.append(actionButtonSave, actionButtonDelete, actionButtonAddComponent)
    popupComponentsWindow.appendChild(popupFooter)

    actionButtonAddComponent.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("לחיצה על הוספת מרכיב ציון נוסף")
        addComponentRow(popupComponentsWindow)
    })
}

function addComponentRow(popupWindow) {
    if (!popupWindow) return
    const tableBody = popupWindow.querySelector('.PopupBody')
    if (!tableBody) return

    const bodyRow = document.createElement('tr')
    bodyRow.classList.add('GradeComponentRow')
    const firstCell = document.createElement('td')
    firstCell.classList.add('ComponentInRow', 'componentsList')
    firstCell.style.width = "60%"
    firstCell.textContent = `בחר מרכיב`
    const secondCell = document.createElement('td')
    secondCell.classList.add('ComponentInRow')
    secondCell.style.width = "20%"
    const thirdCell = document.createElement('td')
    thirdCell.classList.add('ComponentInRow')
    thirdCell.style.width = "20%"

    const inputWeight = document.createElement('input')
    inputWeight.type = 'number'
    inputWeight.step = "1"
    inputWeight.min = "0"
    inputWeight.max = "100"
    inputWeight.classList.add('ComponentPercentage')
    const inputGrade = document.createElement('input')
    inputGrade.type = 'number'
    inputGrade.step = "1"
    inputGrade.min = "0"
    inputGrade.max = "100"
    inputGrade.classList.add('ComponentGrade')

    secondCell.appendChild(inputWeight)
    thirdCell.appendChild(inputGrade)
    bodyRow.append(firstCell, secondCell, thirdCell)
    tableBody.appendChild(bodyRow)
    firstCellEventListener(firstCell)
}

// Remove function Last Row of Component
function removeLastComponentRow(popupWindow) {
    if (!popupWindow) return
    const tableBody = popupWindow.querySelector('.PopupBody')
    if (!tableBody) return
    //const tableBody = document.querySelector('.PopupBody')
    const rows = tableBody.querySelectorAll('.GradeComponentRow')
    // Ensure at least one row remains
    if (rows.length > 1) {
        rows[rows.length - 1].remove()
    }
}

// Event listener to OPEN the grade-by-components popup dynamically
document.querySelector('.GPAButton').addEventListener('click', () => {
    const popup = document.querySelector('.popupComponentsWindow')
    createComponentsPopupWindow(popup)
    popup.classList.remove("hiddenWindow")
    popup.classList.add('openWindow')
})

// Event listener to CLOSE the grade-by-components popup dynamically
const popupComponentsWindow = document.querySelector('.popupComponentsWindow')
document.addEventListener('click', (e) => {
        if (e.target.classList.contains('closeIcon')) {
            e.preventDefault()
            popupComponentsWindow.classList.add("hiddenWindow")
            popupComponentsWindow.classList.remove("openWindow")
        }
})

// Event Listener DELETE (Remove) last component row
document.addEventListener("click", (e) => {
    const button = e.target.closest("#CancelComponentGrade")
    if (!button) return
    e.preventDefault()
    const popupWindow = button.closest(".popupComponentsWindow")
    if (!popupWindow) {
        console.error("Error: No popup window found for CancelComponentGrade")
        return
    }
    removeLastComponentRow(popupWindow)
})

function isCustomAlertOpen() {
    const alertBox = document.getElementById('Alert')
    return alertBox && !alertBox.classList.contains('hidden')
}

// Save grade by components Function & validation and calculation of the course final grade
function saveGradeByComponents(popupWindow) {
    if (!popupWindow) return
    const tableBody = popupWindow.querySelector('.PopupBody')
    if (!tableBody) return

    const rows = tableBody.querySelectorAll('.GradeComponentRow')

    const errorMessages = [] // Store error messages
    let totalPercentage = 0 // To check sum of percentages
    const gradeData = []
    let hasFinalGradeExamB = false // Flag to check if Moad B exists
    let finalExamWeights = {} // To store weights of Moad A and Moad B

    // Validate each row
    rows.forEach((row, index) => {
        const componentCell = row.querySelector(".componentsList")
        const dropdownText = componentCell ? componentCell.textContent.trim() : ""
        const dropdownValue = componentCell ? componentCell.getAttribute("data-value") : ""
        const percentageInput = row.querySelector('.ComponentPercentage')
        const gradeInput = row.querySelector('.ComponentGrade')
        const percentageValue = parseFloat(percentageInput.value)
        const gradeValue = parseFloat(gradeInput.value)

        // Check if Moad B exists
        if (dropdownValue === 'FinalGradeExamB') {
            hasFinalGradeExamB = true
        }
        // Store weights for Moad A and Moad B
        if (dropdownValue === 'FinalGradeExamA' || dropdownValue === 'FinalGradeExamB') {
            finalExamWeights[dropdownValue] = percentageValue
        }
        // Validate dropdown (component must be selected)
        if (!dropdownValue) {
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
        if (gradeData.some(item => item.component === dropdownValue)) {
            errorMessages.push(`שורה ${index + 1}: לא ניתן להזין את אותו מרכיב פעמיים`)
        }
        // If all validations pass, add data to gradeData
        if (dropdownValue && !isNaN(percentageValue) && percentageValue >= 0 && percentageValue <= 100 &&
            !isNaN(gradeValue) && gradeValue >= 0 && gradeValue <= 100 &&
            !gradeData.some(item => item.component === dropdownValue)) {
            gradeData.push({component: dropdownValue, percentage: percentageValue, grade: gradeValue})
        }
    })

    // Check if Moad A and Moad B weights are identical if both exist
    if ('FinalGradeExamA' in finalExamWeights && 'FinalGradeExamB' in finalExamWeights) {
        if (finalExamWeights['FinalGradeExamA'] !== finalExamWeights['FinalGradeExamB']) {
            errorMessages.push(`משקלי המועדים א׳ ו-ב׳ צריכים להיות זהים`)
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
        const relatedRow = popupWindow.closest('tr')
        if (relatedRow) {
            relatedRow.querySelector('input[type="number"][step="1"]').value = weightedAverage.toFixed(2)
        } else {
            console.error("Error: Could not find related row to update the final grade")
        }
    }
}

// Event Listener SAVE components
document.addEventListener("click", (e) => {
    const button = e.target.closest("#SaveComponentGrade")
    if (!button) return
    e.preventDefault()
    const popupWindow = button.closest(".popupComponentsWindow")
    if (!popupWindow) {
        console.error("Error: No popup window found for SaveComponentGrade")
        return
    }
    saveGradeByComponents(popupWindow)
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
    const popup = row.querySelector(".popupComponentsWindow")
    const saveComponentButton = popup.querySelector("#SaveComponentGrade")
    const cancelComponentButton = popup.querySelector("#CancelComponentGrade")

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('closeIcon')) {
            e.preventDefault()
            popup.classList.add("hiddenWindow")
            popup.classList.remove("openWindow")
        }
    })
    // Listener for delete button
    cancelComponentButton.addEventListener('click', (e) => {
        e.preventDefault()
        removeLastComponentRow(popup)
    })
    saveComponentButton.addEventListener('click', (e) => {
        e.preventDefault()
        saveGradeByComponents(popup)
    })
}

// CLOSE the dropdown list of componentsNames
document.addEventListener("click", (e) => {
    if (!e.target.closest(".customDropdown") && !e.target.closest(".componentsList")) {
        document.querySelectorAll(".customDropdown").forEach(dropdown => dropdown.remove())
    }
})

// document.addEventListener("DOMContentLoaded", () => {
//     const popupComponentsWindow = document.querySelector('.popupComponentsWindow')
//     document.addEventListener('click', (e) => {
//         // Ensure the clicked element is a "Grade by Components" button
//         const btn = e.target.closest(".gradeByComponentsBtn")
//         if (btn) {
//             e.preventDefault()
//             // Clear old content and create new content
//             createComponentsPopupWindow(popupComponentsWindow)
//             // Open the popup window
//             popupComponentsWindow.classList.remove("hiddenWindow")
//             popupComponentsWindow.classList.add("openWindow")
//         }
//     })
//
//     //Event listener to close the popup window when clicking the close button
//     document.addEventListener('click', (e) => {
//         if (e.target.classList.contains('closeIcon')) {
//             e.preventDefault()
//             popupComponentsWindow.classList.add("hiddenWindow")
//             popupComponentsWindow.classList.remove("openWindow")
//         }
//     })
// })

// document.addEventListener("click", (e) => {
//     if (e.target.id === "AddComponentBTN") {
//         e.preventDefault()
//         addComponentRow()
//     }
// })

// // Listener for delete button
// document.addEventListener("click", (e) => {
//     if (e.target.id === "CancelComponentGrade") {
//         e.preventDefault()
//         removeLastComponentRow()
//     }
// })
// Next semester's courses Array:
// const courses = [
//     {id: 1, name: "יסודות המימון לתעו״נ", credits: 3.0, grade: 85},
//     {id: 2, name: "אוטומציה", credits: 4.0, grade: 85},
//     {id: 3, name: "תשתית טכנולוגיות מידע", credits: 3.0, grade: 85},
//     {id: 4, name: "ניהול פרוייקטים", credits: 3.0, grade: 85},
//     {id: 5, name: "מערכות בינה עסקית (BI)", credits: 3.0, grade: 85},
//     {id: 6, name: "הנדסת איכות", credits: 3.5, grade: 85},
//     {id: 7, name: "בניית מערכות ממוחשבות מבוססות אינטרנט (WEB)", credits: 3.0, grade: 85}
// ]

const courses = []
document.querySelectorAll('.courseItem').forEach((courseItem) => {
    courses.push({
        id: courseItem.dataset.courseId,
        name: courseItem.textContent.trim(),
        credits: parseFloat(courseItem.dataset.credits),
        grade: parseFloat(courseItem.dataset.grade)
    })
})

// Side calculations:
let totalCredits = 0
let sumOfGrades = 0
courses.forEach((course) => {
    sumOfGrades = sumOfGrades + (course.grade * course.credits)
    totalCredits = totalCredits + course.credits
})

// Creating a pop-up selection list:
const btnSelect = document.querySelector('.btnSelect')
const popupCoursesList = document.querySelector('.popupCoursesList')
btnSelect.addEventListener('click', (e) => {
    e.preventDefault()
    const isHidden = popupCoursesList.classList.toggle("hiddenList") // True if there is no class named hiddenList & the class will be added
    popupCoursesList.classList.toggle("openList", !isHidden)
})

// Adding a V in each checkbox:
const selectedCourse = document.querySelectorAll('.courseItem')
selectedCourse.forEach((courseItem) => {
    courseItem.addEventListener('click', (e) => {
        e.preventDefault()
        const checkbox = courseItem.querySelector('.checkbox')
        let vIcon = checkbox.querySelector('.vIcon')
        if (!vIcon) {
            vIcon = document.createElement('img')
            vIcon.src = "../static/SVG/v-check.svg"
            vIcon.classList.add('vIcon', 'vIconHidden') // create class for CSS
            checkbox.appendChild(vIcon) // internal Element of checkbox
        }
        vIcon.classList.toggle('vIconHidden')
        checkbox.classList.toggle("active")
    })
})

// Update Indicators:
let selectedCourses = {} // All the sliders
const coursesList = document.querySelector('.coursesList')
const indicatorValues = document.querySelectorAll('.indicatorValue')
const newGPA = indicatorValues[1]
const GPA = sumOfGrades / totalCredits
let tempGPA = sumOfGrades / totalCredits
newGPA.textContent = String(tempGPA.toFixed(2))
const semesterAVG = document.getElementById('semesterAVG')

const calculatedAverage = () => {
    let tempSum = 0
    courses.forEach(course => {
        const courseId = course.id
        if (selectedCourses[courseId]) {
            const slider = selectedCourses[courseId].querySelector('input[type="range"]')
            const sliderValue = parseFloat(slider.value)
            tempSum = tempSum + (sliderValue * course.credits)
        } else {
            tempSum = tempSum + (course.grade * course.credits)
        }
    })
    const updateGPA = tempSum / totalCredits
    newGPA.textContent = String(updateGPA.toFixed(2))
    tempGPA = updateGPA

    calculateSemesterAVG()
}

// EventListener Slider's Value:
const sliderValue = document.createElement('div')
sliderValue.classList.add('sliderValue') // creating new class
document.body.append(sliderValue)
const showValue = (input, e) => {
    const valueS = input.value
    sliderValue.textContent = valueS
    sliderValue.style.opacity = '1'
    sliderValue.style.visibility = 'visible'
    // Position
    sliderValue.style.top = (e.pageY + 10) + 'px'
    sliderValue.style.left = (e.pageX + 10) + 'px'
}

const hideValue = () => {
    sliderValue.style.opacity = '0'
    sliderValue.style.visibility = 'hidden'
}

const observeSliders = () => {
    const inputInSlider = document.querySelectorAll('input[type="range"]')
    inputInSlider.forEach(input => {
        input.addEventListener('input', (e) => {
            showValue(input, e)
        })
        input.addEventListener('mousemove', (e) => {
            showValue(input, e)
        })
        input.addEventListener('mouseout', () => {
            hideValue()
        })
    })
}

// Creating the Sliders:
Array.from(coursesList.children).forEach((item) => {
    item.addEventListener('click', (e) => { // For each course selection in the choice list
        e.preventDefault()

        const courseName = item.textContent.trim() // trim Deleting unnecessary spaces
        const chosenCourse = courses.find(course => course.name === courseName)
        if (chosenCourse) {
            const courseId = chosenCourse.id
            if (selectedCourses[courseId]) { // If the course has already been selected
                selectedCourses[courseId].remove()
                delete selectedCourses[courseId] // Delete the course's ID from sliders list
                calculatedAverage()
            } else {
                const rangeSliderSection = document.createElement('section') // <section></section>
                rangeSliderSection.classList.add('rangeSliderSection') // creating new class

                // Creating tags for the Slider:
                const rangeSliderDiv = document.createElement('div')
                rangeSliderDiv.classList.add('rangeSlider')
                const gradesRangeDiv = document.createElement('div')
                gradesRangeDiv.classList.add('gradesRange')
                //
                const maxValueDiv = document.createElement('div')
                maxValueDiv.classList.add('top', 'value')
                maxValueDiv.textContent = "100"
                const minValueDiv = document.createElement('div')
                minValueDiv.classList.add('down', 'value')
                minValueDiv.textContent = "0"
                // Input
                const inputSlider = document.createElement('input')
                inputSlider.type = 'range'
                inputSlider.id = "slider"
                inputSlider.min = "0"
                inputSlider.max = "100"
                inputSlider.value = chosenCourse.grade
                inputSlider.step = "1"

                // Courses Details:
                const chosenCourseDetails = document.createElement('div')
                chosenCourseDetails.classList.add('chosenCourse') // creating new class
                chosenCourseDetails.setAttribute('dataCourseId', courseId)
                // Creating tags inside:
                const courseNameSpan = document.createElement('span')
                courseNameSpan.textContent = chosenCourse.name
                const courseCreditsSpan = document.createElement('span')
                courseCreditsSpan.textContent = `נק״ז: ${chosenCourse.credits}`
                const courseTheGradeSpan = document.createElement('span')
                courseTheGradeSpan.classList.add('courseTheGradeSpan')
                courseTheGradeSpan.textContent = `ציון משוער`
                const courseGradeSpan = document.createElement('span')
                courseGradeSpan.classList.add('courseGradeSpan')
                courseGradeSpan.textContent = `${chosenCourse.grade}`
                // Hierarchical tag structure:
                gradesRangeDiv.append(maxValueDiv, inputSlider, minValueDiv)
                rangeSliderDiv.append(gradesRangeDiv)

                chosenCourseDetails.append(courseNameSpan, courseCreditsSpan, courseTheGradeSpan, courseGradeSpan)

                rangeSliderSection.appendChild(rangeSliderDiv)
                rangeSliderSection.appendChild(chosenCourseDetails)

                inputSlider.addEventListener('input', (e) => {
                    e.preventDefault()
                    courseGradeSpan.textContent = e.target.value
                    calculatedAverage()
                })
                const simulationContainer = document.getElementById('simulationContainer')
                simulationContainer.appendChild(rangeSliderSection)
                selectedCourses[courseId] = rangeSliderSection
                //observeSliders() // maybe later
            }
        }
    })
})

const calculateSemesterAVG = () => {
    let semesterSum = 0
    let semesterCredits = 0
    Object.values(selectedCourses).forEach(courseSection => {
        const slider = courseSection.querySelector('input[type="range"]')
        const courseCreditsSpan = courseSection.querySelector('span:nth-child(2)')

        if (!courseCreditsSpan) {
            console.error("לא נמצא אלמנט המכיל נקודות זכות")
            return
        }
        const courseCredits = parseFloat(courseCreditsSpan.textContent.replace(/\D/g, ''))
        const newGrade = parseFloat(slider.value)
        if (isNaN(courseCredits) || isNaN(newGrade)) {
            console.error("שגיאה: נתוני קורס לא תקינים", { courseCredits, newGrade })
            return
        }

        semesterSum += (newGrade * courseCredits);
        semesterCredits += courseCredits;
    })

    if (semesterCredits > 0) {
        const updateSemesterAVG = semesterSum / semesterCredits
        semesterAVG.textContent = updateSemesterAVG.toFixed(2)
    } else {
        semesterAVG.textContent = "0.00"
    }
}
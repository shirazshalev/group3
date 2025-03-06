// Variables:
let courses = []
let selectedCourses = {} // All the sliders - Selected courses
console.log(courses)
const coursesList = document.querySelector('.coursesList')
const indicatorValues = document.querySelectorAll('.indicatorValue')
const newGPA = indicatorValues[1]

const btnSelect = document.querySelector('.btnSelect')
const popupCoursesList = document.querySelector('.popupCoursesList')
btnSelect.addEventListener('click', (e) => {
    e.preventDefault()
    const isHidden = popupCoursesList.classList.toggle("hiddenList"); // True if there is no class named hiddenList & the class will be added
    popupCoursesList.classList.toggle("openList", !isHidden)
})

function fetchStudentCourses() {
    fetch('/get-student-courses')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                courses = data.courses
                populateCoursesList()
                //calculateGPA()
            } else {
                console.error("שגיאה בקבלת הנתונים", data.message)
            }
        })
        .catch(error => console.error("אירעה שגיאה בשליפת הנתונים מהשרת", error))
}

document.addEventListener("DOMContentLoaded", fetchStudentCourses)

// Puts the courses into the drop-down list:
function populateCoursesList() {
    const coursesList = document.querySelector('.coursesList')
    coursesList.innerHTML = '' // Clear the existing list

    if (courses.length === 0) {
        coursesList.innerHTML = '<li class="noCourses">אין קורסים שמורים במערכת</li>'
        return
    }

    courses.forEach(course => {
        const listItem = document.createElement('li')
        listItem.classList.add('courseItem')
        listItem.setAttribute('data-course-id', course.id)
        listItem.setAttribute('data-course-credits', course.credits)
        listItem.setAttribute('data-course-grade', course.grade)
        listItem.innerHTML = `<span class="checkbox"></span> ${course.name}`
        coursesList.appendChild(listItem)
    })

    const selectedCourse = document.querySelectorAll('.courseItem')
    selectedCourse.forEach((courseItem) => {
        courseItem.addEventListener('click', (e) => {
            console.log("האזנה ויצירת וי")
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

    // Running the slider logic only after data is available:
    setupCourseSelection()
}

function setupCourseSelection() {
    Array.from(document.querySelector('.coursesList').children).forEach((item) => {
        item.addEventListener('click', (e) => { // For each course selection in the choice list
                e.preventDefault()
                const courseId = Number(item.getAttribute('data-course-id'))
                console.log("Parsed courseId:", courseId)
                const chosenCourse = courses.find(course => Number(course.id) === courseId)
                console.log("Chosen course:", chosenCourse)

                if (chosenCourse) {
                    // const courseId = chosenCourse.id
                    if (selectedCourses[courseId]) { // If the course has already been selected
                        selectedCourses[courseId].remove()
                        delete selectedCourses[courseId] // Delete the course's ID from sliders list
                        calculatedAverage()
                    } else {
                        createSlider(chosenCourse)
                    }
                }
            }
        )
    })
}

function createSlider(course) {
    // courseId >> course.id
    // chosenCourse.name >> course.name
    // chosenCourse.grade >> course.grade
    const rangeSliderSection = document.createElement('section') // <section></section>
    rangeSliderSection.classList.add('rangeSliderSection') // creating new class
    const chosenCourseDetails = document.createElement('div')
    chosenCourseDetails.classList.add('chosenCourse') // creating new class
    chosenCourseDetails.setAttribute('dataCourseId', course.id)
    // Creating tags inside:
    const courseNameSpan = document.createElement('span')
    courseNameSpan.textContent = course.name
    const courseGradeSpan = document.createElement('span')
    courseGradeSpan.textContent = `ציון נוכחי: ${course.grade}`
    // Creating tags for the Slider:
    const rangeSliderDiv = document.createElement('div')
    rangeSliderDiv.classList.add('rangeSlider')
    const rangeSliderValueDiv = document.createElement('div')
    rangeSliderValueDiv.classList.add('rangeSliderValue')
    const rangeSliderValueSpan = document.createElement('span')
    rangeSliderValueSpan.textContent = course.grade

    const startingPositionPercent = ((course.grade) / 100) * 100
    rangeSliderValueSpan.style.left = `calc(${startingPositionPercent}% - 37px)`

    const gradesRangeDiv = document.createElement('div')
    gradesRangeDiv.classList.add('gradesRange')

    //
    const maxValueDiv = document.createElement('div')
    maxValueDiv.classList.add('right', 'value')
    maxValueDiv.textContent = "100"
    const minValueDiv = document.createElement('div')
    minValueDiv.classList.add('left', 'value')
    minValueDiv.textContent = "0"
    // Input
    const inputSlider = document.createElement('input')
    inputSlider.type = 'range'
    inputSlider.id = "slider" // ????
    inputSlider.min = "0"
    inputSlider.max = "100"
    inputSlider.value = course.grade
    inputSlider.step = "1"

    // Hierarchical tag structure:
    chosenCourseDetails.append(courseNameSpan, courseGradeSpan)
    rangeSliderSection.appendChild(chosenCourseDetails)
    rangeSliderValueDiv.appendChild(rangeSliderValueSpan)
    gradesRangeDiv.append(maxValueDiv, inputSlider, minValueDiv)
    rangeSliderDiv.append(rangeSliderValueDiv, gradesRangeDiv)
    rangeSliderSection.append(rangeSliderDiv)

    inputSlider.addEventListener('input', (e) => {
        e.preventDefault()
        const value = e.target.value
        rangeSliderValueSpan.textContent = value
        const min = parseInt(inputSlider.min)
        const max = parseInt(inputSlider.max)
        const percent = ((value - min) / (max - min)) * 100

        const sliderWidth = inputSlider.offsetWidth
        const adjustedPosition = (sliderWidth * percent) / 100
        rangeSliderValueSpan.style.left = `calc(${adjustedPosition}px + 12px)`

        calculatedAverage()
    })

    const simulationContainer = document.getElementById('simulationContainer');
    simulationContainer.appendChild(rangeSliderSection)
    selectedCourses[course.id] = rangeSliderSection
}

let tempGPA = parseFloat(document.getElementById("gpa").textContent) || 0
newGPA.textContent = String(tempGPA.toFixed(2))

const calculatedAverage = () => {
    let tempSum = 0
    let tempCredits = 0

    courses.forEach(course => {
        const courseId = course.id
        if (selectedCourses[courseId]) {
            const slider = selectedCourses[courseId].querySelector('input[type="range"]')
            const sliderValue = parseFloat(slider.value)
            tempSum = tempSum + (sliderValue * course.credits)
        } else {
            tempSum = tempSum + (course.grade * course.credits)
        }
        tempCredits += course.credits
    })
    const updateGPA = tempCredits > 0 ? (tempSum / tempCredits) : 0
    newGPA.textContent = String(updateGPA.toFixed(2))
    tempGPA = updateGPA
}
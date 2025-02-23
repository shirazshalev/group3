const courses = [
    {id: 1, name: "מבוא לכלכלה", credits: 3.5, grade: 87},
    {id: 2, name: "מבוא למערכות מידע", credits: 3.0, grade: 91},
    {id: 3, name: "מבוא לחשבונאות פיננסית", credits: 3.5, grade: 100},
    {id: 4, name: "מבוא להנדסת תעשיה וניהול", credits: 1.0, grade: 96},
    {id: 5, name: "חדו״א 1 להנדסה", credits: 5.0, grade: 74},
    {id: 6, name: "מבוא למתמטיקה דיסקרטית", credits: 3.5, grade: 79},
    {id: 7, name: "אלגברה ליניארית להנדסה", credits: 4.5, grade: 61},
    {id: 8, name: "חקר ביצועים 1", credits: 3.5, grade: 89},
    {id: 9, name: "גרפיקה הנדסית וממוחשבת", credits: 1.5, grade: 95},
    {id: 10, name: "מבוא לתכנות", credits: 4.0, grade: 82},
    {id: 11, name: "מבוא להסתברות", credits: 3.5, grade: 80},
    {id: 12, name: "חדו״א להנדסת תעשיה וניהול 2", credits: 4.0, grade: 68},
    {id: 13, name: "משוואות דיפרנציאליות רגילות", credits: 3.5, grade: 93},
    {id: 14, name: "סדנת כתיבה מדעית", credits: 0.5, grade: 95},
    {id: 15, name: "חקר ביצועים 2", credits: 3.5, grade: 81},
    {id: 16, name: "תכנון ופקוח על היצור 1", credits: 4.0, grade: 94},
    {id: 17, name: "פיתוח תוכנה מונחה עצמים", credits: 3.5, grade: 84},
    {id: 18, name: "אמידה ומבחני השערות", credits: 3.5, grade: 87},
    {id: 19, name: "יסודות האלגוריתמים והסיבוכיות", credits: 3.5, grade: 82},
    {id: 20, name: "פיסיקה 1ב", credits: 3.5, grade: 90},
    {id: 21, name: "תכנון ופקוח על היצור 2", credits: 4.0, grade: 86},
    {id: 22, name: "בסיסי נתונים", credits: 3.5, grade: 83},
    {id: 23, name: "הנדסת שיטות ותהליכים ארגוניים", credits: 4.0, grade: 98},
    {id: 24, name: "מבוא להנ׳ מכונות ותהליכי ייצור", credits: 3.5, grade: 76},
    {id: 25, name: "פיסיקה 2ב", credits: 3.5, grade: 56},
    {id: 26, name: "אנגלית מתקדמים ב׳", credits: 2.0, grade: 87},
    {id: 27, name: "מבוא להנדסת גורמי אנוש", credits: 3.0, grade: 89},
    {id: 28, name: "מבוא לקבלת החלטות", credits: 3.0, grade: 90},
    {id: 29, name: "מבוא להנדסת חשמל", credits: 3.5, grade: 84},
    {id: 30, name: "סימולציה", credits: 4.0, grade: 92},
    {id: 31, name: "סדנת מיומנויות בתקשורת בינאישית", credits: 0.5, grade: 90},
    {id: 32, name: "ניתוח ועיצוב מע׳-מידע", credits: 3.5, grade: 88},
    {id: 33, name: "מודלים של רגרסיה ליניארית", credits: 3.5, grade: 93}
]

let totalCredits = 0
let sumOfGrades = 0
courses.forEach((course) => {
    sumOfGrades = sumOfGrades + (course.grade * course.credits)
    totalCredits = totalCredits + course.credits
})

const btnSelect = document.querySelector('.btnSelect')
const popupCoursesList = document.querySelector('.popupCoursesList')
btnSelect.addEventListener('click', (e) => {
    e.preventDefault()
    const isHidden = popupCoursesList.classList.toggle("hiddenList"); // True if there is no class named hiddenList & the class will be added
    popupCoursesList.classList.toggle("openList", !isHidden)
})

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

let selectedCourses = {} // All the sliders
const coursesList = document.querySelector('.coursesList')
const indicatorValues = document.querySelectorAll('.indicatorValue')
const newGPA = indicatorValues[1]
const GPA = sumOfGrades / totalCredits
let tempGPA = sumOfGrades / totalCredits
newGPA.textContent = String(tempGPA.toFixed(2))

const calculatedAverage = () => {
    let tempSum = 0
    courses.forEach(course => {
        const courseId = course.id
        if (selectedCourses[courseId]) {
            const slider = selectedCourses[courseId].querySelector('input[type="range"]');
            const sliderValue = parseFloat(slider.value)
            tempSum = tempSum + (sliderValue * course.credits)
        } else {
            tempSum = tempSum + (course.grade * course.credits)
        }
    })
    const updateGPA = tempSum / totalCredits
    newGPA.textContent = String(updateGPA.toFixed(2))
    tempGPA = updateGPA
}

Array.from(coursesList.children).forEach((item) => {
    item.addEventListener('click', (e) => { // For each course selection in the choice list
            e.preventDefault()

            const courseName = item.textContent.trim(); // trim Deleting unnecessary spaces
            const chosenCourse = courses.find(course => course.name === courseName)
            if (chosenCourse) {
                const courseId = chosenCourse.id;
                if (selectedCourses[courseId]) { // If the course has already been selected
                    selectedCourses[courseId].remove()
                    delete selectedCourses[courseId] // Delete the course's ID from sliders list
                    calculatedAverage()
                } else {
                    const rangeSliderSection = document.createElement('section') // <section></section>
                    rangeSliderSection.classList.add('rangeSliderSection') // creating new class
                    const chosenCourseDetails = document.createElement('div')
                    chosenCourseDetails.classList.add('chosenCourse') // creating new class
                    chosenCourseDetails.setAttribute('dataCourseId', courseId)
                    // Creating tags inside:
                    const courseNameSpan = document.createElement('span')
                    courseNameSpan.textContent = chosenCourse.name
                    const courseGradeSpan = document.createElement('span')
                    courseGradeSpan.textContent = `ציון נוכחי: ${chosenCourse.grade}`
                    // Creating tags for the Slider:
                    const rangeSliderDiv = document.createElement('div')
                    rangeSliderDiv.classList.add('rangeSlider')
                    const rangeSliderValueDiv = document.createElement('div')
                    rangeSliderValueDiv.classList.add('rangeSliderValue')
                    const rangeSliderValueSpan = document.createElement('span')
                    rangeSliderValueSpan.textContent = chosenCourse.grade
                    const startingPositionPercent = ((chosenCourse.grade) / 100) * 100
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
                    inputSlider.id = "slider"
                    inputSlider.min = "0"
                    inputSlider.max = "100"
                    inputSlider.value = chosenCourse.grade
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
                    });

                    const simulationContainer = document.getElementById('simulationContainer');
                    simulationContainer.appendChild(rangeSliderSection)
                    selectedCourses[courseId] = rangeSliderSection
                }
            }
        }
    )
})



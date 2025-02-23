// Updating the Year Chart bar's height regarding the bar value
const bars = document.querySelectorAll('.Bar')
const maxHeightAtGraph = 180
bars.forEach(bar => {
    const value = bar.getAttribute('data-value')
    const height = (value / 100) * maxHeightAtGraph
    bar.style.height = `${height}px`
})

// ------------------------------------------ Years > Semesters Logic ------------------------------------------
// Select year bars and the semester graph container
const yearBars = document.querySelectorAll('.yearBar')
const semesterGraph = document.getElementById('SemesterAverageGraph')
const backButton = document.getElementById('BackButton')

// Example data for semester averages
const semesterData = {
    "שנה א": [78, 85],
    "שנה ב": [75, 82],
    "שנה ג": [90, 87]
}

// Add click event listeners to year bars
yearBars.forEach(bar => {
    bar.addEventListener('click', () => {
        const yearLabel = bar.querySelector('.BarLabel').textContent.trim() // Get the year label
        const semesters = semesterData[yearLabel] // Fetch semester data for the selected year

        // Update the semester graph with the fetched data
        const semesterBars = semesterGraph.querySelectorAll('.Bar')

        semesterBars.forEach((semesterBar, index) => {
            if (semesters[index] !== undefined) {

                const value = semesters[index]
                const semester = index + 1
                const detailsWindow = semesterBar.querySelector('.DetailsWindow')
                semesterBar.style.height = `${(value / 100) * 180}px` // Set height based on value
                semesterBar.innerHTML = ""

                // Add the average value above the bar
                const barValue = document.createElement('div')
                barValue.classList.add('BarValue')
                barValue.textContent = value // Average value
                semesterBar.appendChild(barValue)

                // Add the semester name below the bar
                const barLabel = document.createElement('div')
                barLabel.classList.add('BarLabel')
                barLabel.textContent =
                    semester === 1 ? 'סמסטר א' : semester === 2 ? 'סמסטר ב' : 'סמסטר קיץ'
                semesterBar.appendChild(barLabel)

                if (detailsWindow) {
                    semesterBar.appendChild(detailsWindow) // החזר את החלונית לעמודה
                }

            } else {
                // Hide the bar if no data is available
                semesterBar.style.display = 'none'
            }
        })

        // Display the semester graph
        semesterGraph.classList.remove('Hidden')
    })
})
// ------------------------------------------ Semesters > Courses Logic ------------------------------------------
// Example data for course grades in each semester
const coursesData = {
    "סמסטר א": [
        {name: "מערכות בינה עסקית", grade: 85},
        {name: "תשתית וטכנולוגיית מידע", grade: 90},
        {name: "יסודות המימון", grade: 78}
    ],
    "סמסטר ב": [
        {name: "מערכות בינה עסקית", grade: 86},
        {name: "תשתית וטכנולוגיית מידע", grade: 87},
        {name: "יסודות המימון", grade: 94},
        {name: "אוטומציה", grade: 80},
        {name: "ניהול פרויקטים", grade: 95},
        {name: "הנדסת איכות", grade: 94}
    ],
    "סמסטר קיץ": [
        {name: "עקרונות השיווק", grade: 92},
        {name: "ניהול משאבי אנוש", grade: 87},
        {name: "חקר ביצועים", grade: 89}
    ]
}

// Add click event listeners to semester bars
const semesterBars = semesterGraph.querySelectorAll('.Bar')
const coursesGraph = document.getElementById('CoursesGradesGraph')

semesterBars.forEach(bar => {
    bar.addEventListener('click', () => {
        const semesterLabel = bar.querySelector('.BarLabel').textContent.trim() // Get the semester label
        const courses = coursesData[semesterLabel] // Fetch course data for the selected semester
        const courseBars = coursesGraph.querySelectorAll('.Bar')

        // Update the courses graph with the fetched data
        courseBars.forEach((courseBar, index) => {
            if (courses[index] !== undefined) {
                const {name, grade} = courses[index] // Extract course name and grade
                const detailsWindow = courseBar.querySelector('.DetailsWindow')

                // Set the height of the bar based on the grade
                courseBar.style.height = `${(grade / 100) * 180}px`

                // Clear any existing content
                courseBar.innerHTML = ""

                // Add the grade above the bar
                const barValue = document.createElement('div')
                barValue.classList.add('BarValue')
                barValue.textContent = grade // Add the grade as text
                courseBar.appendChild(barValue)

                // Add the course name below the bar
                const barLabel = document.createElement('div')
                barLabel.classList.add('BarLabel')
                barLabel.textContent = name // Add the course name
                courseBar.appendChild(barLabel)

                // Add the details window
                if (detailsWindow) {
                    courseBar.appendChild(detailsWindow)
                }

                // Ensure the bar is visible
                courseBar.style.display = 'flex'
                courseBar.style.flexDirection = 'column-reverse' // Labels are below
            } else {
                courseBar.style.display = 'none' // Hide extra bars
            }
        })

        // Display the courses graph
        coursesGraph.classList.remove('Hidden')
    })
})

// ------------------------------------------ back one step button Logic ------------------------------------------
// Back button functionality
backButton.addEventListener('click', () => {
    const isCoursesGraphVisible = !coursesGraph.classList.contains('Hidden')
    const isSemesterGraphVisible = !semesterGraph.classList.contains('Hidden')

    if (isCoursesGraphVisible) {
        // If the courses graph is visible, hide it
        coursesGraph.classList.add('Hidden')
    } else if (isSemesterGraphVisible) {
        // If only the semester graph is visible, hide it
        semesterGraph.classList.add('Hidden')
    } else {
        console.log('Already at the year view')
    }
})

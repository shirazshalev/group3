// Media Query
const finalGradeTitle = document.querySelector('th.gradeCol')
const originalTitle = finalGradeTitle.textContent
window.addEventListener('resize', (e) => {
    e.preventDefault()
    if (window.innerWidth < 844) {
        finalGradeTitle.textContent = 'ציון'
    } else {
        finalGradeTitle.textContent = originalTitle
    }
})

// New GPA
const indicatorValues = document.querySelectorAll('.indicatorValue')
let newGPA = indicatorValues[1]
// The => function
const GPA = () => {
    const table = document.querySelector('.academicRecordView')
    const rows = table.querySelectorAll('tbody tr')
    let totalCredits = 0
    let sumOfGrades = 0
    rows.forEach((course) => {
        const cells = course.querySelectorAll('td')
        const checkbox = cells[0].querySelector('.vIcon')
        const isBinary = checkbox && checkbox.classList.contains('vIconHidden') // empty Cell
        const credits = parseFloat(cells[2].textContent)
        const grade = parseFloat(cells[3].textContent)
        if (!isBinary) {
            sumOfGrades = sumOfGrades + (grade * credits)
            totalCredits = totalCredits + credits
        }
    })
    const GPA = totalCredits > 0 ? (sumOfGrades / totalCredits) : 0
    newGPA.textContent = String(GPA.toFixed(2))
}

const detailsWindow = document.createElement('div')
detailsWindow.classList.add('detailsWindow')
document.body.append(detailsWindow)
detailsWindow.textContent = `הגדרת הקורס כעובר בינארי- \n` + `הקורס לא יכלל בחישוב הממוצע`
const showTemporaryMessage = (e) => {
    const pageWidth = window.innerWidth
    const pageHeight = window.innerHeight
    let top = e.pageY - 15 < 0 ? 10 : e.pageY - 15
    let left = e.pageX - 160 < 0 ? e.pageX + 10 : e.pageX - 160
    if (top + 30 > pageHeight) {
        top = pageHeight - 30 - 10
    }
    detailsWindow.style.top = top + 'px'
    detailsWindow.style.left = left + 'px'
    detailsWindow.style.opacity = '1'
    detailsWindow.style.visibility = 'visible'
    setTimeout(() => {
        detailsWindow.style.opacity = '0'
        detailsWindow.style.visibility = 'hidden'
    }, 1500)
}

const selectedCourse = document.querySelectorAll('.emptyCell')
selectedCourse.forEach((course) => {
    const vIcon = document.createElement('img')
    const checkbox = course.querySelector('.checkbox')
    vIcon.src = "../static/SVG/v-check.svg"
    vIcon.classList.add('vIcon')
    checkbox.appendChild(vIcon) // internal Element of checkbox
    course.addEventListener('click', (e) => {
        e.preventDefault()
        //const isHidden = vIcon.classList.contains('vIconHidden')
        vIcon.classList.toggle('vIconHidden')
        GPA()
        if (vIcon.classList.contains('vIconHidden')) {
            showTemporaryMessage(e)
        }
    })
})

//newGPA.textContent = String(GPA.toFixed(2))
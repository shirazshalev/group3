const hideBtn = document.querySelectorAll('.collapseIcon')
hideBtn.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault()
        const academicYear = e.target.parentElement.closest('tbody').getAttribute('data-year')
        const rows = document.querySelectorAll(`tbody[data-year="${academicYear}"] tr:not(.yearHeader)`)
        const isHidden = rows[0].style.display === "none"
        rows.forEach(row => {
            row.style.display = isHidden ? "table-row" : "none"
        })
        switch (isHidden) {
            case true:
                icon.src = "../static/SVG/angle-down.svg"
                break
            case false:
                icon.src = "../static/SVG/angle-up.svg"
                break
        }
    })
})

// Floating window with additional details
const courseInfo = {
    year: 'שנה א׳',
    semester: 'סמסטר א׳',
    exerciseWeight: '10%',
    exerciseGrade: '100',
    finalExamWeight: '90%',
    finalExamGrade: '94'
}

const detailsWindow = document.createElement('div')
detailsWindow.classList.add('detailsWindow') // creating new class
document.body.append(detailsWindow)
// Finding cells of courses names
const courseNames = document.querySelectorAll('.courseName')
courseNames.forEach(course => {
    course.addEventListener('mouseover', (e) => {
        e.preventDefault()
        //const courseName = e.target.textContent
        const year = e.target.parentElement.closest('tbody').getAttribute('data-year')
        const infoText =
            `${year}, ${courseInfo.semester}\n` +
            `תרגילי בית (${courseInfo.exerciseWeight}): ${courseInfo.exerciseGrade}\n` +
            `מבחן סופי (${courseInfo.finalExamWeight}): ${courseInfo.finalExamGrade}`
        detailsWindow.textContent = infoText
        detailsWindow.style.opacity = '1'
        detailsWindow.style.visibility = 'visible'
        detailsWindow.style.top = (e.pageY + 10) + 'px'
        detailsWindow.style.left = (e.pageX + 10) + 'px'
    })
    course.addEventListener('mousemove', (e) => {
        e.preventDefault()
        detailsWindow.style.top = (e.pageY + 10) + 'px'
        detailsWindow.style.left = (e.pageX + 10) + 'px'
    })
    course.addEventListener('mouseout', (e) => {
        e.preventDefault()
        detailsWindow.style.opacity = '0'
        detailsWindow.style.visibility = 'hidden'
    })
})

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

// The grade's impact on the GPA
const impactGPA = document.createElement('div')
impactGPA.classList.add('impactGPA') // creating new class
document.body.append(impactGPA)
const indicatorValues = document.querySelectorAll('.indicatorValue')
// Finding cells of courses grades
const courseFinalGrade = document.querySelectorAll('.courseGrade')
courseFinalGrade.forEach(grade => {
    grade.addEventListener('mouseover', (e) => {
        e.preventDefault()
        const theGrade = parseFloat(e.target.textContent.trim())
        const theCredits = parseFloat(e.target.previousElementSibling.textContent.trim())
        const theGPA = parseFloat(indicatorValues[0].textContent.trim())
        const theTotalCredits = parseFloat(indicatorValues[1].textContent.trim())
        const theGPABefore = (theGPA * theTotalCredits - theGrade * theCredits) / (theTotalCredits - theCredits)
        //console.log('Grade:', theGrade, 'Credits:', theCredits, 'GPA:', theGPA, 'Total Credits:', theTotalCredits)
        //const theImpact = (theGPA / theGPABefore).toFixed(3) // %
        const theImpact = (theGPA - theGPABefore).toFixed(3)
        //console.log('GPA Before:', theGPABefore, 'Impact:', theImpact)
        impactGPA.innerHTML = ''
        const arrowIcon = document.createElement('img')
        arrowIcon.classList.add('arrowIcon') // create class for CSS
        if (theGrade < theGPABefore) {
            arrowIcon.src = "../static/SVG/arrow-small-down.svg"
            impactGPA.style.backgroundColor = 'rgba(255, 90, 0, 0.8)'
        } else if (theGrade > theGPABefore) {
            arrowIcon.src = "../static/SVG/arrow-small-up.svg"
            impactGPA.style.backgroundColor = 'rgba(0, 191, 99, 0.8)'
        } else {
            impactGPA.style.opacity = '0'
            impactGPA.style.visibility = 'hidden'
            return
        }
        const impactText = document.createElement('span')
        impactText.textContent = theImpact
        impactGPA.appendChild(impactText)
        impactGPA.appendChild(arrowIcon) // internal Element of impactGPA
        impactGPA.style.opacity = '1'
        impactGPA.style.visibility = 'visible'
        impactGPA.style.top = (e.pageY + 10) + 'px'
        impactGPA.style.left = (e.pageX + 10) + 'px'
    })
    grade.addEventListener('mousemove', (e) => {
        e.preventDefault()
        impactGPA.style.top = (e.pageY + 10) + 'px'
        impactGPA.style.left = (e.pageX + 10) + 'px'
    })
    grade.addEventListener('mouseout', (e) => {
        e.preventDefault()
        impactGPA.style.opacity = '0'
        impactGPA.style.visibility = 'hidden'
    })
})

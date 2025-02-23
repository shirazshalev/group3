const sliderValue = document.createElement('div')
sliderValue.classList.add('sliderValue') // creating new class
document.body.append(sliderValue)
const inputInSlider = document.querySelectorAll('input[type="range"]')
inputInSlider.forEach(input => {
    input.addEventListener('input', (e) => {
        e.preventDefault()
        const valueS = e.target.value
        sliderValue.textContent = e.target.value
        console.log(valueS)
        sliderValue.style.opacity = '1'
        sliderValue.style.visibility = 'visible'
        sliderValue.style.top = (e.pageY + 10) + 'px'
        sliderValue.style.left = (e.pageX + 10) + 'px'
    })
    input.addEventListener('mousemove', (e) => {
        e.preventDefault()
        sliderValue.style.top = (e.pageY + 10) + 'px'
        sliderValue.style.left = (e.pageX + 10) + 'px'
    })
    input.addEventListener('mouseout', (e) => {
        e.preventDefault()
        sliderValue.style.opacity = '0'
        sliderValue.style.visibility = 'hidden'
    })
})


// binaryPass window
//newGPU.textContent = String(GPU.toFixed(2))
const showDetails = (isHidden) => {
    const detailsWindow = document.createElement('div')
    detailsWindow.classList.add('detailsWindow')
    document.body.append(detailsWindow)
    const vRemoval = document.querySelectorAll('.vIcon')
    vRemoval.forEach((v) => {
        v.addEventListener('click', (e) => {
            e.preventDefault()
            if (isHidden) {
                v.classList.toggle('vIconHidden')
                const infoText = `הגדרת הקורס כעובר בינארי- \n` +
                    `הקורס לא יכלל בחישוב הממוצע`
                detailsWindow.textContent = infoText
                detailsWindow.style.opacity = '1'
                detailsWindow.style.visibility = 'visible'
                detailsWindow.style.top = (e.pageY + 10) + 'px'
                detailsWindow.style.left = (e.pageX + 10) + 'px'
            }
        })
    })
}

// search btn pre functions before 20.1.2025

function toggleSearchForm() {
    const searchFormContainer = document.getElementById('searchFormContainer')
    if (searchFormContainer.style.display === 'block') {
        searchFormContainer.style.display = 'none'
    } else {
        searchFormContainer.style.display = 'block'
    }
}

document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const query = document.querySelector("input[name='query']").value.trim()
    const pages = {
        "דף הבית": "index.html",
        "עמוד הבית": "index.html",
        "גיליון ציונים": "AcademicRecord.html",
        "ציונים": "AcademicRecord.html",
        "התחברות": "Login.html",
        "מחשבון נק״ז": "GPACalculator.html",
        "הזנת ציונים": "GPACalculator.html",
        "מחשבון נקודות נזכות": "GPACalculator.html",
        "מחשבון נקז": "GPACalculator.html"
    }
    if (pages[query]) {
        window.location.href = pages[query]
    } else {
        alert("העמוד לא נמצא")
    }
})

function toggleMenu(button) {
    const popupMenu = document.getElementById('popupMenu')
    popupMenu.classList.toggle('open')
    button.classList.toggle('active')
}
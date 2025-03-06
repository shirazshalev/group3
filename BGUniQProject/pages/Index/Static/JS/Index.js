// Update the welcome to be with the user full name
// document.addEventListener('DOMContentLoaded', function () {
//     let firstName = localStorage.getItem('firstName')
//     if (firstName) {
//         let welcomeUser = document.getElementById('welcomeUser')
//         welcomeUser.textContent = `שלום ${firstName},`
//     } else {
//         let welcomeUser = document.getElementById('welcomeUser')
//         welcomeUser.textContent = `שלום,`
//     }
// })

document.getElementById("btnCreditCalculator").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/gpa-calculator"
})

document.getElementById("btnAcademicRecord").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/academic-record"
})

document.getElementById("btnWhatIfCalculator").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/what-if-calculator"
})

document.getElementById("btnSetGoals").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/personal-goals"
})

// trying Fetch
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("gpa")) {
        fetchStudentMetrics()
    }
})

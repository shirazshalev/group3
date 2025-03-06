document.querySelector('#btnHomePage').addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "/index"
})

// Function to retrieve student indices
function fetchStudentMetrics() {
    fetch('/get-student-metrics')
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let gpaElement = document.getElementById("gpa")
                let creditsElement = document.getElementById("credits")
                let targetElement = document.getElementById("target")
                let coursesElement = document.getElementById("courses")

                if (gpaElement && creditsElement && targetElement && coursesElement) {
                    gpaElement.textContent = parseFloat(data.GPAIndicator).toFixed(2)
                    creditsElement.textContent = data.totalCredits || "0"
                    targetElement.textContent = parseFloat(data.targetGPA).toFixed(2)
                    coursesElement.textContent = data.numberOfCourses || "0"
                }
            }
        })
        .catch(error => console.error("Error retrieving student data:", error))
}

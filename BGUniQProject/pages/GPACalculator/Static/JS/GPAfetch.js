function insertCoursesDataToDB() {

    // Retrieve all rows from the courses table
    const rows = document.querySelectorAll("#CoursesTable tbody tr")
    let coursesData = []

    rows.forEach(row => {
        const courseName = getCourseName(row).text
        const credits = parseFloat(row.querySelector('input[type="number"][step="0.5"]').value)
        const grade = parseInt(row.querySelector('input[type="number"][step="1"]').value)

        // Extract course grade components if available
        let components = {}
        const componentInputs = row.querySelectorAll(".component-input")
        componentInputs.forEach(input => {
            const componentName = input.getAttribute("data-component")
            components[componentName] = parseFloat(input.value) || 0
        })

        if (courseName && !isNaN(credits) && !isNaN(grade)) {
            let courseData = {
                name: courseName,
                credits: credits,
                grade: grade,
                components: components
            }

            // If courseID is stored in the row, include it
            let existingCourseID = row.getAttribute("data-course-id")
            if (existingCourseID) {
                courseData.courseID = existingCourseID
            }

            coursesData.push(courseData)
        }
    })

    console.log(selectedSemester) // debugging check
    console.log(selectedYear) // debugging check
    console.log("Courses Data:", coursesData) // debugging check

    // Send data to the server
    fetch("/gpa-calculator", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            year: selectedYear,
            semester: selectedSemester,
            courses: coursesData
        })
    })
        .then(response => response.text())//debugging check - text instead of json
        .then(data => {
            console.log("Server response:", data) //debugging check
            if (data.success) {
                showCustomAlert("הקורסים נשמרו בהצלחה")
            } else if (data.conflict) {
                showCustomAlert(`הקורס "${data.course}" כבר הוזן עבור שנה ${data.existingYear} וסמסטר ${data.existingSemester}. 
                מחק או בחר קורס אחר.`);
            } else {
                showCustomAlert("אירעה שגיאה, אנא נסה שנית")
            }
        })
        .catch(error => {
            console.error("שגיאה בשליחת הנתונים לשרת:", error)
            showCustomAlert("שגיאה בשליחת הנתונים לשרת")
        })
}
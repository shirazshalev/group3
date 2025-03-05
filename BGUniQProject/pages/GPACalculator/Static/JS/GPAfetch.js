function insertCoursesDataToDB() {
    return new Promise((resolve, reject) => {
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

            let courseID = 999 // Temporary ID

            if (courseName && !isNaN(credits) && !isNaN(grade)) {
                let courseData = {
                    courseID: courseID,
                    courseName: courseName,
                    courseCredits: credits,
                    finalGrade: grade,
                    components: components
                }
                coursesData.push(courseData) // coursesData = the courses we want to send and insert to the DB
            }
        })

        console.log(selectedSemester) // debugging check
        console.log(selectedYear) // debugging check
        console.log("Courses Data:", coursesData) // debugging check

        // Send data to the server
        fetch(`/gpa-calculator/${selectedYear}/${selectedSemester}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                // year: selectedYear,
                // semester: selectedSemester,
                courses: coursesData
            })
        })
            .then(response => response.json())// text instead of json
            .then(data => {
                console.log("Server response:", data) // debugging check
                if (data.success) {
                    showCustomAlert("הקורסים נשמרו בהצלחה")
                    resolve(true)
                } else if (data.conflict) {
                    const yearMapping = { yearA: "שנה א׳", yearB: "שנה ב׳", yearC: "שנה ג׳" }
                    const semesterMapping = { semesterA: "סמסטר א׳", semesterB: "סמסטר ב׳", semesterC: "סמסטר קיץ" }
                    const yearText = yearMapping[data.existing_year] || "שנה לא מזוהה"
                    const semesterText = semesterMapping[data.existing_semester] || "סמסטר לא מזוהה"
                    showCustomAlert(`הקורס "${data.existing_course}" כבר הוזן עבור ${yearText} ${semesterText}. מחק או בחר קורס אחר`)
                    resolve(false)
                } else {
                    showCustomAlert(data.message || "אירעה שגיאה בשמירת הנתונים, אנא נסה שנית")
                    resolve(false)
                }
            })
            .catch(error => {
                console.error("שגיאה בשליחת הנתונים לשרת:", error)
                showCustomAlert("אירעה שגיאה בשליחת הנתונים, אנא נסה שנית")
                reject(false)
            })
    })
}
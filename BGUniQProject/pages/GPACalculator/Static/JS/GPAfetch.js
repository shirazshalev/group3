function insertCoursesDataToDB() {
    fetch('/signin', {




        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({degree, department, template, academicYear, currentSemester})
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.href = result.redirect
            } else {
                showCustomAlert(result.message)
            }
        })
        .catch(error => {
            console.error("Error:", error)
            showCustomAlert("אירעה שגיאה בעת שמירת הנתונים, אנא נסו שנית")
        })
}
// student Academic data
let studentAcademicData = {
    'שנה א׳': {
        'סמסטר א׳': [
            {name: "מערכות בינה עסקית", grade: 85, credits: 3},
            {name: "תשתית וטכנולוגיית מידע", grade: 90, credits: 3},
            {name: "יסודות המימון", grade: 78, credits: 3}
        ],
        'סמסטר ב׳': [
            {name: "מערכות בינה עסקית", grade: 86, credits: 3},
            {name: "תשתית וטכנולוגיית מידע", grade: 87, credits: 3},
            {name: "יסודות המימון", grade: 94, credits: 3},
            {name: "אוטומציה", grade: 80, credits: 3},
            {name: "ניהול פרויקטים", grade: 95, credits: 3},
            {name: "הנדסת איכות", grade: 94, credits: 3}
        ],
        'סמסטר קיץ': [
            {name: "עקרונות השיווק", grade: 92, credits: 3},
            {name: "ניהול משאבי אנוש", grade: 87, credits: 3},
            {name: "חקר ביצועים", grade: 89, credits: 3}
        ]
    },
    'שנה ב׳': {
        'סמסטר א׳': [
            {name: "תכנון תהליכים", grade: 88, credits: 3},
            {name: "מודלים מתמטיים", grade: 84, credits: 3},
            {name: "בינה מלאכותית", grade: 90, credits: 3}
        ],
        'סמסטר ב׳': [
            {name: "סימולציה", grade: 85, credits: 3},
            {name: "רשתות תקשורת", grade: 80, credits: 3},
            {name: "הנדסת נתונים", grade: 92, credits: 3}
        ]
    }
};

//pointers
const yearGraph = document.getElementById('YearAverageGraph')
const semesterGraph = document.getElementById('SemesterAverageGraph')
const coursesGraph = document.getElementById('CoursesGradesGraph')
const backButton = document.getElementById('BackButton')

// variables
let selectedYear = null;
let selectedSemester = null;

const sharedLayout = {
    showlegend: false,
    title: {
        font: {size: 14},
        weight: '200',
        xanchor: 'center'
    },
    font: {
        family: 'Fredoka',
        size: 12,
        color: '#333',
        weight: '100'
    },
    xaxis: {
        tickfont: {size: 12},
        linecolor: 'black',
        lineWidth: 0.5,
        automargin: true
    },
    yaxis: {
        tickfont: {size: 12},
        range: [0, 100],
        side: 'left',
        // gridcolor: '#e0e1e2',
        showgrid: false
    },
    hoverlabel: {
        font: {
            family: 'Fredoka',
            size: 12,
            color: 'white',
            weight: '100'
        },
        bgcolor: 'rgba(0,0,0,0.75)',
        bordercolor: 'rgba(0,0,0,0.75)',
        rtl: true,
        align: 'right'
    },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    barcornerradius: 5
};

const config = {
    displayModeBar: false,
    responsive: true
};

//functions
function createTrendLine(xValues, yValues) {
    return {
        type: 'scatter',
        mode: 'lines',
        x: xValues,
        y: yValues,
        line: {
            color: '#333',
            width: 1,
            dash: 'dot'
        }
    };
}

function calculateYearlyAverages(studentData) {
    let yearlyAverages = {};
    for (let year in studentData) {
        let totalWeightedGrades = 0;
        let totalCredits = 0;

        for (let semester in studentData[year]) {
            studentData[year][semester].forEach(course => {
                totalWeightedGrades += course.grade * course.credits;
                totalCredits += course.credits;
            });
        }
        yearlyAverages[year] = totalCredits > 0 ? (totalWeightedGrades / totalCredits).toFixed(2) : 0;
    }
    return yearlyAverages;
}

// default visible graphs style
semesterGraph.style.display = 'none';
coursesGraph.style.display = 'none';
createYearGraph();

// Creating the YearAverageGraph using Plotly javascript
function createYearGraph() {
    let xValue = Object.keys(studentAcademicData)
    let yValue = Object.values(calculateYearlyAverages(studentAcademicData));

    let yearCredits = xValue.map(year => {
        return Object.values(studentAcademicData[year]).flat().reduce((sum, course) => sum + course.credits, 0);
    });

    let yearTrace = {
        type: 'bar',
        x: xValue,
        y: yValue,
        width: new Array(xValue.length).fill(0.8),
        text: yValue.map(String),
        textposition: 'outside',
        textfont: {
            size: 12
        },
        hovertemplate: xValue.map((year, index) => {
            let semesters = Object.keys(studentAcademicData[year]);
            let totalSemesters = semesters.length;
            let totalCourses = semesters.reduce((sum, semester) => {
                return sum + studentAcademicData[year][semester].length;
            }, 0);
            let aboveTarget = semesters.reduce((sum, semester) => {
                return sum + studentAcademicData[year][semester].filter(course => course.grade > 85).length;
            }, 0);
            return `${year}<br>` +
                `סך נק״ז: ${yearCredits[index]}<br>` +
                `סך סמסטרים: ${totalSemesters}<br>` +
                `סך קורסים: ${totalCourses}<br>` +
                `ציונים מעל היעד: ${aboveTarget}<br>` +
                `<extra></extra>`;
        }),
        opacity: 0.75,
        cliponaxis: false,
        marker: {
            color: '#bfe7f9',
            line: {
                color: 'black',
                width: xValue.map(year => (year === selectedYear ? 1 : 0.5))
            }
        }
    };

    // let yearTrendLine = createTrendLine(xValue, yValue);

    let yearLayout = {
        ...sharedLayout,
        title: {text: 'ממוצע שנת לימודים'},
        xaxis: {...sharedLayout.xaxis, title: 'שנת לימודים'},
        yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'}
    };

    Plotly.newPlot('YearAverageGraph', [yearTrace], yearLayout, config).then(addYearBarsClickListener);
}

function addYearBarsClickListener() {
    yearGraph.on('plotly_click', function (data) {
        let clickedYear = data.points[0].x;
        selectedYear = clickedYear;

        if (studentAcademicData[clickedYear]) {
            createYearGraph(); //in order to update the color of the clicked year bar
            createSemesterGraph(selectedYear); //in order to show the semesters graph according to the selected year
        }

        if (selectedSemester) {
            updateCoursesGraph(); //in order to show the courses graph according to the selected semester
        }
    });
}

// Creating the SemesterAverageGraph using Plotly javascript
function createSemesterGraph(year) {
    if (studentAcademicData[year]) {
        let xValue = Object.keys(studentAcademicData[year]);
        let yValue = [];
        let semesterCredits = [];

        xValue.forEach(semester => {
            let courses = studentAcademicData[year][semester];
            let totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
            let weightedSum = courses.reduce((sum, course) => sum + (course.grade * course.credits), 0);

            yValue.push(totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0);
            semesterCredits.push(totalCredits);
        });

        let semesterTrace = {
            type: 'bar',
            x: xValue,
            y: yValue,
            width: Array(xValue.length).fill(0.8),
            text: yValue.map(String),
            textposition: 'outside',
            textfont: {size: 12},
            hovertemplate: xValue.map((semester, index) => {
                let courses = studentAcademicData[year][semester] || [];
                let aboveTarget = courses.filter(course => course.grade > 85).length;
                return `${semester}<br>` +
                    `סך נק״ז: ${semesterCredits[index]}<br>` +
                    `סך קורסים: ${courses.length}<br>` +
                    `קורסים מעל יעד: ${aboveTarget}<br>` +
                    `<extra></extra>`;
            }),
            opacity: 0.75,
            cliponaxis: false,
            marker: {
                color: '#f8b912',
                line: {
                    color: 'black',
                    width: xValue.map(semester => (semester === selectedSemester ? 1 : 0.5))
                }
            }
        };

        let semesterLayout = {
            ...sharedLayout,
            title: {text: `ממוצע סמסטריאלי ב${year}`},
            xaxis: {...sharedLayout.xaxis, title: 'סמסטר'},
            yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'}
        };

        semesterGraph.style.display = 'block';
        Plotly.newPlot('SemesterAverageGraph', [semesterTrace], semesterLayout, config).then(addSemesterBarsClickListener);
    }
}

function addSemesterBarsClickListener() {
    semesterGraph.on('plotly_click', function (data) {
        let clickedSemester = data.points[0].x;
        selectedSemester = clickedSemester;

        if (selectedYear && selectedSemester) {
            createSemesterGraph(selectedYear); //in order to update the color of the clicked semester bar
            updateCoursesGraph();
        }
    });
}

// Creating the CoursesGradesGraph using Plotly javascript based on selected year and selected semester
function updateCoursesGraph() {
    if (selectedYear && selectedSemester && studentAcademicData[selectedYear][selectedSemester]) {
        let coursesList = studentAcademicData[selectedYear][selectedSemester] || [];
        let xValue = coursesList.map(course => course.name);
        let yValue = coursesList.map(course => course.grade);
        let credits = coursesList.map(course => course.credits)

        let coursesTrace = {
            type: 'bar',
            x: xValue,
            y: yValue,
            width: new Array(xValue.length).fill(0.8),
            text: yValue.map(String),
            textposition: 'outside',
            textfont: {
                size: 12
            },
            hovertemplate: xValue.map((course, index) =>
                `:${course}<br>` +
                `נק״ז: ${credits[index]}<br>` +
                `ציון: ${yValue[index]}<br>` +
                `<extra></extra>`
            ),
            opacity: 0.75,
            cliponaxis: false,
            marker: {
                color: '#f7b36c',
                line: {
                    color: 'black',
                    width: 0.5
                }
            }
        };

        let coursesLayout = {
            ...sharedLayout,
            title: {text: `ציוני קורסים ב${selectedYear}, ${selectedSemester}`},
            xaxis: {...sharedLayout.xaxis, title: 'קורס'},
            yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'}
        };

        coursesGraph.style.display = 'block';
        Plotly.newPlot('CoursesGradesGraph', [coursesTrace], coursesLayout, config);
    }
}

// Back button functionality
backButton.addEventListener('click', () => {
    const isCoursesGraphVisible = window.getComputedStyle(coursesGraph).display !== 'none';
    const isSemesterGraphVisible = window.getComputedStyle(semesterGraph).display !== 'none';
    if (isCoursesGraphVisible) {
        // If the courses graph is visible, hide it
        coursesGraph.style.display = 'none';
        selectedSemester = null;
    } else if (isSemesterGraphVisible) {
        // If only the semester graph is visible, hide it
        semesterGraph.style.display = 'none';
        selectedSemester = null;
        selectedYear = null;
    } else {
        console.log('Already at the year view')
    }
})



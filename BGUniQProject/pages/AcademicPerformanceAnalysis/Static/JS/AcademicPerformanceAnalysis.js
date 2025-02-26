
// temporary data
let studentData = {
    "שנה א׳": {semesters: 2, courses: 10, aboveTarget: 3},
    "שנה ב׳": {semesters: 2, courses: 13, aboveTarget: 5},
    "שנה ג׳": {semesters: 2, courses: 12, aboveTarget: 4},
    "שנה ד׳": {semesters: 1, courses: 6, aboveTarget: 2}
};

let semesterData = {
    'שנה א׳': [60, 70],
    'שנה ב׳': [75, 80],
    'שנה ג׳': [78, 85],
    'שנה ד׳': [82, 88]
};

let coursesData = {
    "סמסטר א׳": [
        {name: "מערכות בינה עסקית", grade: 85},
        {name: "תשתית וטכנולוגיית מידע", grade: 90},
        {name: "יסודות המימון", grade: 78}
    ],
    "סמסטר ב׳": [
        {name: "מערכות בינה עסקית", grade: 86},
        {name: "תשתית וטכנולוגיית מידע", grade: 87},
        {name: "יסודות המימון", grade: 94},
        {name: "אוטומציה", grade: 80},
        {name: "ניהול פרויקטים", grade: 95},
        {name: "הנדסת איכות", grade: 94}
    ]
}

//pointers
const yearGraph = document.getElementById('YearAverageGraph')
const semesterGraph = document.getElementById('SemesterAverageGraph')
const coursesGraph = document.getElementById('CoursesGradesGraph')
const backButton = document.getElementById('BackButton')

// variables
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

// default visible graphs style
semesterGraph.style.display = 'none';
coursesGraph.style.display = 'none';
createYearGraph();

// Creating the YearAverageGraph using Plotly javascript
function createYearGraph() {
    let xValue = Object.keys(studentData)
    let yValue = [65, 78, 82, 85]

    let yearTrace = {
        type: 'bar',
        x: xValue,
        y: yValue,
        width: [0.8, 0.8, 0.8, 0.8],
        text: yValue.map(String),
        textposition: 'outside',
        textfont: {
            size: 12
        },
        hovertemplate: Object.keys(studentData).map(year =>
            `${year}<br>` +
            `סך סמסטרים: ${studentData[year].semesters}<br>` +
            `סך קורסים: ${studentData[year].courses}<br>` +
            `ציונים מעל היעד: ${studentData[year].aboveTarget}<br>` +
            `<extra></extra>`
        ),
        opacity: 0.75,
        cliponaxis: false,
        marker: {
            color: '#bfe7f9',
            line: {
                color: 'black',
                width: 0.5
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

// Creating the SemesterAverageGraph using Plotly javascript
function addYearBarsClickListener() {
    yearGraph.on('plotly_click', function (data) {
        let clickedYear = data.points[0].x;

        if (semesterData[clickedYear]) {
            let xValue = ['סמסטר א׳', 'סמסטר ב׳'];
            let yValue = semesterData[clickedYear];

            let semesterTrace = {
                type: 'bar',
                x: xValue,
                y: yValue,
                width: [0.8, 0.8],
                text: yValue.map(String),
                textposition: 'outside',
                textfont: {
                    size: 12
                },
                hovertemplate: xValue.map(semester => {
                    let courses = coursesData[semester] || [];
                    let aboveTarget = courses.filter(course => course.grade > 85).length;
                    return `${semester}<br>` +
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
                        width: 0.5
                    }
                }
            };

            let semesterLayout = {
                ...sharedLayout,
                title: {text: 'ממוצע סמסטריאלי בשנה הנבחרת'},
                xaxis: {...sharedLayout.xaxis, title: 'סמסטר'},
                yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'}
            };

            semesterGraph.style.display = 'block';
            Plotly.newPlot('SemesterAverageGraph', [semesterTrace], semesterLayout, config).then(addSemesterBarsClickListener);
        }
    });
}

// Creating the CoursesGradesGraph using Plotly javascript
function addSemesterBarsClickListener() {
    semesterGraph.on('plotly_click', function (data) {
        let clickedSemester = data.points[0].x;

        if (coursesData[clickedSemester]) {

            let courseList = coursesData[clickedSemester];
            let xValue = courseList.map(course => course.name);
            let yValue = courseList.map(course => course.grade);

            let coursesTrace = {
                type: 'bar',
                x: xValue,
                y: yValue,
                width: 0.8,
                text: yValue.map(String),
                textposition: 'outside',
                textfont: {
                    size: 12
                },
                hovertemplate: xValue.map((course, index) =>
                    `:${course}<br>` +
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
                title: {text: 'ציוני קורסים בסמסטר הנבחר'},
                xaxis: {...sharedLayout.xaxis, title: 'קורס'},
                yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'}
            };

            coursesGraph.style.display = 'block';
            Plotly.newPlot('CoursesGradesGraph', [coursesTrace], coursesLayout, config);
        }
    });
}

// Back button functionality
backButton.addEventListener('click', () => {
    const isCoursesGraphVisible = window.getComputedStyle(coursesGraph).display !== 'none';
    const isSemesterGraphVisible = window.getComputedStyle(semesterGraph).display !== 'none';
    if (isCoursesGraphVisible) {
        // If the courses graph is visible, hide it
        coursesGraph.style.display = 'none';
    } else if (isSemesterGraphVisible) {
        // If only the semester graph is visible, hide it
        semesterGraph.style.display = 'none';
    } else {
        console.log('Already at the year view')
    }
})



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
    },
    'שנה ג׳': {
        'סמסטר א׳': [
            {name: "ניתוח שונות", grade: 75, credits: 3},
            {name: "רשתות נוירונים", grade: 81, credits: 3},
            {name: "בינה מלאכותית", grade: 83, credits: 3}
        ]
    }
};

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
        align: 'right',
        direction: 'rtl'
    },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
    barcornerradius: 5
};

const config = {
    displayModeBar: false,
    responsive: true
};

// functions
function createAvgGraph(withTrendLine = false) {
    let years = Object.keys(studentAcademicData);
    let traces = [];
    let legendSemesters = new Set();
    let semesterAverages = []; // Array to store semester averages for the trend line

    years.forEach((year, yearIndex) => {
        let semesters = studentAcademicData[year];
        let semesterKeys = Object.keys(semesters);
        let numSemesters = semesterKeys.length;

        let cumulativeData = calculateCumulativeDegreeAverage(studentAcademicData, year, semesterKeys);

        semesterKeys.forEach((semester, semesterIndex) => {
            let courses = semesters[semester];
            let avgGrade = courses.reduce((sum, course) => sum + course.grade, 0) / courses.length;
            semesterAverages.push(avgGrade); // Store semester average for trend line

            let xPosition = yearIndex + (semesterIndex - (numSemesters - 1) / 2) * 0.3;

            let trace = {
                x: [xPosition],
                y: [cumulativeData[semester].avg], // Use cumulative average
                name: semester,
                type: 'bar',
                text: [cumulativeData[semester].avg.toFixed(2)], // Use cumulative average
                textposition: 'outside',
                textfont: {
                    size: 12
                },
                // hovertemplate:
                //     `<span>${year}</span><br>` +
                //     `<span>${semester}</span><br>` +
                //     `<span>ממוצע תואר: ${cumulativeData[semester].avg.toFixed(2)}</span>` + // Use cumulative average
                //     `<extra></extra>`,
                hoverinfo: 'skip',
                marker: {
                    line: {
                        color: 'black',
                        width: 0.5
                    }
                },
                showlegend: !legendSemesters.has(semester)
            };

            legendSemesters.add(semester);

            switch (semester) {
                case 'סמסטר א׳':
                    trace.marker.color = '#f8bf8b';
                    break;
                case 'סמסטר ב׳':
                    trace.marker.color = '#f7af18';
                    break;
                case 'סמסטר קיץ':
                    trace.marker.color = '#ec9650';
                    break;
                default:
                    trace.marker.color = 'gray';
            }

            traces.push(trace);
        });
    });

    // Add trend line trace
    if (withTrendLine) {
        let trendLineTrace = {
            x: years.flatMap(year => Object.keys(studentAcademicData[year]).map((_, index) => years.indexOf(year) + (index - (Object.keys(studentAcademicData[year]).length - 1) / 2) * 0.3)),
            y: semesterAverages,
            mode: 'lines+markers',
            name: 'ממוצע סמסטר',
            customdata: years.flatMap(year => Object.keys(studentAcademicData[year])),
            line: {color: 'gray', width: 1, dash: 'dot'},
            hovertemplate:
                "%{customdata}<br>" +
                "<span>ממוצע סמסטר:</span> %{y:.2f}<extra></extra>"
        };
        traces.push(trendLineTrace);
    }

    let layout = {
        ...sharedLayout,
        barmode: 'group',
        showlegend: true,
        title: {
            text: 'השתנות ממוצע התואר לאורך זמן',
            y: 0.95
        },
        xaxis: {
            ...sharedLayout.xaxis,
            title: 'שנת לימודים',
            tickvals: years.map((_, index) => index),
            ticktext: years
        },
        yaxis: {...sharedLayout.yaxis, title: 'ציון ממוצע'},
        legend: {
            orientation: 'h',
            yanchor: 'bootom',
            y: 1.2,
            x: '0.5',
            xanchor: 'center',
            font: {size: 11}
        }
    };

    Plotly.newPlot('DegreeAvgGraphContainer', traces, layout, config);
}

function calculateCumulativeDegreeAverage(studentAcademicData, currentYear, currentSemesters) {
    let cumulativeData = {};
    let totalGrades = 0;
    let totalCourses = 0;
    let years = Object.keys(studentAcademicData);

    for (const year of years) {
        let semesters = studentAcademicData[year];
        for (const semester in semesters) {
            if (years.indexOf(year) < years.indexOf(currentYear) ||
                (years.indexOf(year) === years.indexOf(currentYear) && currentSemesters.indexOf(semester) >= 0)) {
                semesters[semester].forEach(course => {
                    totalGrades += course.grade;
                    totalCourses += 1;
                });
                if (years.indexOf(year) === years.indexOf(currentYear)) {
                    cumulativeData[semester] = {avg: totalCourses > 0 ? totalGrades / totalCourses : 0};
                }
            }
        }
    }
    return cumulativeData;
}

// Update the metrics - left side
function updateDegreeMetricsFromGraph() {

    let graphElement = document.getElementById("DegreeAvgGraphContainer");
    if (!graphElement || !graphElement.data) {
        console.error("גרף ממוצע התואר לא נמצא או שאין לו נתונים!");
        return;
    }

    // check if trend line data are exist
    let graphData = graphElement.data;

    // check if bars data are exist
    let degreeAverages = [];
    graphData.forEach(trace => {
        if (trace.type === "bar") {
            degreeAverages = degreeAverages.concat(trace.y);
        }
    });
    console.log("All degree averages:", degreeAverages);

    if (degreeAverages.length === 0) {
        console.error("לא נמצאו נתוני ממוצע תואר!");
        return;
    }

    // if exist - pop the need data according the degree avg from it
    let currentDegreeAvg = degreeAverages[degreeAverages.length - 1];
    let lastDegreeAvg = degreeAverages.length > 1 ? degreeAverages[degreeAverages.length - 2] : currentDegreeAvg;
    let percentageChange = lastDegreeAvg ? (((currentDegreeAvg - lastDegreeAvg) / lastDegreeAvg) * 100).toFixed(2) : "0.00";
    let addition = (currentDegreeAvg - lastDegreeAvg).toFixed(2);

    let arrowIndicator = document.querySelector(".AnalyticsNumber .Arrow");
    if (currentDegreeAvg > lastDegreeAvg) {
        arrowIndicator.textContent = "↑";
        arrowIndicator.style.color = "green";
    } else if (currentDegreeAvg < lastDegreeAvg) {
        arrowIndicator.textContent = "↓";
        arrowIndicator.style.color = "red";
    } else {
        arrowIndicator.textContent = "";
    }

    document.querySelectorAll(".AnalyticsNumber span")[1].textContent = currentDegreeAvg.toFixed(2); // ממוצע תואר
    document.querySelectorAll(".AnalyticsNumber")[1].textContent = lastDegreeAvg.toFixed(2); // ממוצע תואר קודם
    document.querySelectorAll(".AnalyticsNumber")[2].textContent = `${percentageChange}%`; // אחוז שינוי
    document.querySelectorAll(".AnalyticsNumber")[2].textContent = percentageChange > 0 ? `${percentageChange}%+` : `${(0 - percentageChange)}%-`;
    document.querySelectorAll(".AnalyticsNumber")[3].textContent = addition > 0 ? `${addition}+` : `${(0 - addition)}-`; // תוספת שינוי
    document.querySelectorAll(".AnalyticsNumber")[4].textContent = ""; // ממוצע סמסטר נוכחי
    document.querySelectorAll(".AnalyticsNumber")[5].textContent = ""; // ממוצע סמסטר קודם
}


// Update the metrics - left side
function updateSemesterMetricsFromGraph() {

    let graphElement = document.getElementById("DegreeAvgGraphContainer");
    if (!graphElement || !graphElement.data) {
        console.error("גרף ממוצע התואר לא נמצא או שאין לו נתונים!");
        return;
    }

    // check if trend line data are exist
    let graphData = graphElement.data;

    let trendLineTrace = graphData.find(trace => trace.mode === "lines+markers");
    if (!trendLineTrace) {
        console.error("לא נמצא קו מגמה");
        return;
    }
    // if exist - pop the need data according the semesters avg from it
    let semesterAverages = trendLineTrace.y;
    let currentSemesterAvg = semesterAverages[semesterAverages.length - 1];
    let lastSemesterAvg = semesterAverages.length > 1 ? semesterAverages[semesterAverages.length - 2] : currentSemesterAvg;

    document.querySelectorAll(".AnalyticsNumber")[4].textContent = currentSemesterAvg.toFixed(2); // ממוצע סמסטר נוכחי
    document.querySelectorAll(".AnalyticsNumber")[5].textContent = lastSemesterAvg.toFixed(2); // ממוצע סמסטר קודם

}

// // Listener
document.addEventListener("DOMContentLoaded", () => {
    createAvgGraph(false);
    updateDegreeMetricsFromGraph();

    const button = document.querySelector("#SemesterAvgButton");
    if (button) {
        button.addEventListener('click', () => {
            createAvgGraph(true);
            updateDegreeMetricsFromGraph();
            updateSemesterMetricsFromGraph();
        });
    } else {
        console.error("כפתור #BackToDegreeAVGButton לא נמצא!");
    }
});



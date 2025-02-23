// Adjust the height column to the value
const bars = document.querySelectorAll('.Bar')
bars.forEach(bar => {
    const value = bar.getAttribute('data-value')
    bar.style.height = `${value / 100 * 180}px`
})

// Positioning the dot chart on the bar chart
document.addEventListener("DOMContentLoaded", () => {
    const barsInSemesterAvgGraph = document.getElementById('SemesterAvgAnalysisGraph').querySelectorAll('.Bar')
    barsInSemesterAvgGraph.forEach(bar => {
        const point = bar.querySelector('.AveragePoint') // Select the dot element
        if (point) {
            const degreeAverage = point.getAttribute('data-degree-average')
            if (degreeAverage) {
                // point.style.top = `${180 - (degreeAverage / 100 * 180)}px`
                point.style.bottom = `${degreeAverage / 100 * 180}px`
                point.style.position = "absolute"
            } else {
                console.warn("No data-degree-average attribute found in a bar.")
            }
        }
    })
})

// Logic to move from the Degree AVG section to the Semester AVG section when click the button
const expandToSemesterAvgGraph = () => {
    const analysisGraphsContainer = document.querySelector(".AnalysisGraphsContainer")
    const graphContainer = document.querySelector(".GraphContainer")
    const analysisContainer = document.querySelector(".AnalysisContainer") //details text
    const analysisGraph = document.querySelector(".AnalysisGraph") // graph
    const newSection = document.getElementById("SemesterAvgAnalysisGraph")

    if (analysisGraphsContainer && graphContainer && analysisContainer && analysisGraph && newSection) {
        // Adding extended mode
        analysisGraphsContainer.classList.add("expanded")
        graphContainer.classList.add("expanded")

        // Hiding the previous mode
        analysisContainer.classList.add("Hidden")
        analysisGraph.classList.add("Hidden")
        newSection.classList.remove("Hidden")
    } else {
        console.error("One or more elements not found for expanding!")
    }
}

// Return logic - moving from Semester AVG section to Degree AVG section
const collapseToDegreeAvgGraph = () => {
    const analysisGraphsContainer = document.querySelector(".AnalysisGraphsContainer")
    const graphContainer = document.querySelector(".GraphContainer")
    const analysisContainer = document.querySelector(".AnalysisContainer")
    const analysisGraph = document.querySelector(".AnalysisGraph")
    const newSection = document.getElementById("SemesterAvgAnalysisGraph")

    if (analysisGraphsContainer && graphContainer && analysisContainer && analysisGraph && newSection) {
        // Removing extended mode
        analysisGraphsContainer.classList.remove("expanded")
        graphContainer.classList.remove("expanded")

        // Showing the previous mode
        analysisContainer.classList.remove("Hidden")
        analysisGraph.classList.remove("Hidden")
        newSection.classList.add("Hidden")
    } else {
        console.error("One or more elements not found for collapsing!")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const forwardButton = document.getElementById("SemesterAvgButton")
    const backButton = document.getElementById("BackToDegreeAVGButton")

    if (forwardButton) {
        forwardButton.addEventListener("click", expandToSemesterAvgGraph)
    } else {
        console.error("Forward button not found!")
    }

    if (backButton) {
        backButton.addEventListener("click", collapseToDegreeAvgGraph)
    } else {
        console.error("Back button not found!")
    }
})

// details window logic in the second section
const semesterAvgGraph = document.getElementById('SemesterAvgAnalysisGraph')
const semesterAvgBars = semesterAvgGraph.querySelectorAll('.Bar')
semesterAvgBars.forEach(bar => {
    bar.addEventListener('click', () => {
        semesterAvgBars.forEach((SemesterAvgBar, index) => {
            const detailsWindow = SemesterAvgBar.querySelector('.DetailsWindow')
            // Add the details window
            if (detailsWindow) {
                SemesterAvgBar.appendChild(detailsWindow)
            }
        })
    })
})
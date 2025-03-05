/* Navigation Bar */

function adjustPopupMenu() {
    const navbar = document.querySelector('.navigationBar')
    const popupMenu = document.querySelector('.popupMenu')

    if (navbar && popupMenu) {
        const isSticky = navbar.classList.contains('sticky')
        const navbarHeight = navbar.offsetHeight
        popupMenu.style.top = isSticky ? `${navbarHeight}px` : `${navbar.offsetTop + navbarHeight}px`

        const headerContent = document.querySelector('.headerContent')
        const headerHeight = headerContent ? headerContent.offsetHeight : 0

        popupMenu.style.height = `calc(100% - ${navbarHeight}px - ${headerHeight}px)`
    }
}

window.addEventListener('load', adjustPopupMenu)
window.addEventListener('resize', adjustPopupMenu)

window.onscroll = function () {
    const nav = document.querySelector('.navigationBar')
    const headerContent = document.querySelector('.headerContent')

    if (window.scrollY > headerContent.offsetHeight) {
        nav.classList.add('sticky') // if Scroll down
    } else {
        nav.classList.remove('sticky') // if Scroll up
    }
    adjustPopupMenu()
}

// Search popup Window:
const searchFormContainer = document.querySelector('#searchFormContainer')
const searchButton = document.querySelector('.searchButton')
const closeButton = document.querySelector('.closeButton')
const searchForm = document.querySelector('#searchForm')

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (searchFormContainer.style.display === 'block') {
        searchFormContainer.style.display = 'none'
    } else {
        searchFormContainer.style.display = 'block'
    }
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (searchFormContainer.style.display === 'block') {
        searchFormContainer.style.display = 'none'
    } else {
        searchFormContainer.style.display = 'block'
    }
})

const pages = [
    {keywords: ["דף הבית", "עמוד הבית"], url: "/index"},
    {keywords: ["גיליון ציונים", "ציונים"], url: "/academic-record"},
    {keywords: ["מחשבון נק״ז", "הזנת ציונים", "מחשבון נקודות זכות", "מחשבון נקודות נזכות", "מחשבון נקז"],
        url: "/gpa-calculator"
    }
]

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = document.querySelector("input[name='query']").value.trim().toLowerCase()
    const match = pages.find(page => page.keywords.includes(query))
    if (match) {
        window.location.href = match.url
    } else {
        alert("העמוד לא נמצא")
    }
})

// logout
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".logoutButton")
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            showLogoutPopup()
        })
    }
})

function showLogoutPopup() {
    const overlay = document.createElement("div")
    overlay.classList.add("popup-overlay")

    const popup = document.createElement("div")
    popup.classList.add("logout-popup")

    const logoutConfirmButton = document.createElement("button")
    logoutConfirmButton.textContent = "התנתקות"
    logoutConfirmButton.classList.add("logout-confirm-button")

    logoutConfirmButton.addEventListener("click", function () {
        // server call ?
        // showCustomAlert("נתראה בקרוב :)") //
        window.location.href = "/login" // back to login page
    })

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay)
        }
    })

    popup.appendChild(logoutConfirmButton)
    overlay.appendChild(popup)
    document.body.appendChild(overlay)
}
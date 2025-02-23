const items = [
    {text: "דף הבית שלי", link: "/index"},
    {text: "מחשבון נק״ז - הזנת קורסים", link: "/gpa-calculator"},
    {text: "גיליון ציונים", link: "/academic-record"},
    {text: "מחשבון סימולציה What if", link: "/what-if-calculator"},
    {text: "מחשבון סימולציה עובר בינארי", link: "/binary-pass-calculator"},
    {text: "מחשבון סימולציה סמסטר עתידי", link: "/future-semester-calculator"},
    {text: "ניתוח ביצועים אקדמיים", link: "/academic-performance-analysis"},
    {text: "ניתוחים מתקדמים", link: "/advanced-analysis"},
    {text: "הגדרת יעדים אישיים", link: "/personal-goals"}
]

const hamburgerButton = document.querySelector('.menuButton')
hamburgerButton.addEventListener('click', (e) => {
    e.preventDefault()
    const popupMenu = document.querySelector('.popupMenu')
    const icon = e.currentTarget.querySelector('.menuIcon')
    const isOpen = popupMenu.classList.toggle("open")
    if (isOpen) {
        popupMenu.innerHTML = ""
        icon.innerHTML = `<path d="M6 6L18 18M6 18L18 6" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>`
        const menuItemsUl = document.createElement('ul')
        menuItemsUl.classList.add('menuItems')
        items.forEach(item => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            a.textContent = item.text
            a.href = item.link
            li.appendChild(a)
            menuItemsUl.appendChild(li)
        })
        popupMenu.append(menuItemsUl)
    } else {
        icon.innerHTML = `<path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="#00000" stroke-width="2" stroke-linecap="round"/>`
    }
})
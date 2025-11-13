const closeSidebar = document.querySelector('.close-sidebar');
const Sidebar = document.querySelector('.sidebar');

closeSidebar.addEventListener('click', () => {
    Sidebar.classList.toggle("collapsed")
});
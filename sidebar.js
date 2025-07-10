
const toggleBtn = document.getElementById('sidebar-toggle');
const sidebarClose = document.getElementById('sidebar-close');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    toggleBtn.classList.toggle('hidden');
});
sidebarClose.addEventListener('click',() => {
    sidebar.classList.toggle('hidden');
    toggleBtn.classList.toggle('hidden');
});

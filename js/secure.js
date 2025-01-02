// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable specific key combinations
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});

// footer year

document.getElementById("currentYear").textContent = new Date().getFullYear();
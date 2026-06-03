const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('laura-theme', theme);
}

// Respect system preference on first load
function applySystemTheme() {
  if (localStorage.getItem('laura-theme')) return;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('laura-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved preference or detect system
const saved = localStorage.getItem('laura-theme');
if (saved) setTheme(saved);
else applySystemTheme();
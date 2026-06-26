// DailyForge - Main JavaScript (Static Version)

function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatShortDate(dateString) {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getCategoryColor(category) {
  const colors = {
    fitness: '#ef4444',
    learning: '#3b82f6',
    creativity: '#a855f7',
    coding: '#22c55e',
    mindfulness: '#14b8a6',
    social: '#f59e0b',
    productivity: '#6366f1'
  };
  return colors[category] || '#6b7280';
}

function getCategoryIcon(category) {
  const icons = {
    fitness: 'fa-dumbbell',
    learning: 'fa-book',
    creativity: 'fa-palette',
    coding: 'fa-code',
    mindfulness: 'fa-brain',
    social: 'fa-users',
    productivity: 'fa-tasks'
  };
  return icons[category] || 'fa-star';
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 12px;
    color: #e5e7eb;
    z-index: 10000;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast-success { border-color: rgba(34, 197, 94, 0.3); }
  .toast-success i { color: #22c55e; }
  .toast-error { border-color: rgba(239, 68, 68, 0.3); }
  .toast-error i { color: #ef4444; }
`;
document.head.appendChild(toastStyles);

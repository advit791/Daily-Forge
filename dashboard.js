// DailyForge - Dashboard JavaScript (Static Version)

const challenges = [
  { id: 1, title: 'Morning Meditation', description: 'Spend 10 minutes meditating in a quiet space. Focus on your breath and clear your mind.', category: 'mindfulness', difficulty: 'easy', xp: 10 },
  { id: 2, title: 'Push-up Challenge', description: 'Complete 50 push-ups throughout the day. Break them into sets if needed.', category: 'fitness', difficulty: 'medium', xp: 25 },
  { id: 3, title: 'Read 20 Pages', description: 'Read 20 pages of a non-fiction book. Take notes on one key insight.', category: 'learning', difficulty: 'easy', xp: 10 },
  { id: 4, title: 'Sketch Something', description: 'Draw or sketch anything for 15 minutes. Focus on observation, not perfection.', category: 'creativity', difficulty: 'easy', xp: 10 },
  { id: 5, title: 'Solve a Coding Problem', description: 'Solve one algorithm challenge on LeetCode or HackerRank. Aim for efficiency.', category: 'coding', difficulty: 'hard', xp: 50 },
  { id: 6, title: 'Write in Journal', description: 'Write 3 things you are grateful for and 1 goal for tomorrow.', category: 'mindfulness', difficulty: 'easy', xp: 10 },
  { id: 7, title: '30-Minute Walk', description: 'Take a 30-minute walk outside. Leave your phone on silent.', category: 'fitness', difficulty: 'easy', xp: 10 },
  { id: 8, title: 'Learn Something New', description: 'Watch a 15-minute educational video on a topic you know nothing about.', category: 'learning', difficulty: 'easy', xp: 10 },
  { id: 9, title: 'Write a Short Story', description: 'Write a 500-word flash fiction story. Any genre, any theme.', category: 'creativity', difficulty: 'medium', xp: 25 },
  { id: 10, title: 'Refactor Old Code', description: 'Spend 30 minutes improving code quality in an old project. Clean, rename, document.', category: 'coding', difficulty: 'medium', xp: 25 },
  { id: 11, title: 'Call a Friend', description: 'Call or video chat with a friend or family member you haven\'t spoken to this week.', category: 'social', difficulty: 'easy', xp: 10 },
  { id: 12, title: 'Deep Work Block', description: 'Do 90 minutes of focused work with no distractions. Phone off, tabs closed.', category: 'productivity', difficulty: 'hard', xp: 50 },
  { id: 13, title: 'Healthy Meal Prep', description: 'Prepare a healthy meal from scratch. No takeout, no frozen meals.', category: 'fitness', difficulty: 'medium', xp: 25 },
  { id: 14, title: 'Teach Something', description: 'Explain a concept you know well to someone else. Teaching deepens understanding.', category: 'learning', difficulty: 'medium', xp: 25 },
  { id: 15, title: 'Digital Detox Hour', description: 'Spend one full hour with no screens. Read, walk, think, or create.', category: 'mindfulness', difficulty: 'hard', xp: 50 }
];

function getTodayChallenge() {
  const dayIndex = new Date().getDate() % challenges.length;
  return challenges[dayIndex];
}

function getCompletions() {
  return JSON.parse(localStorage.getItem('dailyforge_completions') || '[]');
}

function saveCompletions(completions) {
  localStorage.setItem('dailyforge_completions', JSON.stringify(completions));
}

function getStats() {
  const completions = getCompletions();
  const totalXp = completions.reduce((sum, c) => sum + c.xp, 0);
  const level = Math.floor(totalXp / 100) + 1;
  const xpInLevel = totalXp % 100;
  const streak = calculateStreak(completions);
  return { completions, totalXp, level, xpInLevel, streak };
}

function calculateStreak(completions) {
  if (completions.length === 0) return 0;
  const dates = [...new Set(completions.map(c => new Date(c.date).toDateString()))];
  dates.sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < dates.length; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    if (dates.includes(checkDate.toDateString())) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

document.addEventListener('DOMContentLoaded', () => {
  const stats = getStats();
  const today = getTodayChallenge();
  const todayStr = new Date().toDateString();
  const completedToday = stats.completions.some(c => c.date === todayStr && c.challengeId === today.id);

  document.getElementById('dateDisplay').textContent = formatDate(new Date());
  document.getElementById('currentStreak').textContent = stats.streak;
  document.getElementById('totalXp').textContent = stats.totalXp;
  document.getElementById('userLevel').textContent = stats.level;

  const progressPercent = (stats.xpInLevel / 100) * 100;
  document.getElementById('xpProgress').textContent = `${Math.round(progressPercent)}%`;
  document.getElementById('nextLevel').textContent = stats.level + 1;
  document.getElementById('currentXp').textContent = stats.xpInLevel;
  document.getElementById('xpNeeded').textContent = 100;
  document.getElementById('xpBar').style.width = `${progressPercent}%`;

  const progressRing = document.getElementById('progressRing');
  if (progressRing) {
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (progressPercent / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
  }

  const container = document.getElementById('challengeContainer');
  container.innerHTML = `
    <div class="challenge-display glass-card">
      <div class="card-header">
        <span class="card-date">Today's Challenge</span>
        <span class="difficulty-badge ${today.difficulty}">${today.difficulty}</span>
      </div>
      <h3 class="card-title">${today.title}</h3>
      <p class="card-description">${today.description}</p>
      <div class="card-footer">
        <div class="card-meta">
          <span class="tag ${today.category}">
            <i class="fas ${getCategoryIcon(today.category)}"></i>
            ${today.category.charAt(0).toUpperCase() + today.category.slice(1)}
          </span>
          <span class="xp-reward">
            <i class="fas fa-star"></i>
            +${today.xp} XP
          </span>
        </div>
        ${completedToday
          ? `<div class="completed-badge"><i class="fas fa-check-circle"></i> Challenge Completed!</div>`
          : `<button class="btn-complete-challenge" onclick="completeChallenge()"><i class="fas fa-check"></i> Mark as Completed</button>`
        }
      </div>
    </div>
  `;

  renderActivity(stats.completions);
  renderWeekGrid(stats.completions);
});

function completeChallenge() {
  const today = getTodayChallenge();
  const completions = getCompletions();
  const todayStr = new Date().toDateString();
  completions.push({ challengeId: today.id, title: today.title, category: today.category, xp: today.xp, date: todayStr });
  saveCompletions(completions);
  showToast(`Challenge completed! +${today.xp} XP`);
  setTimeout(() => location.reload(), 1000);
}

function renderActivity(completions) {
  const container = document.getElementById('activityList');
  if (completions.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><p>No activity yet. Complete your first challenge!</p></div>`;
    return;
  }
  container.innerHTML = completions.slice(-5).reverse().map(c => `
    <div class="activity-item">
      <div class="activity-icon" style="background: ${getCategoryColor(c.category)}20; color: ${getCategoryColor(c.category)}">
        <i class="fas ${getCategoryIcon(c.category)}"></i>
      </div>
      <div class="activity-info">
        <div class="activity-title">${c.title}</div>
        <div class="activity-time">${formatShortDate(c.date)}</div>
      </div>
      <div class="activity-xp">+${c.xp} XP</div>
    </div>
  `).join('');
}

function renderWeekGrid(completions) {
  const container = document.getElementById('weekGrid');
  const today = new Date();
  const dayOfWeek = today.getDay();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const completedDates = new Set(completions.map(c => new Date(c.date).toDateString()));
  let html = '';
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    const isToday = date.toDateString() === today.toDateString();
    const isCompleted = completedDates.has(date.toDateString());
    html += `<div class="week-day ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}"><span class="week-day-name">${days[i]}</span><span class="week-day-number">${date.getDate()}</span></div>`;
  }
  container.innerHTML = html;
}

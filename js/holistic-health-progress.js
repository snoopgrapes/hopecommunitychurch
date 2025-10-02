// js/holistic-health-progress.js
// Import Firebase functions
import { saveProgress, loadProgress } from './firebase-init.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Get a unique user ID. In a real app, you would get this from Firebase Auth
  const userId = "testUser123";

  try {
    // Get current progress from Firebase or initialize defaults
    let userProgress = await loadProgress(userId) || {
      currentWeek: 1,
      completedWeeks: [],
      lastAccessed: new Date().toISOString()
    };
    
    // Check if coming from dashboard to a specific week
    const hash = window.location.hash;
    if (hash && hash.startsWith('#week')) {
      const weekNum = parseInt(hash.replace('#week', ''));
      if (weekNum >= 1 && weekNum <= 12) {
        userProgress.currentWeek = weekNum;
      }
    }

    // Mark week as completed when form is submitted
    const weekContainers = document.querySelectorAll('.week-container');
    weekContainers.forEach((container, index) => {
      const weekNum = index + 1;
      const inputs = container.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        // Load saved data if available
        const savedValue = localStorage.getItem(`week${weekNum}_${input.name || input.id}`);
        if (savedValue) {
          if (input.type === 'checkbox') {
            input.checked = savedValue === 'true';
          } else {
            input.value = savedValue;
          }
          
          if (!userProgress.completedWeeks.includes(weekNum)) {
            userProgress.completedWeeks.push(weekNum);
            userProgress.completedWeeks.sort((a, b) => a - b);
          }
        }
        
        // Save data when input changes
        input.addEventListener('change', async function() {
          if (this.type === 'checkbox') {
            localStorage.setItem(`week${weekNum}_${this.name || this.id}`, this.checked);
          } else {
            localStorage.setItem(`week${weekNum}_${this.name || this.id}`, this.value);
          }
          
          if (!userProgress.completedWeeks.includes(weekNum)) {
            userProgress.completedWeeks.push(weekNum);
            userProgress.completedWeeks.sort((a, b) => a - b);
            await saveProgress(userId, userProgress);
          }
        });
      });
      
      if (!container.querySelector('.complete-week-btn')) {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Mark Week as Complete';
        completeBtn.style.marginTop = '15px';
        completeBtn.className = 'btn complete-week-btn';
        completeBtn.onclick = async function() {
          if (!userProgress.completedWeeks.includes(weekNum)) {
            userProgress.completedWeeks.push(weekNum);
            userProgress.completedWeeks.sort((a, b) => a - b);
            
            if (weekNum < 12 && userProgress.currentWeek === weekNum) {
              userProgress.currentWeek = weekNum + 1;
            }
            
            await saveProgress(userId, userProgress);
            alert(`Week ${weekNum} marked as complete!`);
            
            if (weekNum < 12) {
              const nextWeekElement = document.querySelector(`#week${weekNum + 1}`);
              if (nextWeekElement) {
                nextWeekElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          } else {
            alert('This week is already marked as complete!');
          }
        };
        
        container.appendChild(completeBtn);
      }
    });

    await saveProgress(userId, userProgress);
    
    // Scroll to current week
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const currentWeekElement = document.querySelector(`#week${userProgress.currentWeek}`);
      if (currentWeekElement) {
        currentWeekElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    alert('There was an error loading your progress. Please refresh the page.');
  }
});
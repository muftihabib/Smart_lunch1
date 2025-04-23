document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedbacks-list');
  
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const feedback = document.getElementById('feedback').value;
  
      if (!feedback) {
        alert('Please write your feedback!');
        return;
      }
  
      const response = await fetch('/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feedback }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert(data.message);
        feedbackForm.reset(); // Clear form fields
        fetchFeedbacks(); // Reload feedback
      } else {
        alert('Failed to submit feedback!');
      }
    });
  
    // Fetch all feedbacks
    async function fetchFeedbacks() {
      const response = await fetch('/get-feedback');
      const data = await response.json();
  
      feedbackList.innerHTML = '<h4>What Others Are Saying</h4>';
  
      data.feedback.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${item.name}</strong><p>${item.feedback}</p>`;
        div.classList.add('feedback');
        feedbackList.appendChild(div);
      });
    }
  
    fetchFeedbacks(); // Load feedbacks on page load
  });
  
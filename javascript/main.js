/* Text Scramble Effect (Optional - keep if you use it elsewhere) */
const chars = "!<>-_\\/[]{}—=+*^?#________";
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scramble').forEach(el => {
    const originalText = el.dataset.text || el.textContent;
    let intervalId = null; // To store interval ID for clearing

    const scrambleEffect = () => {
      let iterations = 0;
      if (intervalId) clearInterval(intervalId); // Clear previous interval if any

      intervalId = setInterval(() => {
        const scrambled = originalText
          .split("")
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iterations) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        el.textContent = scrambled;

        if (iterations >= originalText.length) {
          clearInterval(intervalId);
          el.textContent = originalText;
        }
        iterations += 1 / 2;
      }, 40); // Adjusted speed
    };

    el.addEventListener('mouseenter', scrambleEffect);
    // Optional: Reset on mouseleave if you want the effect to stop or reset
    el.addEventListener('mouseleave', () => {
        if (intervalId) clearInterval(intervalId);
        el.textContent = originalText; // Reset to original text
    });
  });

  /* Role Filter Logic */
  const filterButtons = document.querySelectorAll(".roleFilter");
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const pictures = document.querySelectorAll(".pictureCard");
        pictures.forEach(picture => {
          const pictureRoles = picture.dataset.role ? picture.dataset.role.split(" ") : [];
          if (button.textContent.trim() === 'Team' || pictureRoles.includes(button.textContent.trim())) {
            picture.style.display = "flex"; // Use flex as it's a flex item
          } else {
            picture.style.display = "none";
          }
        });
      });
    });

    const teamButton = Array.from(filterButtons).find(btn => btn.textContent.trim() === 'Team');
    if (teamButton) {
      teamButton.click();
    } else {
      filterButtons[0]?.click(); // Click the first filter button if 'Team' doesn't exist
    }
  }

  /* Web3Forms Submission Logic */
  const contactForm = document.getElementById('contactForm'); // Use new ID "contactForm"
  const formResult = document.getElementById('formResult');   // Use new ID "formResult"

  if (contactForm && formResult) { // Check if elements exist
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      formResult.style.display = "block"; // Make sure result div is visible
      formResult.innerHTML = "Please wait...";

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let jsonResponse = await response.json();
        if (response.status == 200) {
          formResult.innerHTML = jsonResponse.message;
        } else {
          console.log(response);
          formResult.innerHTML = jsonResponse.message || "Something went wrong!";
        }
      })
      .catch(error => {
        console.log(error);
        formResult.innerHTML = "Something went wrong!";
      })
      .then(function() {
        contactForm.reset();
        setTimeout(() => {
          formResult.style.display = "none";
          formResult.innerHTML = ""; // Clear content
        }, 4000); // Increased timeout
      });
    });
  } else {
      if (!contactForm) console.error("Form with ID 'contactForm' not found.");
      if (!formResult) console.error("Element with ID 'formResult' not found for form messages.");
  }

  /* New FAQ Accordion Logic */
  const faqQuestions = document.querySelectorAll('.faqQuestion');

  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const answerDiv = button.nextElementSibling; // Should be .faqAnswer
      const icon = button.querySelector('.faqIcon');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (!answerDiv || !icon) {
          console.error("FAQ structure incorrect for button:", button);
          return;
      }

      if (isExpanded) {
        // Collapse
        button.setAttribute('aria-expanded', 'false');
        // icon.textContent = '+'; // Use CSS for icon change via rotation
        answerDiv.style.maxHeight = null;
        answerDiv.style.paddingTop = '0px';     // Match collapsed padding
        answerDiv.style.paddingBottom = '0px';  // Match collapsed padding
        // Optional: Add 'hidden' attribute after transition for accessibility
        // setTimeout(() => { if (button.getAttribute('aria-expanded') === 'false') answerDiv.hidden = true; }, 400);

      } else {
        // Expand
        button.setAttribute('aria-expanded', 'true');
        // icon.textContent = '-'; // Use CSS for icon change via rotation
        
        answerDiv.hidden = false; // Remove hidden attribute if present
        // Set padding before calculating scrollHeight for accuracy if needed
        // but better to set target padding and let transition handle it.
        answerDiv.style.paddingTop = '0px'; // Will transition to this, then to final if different
        answerDiv.style.paddingBottom = '20px'; // Final bottom padding when open
        answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
      }
    });
  });
});
// REMOVED THE STRAY '}' THAT WAS HERE
/* Text Scramble Effect (Optional - keep if you use it elsewhere) */
const chars = "!<>-_\\/[]{}—=+*^?#________";

document.addEventListener("DOMContentLoaded", () => {
  /* Hamburger Menu Toggle Logic */
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active'); // For styling the hamburger icon itself
    });
  } else {
    if (!hamburger) console.error("Hamburger menu element not found.");
    if (!navLinks) console.error("Nav links element not found.");
  }

  /* Text Scramble for navTitles (if used) */
  document.querySelectorAll('.scramble').forEach(el => { // Assuming .scramble is a class you might add
    const originalText = el.dataset.text || el.textContent;
    let intervalId = null;

    const scrambleEffect = () => {
      let iterations = 0;
      if (intervalId) clearInterval(intervalId);

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
      }, 40);
    };

    el.addEventListener('mouseenter', scrambleEffect);
    el.addEventListener('mouseleave', () => {
        if (intervalId) clearInterval(intervalId);
        el.textContent = originalText;
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
            picture.style.display = "flex";
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
      filterButtons[0]?.click();
    }
  }

  /* Web3Forms Submission Logic */
  const contactForm = document.getElementById('contactForm');
  const formResult = document.getElementById('formResult');

  if (contactForm && formResult) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      formResult.style.display = "block";
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
          formResult.innerHTML = "";
        }, 4000);
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
      const answerDiv = button.nextElementSibling;
      const icon = button.querySelector('.faqIcon');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (!answerDiv || !icon) {
          console.error("FAQ structure incorrect for button:", button);
          return;
      }

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        answerDiv.style.maxHeight = null;
        answerDiv.style.paddingTop = '0px';
        answerDiv.style.paddingBottom = '0px';
      } else {
        button.setAttribute('aria-expanded', 'true');
        answerDiv.hidden = false;
        answerDiv.style.paddingTop = '0px';
        answerDiv.style.paddingBottom = '20px';
        answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
      }
    });
  });
});
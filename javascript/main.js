/* Text Scramble Effect (from your original code) */
const chars = "!<>-_\\/[]{}—=+*^?#________";
// This 'bool' was for scramble, but not used in the provided scramble logic.
// If scramble needs it, it should be scoped within its DOMContentLoaded.
// For now, assuming it's not critically used by the scramble part shown.

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scramble').forEach(el => {
    const originalText = el.dataset.text || el.textContent; // Use data-text or current text

    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      const scrambleInterval = setInterval(() => {
        const scrambled = originalText
          .split("")
          .map((char, i) => {
            if (char === ' ') return ' '; // Preserve spaces
            if (i < iterations) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        el.textContent = scrambled;

        if (iterations >= originalText.length) {
          clearInterval(scrambleInterval);
          el.textContent = originalText; // Ensure it resets to original
        }
        iterations += 1 / 2; // Controls speed
      }, 30); // Interval speed
    });
    // Optional: Reset on mouseleave
    // el.addEventListener('mouseleave', () => {
    //   el.textContent = originalText;
    // });
  });
});


/* questionOpen function (from your original code) */
let questionOpenBool = false; // Renamed from 'bool' to avoid global conflicts
function questionOpen(){
  const questionsElement = document.querySelector(".questions");
  let answerParaElement; // To store the created answer paragraph

  if (questionsElement) { // Check if the element exists
    questionsElement.style.cursor = "pointer";
    questionsElement.addEventListener("click", () =>{
      if(!questionOpenBool){
        questionOpenBool = true;
        answerParaElement = document.createElement("p");
        answerParaElement.textContent = `Yes! Food will be provided for the duration of the event. We will also have swag and prizes!
        For non-UO students, we ask that you manage your own housing and transportation`;
        questionsElement.appendChild(answerParaElement);
      } else {
        questionOpenBool = false;
        if (answerParaElement && answerParaElement.parentNode === questionsElement) {
          questionsElement.removeChild(answerParaElement);
        }
        answerParaElement = null; // Clear reference
      }
    });
  }
}
// Initialize questionOpen listeners if the '.questions' element exists
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector(".questions")) { // Check if element exists before calling
        questionOpen();
    }
});


/* Role Filter Logic (from your original code, MODIFIED to remove JS width/margin setting) */
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".roleFilter");

  if (filterButtons.length > 0) { // Proceed only if filter buttons exist
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button style using CSS class
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');

        const pictures = document.querySelectorAll(".pictureCard");
        // visibleCount is not strictly needed anymore if CSS handles layout fully.
        // let visibleCount = 0;

        pictures.forEach(picture => {
          const pictureRoles = picture.dataset.role ? picture.dataset.role.split(" ") : [];
          if(button.innerHTML.trim() == 'Team' || pictureRoles.includes(button.innerHTML.trim())){
            picture.style.display = ""; // Resets to default display (flex from CSS)
            // visibleCount++;
          } else {
            picture.style.display = "none";
          }
        });

        // CRITICAL: The following block that dynamically set card width and margin
        // has been REMOVED/COMMENTED OUT to allow CSS to control the 5x5 layout.
        /*
        if (visibleCount > 0) {
          pictures.forEach(picture => {
            if (picture.style.display !== "none") {
              // picture.style.width = `calc(${Math.min(25, 100/Math.min(visibleCount, 4))}% - 20px)`; // REMOVED
              // picture.style.margin = "10px"; // REMOVED (gap property on container is preferred)
            }
          });
        }
        */
      });
    });

    // Simulate a click on the 'Team' button by default if it exists, else the first button
    const teamButton = Array.from(filterButtons).find(btn => btn.innerHTML.trim() === 'Team');
    if (teamButton) {
      teamButton.click();
    } else {
      filterButtons[0].click(); // Click the first filter button as a fallback
    }
  }
});
// The stray '}' from your original main.js upload has been removed.
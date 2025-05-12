/*
const chars = "!<>-_\\/[]{}—=+*^?#________";
let bool = false;
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scramble').forEach(el => {
    const originalText = el.dataset.text;

    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      const scrambleInterval = setInterval(() => {
        const scrambled = originalText
          .split("")
          .map((char, i) => {
            if (i < iterations) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        el.textContent = scrambled;

        if (iterations >= originalText.length) clearInterval(scrambleInterval);
        iterations += 1 / 2;
      }, 30);
    });
  });
});

*/
function questionOpen(){
  const questions = document.querySelector(".questions");
  let answer;
  questions.addEventListener("click", () =>{
    if(!bool){ 
      bool = true;
      answer = document.createElement("p");
      answer.textContent = `Yes! Food will be provided for the duration of the event. We will also have swag and prizes! 
      For non-UO students, we ask that you manage your own housing and transportation`;
      questions.appendChild(answer);
    } else{
      bool = false;
      questions.remove(answer);
    }
    console.log(bool);
});
}

document.addEventListener("DOMContentLoaded", () => {
  // Get the current page URL
  const currentPath = window.location.pathname;
  
  // Extract page name from path (or use the whole path if simpler)
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  const pages = document.querySelectorAll(".navTitle");
  
  // First set all to default color
  pages.forEach(pg => {
    pg.style.color = '#FFFFE0';
  });
  
  // Find and highlight the current page
  pages.forEach(page => {
    // Get the href attribute from the page link
    const pageHref = page.getAttribute('href') || '';
    // If this link points to the current page, highlight it
    if (pageHref.includes(currentPage) || 
        (currentPage === 'index.html' && pageHref.includes('home'))) {
      page.style.color = '#FFD700';
    }
    
    // Still maintain the click event for SPA-like behavior
    page.addEventListener('click', () => {
      pages.forEach(pg => {
        pg.style.color = '#FFFFE0';
      });
      page.style.color = '#FFD700';
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".roleFilter");
  const memberContainer = document.querySelector(".memberContainer");
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => {
        btn.style.color = 'black';
      });
      button.style.color = '#00A3A3';
      
      const pictures = document.querySelectorAll(".pictureCard");
      let visibleCount = 0;
      
      pictures.forEach(picture => {
        if(button.innerHTML == 'Team'){
          picture.style.display = "";
          visibleCount++;
        }
        //else if(button.innerHTML == picture.dataset.role){
        //  picture.style.display = "";
        //  visibleCount++;
        //}
        else if(picture.dataset.role.split(" ").includes(button.innerHTML)){
        picture.style.display = "";
        visibleCount++;
        }
        else{
          picture.style.display = "none";
        }
      });
      
      // Adjust the width of cards to maintain spacing
      if (visibleCount > 0) {
        pictures.forEach(picture => {
          if (picture.style.display !== "none") {
            // Calculate width based on visible cards
            // This ensures even spacing regardless of how many cards are visible
            picture.style.width = `calc(${Math.min(25, 100/Math.min(visibleCount, 4))}% - 20px)`;
            picture.style.margin = "10px";
          }
        });
      }
    });
  });
  
  const teamButton = document.querySelector('.roleFilter');
  if (teamButton) {
    teamButton.click();
  }
});
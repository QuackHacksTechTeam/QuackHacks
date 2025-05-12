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
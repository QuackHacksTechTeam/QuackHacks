document.querySelectorAll(".card button").forEach((button, index, buttons) => {
    button.addEventListener("click", () => {
        // Remove the "clicked" class from all buttons
        buttons.forEach(btn => btn.classList.remove("clicked"));

        // Add the "clicked" class to the clicked button
        button.classList.add("clicked");
    });
});
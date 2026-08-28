document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {

    // Permite usar la tarjeta también con teclado
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    const toggleCard = () => {

      const isOpen = card.classList.toggle("open");

      card.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    };


    // Abrir/cerrar con toque o click
    card.addEventListener("click", (event) => {

      /*
        Evita cerrar/abrir accidentalmente
        si en el futuro agregas enlaces,
        botones u otros controles
        dentro de la tarjeta.
      */

      if (
        event.target.closest(
          "a, button, input, textarea, select"
        )
      ) {
        return;
      }

      toggleCard();

    });


    // Abrir/cerrar con teclado
    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        toggleCard();

      }

    });

  });


  /*
    Cerrar tarjeta tocando fuera de ella
  */

  document.addEventListener("click", (event) => {

    const clickedCard =
      event.target.closest(".card");

    if (clickedCard) {
      return;
    }

    cards.forEach((card) => {

      card.classList.remove("open");

      card.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

});
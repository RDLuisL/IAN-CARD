document.addEventListener("DOMContentLoaded", () => {

  const card =
    document.getElementById("birthdayCard");

  const pages =
    Array.from(
      document.querySelectorAll(".page")
    );

  const prevButton =
    document.getElementById("prevPage");

  const nextButton =
    document.getElementById("nextPage");

  const currentPageText =
    document.getElementById("currentPage");

  const cardHint =
    document.getElementById("cardHint");


  let currentPage = 0;

  let touchStartX = 0;
  let touchEndX = 0;


  /* =========================
     ABRIR TARJETA
  ========================= */

  function openCard() {

    if (
      card.classList.contains("open")
    ) {
      return;
    }

    card.classList.add("open");

    card.setAttribute(
      "aria-expanded",
      "true"
    );

    cardHint.textContent =
      "Desliza o usa las flechas para ver las páginas";

  }


  /* =========================
     CERRAR TARJETA
  ========================= */

  function closeCard() {

    card.classList.remove("open");

    card.setAttribute(
      "aria-expanded",
      "false"
    );

    currentPage = 0;

    showPage(currentPage);

    cardHint.textContent =
      "👆 Toca la tarjeta para abrirla";

  }


  /* =========================
     MOSTRAR PAGINA
  ========================= */

  function showPage(index) {

    if (
      index < 0 ||
      index >= pages.length
    ) {
      return;
    }


    pages.forEach(
      (page, pageIndex) => {

        page.classList.remove(
          "active",
          "exit-left"
        );


        if (
          pageIndex === index
        ) {

          page.classList.add(
            "active"
          );

        }


        if (
          pageIndex < index
        ) {

          page.classList.add(
            "exit-left"
          );

        }

      }
    );


    currentPageText.textContent =
      index + 1;


    prevButton.disabled =
      index === 0;


    nextButton.disabled =
      index ===
      pages.length - 1;

  }


  /* =========================
     SIGUIENTE PAGINA
  ========================= */

  function nextPage() {

    if (
      currentPage <
      pages.length - 1
    ) {

      currentPage++;

      showPage(currentPage);

    }

  }


  /* =========================
     PAGINA ANTERIOR
  ========================= */

  function previousPage() {

    if (
      currentPage > 0
    ) {

      currentPage--;

      showPage(currentPage);

    }

  }


  /* =========================
     CLICK EN TARJETA
  ========================= */

  card.addEventListener(
    "click",
    (event) => {

      /*
        No abrir/cerrar si tocamos
        botones o enlaces internos.
      */

      if (
        event.target.closest(
          "button, a"
        )
      ) {
        return;
      }


      /*
        Si está cerrada,
        la abrimos.
      */

      if (
        !card.classList.contains(
          "open"
        )
      ) {

        openCard();

      }

    }
  );


  /* =========================
     BOTONES
  ========================= */

  nextButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      nextPage();

    }
  );


  prevButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      previousPage();

    }
  );


  /* =========================
     SWIPE CELULAR
  ========================= */

  card.addEventListener(
    "touchstart",
    (event) => {

      if (
        !card.classList.contains(
          "open"
        )
      ) {
        return;
      }


      touchStartX =
        event.changedTouches[0]
          .screenX;

    },
    {
      passive: true
    }
  );


  card.addEventListener(
    "touchend",
    (event) => {

      if (
        !card.classList.contains(
          "open"
        )
      ) {
        return;
      }


      touchEndX =
        event.changedTouches[0]
          .screenX;


      handleSwipe();

    },
    {
      passive: true
    }
  );


  function handleSwipe() {

    const distance =
      touchEndX -
      touchStartX;


    const minimumSwipe =
      45;


    /*
      Swipe izquierda
      -> siguiente
    */

    if (
      distance <
      -minimumSwipe
    ) {

      nextPage();

      return;

    }


    /*
      Swipe derecha
      -> anterior
    */

    if (
      distance >
      minimumSwipe
    ) {

      previousPage();

    }

  }


  /* =========================
     CERRAR AL TOCAR FUERA
  ========================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        card.contains(
          event.target
        )
      ) {
        return;
      }


      if (
        card.classList.contains(
          "open"
        )
      ) {

        closeCard();

      }

    }
  );


  /* =========================
     TECLADO
  ========================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !card.classList.contains(
          "open"
        )
      ) {

        if (
          event.key === "Enter"
        ) {

          openCard();

        }

        return;

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        nextPage();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        previousPage();

      }


      if (
        event.key ===
        "Escape"
      ) {

        closeCard();

      }

    }
  );


  /* =========================
     EVITAR QUE LINKS
     CIERREN TARJETA
  ========================= */

  document
    .querySelectorAll(
      ".action-btn"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            event.stopPropagation();

          }
        );

      }
    );


  /* =========================
     ESTADO INICIAL
  ========================= */

  card.setAttribute(
    "tabindex",
    "0"
  );

  card.setAttribute(
    "role",
    "button"
  );

  card.setAttribute(
    "aria-expanded",
    "false"
  );


  showPage(0);

});
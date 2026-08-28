document.addEventListener("DOMContentLoaded", () => {

  const card =
    document.getElementById("birthdayCard");


  const pages =
    Array.from(
      document.querySelectorAll(".page")
    );


  const cardHint =
    document.getElementById("cardHint");


  let currentPage = 0;


  let touchStartX = 0;

  let touchStartY = 0;

  let touchEndX = 0;

  let touchEndY = 0;



  /* =====================================
     MOSTRAR PAGINA
  ====================================== */

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

  }



  /* =====================================
     ABRIR TARJETA
  ====================================== */

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
      "Desliza para descubrir la invitación";

  }



  /* =====================================
     CERRAR TARJETA
  ====================================== */

  function closeCard() {

    card.classList.remove("open");


    card.setAttribute(
      "aria-expanded",
      "false"
    );


    currentPage = 0;


    showPage(currentPage);


    cardHint.textContent =
      "Toca la tarjeta para abrirla";

  }



  /* =====================================
     SIGUIENTE PAGINA
  ====================================== */

  function nextPage() {

    if (
      currentPage <
      pages.length - 1
    ) {

      currentPage++;

      showPage(currentPage);

    }

  }



  /* =====================================
     PAGINA ANTERIOR
  ====================================== */

  function previousPage() {

    if (
      currentPage > 0
    ) {

      currentPage--;

      showPage(currentPage);

    }

  }



  /* =====================================
     ABRIR AL TOCAR
  ====================================== */

  card.addEventListener(
    "click",
    (event) => {

      /*
        No ejecutar si se toca
        alguno de los enlaces.
      */

      if (
        event.target.closest("a")
      ) {
        return;
      }


      if (
        !card.classList.contains("open")
      ) {

        openCard();

      }

    }
  );



  /* =====================================
     INICIO DEL SWIPE
  ====================================== */

  card.addEventListener(
    "touchstart",
    (event) => {

      if (
        !card.classList.contains("open")
      ) {
        return;
      }


      const touch =
        event.changedTouches[0];


      touchStartX =
        touch.clientX;


      touchStartY =
        touch.clientY;

    },
    {
      passive: true
    }
  );



  /* =====================================
     FINAL DEL SWIPE
  ====================================== */

  card.addEventListener(
    "touchend",
    (event) => {

      if (
        !card.classList.contains("open")
      ) {
        return;
      }


      const touch =
        event.changedTouches[0];


      touchEndX =
        touch.clientX;


      touchEndY =
        touch.clientY;


      handleSwipe();

    },
    {
      passive: true
    }
  );



  /* =====================================
     DETECTAR DIRECCION
  ====================================== */

  function handleSwipe() {

    const distanceX =
      touchEndX -
      touchStartX;


    const distanceY =
      touchEndY -
      touchStartY;


    const minimumSwipe =
      45;


    /*
      Ignorar el gesto si fue
      principalmente vertical.
    */

    if (
      Math.abs(distanceY) >
      Math.abs(distanceX)
    ) {

      return;

    }


    /*
      DESLIZAR HACIA LA IZQUIERDA
      -> página siguiente
    */

    if (
      distanceX <
      -minimumSwipe
    ) {

      nextPage();

      return;

    }


    /*
      DESLIZAR HACIA LA DERECHA
      -> página anterior
    */

    if (
      distanceX >
      minimumSwipe
    ) {

      previousPage();

    }

  }



  /* =====================================
     CERRAR TOCANDO FUERA
  ====================================== */

  document.addEventListener(
    "click",
    (event) => {

      if (
        card.contains(event.target)
      ) {
        return;
      }


      if (
        card.classList.contains("open")
      ) {

        closeCard();

      }

    }
  );



  /* =====================================
     EVITAR INTERFERENCIA EN LINKS
  ====================================== */

  document
    .querySelectorAll(".action-btn")
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



  /* =====================================
     TECLADO PARA PC
  ====================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        !card.classList.contains("open")
      ) {

        if (
          event.key === "Enter"
        ) {

          openCard();

        }

        return;

      }


      if (
        event.key === "ArrowRight"
      ) {

        nextPage();

      }


      if (
        event.key === "ArrowLeft"
      ) {

        previousPage();

      }


      if (
        event.key === "Escape"
      ) {

        closeCard();

      }

    }
  );



  /* =====================================
     ESTADO INICIAL
  ====================================== */

  card.setAttribute(
    "tabindex",
    "0"
  );


  card.setAttribute(
    "aria-expanded",
    "false"
  );


  showPage(0);

});
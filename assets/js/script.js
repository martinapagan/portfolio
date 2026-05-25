'use strict';

// ==========================================
// 1. GESTIONE LIGHT / DARK MODE
// ==========================================
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');

function toggleDarkMode() {
  const themeLink = document.getElementById('theme-link');
  
  if (themeLink.href.includes('lightmode.css')) {
    themeLink.href = './assets/css/darkmode.css'; // Switch to dark mode CSS
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    modeIcon.style.color = '#fff'; // Change icon color for dark mode
  } else {
    themeLink.href = './assets/css/lightmode.css'; // Switch to light mode CSS
    modeIcon.classList.remove('fa-moon');
    modeIcon.classList.add('fa-sun');
    modeIcon.style.color = '#333'; // Change icon color for light mode
  }
}

if (modeToggle) {
  modeToggle.addEventListener('click', toggleDarkMode);
}

// ==========================================
// 2. FUNZIONE TOGGLE ELEMENTI GLOBALE
// ==========================================
const elementToggleFunc = function (elem) { 
  if (elem) elem.classList.toggle("active"); 
}

// ==========================================
// 3. GESTIONE SIDEBAR (MOBILE)
// ==========================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// ==========================================
// 4. GESTIONE MODALE TESTIMONIALS (CON CONTROLLO DI SICUREZZA)
// ==========================================
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

if (testimonialsItem.length > 0 && modalCloseBtn && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ==========================================
// 5. GESTIONE FILTRI PROGETTI E MENU A TENDINA
// ==========================================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]"); // CORRETTO TYPO: da data-selecct-value a data-select-value
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Logica di filtraggio degli elementi
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    // Controllo Case-Insensitive solo per la stringa "all"
    if (selectedValue.toLowerCase() === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      // Rimosso il .toLowerCase() così combacia perfettamente con le maiuscole dell'HTML
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Eventi per le voci del menu a tendina (Mobile)
if (selectItems.length > 0 && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.trim(); // Mantiene le maiuscole originali per il dataset
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// Eventi per i bottoni di filtro lineari (Desktop)
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.trim(); // Mantiene le maiuscole originali
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// ==========================================
// 6. VALIDAZIONE FORM DI CONTATTO
// ==========================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // Controlla la validità nativa dei campi del form (es. required, pattern email)
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ==========================================
// 7. NAVIGAZIONE TRA LE PAGINE (BARRA DI NAVIGAZIONE)
// ==========================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetPage = this.innerHTML.trim().toLowerCase();

      pages.forEach((page) => {
        page.classList.remove("active");

        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        }
      });

      navigationLinks.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      window.scrollTo(0, 0);
    });
  });
}
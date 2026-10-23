
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Ano automático no rodapé
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Menu de navegação para celular
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Alternância entre os guias do coletor e do disco
  const guideTabs = document.querySelectorAll(".how-tab");
  const guidePanels = document.querySelectorAll(".guide-panel");

  function activateGuide(guideName, moveFocus = false) {
    guideTabs.forEach((tab) => {
      const isActive = tab.dataset.guide === guideName;

      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;

      if (isActive && moveFocus) {
        tab.focus();
      }
    });

    guidePanels.forEach((panel) => {
      const isActive = panel.id === `guide-${guideName}`;
      panel.classList.toggle("hidden", !isActive);
    });
  }

  guideTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateGuide(tab.dataset.guide);
    });

    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex =
        (index + direction + guideTabs.length) % guideTabs.length;

      activateGuide(guideTabs[nextIndex].dataset.guide, true);
    });
  });

  if (guideTabs.length > 0) {
    activateGuide("cup");
  }

  // Comparação educativa de acordo com a prioridade selecionada
  const choiceButtons = document.querySelectorAll(".choice-option");
  const choiceResult = document.getElementById("choice-result");

  const recommendations = {
    praticidade: {
      title: "Compare a capacidade e o tempo de uso.",
      text:
        "Coletores e discos podem permitir intervalos maiores entre esvaziamentos do que alguns outros produtos. O limite depende do modelo, e um fluxo intenso pode exigir esvaziamento antes. Confira as instruções do fabricante."
    },

    retirada: {
      title: "Pense na técnica que parece mais confortável.",
      text:
        "O coletor exige que você alcance a base e desfaça a vedação antes de retirar. O disco exige alcançar e enganchar a borda. Ambos precisam de prática; nunca force a retirada e procure atendimento se não conseguir removê-los."
    },

    sexo: {
      title: "Os modelos têm diferenças importantes.",
      text:
        "O coletor vaginal comum não deve permanecer durante a penetração vaginal. Alguns discos são projetados para permitir sexo com penetração, mas não protegem contra gravidez nem ISTs. Confira as instruções específicas do produto."
    },

    sustentabilidade: {
      title: "Verifique se o produto é reutilizável.",
      text:
        "A maioria dos coletores e alguns discos podem ser reutilizados quando limpos e conservados corretamente. Há discos descartáveis também. Compare a vida útil, os cuidados exigidos, o material e o custo ao longo do tempo."
    }
  };

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedChoice = button.dataset.choice;
      const recommendation = recommendations[selectedChoice];

      if (!recommendation || !choiceResult) return;

      choiceButtons.forEach((item) => {
        item.setAttribute(
          "aria-pressed",
          String(item === button)
        );
      });

      choiceResult.replaceChildren();

      const icon = document.createElement("span");
      icon.className = "result-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "✿";

      const paragraph = document.createElement("p");

      const title = document.createElement("strong");
      title.textContent = recommendation.title;

      const description = document.createTextNode(
        ` ${recommendation.text}`
      );

      paragraph.append(title, description);
      choiceResult.append(icon, paragraph);
    });
  });

  // Perguntas frequentes: mantém no máximo uma resposta aberta
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });
});

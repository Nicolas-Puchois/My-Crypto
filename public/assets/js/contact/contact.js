import { fetchData } from "../lib/functions.js";

// tous les champs
const form = document.querySelector("#form-contact");
const formNameInput = document.querySelector("#name");
const formEmailInput = document.querySelector("#email");
const formSubjectInput = document.querySelector("#subject");
const formMessageInput = document.querySelector("#message");
// toutes les div erreurs
const errorName = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorSubject = document.querySelector("#error-subject");
const errorMessage = document.querySelector("#error-message");
// div réponse lors de la réussite/l'échec de l'envoie du formulaire
const responseMessage = document.querySelector("#response-message");
//Regex
const nameRegex = new RegExp("^[A-Za-zÀ-ÿ-]+(?: [A-Za-zÀ-ÿ-]+)*$");
const emailRegex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);

// validation via regexp
function validateField(input, regex, errorEl, errorMsg) {
  const value = input.value.trim();
  if (!regex.test(value)) {
    errorEl.textContent = errorMsg;
    input.classList.remove("valid");
    input.classList.add("invalid");
    setValidationIcon(input, false);
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
    setValidationIcon(input, true);
    return true;
  }
}

// Fonction de validation par longueur minimale pour les champs sujet et message
function validateLength(input, minLength, errorEl, errorMsg) {
  const value = input.value.trim();
  if (value.length < minLength) {
    errorEl.textContent = errorMsg;
    input.classList.remove("valid");
    input.classList.add("invalid");
    setValidationIcon(input, false);
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
    setValidationIcon(input, true);
    return true;
  }
}

function setValidationIcon(input, isValid) {
  const wrapper = input.parentElement;
  const icon = wrapper.querySelector(".validation-icon");
  if (isValid) {
    icon.className = "validation-icon fas fa-check valid-icon"; // Icône check verte
  } else {
    icon.className = "validation-icon"; // Réinitialisation (aucune icône)
  }
}
// ajout d'évènement blur pour valider chaque champ
formNameInput.addEventListener("blur", () => {
  validateField(
    formNameInput,
    nameRegex,
    errorName,
    "veuillez saisir un nom valide (minimum 2 lettres, lettres et espaces uniquement)"
  );
});

formEmailInput.addEventListener("blur", () => {
  validateField(
    formEmailInput,
    emailRegex,
    errorEmail,
    "veuillez saisir un mail valide (exemple de mail valide : exemple@monmail.com)"
  );
});

formSubjectInput.addEventListener("blur", () => {
  validateLength(
    formSubjectInput,
    3,
    errorSubject,
    "Le sujet doit comporter au moins 3 caractères."
  );
});
formMessageInput.addEventListener("blur", () => {
  validateLength(
    formMessageInput,
    10,
    errorMessage,
    "Le message doit comporter au moins 10 caractères."
  );
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Validation finale avant envoi
  const isNameValid = validateField(
    formNameInput,
    nameRegex,
    errorName,
    "Veuillez entrer un nom valide (minimum 2 caractères, lettres et espaces uniquement)."
  );
  const isEmailValid = validateField(
    formEmailInput,
    emailRegex,
    errorEmail,
    "Veuillez entrer une adresse email valide."
  );
  const isSubjectValid = validateLength(
    formSubjectInput,
    3,
    errorSubject,
    "Le sujet doit comporter au moins 3 caractères."
  );
  const isMessageValid = validateLength(
    formMessageInput,
    10,
    errorMessage,
    "Le message doit comporter au moins 10 caractères."
  );
  if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
    return;
  }

  const formData = {
    name: formNameInput.value.trim(),
    email: formEmailInput.value.trim(),
    subject: formSubjectInput.value.trim(),
    message: formMessageInput.value.trim(),
  };
  // console.log("FormData : ", formData);

  // INFO: envoie du message ...
  try {
    const result = await fetchData({
      route: "/contact",
      api: "",
      options: {
        method: "POST", // obligatoire si pas "GET"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    });
    responseMessage.innerHTML = `<div class="alert success">${result.message}</div>`;
    form.reset();
    document
      .querySelectorAll(".validation-icon")
      .forEach((icon) => (icon.className = "validation-icon"));
  } catch (error) {
    responseMessage.innerHTML = `<div class="alert error"> Une erreur est survenue lors de l'envoie du formulaire </div>`;
    console.log(error);
  }

  // console.log(e);
});

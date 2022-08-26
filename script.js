//-----DOM element to variables -----

let textInput = document.getElementById("text_input");
let copyButton = document.getElementById("copy_btn");
let encryptButton = document.getElementById("encrypt_btn");
let decryptButton = document.getElementById("decrypt_btn");
let backButton = document.getElementById("back_btn");
let warnMsg = document.querySelector(".warn_message");
let themeToggle = document.querySelector(".theme_toggle");
let word = "",
  encryptedWord = "",
  decryptedWord = "";
let header = document.getElementById("header");
let noMsgContainer = document.querySelector(".no_message_container");
let leftContainer = document.querySelector(".left_message_container");
let noMsgText = document.querySelector(".no_message_text");
let encryptedMsgContainer = document.querySelector(
  ".encrypted_message_container"
);
let rightContainer = document.querySelector(".right_message_container");
let rightBtnContainer = document.querySelector(".right_button_container");
let noMsgTitle = document.querySelector(".no_message_title");
let noMsgSubtitle = document.querySelector(".no_message_subtitle");

backButton.addEventListener("click", (e) => {
  e.preventDefault();

  leftContainer.classList.remove("show_message_left_container");

  rightContainer.classList.remove("show_message_right_container");

  encryptedMsgContainer.style.display = "none";
  noMsgText.style.display = "flex";
  header.style.display = "grid";
  noMsgContainer.classList.remove("hidden_no_message_img");
  rightBtnContainer.style.display = "none";
});

//-----Encrypt and Decrypt buttons event listeners -----

encryptButton.addEventListener("click", (e) => {
  e.preventDefault();

  defaultCopyBtn();
  word = textInput.value;
  if (validationFunction(word) === true && word != "") {
    let result = encryptFunction(word);

    showMsg(result);

    warnMsg.innerHTML =
      '<p class="warn_message"><img class="warn_icon" src="assets/vector.png"> Solo letras minúsculas y sin acentos<p>';
    warnMsg.style.color = "#495057";
  } else if (word === "") {
    warnMsg.innerHTML = "No puedes encriptar un texto vacío";
    warnMsg.style.color = "#f00";
  } else {
    warnMsg.innerHTML =
      "El texto no es válido. Recuerda no usar mayúsculas o acentos";
    warnMsg.style.color = "#f00";
  }

  encryptedWord = "";
  textInput.value = "";
});

decryptButton.addEventListener("click", (e) => {
  e.preventDefault();
  defaultCopyBtn();

  word = textInput.value;
  if (validationFunction(word) === true && word != "") {
    let result = decryptFunction(word);
    showMsg(result);
    word = "";
    decryptedWord = "";
    warnMsg.innerHTML =
      '<p class="warn_message"><img class="warn_icon" src="assets/vector.png"> Solo letras minúsculas y sin acentos<p>';
    warnMsg.style.color = "#495057";
  } else if (word === "") {
    warnMsg.innerHTML = "No puedes desencriptar un texto vacío";
    warnMsg.style.color = "#f00";
  } else {
    warnMsg.innerHTML =
      "El texto no es válido. Recuerda no usar mayúsculas o acentos";
    warnMsg.style.color = "#f00";
  }

  textInput.value = "";
});

const defaultCopyBtn = () => {
  copyButton.innerHTML = "Copiar";
  copyButton.classList.remove("copy_selected");
  copyButton.classList.add("copy");
};

// ----- Validation Function -----

const validationFunction = (word) => {
  const accentedVowels = ["á", "é", "í", "ó", "ú"];

  for (let index = 0; index < word.length; index++) {
    if (
      word.charAt(index) === word.charAt(index).toUpperCase() &&
      word.charAt(index) != " " &&
      word.charAt(index) != "!" &&
      word.charAt(index) != "?"
    ) {
      return false;
    } else {
      for (let i = 0; i < accentedVowels.length; i++) {
        if (word.charAt(index) == accentedVowels[i]) {
          i = 0;
          return false;
        }
      }
    }
    if (index === word.length - 1) {
      return true;
    }
  }
};

//----- Encrypt and decrypt function declaration-----

const encryptFunction = (word) => {
  for (let index = 0; index < word.length; index++) {
    switch (word.charAt(index)) {
      case "a":
        encryptedWord = encryptedWord + "ai";
        break;
      //   return "ai";
      case "e":
        encryptedWord = encryptedWord + "enter";
        break;
      //   return "enter";
      case "i":
        encryptedWord = encryptedWord + "imes";
        break;
      //   return "imes";
      case "o":
        encryptedWord = encryptedWord + "ober";
        break;
      //   return "ober";
      case "u":
        encryptedWord = encryptedWord + "ufat";
        break;
      //   return "ufat";
      default:
        encryptedWord = encryptedWord + word.charAt(index);
        break;
      //   return (word.charAt(index)) ;
    }
  }
  return encryptedWord;
};

const decryptFunction = (word) => {
  for (let index = 0; index < word.length; index++) {
    switch (word.charAt(index)) {
      case "a":
        if (word.charAt(index + 1 === "i")) {
          decryptedWord = decryptedWord + "a";
          index = index + 1;
        }
        break;
      //   return "a";
      case "e":
        if (word.substr(index, 5) === "enter") {
          decryptedWord = decryptedWord + "e";
          index = index + 4;
        }
        break;
      //   return "e";
      case "i":
        if (word.substr(index, 4) === "imes") {
          decryptedWord = decryptedWord + "i";
          index = index + 3;

          break;
        }
      case "o":
        if (word.substr(index, 4) === "ober") {
          decryptedWord = decryptedWord + "o";
          index = index + 3;
          break;
        }
      case "u":
        if (word.substr(index, 4) === "ufat") {
          decryptedWord = decryptedWord + "u";
          index = index + 3;

          break;
        }
      default:
        decryptedWord = decryptedWord + word.charAt(index);
        break;
      //   return (word.charAt(index)) ;
    }
  }
  return decryptedWord;
};

//----- Function that display mobile or desktop layout -----

const mobileMsgContainer = () => {
  if (encryptedMsgContainer.style.display != "null") {
    header.classList.add("show_message_header");
    leftContainer.classList.add("show_message_left_container");
    rightContainer.classList.add("show_message_right_container");
    backButton.classList.add("show_back_button");
  }
};

//----- Function that display encrypted or decrypted message -----

const showMsg = (msg) => {
  noMsgContainer.classList.add("hidden_no_message_img");
  encryptedMsgContainer.innerHTML = msg;

  mobileMsgContainer();

  noMsgText.style = "display: none";
  encryptedMsgContainer.innerHTML = msg;

  rightBtnContainer.style.display = "inline-block";
  encryptedMsgContainer.style = "display: inline-block";

  // ----- Copy button event listener -----
  
  copyButton.addEventListener("click", (e) => {
    navigator.clipboard.writeText(msg);
    copyButton.innerHTML = "Mensaje copiado";
    copyButton.classList.remove("copy");
    copyButton.classList.add("copy_selected");
  });
};

// ----- Dark Theme toggle functions -----

const toggleDarkTheme = (darkTheme) => {
  themeToggle.classList.toggle("dark-border");
  if (darkTheme) {
    themeToggle.classList.value === "theme_toggle dark-border";
  }

  if (themeToggle.classList.value === "theme_toggle dark-border") {
    themeToggle.innerHTML = '<img src="assets/theme.svg"><p>Tema oscuro</p>';
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.innerHTML = '<img src="assets/theme.svg"><p>Tema claro</p>';
    localStorage.removeItem("theme");
  }

  document.body.classList.toggle("dark-container");

  leftContainer.classList.toggle("dark-container");
  textInput.classList.toggle("dark-container");
  rightContainer.classList.toggle("dark-border");

  decryptButton.classList.toggle("dark-border");
  noMsgTitle.classList.toggle("high-emphasis");
  encryptedMsgContainer.classList.toggle("high-emphasis");
  copyButton.classList.toggle("dark-border");
  backButton.classList.toggle("dark-border");
  backButton.classList.toggle("medium-emphasis");
};

themeToggle.addEventListener("click", (e) => {
  toggleDarkTheme();
});

// -----Check if dark theme is on -----

window.addEventListener("load", (e) => {
  if (localStorage.getItem("theme") === "dark") {
    toggleDarkTheme(true);
  }
});

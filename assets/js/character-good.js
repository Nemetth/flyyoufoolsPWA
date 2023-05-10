let charactersGood = JSON.parse(localStorage.getItem("charactersGood"));
/* let charactersEvil = JSON.parse(localStorage.getItem("charactersEvil")); */
let characterId;
window.addEventListener("DOMContentLoaded", function () {
  //Background
  function setBackground() {
    let background = document.querySelector(".body-background");
    background.classList.add("container-good");
  }
  setBackground();
  //Recupera el log

  let logList = document.querySelector("#log-list");
  logList.innerHTML = localStorage.getItem("logContent");

  //Capturar fragmento de URL's para alcanzar la ID del personaje

  let url = window.location.href;
  let characterId = url.split("=")[1];
  console.log(characterId);

  fetch("./db/characterComplement.json")
    .then((response) => response.json())
    .then((data) => {
      container = document.querySelector("#container");
      let html = "";

      const character = data.find((character) => character.id === characterId);
      if (character) {
        html += `<div class="mb-3" >
        <img class="rounded-3" src="${character.image}" width="300px height="500px">
        </div>`;
        html += `<p class="text-wave-good">
 In front of you, you see an important ${character.race}. You recognize it instantly. It's ${character.name}. <br>"Hello my fellow human. What are you doing in the beautiful land of Gondor", say ${character.name}</p> 
 <p class="election">What do you want to do?"</p> `;
        html += `<div class="d-flex gap-5"><button id="kill" class="btn-action"">Kill</button><button id="say" class="btn-action"">Say something</button><button id="fly" class="btn-action"><a href="./index.html">Fly</a></button></div>`;
      }
      container.innerHTML = html;
      kill(characterId);
      say(characterId);
    })
    .catch((error) => console.error(error));
});
//Función de asesinar al personaje
const kill = (characterId) => {
  let buttonKill = document.querySelector("#kill");
  buttonKill.addEventListener("click", function () {
    killingChance(characterId);
  });
};

const killingChance = (characterId) => {
  //Evento de asesinato de algunos personajes especiales
  if (
    characterId === "5cd99d4bde30eff6ebccfea0" ||
    characterId === "5cd99d4bde30eff6ebccfea5" ||
    characterId === "5cd99d4bde30eff6ebccfea4"
  ) {
    let log = document.querySelector("#log-list");
    let listaLog = document.createElement("li");
    log.appendChild(listaLog);
    listaLog.textContent = `You try to kill a Maiar with a gun. Then, you remember that you actually read The Lord of the Rings, and you cant kill a Maiar. What a shame`;
    const extensibleSection = document.querySelector(".extensible-section");
    const nuevoElemento = document.querySelector(
      ".extensible-section li:last-child"
    );
    extensibleSection.scrollTop =
      extensibleSection.scrollHeight - extensibleSection.clientHeight;
  } else if (characterId === "5cd99d4bde30eff6ebccfc15") {
    //Evento de asesinato de Frodo
    let log = document.querySelector("#log-list");
    let listaLog = document.createElement("li");
    log.appendChild(listaLog);
    listaLog.textContent = `You just killed Frodo. Who will be in charge now of throwing the ring into Mount Doom?`;
    let buttonKill = document.querySelector("#kill");
    let buttonSay = document.querySelector("#say");

    buttonKill.setAttribute("disabled", true);
    buttonSay.setAttribute("disabled", true);
    const extensibleSection = document.querySelector(".extensible-section");
    const nuevoElemento = document.querySelector(
      ".extensible-section li:last-child"
    );
    extensibleSection.scrollTop =
      extensibleSection.scrollHeight - extensibleSection.clientHeight;
  } else {
    //Evento de asesinato de los demás
    let log = document.querySelector("#log-list");
    let listaLog = document.createElement("li");
    log.appendChild(listaLog);
    listaLog.textContent =
      "You attempt to kill this random fantasy character, but as a computer gamer, your true weakness is the lack of exercise. Fly, you fool!";
    const extensibleSection = document.querySelector(".extensible-section");
    const nuevoElemento = document.querySelector(
      ".extensible-section li:last-child"
    );
    extensibleSection.scrollTop =
      extensibleSection.scrollHeight - extensibleSection.clientHeight;
  }
  localStorage.setItem("charactersGood", JSON.stringify(charactersGood));
};

//Función de decir algo

let stupidQuotes = [
  "Hey, you. Give me the ring.",
  "I'm just a cute Pokemon. Where am I?",
  "Oh my god, is this the 982nd level of the backrooms?.",
  "ChatGPT, speak to this guy.",
  "Bloody hell, it's supposed to be an easy job. I dont want to talk with random fantasy guys.",
  "Where is Camila? I want some of her cookies.",
];

const say = (characterId) => {
  let buttonSay = document.querySelector("#say");
  buttonSay.addEventListener("click", function () {
    let log = document.querySelector("#log-list");
    let listaLog = document.createElement("li");
    log.appendChild(listaLog);
    listaLog.textContent =
      stupidQuotes[Math.floor(Math.random() * stupidQuotes.length)];
    //Barras de extensión del log

    const extensibleSection = document.querySelector(".extensible-section");
    const nuevoElemento = document.querySelector(
      ".extensible-section li:last-child"
    );
    extensibleSection.scrollTop =
      extensibleSection.scrollHeight - extensibleSection.clientHeight;
  });
};

//Limpieza del Log

const clearLog = () => {
  let botonClear = document.querySelector("#clear-log");
  botonClear.addEventListener("click", function () {
    localStorage.clear();
  });
  botonClear.addEventListener("click", function () {
    clearLogRealTime();
  });
};
clearLog();

const clearLogRealTime = () => {
  const logList = document.querySelector("#log-list");
  if (logList) {
    while (logList.firstChild) {
      logList.removeChild(logList.firstChild);
    }
  }
};

window.addEventListener("beforeunload", function () {
  let logList = document.querySelector("#log-list");
  let logContent = logList.innerHTML;
  localStorage.setItem("logContent", logContent);
});

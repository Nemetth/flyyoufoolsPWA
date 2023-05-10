window.addEventListener("DOMContentLoaded", function () {
  //Generador de URL's
  let urlString = window.location.href;
  let url = new URL(urlString);
  let characterId = url.searchParams.get("id");

  const apiKey = "W1HeZZfFAnd-h0P_Uai7";
  fetch(
    "https://the-one-api.dev/v2/character?name=Frodo%20Baggins,Gandalf,Legolas,Aragorn%20II%20Elessar,Gimli",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      container = document.querySelector("#container");
      let html = "";
      const complementUrl = "./db/characterComplement.json";
      fetch(complementUrl)
        .then((response) => response.json())
        .then((complementData) => {
          for (const character of data.docs) {
            const complementImg = complementData.find(
              (item) => item.name === character.name
            );
            html += `<div class="card" style="width: 18rem;">
              <img src="${complementImg.image}" class="card-img-top" alt="${character.name}">
              <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">You see a ${character.race}. Inmediatly, you realize that you are standing  in front of  ${character.name}. What do you want to do?</p>
                <a data-set=${character.name}" href="character.html?id=${character._id}" class="btn btn-success">Approach</a>
              </div>
            </div>`;
          }
          container.innerHTML = html;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});

/*       const characters = data.docs.map((character) => ({
        _id: character._id,
        name: character.name,
        race: character.race,
        alive: true,
      })); */

/* localStorage.setItem("charactersGood", JSON.stringify(characters));
            
  let charactersGood = JSON.parse(localStorage.getItem("charactersGood")); */

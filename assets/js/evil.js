window.addEventListener("DOMContentLoaded", function () {
  //Generador de URL's
  let urlString = window.location.href;
  let url = new URL(urlString);
  let characterId = url.searchParams.get("id");

  const apiKey = "W1HeZZfFAnd-h0P_Uai7";
  fetch(
    "https://the-one-api.dev/v2/character?name=Sauron,Saruman,Witch-King%20of%20Angmar,Gollum,Shelob",
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
              <img src="${complementImg.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">My name is ${character.name}, an important ${character.race}What do you want, paesent? .</p>
                <a data-set=${character.name}" href="character-evil.html?id=${character._id}" class="btn btn-danger">Approach (Why?)</a>
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

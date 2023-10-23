//Pokemon data and create the list
fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(res => res.ok ? res.json() : Promise.reject("Can't fetch data from API."))
  .then(data => data.results.forEach(({ name, url }) => addToList(name, url)))
  .catch(error => console.error(error));

//Function to add Pokemon to the list
const addToList = (name, url) => {
  const id = url.split("/")[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const card = document.createElement("div");
  card.className = "card col-3";

  const imag = document.createElement("img");
  imag.className = "card-img-top";
  imag.src = imageUrl;

  const nameDiv = document.createElement("div");
  nameDiv.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = name;

  const button = document.createElement("a");
  button.className = "btn btn-primary center";
  button.href = "#";
  button.innerText = "more...";
  button.addEventListener("click", () => showDetails(name));

  nameDiv.appendChild(title);
  nameDiv.appendChild(button);

  card.appendChild(imag);
  card.appendChild(nameDiv);

  document.getElementById("pokemonlist").appendChild(card);
};

// Function to show Pokemon details in the modal
const showDetails = (name) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(res => res.ok ? res.json() : Promise.reject("Can't fetch Pokemon details from the API."))
    .then(pokemonDetails => {
      const modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
      const modalTitle = document.getElementById("modalTitle");
      const modalImage = document.getElementById("modalImage");
      const modalDetails = document.getElementById("modalDetails");

      modalTitle.innerText = name;
      modalTitle.className = "title-center";
      modalImage.src = pokemonDetails.sprites.front_default;

      const filteredStats = pokemonDetails.stats.filter(stat => ["hp", "attack", "defense", "speed"].includes(stat.stat.name));

      const statsHTML = `
        <div class="col-6">
          <h5>Stats:</h5>
          <ul>
            ${filteredStats.map(stat => `<li>${stat.stat.name}:${stat.base_stat}</li>`).join("")}
          </ul>
        </div>
      `;

      const detailsHTML = `
        <div class="row">
          <div class="col-6">
            <p>Height: ${pokemonDetails.height} </p>
            <p>Weight: ${pokemonDetails.weight} </p>
            <p>Base Experience: ${pokemonDetails.base_experience}</p>
          </div>
          ${statsHTML}
        </div>
      `;

      modalDetails.innerHTML = detailsHTML;
      modal.show();
    })
    .catch(error => console.error(error));
  event.preventDefault();
};

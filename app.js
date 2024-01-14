//API basepoint
let apiBase = "https://api.dictionaryapi.dev/api/v2/entries/en";

//User submits form
function retrieveUserInput(event) {
  event.preventDefault();

  let userWord = document.querySelector("#user-word");

  let wordDefinition = `${apiBase}/${userWord.value}`;
  axios.get(wordDefinition).then(displayUserInput);
}

let form = document.querySelector("form");
form.addEventListener("submit", retrieveUserInput);

//Display word definition, pronunciation, etc.
function displayUserInput(response) {
  console.log(response.data);

  let word = document.querySelector("h2");
  word.innerHTML = response.data[0].word;

  let pronunciationLink = `${response.data[0].phonetics[1].audio}`;

  let pronunciation = document.querySelector("#pronunciation");
  pronunciation.innerHTML = `<a href="${pronunciationLink}" target="_blank">Pronunciation</a>`;
}

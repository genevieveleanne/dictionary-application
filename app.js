//API basepoint
let apiBase = "https://api.dictionaryapi.dev/api/v2/entries/en";

//User submits form
function retrieveUserInput(event) {
  event.preventDefault();

  let userWord = document.querySelector("#user-word");

  searchWord(userWord.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", retrieveUserInput);

//Display word on page load
function searchWord(word) {
  let wordDefinition = `${apiBase}/${word}`;
  axios.get(wordDefinition).then(displayUserInput);
}

searchWord("sunrise");

//Display word definition and pronunciation
function displayUserInput(response) {
  console.log(response.data);

  let word = document.querySelector("h2");
  word.innerHTML = response.data[0].word;

  let pronunciationLink = `${response.data[0].phonetics[1].audio}`;

  if (pronunciationLink === "") {
    pronunciationDisplay(response);
  } else {
    let pronunciation = document.querySelector("#pronunciation");
    pronunciation.innerHTML = `<a href="${pronunciationLink}" target="_blank">Pronunciation</a>`;
  }
}

//If phonetics[1] is null, then inject link from phonetics[0]
function pronunciationDisplay(response) {
  let pronunciationLink = `${response.data[0].phonetics[0].audio}`;

  let pronunciation = document.querySelector("#pronunciation");
  pronunciation.innerHTML = `<a href="${pronunciationLink}" target="_blank">Pronunciation</a>`;
}

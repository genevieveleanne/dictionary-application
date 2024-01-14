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
function searchWord(input) {
  let word = `${apiBase}/${input}`;
  axios.get(word).then(displayUserInput);
}

searchWord("read");

//Display word definition and pronunciation
function displayUserInput(response) {
  let word = document.querySelector("h2");
  word.innerHTML = response.data[0].word;

  let pronunciationLink = `${response.data[0].phonetics[1].audio}`;

  if (pronunciationLink === "") {
    pronunciationDisplay(response);
  } else {
    let pronunciation = document.querySelector("#pronunciation");
    pronunciation.innerHTML = `<a href="${pronunciationLink}" target="_blank">Pronunciation</a>`;
  }

  wordDefinitionDisplay(response);
}

//If phonetics[1] is null, then inject link from phonetics[0]
function pronunciationDisplay(response) {
  let pronunciationLink = `${response.data[0].phonetics[0].audio}`;

  let pronunciation = document.querySelector("#pronunciation");
  pronunciation.innerHTML = `<a href="${pronunciationLink}" target="_blank">Pronunciation</a>`;
}

//Display part of speech. Initial display of antonyms, definition, and synonyms
function wordDefinitionDisplay(response) {
  console.log(response.data[0].meanings);

  let wordContainer = document.querySelector("#definition-display");

  let wordHTML = `<div>`;

  function displayDefinition(word, index) {
    if (index < 6) {
      wordHTML =
        wordHTML +
        `<div class="meanings-display">
        <h4>${word.partOfSpeech}</h4>

        <ul>
        <li>
        <strong>Definition:</strong>

        </li>

        <li>
        <strong>Example Sentence:</strong>
        </li>

        <li>
        <strong>Synonyms:</strong>
        </li>

        <li>
        <strong>Antonyms:</strong>
        </li>
        </ul>`;
    }
  }

  let wordDefinition = response.data[0].meanings;
  wordDefinition.forEach(displayDefinition);

  wordHTML = wordHTML + `</div>`;
  wordContainer.innerHTML = wordHTML;
}

//Antonyms, Definitions, Synonyms

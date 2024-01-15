//API key and basepoint
let apiKey = "1bac80fa0c32ft537387a483f19bf3fo";
let apiBase = "https://api.shecodes.io/dictionary/v1/define?word";

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
  let word = `${apiBase}=${input}&key=${apiKey}`;
  axios.get(word).then(displayUserInput);
}

searchWord("read");

//Display word definition and pronunciation
function displayUserInput(response) {
  console.log(response.data);

  let word = document.querySelector("h2");
  word.innerHTML = response.data.word;

  let phonetics = document.querySelector("#phonetics");
  phonetics.innerHTML = `"${response.data.phonetic}"`;

  wordDefinitionDisplay(response);
}

//Display part of speech. Initial display of antonyms, definition, and synonyms
function wordDefinitionDisplay(response) {
  console.log(response.data[0].meanings);

  let wordContainer = document.querySelector("#meanings-display");

  let wordHTML = `<div>`;

  function displayMeanings(word, index) {
    if (index < 20) {
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

  let meanings = response.data[0].meanings;
  meanings.forEach(displayMeanings);

  wordHTML = wordHTML + `</div>`;
  wordContainer.innerHTML = wordHTML;
}

//Antonyms, Definitions, Synonyms

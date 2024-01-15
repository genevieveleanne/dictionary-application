//SheCodes API key and basepoint
let apiKey = "1bac80fa0c32ft537387a483f19bf3fo";
let apiBase = "https://api.shecodes.io/dictionary/v1/define?word";

//Free Dictionary API base
let secondApiBase = "https://api.dictionaryapi.dev/api/v2/entries/en";

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
  axios.get(word).then(displayWord);

  let phonetics = `${secondApiBase}/${input}`;
  axios.get(phonetics).then(displayPronunciation);
}

searchWord("read");

//Display user's word
function displayWord(response) {
  let word = document.querySelector("h2");
  word.innerHTML = response.data.word;

  wordDefinitionDisplay(response);
}

//Display word pronunciation
function displayPronunciation(response) {
  let pronunciationLink = `${response.data[0].phonetics[1].audio}`;

  if (pronunciationLink === "") {
    let pronunciationHTML = document.querySelector("#pronunciation");
    pronunciationHTML.innerHTML = `<a href="${response.data[0].phonetics[0].audio}" target="_blank">
    Pronunciation
    </a>`;
  } else {
    let pronunciationHTML = document.querySelector("#pronunciation");
    pronunciationHTML.innerHTML = `<a href="${pronunciationLink}" target="_blank">
    Pronunciation</a>`;
  }
}

//Display part of speech, definition, synonyms, and antonyms
function wordDefinitionDisplay(response) {
  console.log(response.data.meanings);

  let wordContainer = document.querySelector("#meanings-display");

  let wordHTML = `<div>`;

  function displayMeanings(meaning) {
    wordHTML =
      wordHTML +
      `<div class="meanings-display">
        <h4>${meaning.partOfSpeech}</h4>

        <ul>
        <li>
        <strong>Definition:</strong>
        ${meaning.definition}
        </li>

        <li>
        <strong>Synonyms:</strong>
        </li>
        </ul>`;
  }

  //Loop through each word meaning
  let meanings = response.data.meanings;
  meanings.forEach(displayMeanings);

  wordHTML = wordHTML + `</div>`;
  wordContainer.innerHTML = wordHTML;
}

//BUGS: Look up map function to loop through subarray

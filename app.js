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

searchWord("learn");

//Display user's word and word phonetic
function displayWord(response) {
  let word = document.querySelector("h2");
  word.innerHTML = response.data.word;

  let phonetics = document.querySelector("#phonetics");
  phonetics.innerHTML = `"${response.data.phonetic}"`;

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

//Display part of speech, definition, synonyms, and example sentence
function wordDefinitionDisplay(response) {
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
        ${displaySynonyms(meaning)}
        </li>
        
        <li>
        <strong>Example:</strong>
        ${displayExampleSentence(meaning)}
        </li>
        </ul>`;

    function displaySynonyms(meaning) {
      let synonyms = meaning.synonyms;

      if (synonyms === null) {
        return "No synonyms";
      } else {
        return synonyms;
      }
    }

    function displayExampleSentence(meaning) {
      let example = meaning.example;

      if (example === null) {
        return "No example sentence";
      } else {
        return example;
      }
    }
  }

  let meanings = response.data.meanings;
  meanings.forEach(displayMeanings);

  wordHTML = wordHTML + `</div>`;
  wordContainer.innerHTML = wordHTML;
}

//Bugs: Remove pronuciation because it doesn't work sometimes. Add antonyms.

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
  axios.get(word).then(displayWord);
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

//Display part of speech, definition, synonyms, antonyms, and example sentence
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
        <strong>Antonyms:</strong>
        ${displayAntonyms(meaning)}
        </li>
        
        <li>
        <strong>Example Sentence:</strong>
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

    function displayAntonyms(meaning) {
      let antonyms = meaning.antonyms;

      if (antonyms === null) {
        return "No antonyms";
      } else {
        return antonyms;
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

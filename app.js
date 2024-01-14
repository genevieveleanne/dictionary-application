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

//Display Word Definition
function displayUserInput(response) {
  console.log(response.data);

  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data[0].word;
}

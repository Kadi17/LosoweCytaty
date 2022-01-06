// const content = document.getElementById("content");
// const author = document.getElementById("author");

// Ja bardzo lubię querySelector, op jest, bo sobie cssem tak naprawdę wybierasz;
// A no i wybieranie buttona dałem na górę, bo fajnie mieć w jednym miejscu

const content = document.querySelector("#content");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn");

// No magic numbers!!!
const INITIAL_QOUTE_INDEX = 2;

// Liczba mnoga :D
const quotes = [
  {
    content:
      "Wojna i konflikt między przeciwieństwami stanowią odwieczną zasadę wszechświata.",
    author: "Heraklit",
  },

  {
    content:
      "Dziwne, że boją się śmierci. Życie boli o wiele bardziej niż śmierć.",
    author: "Jim Morrison",
  },

  {
    content:
      "Żyj tak, jakbyś miał jutro umrzeć. Ucz się tak, jakbyś miał żyć wiecznie.",
    author: "Mahatma Gandhi",
  },

  {
    content:
      "Szczęście jest jak motyl; im bardziej go ścigasz, tym bardziej ci się wymyka, ale jeśli zwrócisz uwagę na inne rzeczy, przyjdzie i usiądzie miękko na twoim ramieniu.",
    author: "Henry David Thoreau",
  },

  {
    content:
      "Im więcej piasku uciekło z klepsydry naszego życia, tym wyraźniej powinniśmy przez niego przejrzeć.",
    author: "Niccolo Machiavelli",
  },

  {
    content: "Szaleństwo miłości największe z niebiańskich błogosławieństw.",
    author: "Platon",
  },

  {
    content:
      "Staram się od czasu do czasu robić zakupy, by w sklepie spożywczym zobaczyć jakie są ceny. Porównuję je do cen w skupie. Dziś bardzo ważne jest zjawisko, pani mnie pyta o ceny w sklepie, natomiast po drugiej stronie są rolnicy. Rolnicy cieszą się z tego, że z wyjątkiem cen na trzodę chlewną, rosną ceny pszenicy, kukurydzy, rzepaku, nawet mleko rośnie. W związku z tym jest to miecz obusieczny.",
    author: "Mateusz Morawiecki",
  },

  {
    content:
      "Masz wrogów? To dobrze. To znaczy, że broniłeś czegoś w ciągu swojego życia.",
    author: "Winston Churchill",
  },

  {
    content:
      "Sukces polega na przechodzeniu od porażki do porażki bez utraty entuzjazmu.",
    author: "Winston Churchill",
  },
];

// Był powtórzony kodzik w dwóch miejscach, to od razu w funckje, au
// Tutaj nie musisz mieć metody toString() poniewa zarówno content jak i autor są juz stringiem;
function updateUI(index) {
  content.innerHTML = quotes[index].content;
  author.innerHTML = quotes[index].author;
}

function init() {
  console.log(content, author, btn);
  updateUI(INITIAL_QOUTE_INDEX);
}

// Funkcja powinna w miare mozliwości robić jedną rzecz, nazwałeś ją getRandomInt, a ona ustaawiała od razu zawaartośc elementów.
function getRandomInt() {
  return Math.floor(Math.random() * quotes.length);
}

function handleClick() {
  const index = getRandomInt();
  updateUI(index);
}

// Dzięki temu co wyzej masz taki czysty event listener
btn.addEventListener("click", handleClick);

// Raczej lepiej jest najpierw deklarować funkcje a potem z nich korzystać.
init();

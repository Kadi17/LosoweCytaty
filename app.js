// const content = document.getElementById("content");
// const author = document.getElementById("author");

// Ja bardzo lubię querySelector, op jest, bo sobie cssem tak naprawdę wybierasz;
// A no i wybieranie buttona dałem na górę, bo fajnie mieć w jednym miejscu

const content = document.querySelector("#content");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn");
const languageSelector = document.querySelector("#languages");
const baseURL = `https://mephew.ddns.net/quotes/api/quotes/`;
const searchContent = document.querySelector("#Search-content");
const quotesContainer = document.querySelector(".quotes-container");
const languageSearchSelector = document.querySelector("#search-languages");
const authorKey = document.querySelector("#authorKey");
const contentKey = document.querySelector("#contentKey");
const minLength = document.querySelector("#minLength");
const maxLength = document.querySelector("#maxLength");
const minLengthLabel = document.querySelector("label[for=minLength]");
const maxLengthLabel = document.querySelector("label[for=maxLength]");
const previousBtn = document.querySelector("#previousBtn");
const nextBtn = document.querySelector("#nextBtn");
const searchBtn = document.querySelector("#button-search")
const menuBtn = document.querySelector(".hamburger")



// No magic numbers!!!
const INITIAL_QOUTE_INDEX = 2;

// Liczba mnoga :D
// const quotes = [
//   {
//     content:
//       "Wojna i konflikt między przeciwieństwami stanowią odwieczną zasadę wszechświata.",
//     author: "Heraklit",
//   },

//   {
//     content:
//       "Dziwne, że boją się śmierci. Życie boli o wiele bardziej niż śmierć.",
//     author: "Jim Morrison",
//   },

//   {
//     content:
//       "Żyj tak, jakbyś miał jutro umrzeć. Ucz się tak, jakbyś miał żyć wiecznie.",
//     author: "Mahatma Gandhi",
//   },

//   {
//     content:
//       "Szczęście jest jak motyl; im bardziej go ścigasz, tym bardziej ci się wymyka, ale jeśli zwrócisz uwagę na inne rzeczy, przyjdzie i usiądzie miękko na twoim ramieniu.",
//     author: "Henry David Thoreau",
//   },

//   {
//     content:
//       "Im więcej piasku uciekło z klepsydry naszego życia, tym wyraźniej powinniśmy przez niego przejrzeć.",
//     author: "Niccolo Machiavelli",
//   },

//   {
//     content: "Szaleństwo miłości największe z niebiańskich błogosławieństw.",
//     author: "Platon",
//   },

//   {
//     content:
//       "Staram się od czasu do czasu robić zakupy, by w sklepie spożywczym zobaczyć jakie są ceny. Porównuję je do cen w skupie. Dziś bardzo ważne jest zjawisko, pani mnie pyta o ceny w sklepie, natomiast po drugiej stronie są rolnicy. Rolnicy cieszą się z tego, że z wyjątkiem cen na trzodę chlewną, rosną ceny pszenicy, kukurydzy, rzepaku, nawet mleko rośnie. W związku z tym jest to miecz obusieczny.",
//     author: "Mateusz Morawiecki",
//   },

//   {
//     content:
//       "Masz wrogów? To dobrze. To znaczy, że broniłeś czegoś w ciągu swojego życia.",
//     author: "Winston Churchill",
//   },

//   {
//     content:
//       "Sukces polega na przechodzeniu od porażki do porażki bez utraty entuzjazmu.",
//     author: "Winston Churchill",
//   },
// ];

// Był powtórzony kodzik w dwóch miejscach, to od razu w funckje, au
// Tutaj nie musisz mieć metody toString() poniewa zarówno content jak i autor są juz stringiem;
function updateUI(index) {
  
  
}
const debounce = (fn, delay) => {
  let timeoutID;

  return function(...args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

menuBtn.addEventListener("click", function Menubtn(){
  menuBtn.classList.toggle("show")
  document.querySelector(".search-options").classList.toggle("show");
})

function init() {
  handleSearch();
  contentKey.addEventListener('keyup', (e)=> {
    console.log(contentKey)
    if(e.key === "Enter" || contentKey.value === ""){
      authorSearch();
    }
  })
  searchBtn.addEventListener('click', authorSearch);
  languageSearchSelector.addEventListener('change', authorSearch)
  authorKey.addEventListener('keyup', debounce(authorSearch, 500));
  minLength.addEventListener('change', updateLabel);
  maxLength.addEventListener('change', updateLabel);
  nextBtn.addEventListener('click', nextPage);
  previousBtn.addEventListener('click', previousPage);
  updateUI(INITIAL_QOUTE_INDEX);
}

// Funkcja powinna w miare mozliwości robić jedną rzecz, nazwałeś ją getRandomInt, a ona ustaawiała od razu zawaartośc elementów.
// function getRandomInt() {
//   return Math.floor(Math.random() * quotes.length);
// }

function updateContent(res , index){

    // content.innerHTML = res.data.quotes[index].content;
    // author.innerHTML = res.data.quotes[index].author;
    content.innerHTML = res.data.content;
    author.innerHTML = res.data.author;
}

function updateContentSearch(res){

  // content.innerHTML = res.data.quotes[index].content;
  // author.innerHTML = res.data.quotes[index].author;
  // searchContent.innerHTML = res.data.content;
  quotesContainer.innerHTML = "";
  res.data.quotes.forEach(quote => createQuote(quote))
  
}

function createQuote(quote){
  
  const quoteElement = document.createElement("div");
  quoteElement.innerHTML =
  `<h3 id="Search-content">${quote.content}</h3>`+
  `<p>${quote.author}</p>`+
  `<i class="far fa-heart"></i><h4>${quote.popularity}</h4>`;
  quotesContainer.appendChild(quoteElement);

}

function handleClick() {
  // const index = getRandomInt();
  //updateUI(index);
  axios({
      method: 'get',
      url: baseURL + `random?language=${languageSelector.value}`,

  }) 
  .then(res => updateContent(res))
  .catch(err => console.error(err));

  
}

function getUrl( offset = currentOffset){
  const limitSearch = 10;
  const orderBy = "id";
  const invertOrder = false;
  let minLengthint =  (minLength.value > 0) ?  minLength.value : 1
  let maxLengthint = (maxLength.value >= minLengthint) ? maxLength.value  : 1000;
  const SearchUrl = baseURL + `search?author_contains_ci=${authorKey.value}&includes_keywords_ci=${contentKey.value }&language=${languageSearchSelector.value}&min_length=${minLengthint}&max_length=${maxLengthint}&limit=${limitSearch}&offset=${offset}&order_by=${orderBy}&descending=${invertOrder}`; 
  return SearchUrl;
}

function authorSearch(){
  currentOffset = 0;
  handleSearch();
}

function handleSearch( ){
  const SearchUrl = getUrl()
  axios({
    method: 'get',
    url: SearchUrl,
  })
  .then(res => updateContentSearch(res))
  .catch(err => console.error(err));
  preloadNext();
  preloadPrevious();
  
}

function updateLabel(){
  currentOffset = 0;
  minLengthLabel.innerText = minLength.value;   
  maxLengthLabel.innerText = maxLength.value;   
  debounce(handleSearch, 500)();
}

let currentOffset = 0;

function previousPage (){
  currentOffset -= 10;
  handleSearch();
  

}
function nextPage (){
  currentOffset += 10;
  handleSearch();
  
  
}

function preloadNext(){
  const SearchUrl = getUrl(currentOffset + 10);

  axios({
    method: 'get',
    url: SearchUrl,
  })
  .then(res => {
    const resault = res.data.count !== 0 ;
    if (resault)
  {
    
    nextBtn.disabled = false;
  }
  else{
    
    nextBtn.disabled = true;
  }
  } )
  .catch(err => console.error(err));

  
}

function preloadPrevious(){
  if( currentOffset !== 0){
    previousBtn.disabled = false;
    }

    
    else{
      previousBtn.disabled = true;
    }
}


 

// Dzięki temu co wyzej masz taki czysty event listener
btn.addEventListener("click", handleClick);

// Raczej lepiej jest najpierw deklarować funkcje a potem z nich korzystać.
init();
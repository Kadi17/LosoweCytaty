const content = document.getElementById("content");
const author = document.getElementById("author");

const quote = [
    
    {
        content: "Wojna i konflikt między przeciwieństwami stanowią odwieczną zasadę wszechświata.",
        author: "Heraklit",

    },
    
    {
        content: "Dziwne, że boją się śmierci. Życie boli o wiele bardziej niż śmierć.",
        author: "Jim Morrison",

    },

    {
        content: "Żyj tak, jakbyś miał jutro umrzeć. Ucz się tak, jakbyś miał żyć wiecznie.",
        author: "Mahatma Gandhi",
    },

    {
        content: "Szczęście jest jak motyl; im bardziej go ścigasz, tym bardziej ci się wymyka, ale jeśli zwrócisz uwagę na inne rzeczy, przyjdzie i usiądzie miękko na twoim ramieniu.",
        author: "Henry David Thoreau",
    },

    {
        content: "Im więcej piasku uciekło z klepsydry naszego życia, tym wyraźniej powinniśmy przez niego przejrzeć.",
        author: "Niccolo Machiavelli",
    },

    {
        content: "Szaleństwo miłości największe z niebiańskich błogosławieństw.",
        author: "Platon",
    },

    {
        content: "Staram się od czasu do czasu robić zakupy, by w sklepie spożywczym zobaczyć jakie są ceny. Porównuję je do cen w skupie. Dziś bardzo ważne jest zjawisko, pani mnie pyta o ceny w sklepie, natomiast po drugiej stronie są rolnicy. Rolnicy cieszą się z tego, że z wyjątkiem cen na trzodę chlewną, rosną ceny pszenicy, kukurydzy, rzepaku, nawet mleko rośnie. W związku z tym jest to miecz obusieczny.",
        author: "Mateusz Morawiecki",
    },

    {
        content: "Masz wrogów? To dobrze. To znaczy, że broniłeś czegoś w ciągu swojego życia.",
        author: "Winston Churchill",
    },

    {
        content: "Sukces polega na przechodzeniu od porażki do porażki bez utraty entuzjazmu.",
        author: "Winston Churchill",
    },
];
init();

function init(){
    content.innerHTML = quote[2].content.toString();
    author.innerHTML = quote[2].author.toString();
}
const btn = document.getElementById("btn");

btn.addEventListener("click", function(){

    getRandomInt();
    function getRandomInt(){
        const wordIndex = Math.floor(Math.random() * quote.length)
        content.innerHTML = quote[wordIndex].content.toString();
        author.innerHTML = quote[wordIndex].author.toString();
            
    }
        
})


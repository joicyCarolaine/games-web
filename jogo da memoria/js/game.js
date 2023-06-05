const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const numbersCard = ["1", "2", "3", "4", "5","6", "7", "8", "9", "10","11","12"];
const timer = document.querySelector(".timer");
const button = document.querySelector(".restart");
const cardRick = document.querySelector(".rick");
const cardGravityFalls = document.querySelector(".gravity_falls");
const cardSimpsons = document.querySelector(".simpsons");
const type = document.querySelector(".type");

let firstCard = "";
let secondCard = "";



const checkEndGame = () => {
    const disabledCard = document.querySelectorAll(".disabled-card");

    if(disabledCard.length == 24) {
        clearInterval(this.loop);
        button.classList.remove("hide")
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos.`);
    }
}

const checkCards = () => {
    const firstNumber = firstCard.getAttribute("data-number");
    const secondNumber = secondCard.getAttribute("data-number");

    if(firstNumber == secondNumber){
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";

        }, 500)
    }
}

const revealCard = ({target}) => {
    if(target.parentNode.className.includes("reveal-card")) {
        return;
    }
    
    if(firstCard == ""){
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if(secondCard == ""){
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
    }

    checkCards();
}

//Função para criar as cartas do jogo
const createCard = (number, typeStyle) => {

    const card = document.createElement("div");
    const front = document.createElement("div");
    const back = document.createElement("div");

    card.className = "card";
    front.className = "face front";
    back.className = "face back";

    back.style.backgroundImage = `url("../images/${typeStyle}/back.png")`
    front.style.backgroundImage = `url('../images/${typeStyle}/${number}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-number", number)
    return card;
}

const loadGame = (typeStyle) => {
    // Espalhar as cartas
    const duplicatenumbersCard = [ ...numbersCard, ...numbersCard] 
    const shuffledArray = duplicatenumbersCard.sort(() => Math.random() - 0.5); 
    
    shuffledArray.forEach((number) => {
        const card = createCard(number, typeStyle);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML; //Esse + converte a str em number
        timer.innerHTML = currentTime + 1
    }, 1000)
}

const restart = () => {
    timer.innerHTML = 0;
    firstCard = "";
    secondCard = "";
    const child = grid.children;
    let tamanho = child.length;
    for(let i=0; i<tamanho;i++){
        grid.removeChild(child[0]);
    }
    button.classList.add("hide");
    type.classList.remove("hide");
    window.onload();
}

const starts = (typeStyle) => {
    const main = document.querySelector(".main");

    main.style.backgroundImage = `url("../images/${typeStyle}/plano_de_fundo.jpg")`;
    startTimer();
    loadGame(typeStyle);
    button.addEventListener("click", restart);

}

window.onload = () => { //Executa quando a página carrega
    console.log("reinicio")
    spanPlayer.innerHTML = localStorage.getItem("player");
    cardRick.addEventListener("click", styleRick);
    cardGravityFalls.addEventListener("click", styleGravityFalls);
    cardSimpsons.addEventListener("click", styleSimpsons);
}

const styleRick = () => {
    let typeStyle = "rick";
    type.classList.add("hide");
    starts(typeStyle);
}

const styleGravityFalls = () => {
    let typeStyle = "gravity_falls"
    type.classList.add("hide");
    starts(typeStyle);
}

const styleSimpsons = () => {
    let typeStyle = "simpsons"
    type.classList.add("hide");
    starts(typeStyle);
}
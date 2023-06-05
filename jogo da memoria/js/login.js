const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login-form");

//Habilitar o botão se a pessoa escrever o nome
const validaInput = ({target}) => {
    // event.target.value pega o valor que a pessoa digitou no input
    if (target.value.length > 2) {
        button.removeAttribute("disabled"); 
    } else{
        button.setAttribute("disabled", "");
    }
}

const handleSubmit = (event) => {
    // O evento padrão do form é enviar os dados e recarregar a página. Mas não é isso que desejamos
    event.preventDefault();

    // Salvar os nomes no navegador(Apenas no pc de cada indivíduo)
    // No futuro vou colocar um banco de dados aqui
    localStorage.setItem("player", input.value);
    window.location = "pages/game.html"

}


input.addEventListener("input", validaInput);
form.addEventListener("submit", handleSubmit);

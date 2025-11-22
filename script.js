let cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("header input");
let dados = [];

async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let dado of cardsParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

document.addEventListener("DOMContentLoaded", carregarDados);
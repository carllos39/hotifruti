// let total = 0;

// // Adicionar eventos aos botões de quantidade
// document.querySelectorAll(".card").forEach(card => {
//     const btnMais = card.querySelector(".btn-mais");
//     const btnMenos = card.querySelector(".btn-menos");
//     const quantidadeSpan = card.querySelector(".quantidade");
//     let quantidade = 0;
//     const preco = parseFloat(card.getAttribute("data-preco"));

//     btnMais.addEventListener("click", function() {
//         quantidade ++;
//         quantidadeSpan.textContent = quantidade;
//         calcularTotal();
//     });

//     btnMenos.addEventListener("click", function() {
//         if (quantidade > 0) {
//             quantidade --;
//             quantidadeSpan.textContent = quantidade;
//             calcularTotal();
//         }
//     });
// });

// // Calcular o total e gerar a lista de produtos
// function calcularTotal() {
//     total = 0;
//     let listaProdutos = [];
//     let precoTotal = 0;

//     document.querySelectorAll(".card").forEach(card => {
//         let quantidade = parseInt(card.querySelector(".quantidade").textContent);
//         let preco = parseFloat(card.getAttribute("data-preco"));
//         if (quantidade > 0) {
//             const nomeProduto = card.querySelector("div:first-child").textContent;
//             listaProdutos.push(`${nomeProduto}: ${quantidade} x R$ ${preco.toFixed(2)} = R$ ${(quantidade * preco).toFixed(2)}`);
//             precoTotal += quantidade * preco;
//         }
//     });

//     total = precoTotal;
//     document.getElementById("resultado").textContent = "Total: R$ " + total.toFixed(2);

//     // Gerar o link do WhatsApp com a lista de produtos
//     const telefoneDoWhatsapp = "5511959473402"; // Substitua pelo número de WhatsApp desejado
//     const mensagem = encodeURIComponent(`Olá, gostaria de comprar os seguintes produtos:\n\n${listaProdutos.join("\n")}\n\nTotal: R$ ${total.toFixed(2)}`);
//     document.getElementById("whatsappLink").href = `https://wa.me/${telefoneDoWhatsapp}?text=${mensagem}`;
// }

// // Comprar
// // document.getElementById("btnComprar").addEventListener("click", function() {
// //     calcularTotal();
// //     alert("Compra realizada! Total: R$ " + total.toFixed(2));
// // });

// // Redefinir
// document.getElementById("btnRedefinir").addEventListener("click", function() {
//     document.querySelectorAll(".quantidade").forEach(qtd => qtd.textContent = "0");
//     total = 0;
//     document.getElementById("resultado").textContent = "Total: R$ 0,00";
//     document.getElementById("whatsappLink").href = "#";
// });
const cards = document.querySelectorAll('.card');
const btnRedefinir = document.getElementById('btnRedefinir');
const btnComprar = document.getElementById('btnComprar');
const resultado = document.getElementById('resultado');
const telefoneDoWhatsapp = "5511959473402";
const whatsappLink = document.getElementById("whatsappLink");

cards.forEach(card => {
    const btnIncremento = card.querySelector('.btn-incremento');
    const btnDecremento = card.querySelector('.btn-decremento');
    const quantidade = card.querySelector('.quantidade');
    const preco = card.querySelector('.preco');
    const precoBase = parseFloat(card.dataset.precoBase); // Mantém o preço original

    btnIncremento.addEventListener('click', () => {
        let qtd = parseInt(quantidade.textContent);
        qtd++;
        quantidade.textContent = qtd;
        preco.textContent = (precoBase * qtd).toFixed(2);
        card.dataset.preco = (precoBase * qtd).toFixed(2);
    });

    btnDecremento.addEventListener('click', () => {
        let qtd = parseInt(quantidade.textContent);
        if (qtd > 1) {
            qtd--;
            quantidade.textContent = qtd;
            preco.textContent = (precoBase * qtd).toFixed(2);
            card.dataset.preco = (precoBase * qtd).toFixed(2);
        }
    });

    card.addEventListener("click", () => {
        card.classList.toggle("selecionado");
    });
});

btnRedefinir.addEventListener("click", () => {
    cards.forEach(card => {
        card.style.display = "";
        card.classList.remove("selecionado");
        const quantidade = card.querySelector('.quantidade');
        const preco = card.querySelector('.preco');
        const precoBase = parseFloat(card.dataset.precoBase);
        quantidade.textContent = '1';
        preco.textContent = precoBase.toFixed(2);
        card.dataset.preco = precoBase.toFixed(2);
    });
    resultado.innerText = "";
    whatsappLink.href = "#";
});

btnComprar.addEventListener("click", () => {
    let precoTotal = 0;
    let listaProdutos = [];

    cards.forEach(card => {
        if (!card.classList.contains("selecionado")) {
            card.style.display = "none";
        } else {
            const nomeProduto = card.querySelector("div:first-child").textContent;
            const precoProduto = parseFloat(card.dataset.preco);
            listaProdutos.push(`${nomeProduto}: R$ ${precoProduto.toFixed(2)}`);
            precoTotal += precoProduto;
        }
    });

    resultado.innerText = `Preço Total: R$ ${precoTotal.toFixed(2)}`;
    const mensagem = encodeURIComponent(`Olá, gostaria de comprar os seguintes produtos:\n\n${listaProdutos.join("\n")}\n\nTotal: R$ ${precoTotal.toFixed(2)}`);
    whatsappLink.href = `https://wa.me/${telefoneDoWhatsapp}?text=${mensagem}`;
});
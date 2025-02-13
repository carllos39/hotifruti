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
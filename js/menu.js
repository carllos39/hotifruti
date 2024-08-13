"use strict";
//Selecionando o elemento que acionará o menu
const botaoMenu=document.querySelector("nav h2");
//Selecionando a lista Menu
const menu=document.querySelector(".menu");

//Sesleciona o link  que está  dentro do nav
const textoBotao=botaoMenu.querySelector("a");

botaoMenu.addEventListener("click",function(event){
    //Anular ou previnir o comportamento padrão
    event.preventDefault();
    menu.classList.toggle("aberto");

    if(menu.classList.contains("aberto")){
        textoBotao.innerHTML="Fechar &times;";
        }else{
            textoBotao.innerHTML="Menu &equiv;";   
        }
        
});


"use strict";

(function()
{
    window.addEventListener("load", main);
}());

var contas=[];
var selecionado;
function main() {
    window.addEventListener("message",setContas);
    document.getElementById("voltar").addEventListener("click",voltar);
    document.getElementById("criarConta").addEventListener("click",criar);




}

function voltar(ev) {
    window.parent.postMessage("menuPrincipal.html","*");
}
function setContas(ev) {
    let botoes=document.getElementsByTagName("button");
    let textoSelecionado=document.getElementById("selecionado");
    document.getElementById("apagarConta").addEventListener("click",apagarConta);
    contas=ev.data[0];
    selecionado=ev.data[1];
    if(contas!=null) {

        for (let i = 0; i < contas.length; i++) {
            botoes[i].textContent = contas[i].nome + " " + "->" + " " + "       Niveis feitos: " + findMax(contas[i]);
            botoes[i].addEventListener("click", selecionar);
        }
        if (selecionado != null) textoSelecionado.textContent = "Selecionado -> " + selecionado.nome;
        window.removeEventListener("message", setContas);
    }
    }
function findMax(conta) {
    let max=0;

    for (let i = 0; i < conta.niveisFeitos.length; i++) {

        if(conta.niveisFeitos[i]>max){
            max=conta.niveisFeitos[i];
        }
    }
    return max;
}
function criar(ev) {
    if(contas!=null&&contas.length==4){
        alert("Número máximo de contas atingido");
    }else {
        var nome = prompt("Qual nome quer dar á conta?", "Nome");
        if (nome != '' && nome != null) {
            if (checkIfExists(nome) == true) {
                alert("Esse nome já existe!");
            } else {
                window.parent.postMessage("novaConta " + nome, "*");
                contas.push(new Jogador(nome));
                refreshContas();
            }
        }
    }

}
function refreshContas() {
    let botoes=document.getElementsByTagName("button");
    for (let i=0;i<4;i++){
        if(botoes[i].textContent!="Sem conta"){
            botoes[i].removeEventListener("click",selecionar);
            botoes[i].textContent="Sem conta";
        }
    }
    for (let i=0;i<contas.length;i++){
        botoes[i].textContent=contas[i].nome+" "+"->"+" "+"       Niveis feitos: "+findMax(contas[i]);
        botoes[i].addEventListener("click",selecionar);

    }
}
function selecionar(ev) {
    document.getElementById("selecionado").textContent="Selecionado -> "+contas[ev.currentTarget.id].nome;
    selecionado=contas[ev.currentTarget.id];
    window.parent.postMessage("selecionar "+(ev.currentTarget.id).toString(),"*");
}
function apagarConta() {
    var id=prompt("Qual conta deseja apagar? Insera um digito entre 1 a 4","Id");
    if(id=="1"|id=="2"|id=="3"|id=="4") {
        switch (id) {
            case "1":
                contas.splice(0, 1);
                window.parent.postMessage("apagar " + id, "*");
                break;
            case "2":
                contas.splice(1, 1);
                window.parent.postMessage("apagar " + id, "*");
                break;
            case "3":
                contas.splice(2, 1);
                window.parent.postMessage("apagar " + id, "*");
                break;
            case "4":
                window.parent.postMessage("apagar " + id, "*");
                contas.splice(3, 1);
                break;
        }
        if (selecionado != null && checkIfExists(selecionado.nome) == false) {
            selecionado = null;
            document.getElementById("selecionado").textContent = "Selecionado -> Nenhum";
            window.parent.postMessage("selecionar " + null, "*");

        }
        refreshContas();
    }else{
        alert("Id inválido")
    }
}
function checkIfExists(nome) {
    if(contas==null)return false;
    for (let i=0;i<contas.length;i++){
        if(nome==contas[i].nome){
            return true;
        }

    }
    return false;
}
function findId() {
    for (let i=0;i<contas.length;i++){
        if(selecionado.nome==contas[i].nome){
            return i;
        }

    }
    return i;
}

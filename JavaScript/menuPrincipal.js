(function()
{
    window.addEventListener("load", main);
}());

function main(){
    var btnBatalhar=document.getElementById("0").addEventListener("click",showPage);
    var btnOpcoes=document.getElementById("1").addEventListener("click",showPage);
    document.getElementById("2").addEventListener("click",showPage);
    document.getElementById("3").addEventListener("click",showPage);
    document.getElementById("4").addEventListener("click",showPage);
    document.getElementById("botaoAjuda").addEventListener("click",showPage);
    document.getElementById("5").addEventListener("click",showPage);

    window.addEventListener("message",showPage);
}
function showPage(ev) {
    var sources=["menuBatalhar.html","menuOpcoes.html","mercado.html","selecionador.html","creditos.html","sair"];
    console.log(ev.currentTarget.id);
    if (ev.currentTarget.id=="botaoAjuda")window.parent.postMessage("ajuda.html","*");
    else {
        var index = parseInt(ev.currentTarget.id);
        window.parent.postMessage(sources[index], "*");
    }
}
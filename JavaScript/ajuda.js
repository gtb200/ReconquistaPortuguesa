"use strict";

(function()
{
    window.addEventListener("load", main);
}());


function main() {
    document.getElementById("voltar").addEventListener("click",voltar);
}

function voltar(ev) {
    window.parent.postMessage("menuPrincipal.html","*");
}
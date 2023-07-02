document.addEventListener("DOMContentLoaded", function() {
    var botaoReproduzirPausar = document.getElementById("botao-reproduzir-pausar");

    var textoParaLer = "";
    var leitorTexto;
    var estaReproduzindo = false;

    // Faz uma requisição HTTP para obter o arquivo JSON
    var requisicao = new XMLHttpRequest();
    requisicao.open("GET", "rendaVariavel.json", true);
    requisicao.onreadystatechange = function() {
        if (requisicao.readyState === 4 && requisicao.status === 200) {
            var dados = JSON.parse(requisicao.responseText);
            textoParaLer = extrairTexto(dados);
        }
    };
    requisicao.send();

    function extrairTexto(dados) {
        var texto = "";
        for (var i = 0; i < dados.length; i++) {
            texto += dados[i].tipo + ". ";
            texto += "Descrição: " + dados[i].descricao + ". ";
            texto += "Risco: " + dados[i].risco + ". ";
            texto += "Rentabilidade: " + dados[i].rentabilidade + ". ";
            texto += "Liquidez: " + dados[i].liquidez + ". ";
            texto += "Impostos: " + dados[i].impostos + ". ";
        }
        return texto;
    }

    // Configura o botão de reprodução/pausa
    botaoReproduzirPausar.addEventListener("click", function() {
        if (!estaReproduzindo) {
            reproduzir();
        } else {
            pausar();
        }
    });

    function reproduzir() {
        if (!estaReproduzindo) {
            estaReproduzindo = true;

            if ('speechSynthesis' in window) {
                leitorTexto = new SpeechSynthesisUtterance(textoParaLer);
                leitorTexto.lang = 'pt-BR'; // Defina o idioma da leitura

                // Ajuste da velocidade
                leitorTexto.rate = 2.0; // Defina a velocidade desejada

                // Ajuste do tom
                leitorTexto.pitch = 0.1; // Defina o tom desejado

                window.speechSynthesis.speak(leitorTexto);

                botaoReproduzirPausar.classList.remove("reproduzir");
                botaoReproduzirPausar.classList.add("pausar");
                botaoReproduzirPausar.textContent = "⏸️";
            } else {
                alert("Desculpe, seu navegador não suporta a síntese de fala.");
            }
        }
    }

    function pausar() {
        if (estaReproduzindo) {
            estaReproduzindo = false;

            window.speechSynthesis.cancel();

            botaoReproduzirPausar.classList.remove("pausar");
            botaoReproduzirPausar.classList.add("reproduzir");
            botaoReproduzirPausar.textContent = "▶️";
        }
    }
});

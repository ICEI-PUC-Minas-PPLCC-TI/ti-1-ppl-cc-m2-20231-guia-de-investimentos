document.addEventListener("DOMContentLoaded", function() {
    var containerDados = document.getElementById("container-dados");
    var botaoReproduzirPausar = document.getElementById("botao-reproduzir-pausar");

    var textoParaLer = "";
    var leitorTexto;
    var estaReproduzindo = false;

    // Faz uma requisição HTTP para obter o arquivo JSON
    var requisicao = new XMLHttpRequest();
    requisicao.open("GET", "data.json", true);
    requisicao.onreadystatechange = function() {
        if (requisicao.readyState === 4 && requisicao.status === 200) {
            var dados = JSON.parse(requisicao.responseText);
            exibirDados(dados);
        }
    };
    requisicao.send();

    function exibirDados(dados) {
        var html = "";
        for (var i = 0; i < dados.length; i++) {
            html += "<h3>" + dados[i].tipo + "</h3>";
            html += "<p><strong>Descrição:</strong> " + dados[i].descricao + "</p>";
            html += "<p><strong>Risco:</strong> " + dados[i].risco + "</p>";
            html += "<p><strong>Rentabilidade:</strong> " + dados[i].rentabilidade + "</p>";
            html += "<p><strong>Liquidez:</strong> " + dados[i].liquidez + "</p>";
            html += "<p><strong>Impostos:</strong> " + dados[i].impostos + "</p>";
        }
        containerDados.innerHTML = html;
        textoParaLer = containerDados.innerText;

        // Configura o botão de reprodução/pausa
        botaoReproduzirPausar.addEventListener("click", function() {
            if (!estaReproduzindo) {
                reproduzir();
            } else {
                pausar();
            }
        });
    }

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

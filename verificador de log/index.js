function processarLog() {
    var log = document.getElementById('logInput').value;
    var linhas = log.split('\n');
    var resultados = {};

    console.log("Total de linhas no log: " + linhas.length);

    linhas.forEach((linha, index) => {
        linha = linha.trim();
        console.log("Processando linha " + (index + 1) + ": " + linha);

        if (linha.startsWith('[RETIROU Item]:')) {
            var partes = linha.split(']: ');
            if (partes.length == 2) {
                var itemRetirado = partes[1].split(' x ');

                if (itemRetirado.length == 2) {
                    var item = itemRetirado[0];
                    var quantidade = parseInt(itemRetirado[1], 10);

                    console.log("Item encontrado: " + item + ", Quantidade: " + quantidade);

                    if (!isNaN(quantidade)) {
                        if (!resultados[item]) {
                            resultados[item] = 0;
                        }
                        resultados[item] += quantidade;
                    } else {
                        console.log("Quantidade não é um número para a linha: " + linha);
                    }
                } else {
                    console.log("A linha não contém um formato de item e quantidade esperado: " + linha);
                }
            } else {
                console.log("A linha não contém o formato esperado de '[RETIROU Item]': " + linha);
            }
        }
    });

    console.log("Resultados:", resultados);
    exibirResultados(resultados);
}

function exibirResultados(resultados) {
    var resultadosDiv = document.getElementById('resultados');
    var resultadosArray = [];
    for (var item in resultados) {
        resultadosArray.push(item + '  ' + resultados[item]);
    }
    resultadosDiv.innerHTML = ' ' + resultadosArray.join(' ; ');
}

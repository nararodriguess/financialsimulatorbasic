//Função para realizar calculos da simulação
function simular() {
  //var valorEl = document.getElementById("valor"); lê o valor do elemento DOM
  var prazo = document.getElementById("prazo").valueAsNumber; // pega os proprios valores
  var valor = document.getElementById("valor").valueAsNumber; //valueAsNumber transforma para type 'numero'
  var jurosano = document.getElementById("jurosano").valueAsNumber;

  var prestacoes = prazo * 12;
  document.getElementById("prestacoes").valueAsNumber = prestacoes; //Mostra o resultado na célula

  var jurosmes = Math.pow(1 + jurosano, 1 / 12) - 1; //calculo da taxa mensal
  document.getElementById("jurosmes").valueAsNumber = jurosmes.toFixed(4);

  var amortizacao = valor / prestacoes; //Calculo da amortização
  var tbodyEl = document.querySelector("tbody"); //seleciona o elemento da página por tipo de elemento, nesse caso tbody

  for (let i = 0; i < 5; i++) {
    //contador de 0 a 4, pois são 5 linhas
    var trEl = tbodyEl.children[i]; //seleciona o filho do elemento tbody (tr) e atribui ao elemento trEl
    trEl.children[1].textContent = amortizacao.toFixed(2); //seleciona o segundo filho do tr, insere a amortização e formata c/ 2 casas decimais

    var saldoDevedor = valor - amortizacao * i;
    var jurosPrestacao = saldoDevedor * jurosmes; // calcula juros de cada prestação
    trEl.children[2].textContent = jurosPrestacao.toFixed(2); // insere na celula

    var totalPrestacao = amortizacao + jurosPrestacao; // calculo valore da prestação
    trEl.children[3].textContent = totalPrestacao.toFixed(2); // insere valor da célula

    //Calculo juros totais
    var jurosTotais = 0;
    for (let i = 0; i < prestacoes; i++) {
      var saldoDevedor = valor - amortizacao * i;
      var jurosPrestacao = saldoDevedor * jurosmes;
      jurosTotais = jurosTotais + jurosPrestacao;
    }

    document.getElementById("jurosapg").value = jurosTotais.toFixed(2);
  }
}

//Roda a função apenas após a página ser carregada
window.addEventListener("load", simular);

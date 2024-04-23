var newColor = '';
var sequence = [];
var sequencePlayer = [];
var result = "correct";
var segundos = 3;
var valor = 0;

// Tempo limite em milissegundos (aqui, definido como 5 segundos)
// const tempoLimite = 5000;

// Variável para rastrear se o botão foi pressionado ou não
// var botaoPressionado = false;

// var bn_red = document.querySelector(".red");
// var bn_green = document.querySelector(".green");
// var bn_yellow = document.querySelector(".yellow");
// var bn_blue = document.querySelector(".blue");

// bn_red.addEventListener("click", compare);
// bn_green.addEventListener("click", compare);
// bn_yellow.addEventListener("click", compare);
// bn_blue.addEventListener("click", compare); 

// document.querySelector(".bn").addEventListener("click", function() {
//     botaoPressionado = true;
//     console.log("Você pressionou o botão a tempo! Você ganhou!");
    
// });

async function start() {
    await atualizarContagemRegressiva(); // aguarda 3 segundos para iniciar
    await iniciarJogo();
}

// Função para atualizar a contagem regressiva a cada segundo  OK
async function atualizarContagemRegressiva() {
    // Exibe o número de segundos restantes
    document.getElementById("msg").innerHTML = segundos;

    // Verifica se a contagem chegou a zero
    if (segundos === 0) {
        document.getElementById("msg").innerHTML = "GO!";
    } else {
        // Decrementa o contador de segundos
        segundos--;
        // Configura a próxima chamada para atualizar a contagem regressiva após 1 segundo
        setTimeout(atualizarContagemRegressiva, 1000);
    }
}

function iniciarJogo() {
    return new Promise( (resolve) => {
        setTimeout (async () => {
            var i = 0;
            while (result === "correct") {
                newColor = getRandomColor();
                sequence.push(newColor);
                changeCss();
                await esperar();
                await compare();
                removerEventListeners;
                i++;
                valor = 0;
            }
            resolve();
        }, 3000);
    });
}

function changeCss(callback){

    let buttonSelector = '';
    let buttonActive  = '';

    switch (newColor) {
        case 1:
            buttonSelector = ".red";
            buttonActive = "active_red";
            break;
        case 2:
            buttonSelector = ".green";
            buttonActive = "active_green";
            break;
        case 3:
            buttonSelector = ".yellow";
            buttonActive = "active_yellow";
            break;
        case 4:
            buttonSelector = ".blue";
            buttonActive = "active_blue";
            break;
    }

    var buttonElement = document.querySelector(buttonSelector);
        // Adiciona a classe '.active' ao botão
        buttonElement.classList.add(buttonActive);

        setTimeout(() => {
            // Remove a classe '.active' após um breve período de tempo
            buttonElement.classList.remove(buttonActive);
        }, 1000);
    callback();
}

function esperar(){

    clearTimeout(timeout); // Limpa o timer se um botão for clicado
    var valorg = this.value;
    alert("Valor do botão pressionado: " + valorg);
    // Você pode fazer o que quiser com o valor aqui, como enviar para o servidor ou manipular no próprio cliente
}

var timeout = setTimeout(function() {
    alert("Nenhum botão pressionado dentro do tempo limite.");
    // Retornar "0" ou executar outra ação quando nenhum botão for pressionado
}, 3000); // 3 segundos em milissegundos


document.querySelector(".red").onclick = esperar;
document.querySelector(".green").onclick = esperar;
document.querySelector(".yellow").onclick = esperar;
document.querySelector(".blue").onclick = esperar;








// function esperar() {
//     return new Promise(() => {
//         function callbackBotao(event) {
//            var valor = event.target.value;
//         //   resolve(valor);
//         }

//     document.querySelector(".red").addEventListener("click", callbackBotao);
//     document.querySelector(".green").addEventListener("click", callbackBotao);
//     document.querySelector(".yellow").addEventListener("click", callbackBotao);
//     document.querySelector(".blue").addEventListener("click", callbackBotao);

// });
// }


function removerEventListeners() {
    document.querySelector('.red').removeEventListener('click', callbackBotao);
    document.querySelector('.green').removeEventListener('click', callbackBotao);
    document.querySelector('.yellow').removeEventListener('click', callbackBotao);
    document.querySelector('.blue').removeEventListener('click', callbackBotao);
}




async function compare() {
    if (valor===sequence[i]) {
        return result = "correct";
    } else {
        return result = "errou";
    }
}

























function tempoEsgotado() {
    if (!botaoPressionado) {
        playerLose();
    }
}

function playerLose() {
    document.getElementById("msg").innerHTML = "You lose";
}

function getRandomColor() {
    return Math.floor(Math.random() * (5 - 1) + 1);
} // Getting a random intenger number between 0 and 5






function changeColorTemporarily(tempColor, duration) {
    btn.style.backgroundColor = tempColor; // Alterando a cor do botão

    // Restaurando a cor original após o tempo especificado
    setTimeout(function() {
        btn.style.backgroundColor = originalColor;
    }, duration)

}






function ativarTemporariamente(elemento) {
    // Adiciona a classe 'active' ao elemento
    elemento.classList.add('active');

    // Remove a classe 'active' após um breve período de tempo
    setTimeout(() => {
        elemento.classList.remove('active');
    }, 1000); // Define o tempo desejado em milissegundos (aqui, 1 segundo)
}

// Exemplo de uso:
const botao = document.querySelector('.green'); // Selecione o botão verde
ativarTemporariamente(botao); // Ativa temporariamente o pseudo-classe ':active'

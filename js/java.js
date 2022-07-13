//variáveis para capturar os elementos do HTML
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d--direita');
let numeros = document.querySelector('.d-1-3');

//variáveis de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
let reset
let time
let contagem = 5;

//função para resetar a votação
function reloaded() {
    document.location.reload(true);
}

//função para começar a votação
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
//função para atualizar a página atual
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;

        } else {
            return false;
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].url.small) {
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }
}
//função do evento onclick do teclado
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

//botão branco
function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
    } else {
        alert('Para votar "BRANCO", aperte somente a tecla BRANCO');
        comecarEtapa();
    }

}
//botão corrige
function corrige() {
    comecarEtapa();
}
//botão confirma
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'

        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
       
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero

        });
    } else {
        alert('Para confirmar o voto, preencha o campo corretamente');
        comecarEtapa();
    }


    if (votoConfirmado) {
        etapaAtual++;
        

        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();

        } else {
            time = setInterval(reset, 1000);

            function reset() {
                document.querySelector('.tela').innerHTML = `<div class="fim pisca">FIM</div><div class="reiniciando">Reiniciando a votação em ${contagem}</div>`;
                contagem--;
                if (contagem == 0) {
                    clearInterval(time);
                    reloaded();

                }
            }
            console.log(votos);
        }
    }

}

comecarEtapa();

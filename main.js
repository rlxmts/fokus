const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const tempoNaTela = document.querySelector('#timer');
const textoDoBtIniciar = document.querySelector('#start-pause span'); 
const imgDoBtIniciar = document.querySelector('#start-pause img');

const focoBt = document.querySelector('.app__card-button--foco');
const descansoCurtoBt = document.querySelector('.app__card-button--curto');
const descansoLongoBt = document.querySelector('.app__card-button--longo');
const alternarMusicaBt = document.querySelector('.toggle-checkbox');
const iniciarBt = document.querySelector('.app__card-primary-button');
const listaBotoes = document.querySelectorAll('.app__card-button');

const audioPlay = new Audio('./sons/play.wav');
const musica = new Audio('./sons/ludovico.mp3');
const audioPausar = new Audio('./sons/pause.mp3');
const audioFimDaTarefa = new Audio('./sons/beep.mp3');

musica.loop = true;

let tempoEscolhido = 1500;
let intervalo = null;

alternarMusicaBt.addEventListener( 'change', ()=> {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

focoBt.addEventListener( 'click', ()=> {
    tempoEscolhido = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

descansoCurtoBt.addEventListener( 'click', ()=> {
    tempoEscolhido = 300;
    alterarContexto('descanso-curto');
    descansoCurtoBt.classList.add('active');
})

descansoLongoBt.addEventListener( 'click', ()=> {
    tempoEscolhido = 900;
    alterarContexto('descanso-longo');
    descansoLongoBt.classList.add('active');
})


function alterarContexto(contexto) {

    mostrarTempoNaTela()

    listaBotoes.forEach( (botao)=>{
        botao.classList.remove('active');
    });

    document.querySelector('html').setAttribute( 'data-contexto', `${contexto}`);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            titulo.innerHTML= 
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `            
        break;

        case 'descanso-curto':
            titulo.innerHTML= 
                `Hora de ir a superfície,<br>
                <strong class="app__title-strong">tire um tempinho para respirar.</strong>
                `            
        break;

        case 'descanso-longo':
            titulo.innerHTML= 
                `Hora de um descanso longo.<br>
                <strong class="app__title-strong">Que tal um xícara de café?</strong>
                `            
        break;
        default:
            console.log('Ops, algo deu errado');
    }
}

const contagemRegressiva = ()=> {
    if(tempoEscolhido <= 0){
        audioFimDaTarefa.play();
        textoDoBtIniciar.innerText = 'Começar';
        imgDoBtIniciar.setAttribute('src', '/imagens/play_arrow.png');
        zerar();
        return;
    }
    tempoEscolhido -= 1;  
    mostrarTempoNaTela();  
    console.log(tempoEscolhido);
}

function iniciar(){

    if(intervalo){
        imgDoBtIniciar.setAttribute('src', '/imagens/play_arrow.png' );
        textoDoBtIniciar.innerText = 'Continuar';
        audioPausar.play();
        zerar();
        return;
    }
    
    imgDoBtIniciar.setAttribute('src', '/imagens/pause.png');
    textoDoBtIniciar.innerText = 'Pausar';
    audioPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000);
}

function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}

iniciarBt.addEventListener( 'click', iniciar);

function mostrarTempoNaTela(){
    const tempo = new Date(tempoEscolhido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {
        minute: '2-digit',
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempoNaTela();
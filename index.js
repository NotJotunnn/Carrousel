// * Previne que alguma função rode sem o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
  // * Elementos do DOM
  const boxes = document.querySelectorAll('.box')
  const carrousel = document.querySelector('.box-group')
  const findBoxesBtn = document.getElementById('getBoxes')
  const resetBtn = document.getElementById('resetBoxes')
  const randomBtn = document.getElementById('randomBox')

  // * Leia abaixo nos eventos para saber mais sobre
  let currentBox = 0
  let alreadyActive = 0
  let activeBox = 99

  randomBtn.addEventListener('click', () => {
    // * Previne de rodar múltiplas vezes (animações podem bugar)
    if(alreadyActive) return
    
    // * Previne que o while corra infinitamente
    let count = 0

    // * Timing da animação e duração de travação do botão
    const timing = 30000

    // * Variável para bloquear o botão
    alreadyActive = 1

    // * Reset da variável que bloqueia o botão
    setTimeout(() => {
      alreadyActive = 0
    }, timing);

    // * Variável que escolhe qual caixa parar
    let randomBox = Math.floor(Math.random() * boxes.length)

    // * While que tenta prevenir que caia na mesma caixa
    while(count < 1000) {
      if(randomBox != activeBox) {
        activeBox = randomBox
        break
      }
      randomBox = Math.floor(Math.random() * boxes.length)
    }
    
    // * Caixa escolhida para cair
    const box = boxes[randomBox]

    // * A localização da caixa e quanto ela precisará andar até ficar no centro da tela
    const boxCenter = (Math.round(box.getBoundingClientRect().right) - Math.round(box.getBoundingClientRect().left)) / 2 + Math.round(box.getBoundingClientRect().left) - (window.innerWidth / 2)

    // * Keyframes para animação
    const spinTheCarrousel = new KeyframeEffect(carrousel, [
      { transform: `translateX(${currentBox}px)`, offset: 0 },
      { transform: `translateX(${currentBox + 20}px)`, offset: 0.1 },
      { transform: `translateX(${currentBox + boxCenter * -1 + ((Math.random() * 30) - 15)}px)`, offset: 0.999 },
      { transform: `translateX(${currentBox + boxCenter * -1}px)`, offset: 1 },
    ],
    { duration: timing, easing: "cubic-bezier(.44,.06,.22,1.04)", fill: 'forwards' }
    )

    // * Variável que localiza a última posição da última caixa para começar a animação de
    currentBox += boxCenter * -1

    // * Variável que segura animação
    const spinAnimation = new Animation(spinTheCarrousel, document.timeline)

    // * Função que roda a animação
    spinAnimation.play()
  })

  resetBtn.addEventListener('click', () => {
    // * Keyframes para animação
    const spinTheCarrousel = new KeyframeEffect(carrousel, [
      { transform: `translateX(${currentBox}px)` },
      { transform: `translateX(${currentBox + 30}px)` },
      { transform: `translateX(0px)` },
    ],
    { duration: 1000, fill: 'forwards' }
    )

    // * Reseta variável para seu valor inicial
    currentBox = 0

    // * Variável que segura animação
    const spinAnimation = new Animation(spinTheCarrousel, document.timeline)

    // * Função que roda a animação
    spinAnimation.play()
  })

  // ! PARA DEBUGGING

  findBoxesBtn.addEventListener('click', () => {
    boxes.forEach((box, index) => {
      console.log(`The position of the ${index + 1}º box:`, (Math.round(box.getBoundingClientRect().right) - Math.round(box.getBoundingClientRect().left)) / 2 + Math.round(box.getBoundingClientRect().left))
    })
    console.log('\nCenter of screen: ', window.innerWidth / 2)
  })

  // ! PARA DEBUGGING
})
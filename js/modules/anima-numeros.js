export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    this.handleMutation = this.handleMutation.bind(this);
  }
  
  // Recebe um elemento do DOM com numero em seu texto
  // Incrementa a partir de 0 ate o numero recebido
  static incrementarNumero(numero) {
      const total = +numero.innerText;
      const incremento = Math.floor(total / 100);
      let start = 0;
      const timer = setInterval(() => {
        start += incremento;
        numero.innerText = start;
        if (start > total) {
          numero.innerText = total;
          clearInterval(timer);
        }
      }, 25 * Math.random());
  }

  // Ativa incrementar para cada 
  // numero selecionado do DOM
  animaNumeros() {
    this.numeros.forEach(numero => this.constructor.incrementarNumero(numero));
  }

  // Funcao que ocorre quando a mutacao ocorrer
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona ao MutationObserver para verificar
  // quando a classe ativo eh adicionada ao target
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if(this.numeros.length || this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  } 
}

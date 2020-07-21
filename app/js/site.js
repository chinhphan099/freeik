class Site {
  constructor(elm) {
    this.elm = elm;
    this.timer = null;
    this.lastScrollTop = window.scrollY;
  }

  handleClassScrolled() {
    if (window.scrollY > 100) {
      document.querySelector('body').classList.add('scrolled');
    }
    else {
      document.querySelector('body').classList.remove('scrolled');
    }
  }

  animateImage() {
    const bodyRect = document.body.getBoundingClientRect();
    const topBounding = this.elm.getBoundingClientRect();
    const topWrap = topBounding.top - bodyRect.top;

    const img = this.elm.querySelector('.floating-image');
    let posStart = img.offsetTop,
      st = window.scrollY,
      distance = st - this.lastScrollTop;

    if (topWrap < window.scrollY + window.innerHeight - window.innerHeight / 3) {
      let posTmp = posStart + distance * 4;
      img.style.top = posTmp + 'px';
    }
    this.lastScrollTop = st;
  }

  onWindowScroll() {
    window.addEventListener('scroll', () => {
      this.handleClassScrolled();
      this.animateImage();
    });
  }

  init() {
    AOS.init();
    this.handleClassScrolled();
    this.onWindowScroll();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const img1 = new Site(document.querySelector('.floating-image-wrap-1'));
  img1.init();

  const img2 = new Site(document.querySelector('.floating-image-wrap-2'));
  img2.init();

  const img3 = new Site(document.querySelector('.floating-image-wrap-3'));
  img3.init();

  const img4 = new Site(document.querySelector('.floating-image-wrap-4'));
  img4.init();
});

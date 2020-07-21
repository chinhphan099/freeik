class Site {
  constructor(elm) {
    this.elm = elm;
    this.lastScrollTop = window.scrollY;
  }

  onPageScrolling() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        document.querySelector('body').classList.add('scrolled');
      }
      else {
        document.querySelector('body').classList.remove('scrolled');
      }
    });
  }

  animateImage() {
    const bodyRect = document.body.getBoundingClientRect();
    const topWrap = this.elm.getBoundingClientRect();
    const topW = topWrap.top - bodyRect.top;

    const img = this.elm.querySelector('.floating-image');
    let posStart = img.offsetTop,
      st = window.scrollY,
      distance = st - this.lastScrollTop;

    if (topW < window.scrollY + window.innerHeight - window.innerHeight / 3) {
      img.style.top = posStart + distance * 4 + 'px';
    }
    this.lastScrollTop = st;
  }

  onPageWheeling() {
    window.addEventListener('scroll', () => {
      this.animateImage();
    });
  }

  init() {
    AOS.init();
    this.onPageScrolling();
    this.onPageWheeling();
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

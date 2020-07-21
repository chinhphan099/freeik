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
console.log(distance);

    if (topW < window.scrollY + window.innerHeight - window.innerHeight / 3) {
      img.style.top = posStart + distance * 5 + 'px';
      this.elm.classList.add('active');
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
  const a = new Site(document.querySelector('.floating-image-wrap-1'));
  a.init();

  const b = new Site(document.querySelector('.floating-image-wrap-2'));
  b.init();
});

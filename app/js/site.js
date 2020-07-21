class Site {
  constructor() {
    this.mainPos = 0;
    this.lastScrollTop = window.scrollY;
  }

  //! DONE
  handleClassScrolled() {
    if (window.scrollY > 100) {
      document.querySelector('body').classList.add('scrolled');
    }
    else {
      document.querySelector('body').classList.remove('scrolled');
    }
  }

  getTopPos(elm) {
    const bodyRect = document.body.getBoundingClientRect(),
      topBounding = elm.getBoundingClientRect(),
      topWrap = topBounding.top - bodyRect.top;

    return topWrap;
  }

  isScrollDown() {
    if (window.scrollY > this.lastScrollTop) {
      return true;
    }
    else {
      return false;
    }
  }

  implementFluctuations(type, wrap, per) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(100 - ((topPosElm - winY) / window.innerHeight * 100));
    const distanceBot = parseInt(winY + window.innerHeight - topPosElm);
    const deg = percentage * 360 / 100;

    if (type === 1) {
      if (percentage < 0 || distanceBot < 0) {
        wrap.querySelector('img').style.transform = `translateY(0px) rotate(0deg)`;
        return;
      }
      wrap.querySelector('img').style.transform = `translateY(${distanceBot * per}px) rotate(${deg}deg)`;
    }

    if (type === 2) {
      if (this.isScrollDown()) {
        if (this.mainPos >= 70) { return; }

        this.mainPos += 3;
        wrap.querySelector('img').style.transform = `translateY(${this.mainPos}px)`;
      }
      else {
        if (this.mainPos <= 0) { return; }

        this.mainPos -= 3;
        wrap.querySelector('img').style.transform = `translateY(${this.mainPos}px)`;
      }
      this.lastScrollTop = window.scrollY;
    }
  }

  parallax(type, elm, per) {
    this.implementFluctuations(type, elm, per);
    window.addEventListener('scroll', () => {
      this.implementFluctuations(type, elm, per);
    });
  }
}

AOS.init();

const site = new Site();
site.handleClassScrolled();
window.addEventListener('scroll', () => {
  site.handleClassScrolled();
});

window.addEventListener('load', () => {
  site.parallax(1, document.querySelector('.floating-image-wrap-1'), 0.5);
  site.parallax(1, document.querySelector('.floating-image-wrap-2'), 0.5);
  site.parallax(1, document.querySelector('.floating-image-wrap-3'), 0.5);
  site.parallax(1, document.querySelector('.floating-image-wrap-4'), 0.5);
  site.parallax(2, document.querySelector('.block_1'), 1);
});

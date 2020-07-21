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

  implementFluctuations(wrap, ratio) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(((topPosElm - winY) / window.innerHeight * 100));
    const distanceBot = parseInt(winY + window.innerHeight - topPosElm);
    const deg = (100 - percentage) * 360 / 100;

    if (100 - percentage < 0 || distanceBot < 0) {
      wrap.querySelector('img').style.transform = `translateY(0px) rotate(0deg)`;
      return;
    }
    wrap.querySelector('img').style.transform = `translateY(${distanceBot * ratio}px) rotate(${deg}deg)`;
  }
  parallax(elm, ratio) {
    this.implementFluctuations(elm, ratio);
    window.addEventListener('scroll', () => {
      this.implementFluctuations(elm, ratio);
    });
  }

  implementFluctuations1(wrap, ratio) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(((topPosElm - winY) / window.innerHeight * 100));
    const tmpDistance = (100 - percentage) * ratio;

    if (tmpDistance <= 120) {
      wrap.querySelector('img').style.transform = `translateY(${tmpDistance - 55}px)`;
    }
  }
  parallax1(elm, ratio) {
    this.implementFluctuations1(elm, ratio);
    window.addEventListener('scroll', () => {
      this.implementFluctuations1(elm, ratio);
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
  site.parallax(document.querySelector('.floating-image-wrap-1'), 0.5);
  site.parallax(document.querySelector('.floating-image-wrap-2'), 0.5);
  site.parallax(document.querySelector('.floating-image-wrap-3'), 0.5);
  site.parallax(document.querySelector('.floating-image-wrap-4'), 0.5);
  site.parallax1(document.querySelector('.block_1 .w_thumb'), 70 / 100);
});

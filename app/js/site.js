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

  implementFluctuations(wrap, ratio, clockDirection) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(((topPosElm - winY) / window.innerHeight * 100));
    const distanceBot = parseInt(winY + window.innerHeight - topPosElm);
    const deg = (100 - percentage) * 360 / 100;

    if (100 - percentage < 0 || distanceBot < 0) {
      wrap.querySelector('img').style.transform = `translateY(0px) rotate(0deg)`;
      return;
    }

    if (clockDirection === 'clockDirection') {
      wrap.querySelector('img').style.transform = `translateY(${distanceBot * ratio}px) rotate(-${deg * 2}deg)`;
    }
    else {
      wrap.querySelector('img').style.transform = `translateY(${distanceBot * ratio}px) rotate(${deg * 2}deg)`;
    }
  }
  parallax(elm, ratio, clockDirection) {
    this.implementFluctuations(elm, ratio, clockDirection);
    window.addEventListener('scroll', () => {
      this.implementFluctuations(elm, ratio, clockDirection);
    });
  }

  implementFluctuations1(wrap, ratio) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(((topPosElm - winY) / window.innerHeight * 100));
    const tmpDistance = (12 - percentage) * ratio;

    if (tmpDistance <= 70) {
      wrap.querySelector('img').style.transform = `translateY(${tmpDistance + 3}px)`;
    }
  }
  parallax1(elm, ratio,) {
    this.implementFluctuations1(elm, ratio);
    window.addEventListener('scroll', () => {
      this.implementFluctuations1(elm, ratio);
    });
  }

  implementFluctuations2(wrap, ratio) {
    const winY = window.scrollY;
    const topPosElm = this.getTopPos(wrap);
    const percentage = parseInt(((topPosElm - winY) / window.innerHeight * 100));
    const distanceBot = parseInt(winY + window.innerHeight - topPosElm);
    const deg = (100 - percentage) * ratio * 2;

    console.log(percentage);
    if (percentage > 100) {
      wrap.querySelector('img').style.transform = `rotate(0deg)`;
      return;
    }
    if (percentage < 0 || distanceBot < 0 || deg > 45) {
      wrap.querySelector('img').style.transform = `rotate(45deg)`;
      return;
    }

    wrap.querySelector('img').style.transform = `rotate(${deg}deg)`;
  }
  parallax2(elm, ratio,) {
    this.implementFluctuations2(elm, ratio);
    window.addEventListener('scroll', () => {
      this.implementFluctuations2(elm, ratio);
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
  site.parallax(document.querySelector('.floating-image-wrap-3'), 0.5, 'clockDirection');
  site.parallax(document.querySelector('.floating-image-wrap-4'), 0.5, 'clockDirection');
  site.parallax1(document.querySelector('.block_1 .w_thumb'), 0.7);
  site.parallax2(document.querySelector('.block_3 .w_item'), 0.45);
});

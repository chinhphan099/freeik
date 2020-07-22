class Site {
  selector(elm) { return document.querySelector(elm); }
  getOffetTopElm(elm) {
    const bodyRect = document.body.getBoundingClientRect(),
      topBounding = elm.getBoundingClientRect(),
      topWrap = topBounding.top - bodyRect.top;

    return topWrap;
  }

  freeFallingImageFluctuations(wrap, ratio, clockDirection) {
    const winY = window.scrollY,
      topPosElm = this.getOffetTopElm(wrap),
      percentage = (topPosElm - winY) / window.innerHeight * 100,
      distanceBot = winY + window.innerHeight - topPosElm,
      deg = (100 - percentage) * 360 / 100;

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
  freeFallingImage(elm, ratio, clockDirection) {
    this.freeFallingImageFluctuations(elm, ratio, clockDirection);
    window.addEventListener('scroll', () => {
      this.freeFallingImageFluctuations(elm, ratio, clockDirection);
    });
  }

  productImageFluctuations(wrap, ratio) {
    const winY = window.scrollY,
      topPosElm = this.getOffetTopElm(wrap),
      percentage = (topPosElm - winY) / window.innerHeight * 100,
      initPercent = 12,
      tmpDistance = (initPercent - percentage) * ratio;

    wrap.querySelector('img').style.transform = `translateY(${tmpDistance}px)`;
  }
  productImageAnimation(elm, ratio) {
    this.productImageFluctuations(elm, ratio);
    window.addEventListener('scroll', () => {
      this.productImageFluctuations(elm, ratio);
    });
  }

  whatIsImageFluctuations(wrap, ratio) {
    const winY = window.scrollY,
      topPosElm = this.getOffetTopElm(wrap),
      percentage = (topPosElm - winY) / window.innerHeight * 100,
      distanceBot = winY + window.innerHeight - topPosElm,
      deg = (100 - percentage) * ratio * 2 + 2;

    if (percentage > 100) {
      wrap.querySelector('img').style.transform = `rotate(0deg)`;
    }
    else if (percentage < 0 || distanceBot < 0 || deg > ratio * 100) {
      wrap.querySelector('img').style.transform = `rotate(${ratio * 100}deg)`;
    }
    else {
      wrap.querySelector('img').style.transform = `rotate(${deg}deg)`;
    }
  }
  whatIsImage(elm, ratio) {
    this.whatIsImageFluctuations(elm, ratio);
    window.addEventListener('scroll', () => {
      this.whatIsImageFluctuations(elm, ratio);
    });
  }

  verticalMovingFluctuations(wrap, max, direction) {
    const winY = window.scrollY,
      topPosElm = this.getOffetTopElm(wrap),
      percentage = (topPosElm - winY) / window.innerHeight * 100,
      distance = percentage * 2 * max / 100 - window.innerHeight / 10;

    if (distance > 0) {
      if (direction === 'fromLeft') {
        wrap.style.transform = `translateX(-${distance}px)`;
      }
      else {
        wrap.style.transform = `translateX(${distance}px)`;
      }
    }
  }
  verticalMoving(elm, max, direction) {
    this.verticalMovingFluctuations(elm, max, direction);
    window.addEventListener('scroll', () => {
      this.verticalMovingFluctuations(elm, max, direction);
    });
  }

  whatIsDescFluctuations(wrap, max) {
    const winY = window.scrollY,
      topPosElm = this.getOffetTopElm(wrap),
      percentage = (topPosElm - winY) / window.innerHeight * 100,
      distance = (percentage - 50) * max / 100;

    if (distance > 0) {
      wrap.querySelector('.w_content').style.transform = `translateX(${distance}px)`;
    }
  }
  whatIsDesc(elm, max) {
    this.whatIsDescFluctuations(elm, max);
    window.addEventListener('scroll', () => {
      this.whatIsDescFluctuations(elm, max);
    });
  }

  handleClassScrolled() {
    if (window.scrollY > 100) {
      this.selector('body').classList.add('scrolled');
    }
    else {
      this.selector('body').classList.remove('scrolled');
    }
  }
  checkSiteScrolling() {
    this.handleClassScrolled();
    window.addEventListener('scroll', () => {
      this.handleClassScrolled();
    });
  }
}

const site = new Site();
site.checkSiteScrolling();

window.addEventListener('load', () => {
  site.productImageAnimation(site.selector('.block_1 .w_thumb'), 0.7);

  site.whatIsImage(site.selector('.block_3 .w_item'), 0.45);
  site.whatIsDesc(site.selector('.block_3 .w_item'), 100);

  site.verticalMoving(site.selector('.block_2 .item-1 .w_title'), 100, 'fromLeft');
  site.verticalMoving(site.selector('.block_2 .item-2 .w_title'), 100, 'fromRight');

  site.freeFallingImage(site.selector('.floating-image-wrap-1'), 0.5);
  site.freeFallingImage(site.selector('.floating-image-wrap-2'), 0.5);
  site.freeFallingImage(site.selector('.floating-image-wrap-3'), 0.5, 'clockDirection');
  site.freeFallingImage(site.selector('.floating-image-wrap-4'), 0.5, 'clockDirection');
});

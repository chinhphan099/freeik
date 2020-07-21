(() => {
  function onPageScrolling() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        document.querySelector('body').classList.add('scrolled');
      }
      else {
        document.querySelector('body').classList.remove('scrolled');
      }
    });
  }

  function animateImage() {
    // const elm = document.querySelector('.floating-image-1');
  }

  function onPageWheeling() {
    window.addEventListener('wheel', () => {
      animateImage();
    });
  }

  function init() {
    AOS.init();
    onPageScrolling();
    onPageWheeling();
  }

  window.addEventListener('DOMContentLoaded', () => {
    init();
  });
})();

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

  function onPageWheeling() {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY);
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

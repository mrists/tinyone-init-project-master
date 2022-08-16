$(document).ready(function () {
  /* menu */
  let $btnHamburger = $('.header-navbar__hamburger');
  let $navbarList = $('.header-navbar__list');
  let $window = $(window);
  let $body = $('body');
  let isShow = false;
  let isStop = true; 
  /* menu */
  
  /* slider */
  let $slides = $('.slide');
  let $indContainer = $('.indicators');
  let $indItems = $('.indicator');
  let $pausePlayBtn = $('#pausePlayBtn');
  let pauseBtn = '<i class="fa fa-pause-circle"></i>';
  let playBtn = '<i class="fa fa-play-circle"></i>';
  let currentSlide = 0;
  let playbackStatus = true;
  const carouselInterval = 5000;
  const movedInterval = 500;
  /* slider */

  /* menu */
  let toggleActive = () => {
    $btnHamburger.toggleClass('active');
    isShow ? $body.removeAttr('class') : $body.toggleClass('active');
    !isShow && playbackStatus && pauseSlideShow();
    $navbarList.fadeToggle(500);
    isShow = !isShow;
  };

  let resetMenu = () => {
    $btnHamburger.removeClass('active');
    $body.removeAttr('class');
    $navbarList.removeAttr('style');
    isShow = false;
  };

  $btnHamburger.on('click', () => {
    toggleActive();
    
    return false;
  });

  $body.on('click', () => isShow && toggleActive() || true);

  $window.on('resize', () => {
    if ($window.width() > 768 && isStop) {
      isStop = false;
      setTimeout(() => {
        resetMenu();
        isStop = true;
      }, 200);
    }
  });
  /* menu */

  /* slider */
  let gotoNSlide = (n) => {
    const i = currentSlide;

    $($slides[currentSlide]).toggleClass('active moved');
    $($indItems[currentSlide]).toggleClass('active');
    currentSlide = (n + $slides.length) % $slides.length;
    $($slides[currentSlide]).toggleClass('active');
    $($indItems[currentSlide]).toggleClass('active');

    setTimeout(() => {
      $($slides[i]).removeClass('moved');
    }, movedInterval);
  };

  let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

  let slideInterval = setInterval(gotoNextSlide, carouselInterval);

  function playSlideShow() {
    console.log('playSlideShow has been used');
    playbackStatus = !playbackStatus
    slideInterval = setInterval(gotoNextSlide, carouselInterval);
    $pausePlayBtn.html(pauseBtn);
  }

  function pauseSlideShow() {
    if (playbackStatus) {
      console.log('pauseSlideShow has been used');
      playbackStatus = !playbackStatus;
      clearInterval(slideInterval);
      $pausePlayBtn.html(playBtn);
    }
  }

  function pausePlay() {
    console.log('pausePlay has been used');
    playbackStatus ? pauseSlideShow() : playSlideShow(); 
  }

  let clickIndicatorBtn = (e) => {
    pauseSlideShow();
    gotoNSlide(+e.target.getAttribute('data-slide-to'));
  };

  $indContainer.on('click', '.indicator', clickIndicatorBtn);
  $pausePlayBtn.on('click', pausePlay);
  /* slider */
});

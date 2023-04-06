// 스와이퍼
const mainSwiper = new Swiper('.main-swiper', {
  slidesPerView: 'auto',
  loop: true,
  speed: 800,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".pagination",
    type: "custom",
    renderCustom:function(swiper, current, total){

        const currentNum = (current < 10) ? '0'+current : current;
        const totalNum = (total < 10) ? '0'+total : total;

        return `<span class="page-current">${currentNum}</span> 
                <span class="page-total">${totalNum}</span>`;
    }
  },
  navigation: {
    nextEl: ".main-swiper .swiper-button-next",
    prevEl: ".main-swiper .swiper-button-prev",
  },
  });

const bestSwiper = new Swiper(".best-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 20,
});

const eventSwiper = new Swiper('.event-swiper', {
  loop: true,
  speed: 800,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
  },
  navigation: {
    nextEl: ".event-swiper .swiper-button-next",
    prevEl: ".event-swiper .swiper-button-prev",
  },
});

const serviceSwiper = new Swiper('.service-swiper', {
  loop: true,
  speed: 300,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".pagination",
    type: "custom",
    renderCustom:function(swiper, current, total){

        const currentNum = (current < 10) ? '0'+current : current;
        const totalNum = (total < 10) ? '0'+total : total;

        return `<span class="page-current">${currentNum}</span> 
                <span class="page-total">${totalNum}</span>`;
    }
  },
  navigation: {
    nextEl: ".service-swiper .swiper-button-next",
    prevEl: ".service-swiper .swiper-button-prev",
  },
});

const reviewSwiper = new Swiper(".review-swiper", {
  slidesPerView: 'auto',
  spaceBetween: 20,
});

const footerBanner = new Swiper('.footer-banner', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 5000,
  loop: true,
  touchRatio: 0
});


//스와이퍼 제어 버튼
const mainControl = $('.sc-banner .btn-control');

mainControl.click(function(){
  if($(this).hasClass('on')){
      $(this).removeClass('on');
      mainSwiper.autoplay.start();
  }else{
      $(this).addClass('on');
      mainSwiper.autoplay.stop();
  }
});

const eventControl = $('.sc-event .btn-control');

eventControl.click(function(){
  if($(this).hasClass('on')){
      $(this).removeClass('on');
      eventSwiper.autoplay.start();
  }else{
      $(this).addClass('on');
      eventSwiper.autoplay.stop();
  }
});


//gsap 플러그인 안정화
gsap.registerPlugin(ScrollTrigger);


//section 슬라이드 업(공통)
const sectionEl = document.querySelectorAll('section.up')

sectionEl.forEach(function(l) {
  gsap.set('section.up', {y:130});

  const contentUp = gsap.timeline(
    {scrollTrigger: {
      trigger: l,
      start:"top 80%",
      end:"10% 88%",
      scrub: 2,
  }});
  contentUp.to(l, {y:0})
});


//헤더 스크롤시 height 변화
let didScroll;
let lastScrollTop = 0;
const delta = 5;
const navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header').removeClass('nav-up')
        }
    }
    lastScrollTop = st;
}


//메뉴창 열고 닫기
const menuOpen = document.querySelector('.header .menu-link');
const menuClose = document.querySelector('.menu-inner .close-btn');
const body = document.getElementsByTagName('body')[0];
const menuBg = document.querySelector('.menu-bg')

menuOpen.addEventListener('click',function(e){
  e.preventDefault();
  body.classList.add('scrollLock');
});

menuClose.addEventListener('click', function(e){
  e.preventDefault();
  body.classList.remove('scrollLock');
});

menuBg.addEventListener('click', function(e){
  e.preventDefault();
  body.classList.remove('scrollLock');
});


//메뉴창 서브 메뉴 열고 닫기
const subMenu = $('.menu-inner .cate-item');

subMenu.click(function(e){
  e.preventDefault();
  if($(this).hasClass('on')){
    $(this).removeClass('on');
  }else{
    $(this).addClass('on').siblings().removeClass('on');
  }
});


//sc-pick 버튼 ani
const opTitle = document.querySelector('.sc-pick .select-op');
const opList = document.querySelector('.sc-pick .op-list');


//sc-pick 리스트 열고 닫기
opTitle.addEventListener('click',function(){
  opList.classList.toggle('on')
});


//sc-pick 리스트 선택 이벤트
opList.addEventListener('click', function(event){
  if(event.target.tagName !== 'BUTTON') return false;
  opTitle.innerText = event.target.innerText;
  opList.classList.remove('on');
});


//footer toggle
$(".familysite").click(function(){
  $(".site-list").slideToggle(200);
})

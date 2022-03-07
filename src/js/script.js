// Carousel
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const leftBtn = document.querySelector('.carousel__btn--left');
const rightBtn = document.querySelector('.carousel__btn--right');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const ctaBtns = Array.from(document.querySelectorAll('.card__btn'));

// Arrange the slides next to one another
const arrangeSlides = status => {
  if (status) {
    slides.forEach((item, i) => {
      item.style.left = `${slideWidth * i}px`;
    })
  } else {
    slides.forEach(item => item.style.left = 'auto');
  }
}

// Function to move the slide
const moveSlide = (activeSlide, targetSlide) => {
  let amount = targetSlide.style.left;
  track.style.transform = `translateX(-${amount})`;

  activeSlide.classList.remove('active-slide');
  targetSlide.classList.add('active-slide');
}

// Update buttons visibility
const updateBtns = n => {
  if (n === 0) {
    leftBtn.classList.add('is-hidden');
    rightBtn.classList.remove('is-hidden');
  } else if (n === slides.length - 1) {
    leftBtn.classList.remove('is-hidden');
    rightBtn.classList.add('is-hidden');
  } else {
    leftBtn.classList.remove('is-hidden');
    rightBtn.classList.remove('is-hidden');
  }
}

// Update the selected dot
const updateDots = (activeDot, targetDot) => {
  activeDot.classList.remove('active-dot');
  targetDot.classList.add('active-dot');
}

// Update the tabindex of card buttons
const updateTabindex = n => {
  ctaBtns.forEach(item => item.setAttribute('tabindex', '-1'));
  ctaBtns[n].removeAttribute('tabindex');
}

// Reset carousel when I change viewport
// This is because there is no carousel in the desktop view
const toggleCarousel = () => {
  const mq = window.matchMedia('(min-width: 1024px)');

  if (mq.matches) {
    track.style.transform = 'none';
    arrangeSlides(false);
    updateBtns(0);
    slides.forEach(item => item.classList.remove('active-slide'));
    slides[0].classList.add('active-slide');
    dots.forEach(item => item.classList.remove('active-dot'));
    dots[0].classList.add('active-dot');
    ctaBtns.forEach(item => item.removeAttribute('tabindex'));
  } else {
    arrangeSlides(true);
    updateTabindex(0);
  }
}

toggleCarousel();

// When I click left, move slides to the left
leftBtn.addEventListener('click', () => {
  const activeSlide = track.querySelector('.active-slide');
  const prevSlide = activeSlide.previousElementSibling;
  const activeDot = dotsNav.querySelector('.active-dot');
  const prevDot = activeDot.previousElementSibling;
  const prevIndex = slides.findIndex(item => item === prevSlide);

  moveSlide(activeSlide, prevSlide);
  updateBtns(prevIndex);
  updateDots(activeDot, prevDot);
  updateTabindex(prevIndex);
})

// When I click right, move slides to the right
rightBtn.addEventListener('click', () => {
  const activeSlide = track.querySelector('.active-slide');
  const nextSlide = activeSlide.nextElementSibling;
  const activeDot = dotsNav.querySelector('.active-dot');
  const nextDot = activeDot.nextElementSibling;
  const nextIndex = slides.findIndex(item => item === nextSlide);

  moveSlide(activeSlide, nextSlide);
  updateBtns(nextIndex);
  updateDots(activeDot, nextDot);
  updateTabindex(nextIndex);
})

// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const activeSlide = track.querySelector('.active-slide');
  const activeDot = dotsNav.querySelector('.active-dot');
  const targetIndex = dots.findIndex(item => item === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlide(activeSlide, targetSlide);
  updateBtns(targetIndex);
  updateDots(activeDot, targetDot);
  updateTabindex(targetIndex);
})

window.addEventListener('resize', () => toggleCarousel());

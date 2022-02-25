// Carousel
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const leftBtn = document.querySelector('.carousel__btn--left');
const rightBtn = document.querySelector('.carousel__btn--right');

const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another
if (window.matchMedia('(max-width: 1023px)').matches) {
  slides.forEach((item, i) => {
    item.style.left = `${slideWidth * i}px`
  })
}

// Function to move the slide
const moveSlide = (track, activeSlide, targetSlide) => {
  let amount = targetSlide.style.left;
  track.style.transform = `translateX(-${amount})`;

  activeSlide.classList.remove('active-slide');
  targetSlide.classList.add('active-slide');
}

// Update the selected dot
const updateDots = (activeDot, targetDot) => {
  activeDot.classList.remove('active-dot');
  targetDot.classList.add('active-dot');
}

// Change the buttons visibility
const toggleBtns = n => {
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

// When I click left, move slides to the left
leftBtn.addEventListener('click', () => {
  const activeSlide = track.querySelector('.active-slide');
  const prevSlide = activeSlide.previousElementSibling;
  const activeDot = dotsNav.querySelector('.active-dot');
  const prevDot = activeDot.previousElementSibling;
  const prevIndex = slides.findIndex(item => item === prevSlide);

  moveSlide(track, activeSlide, prevSlide);
  updateDots(activeDot, prevDot);
  toggleBtns(prevIndex);
})

// When I click right, move slides to the right
rightBtn.addEventListener('click', () => {
  const activeSlide = track.querySelector('.active-slide');
  const nextSlide = activeSlide.nextElementSibling;
  const activeDot = dotsNav.querySelector('.active-dot');
  const nextDot = activeDot.nextElementSibling;
  const nextIndex = slides.findIndex(item => item === nextSlide);

  moveSlide(track, activeSlide, nextSlide);
  updateDots(activeDot, nextDot);
  toggleBtns(nextIndex);
})

// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const activeSlide = track.querySelector('.active-slide');
  const activeDot = dotsNav.querySelector('.active-dot');
  const targetIndex = dots.findIndex(item => item === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlide(track, activeSlide, targetSlide);
  updateDots(activeDot, targetDot);
  toggleBtns(targetIndex);
})

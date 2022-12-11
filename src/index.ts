// import { greetUser } from '$utils/greet';`
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // const name = 'John Doe';
  // greetUser(name);
});

gsap.registerPlugin(ScrollTrigger);

const textRevealTl = gsap.timeline();
// const scrollTrigger = ScrollTrigger();

const text = document.querySelectorAll('[am-element="text-animation"]');

text.forEach((textToAnimate) => {
  const split_Text = new SplitType(textToAnimate, { types: `lines, words` });

  gsap.from(split_Text.words, {
    yPercent: 150,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power.out4',
    scrollTrigger: {
      trigger: textToAnimate,
      start: 'top 70%',
      once: true,
    },
  });

  // scrollTrigger.create({
  //   trigger: textToAnimate,
  //   start: 'top top',
  //   onEnter: textRevealTl.play(),
  //   once: true,
  // });
});

// const text_heading = new SplitType(text, { types: 'lines, words, chars' });

// Heading animation
const heading = document.querySelector('[am-element="heading-animation"]');
const split_heading = new SplitType(heading, { types: 'words, chars' });

textRevealTl.to(heading, { opacity: 1 });

textRevealTl.from(split_heading.chars, {
  yPercent: 150,
  stagger: 0.02,
  duration: 0.6,
  ease: 'power.out4',
});

// headingTl.fromTo(
//   split_heading.chars,
//   {
//     yPercent: 100,
//     opacity: 0,
//   },
//   {
//     yPercent: 0,
//     opacity: 1,
//     ease: 'power.out4',
//     duration: 0.5,
//     stagger: 0.1,
//   }
// );

const buttons = gsap.utils.toArray('[am-element="button"]');

// const splitButtonText = new SplitType(buttons, { types: 'chars' });
// console.log(splitButtonText);

buttons.forEach((button: HTMLButtonElement) => {
  const buttonText = button.querySelector('[am-element="button-text"]');
  const buttonTextWrapper = button.querySelector('[am-element="button-text-wrapper"]');
  const buttonIconWrapper = button.querySelector('[am-element="button-icon-wrapper"]');
  const buttonBg = button.querySelector('[am-element="button-bg"]');

  const splitButtonText = new SplitType(button, { types: 'chars' });
  // const splitButtonTextCopy = new SplitType(buttonTextCopy, { types: 'chars'

  // button text
  const buttonTextCopyWrapper = document.createElement('div');
  const buttonTextCopy = buttonText.cloneNode(true);
  buttonTextCopyWrapper.appendChild(buttonTextCopy);
  buttonTextWrapper.appendChild(buttonTextCopyWrapper);
  buttonTextCopyWrapper.style.position = 'absolute';
  buttonTextCopyWrapper.style.top = '100%';

  const buttonTextCopyChars = gsap.utils.toArray(buttonTextCopy.querySelectorAll('.char'));

  // button arrow
  const buttonArrow = button.querySelector('[am-element="button-arrow"]');
  const buttonArrowCopy = buttonArrow.cloneNode(true);
  buttonIconWrapper?.appendChild(buttonArrowCopy);
  buttonArrowCopy.style.position = 'absolute';
  buttonArrowCopy.style.top = '100%';
  buttonArrowCopy.style.right = '100%';

  gsap.set(buttonArrowCopy, {});

  const buttonHoverTl = gsap.timeline({ paused: true });

  buttonHoverTl.to(splitButtonText.chars, {
    yPercent: -100,
    stagger: 0.014,
    duration: 0.5,
    ease: 'power3.out',
    // paused: true,
  });

  buttonHoverTl.to(
    buttonArrow,
    {
      yPercent: -100,
      xPercent: 100,
      duration: 0.5,
    },
    '<'
  );
  buttonHoverTl.to(
    buttonBg,
    {
      width: '100%',
      duration: 0.45,
      ease: 'power3.out',
    },
    '<0.2'
  );

  buttonHoverTl.to(
    buttonArrowCopy,
    {
      yPercent: -120,
      xPercent: 100,
      duration: 0.5,
      filter: 'invert(100%)',
    },
    '<'
  );

  buttonHoverTl.to(
    buttonTextCopyChars,
    {
      yPercent: -100,
      stagger: 0.014,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.25,
      filter: 'invert(100%)',
      // paused: true,
    },
    '<'
  );

  button.addEventListener('mouseenter', () => buttonHoverTl.play());
  button.addEventListener('mouseleave', () => buttonHoverTl.reverse());
});

// import { greetUser } from '$utils/greet';`
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // const name = 'John Doe';
  // greetUser(name);
  gsap.registerPlugin(ScrollTrigger);

  const headerTl = gsap.timeline();
  const nav = document.querySelector('[am-element="nav-element"]');
  const headerText = document.querySelector('[am-element="header-text"]');
  const headerButtons = gsap.utils.toArray('[am-element="header-button"]');
  const headerHeading = document.querySelector('[am-element="header-heading"]');
  const headerVideo = document.querySelector('[am-element="video"]');

  // Nav bar intro animation
  headerTl.from(nav, {
    yPercent: 30,
    opacity: 0,
  });

  // Header text tween
  const splitText = new SplitType(headerText, { types: `lines, words` });

  // console.log(splitText.words);

  headerTl.from(splitText.words, {
    yPercent: 150,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power.out4',
    // scrollTrigger: {
    //   trigger: word,
    //   start: 'top 70%',
    //   once: true,
    // },
  });

  // Buttons reveal animation

  ScrollTrigger.batch('.button', {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    onEnter: (batch) => {
      gsap.set(batch, { yPercent: 40 });
      gsap.to(batch, { yPercent: 0, opacity: 1, stagger: 0.2, delay: 1.5 });
    },
  });

  // Heading animation
  const splitHeading = new SplitType(headerHeading, { types: 'words, chars' });

  headerTl.set(headerHeading, { opacity: 1 });

  headerTl.from(splitHeading.chars, {
    yPercent: 150,
    stagger: 0.02,
    duration: 0.6,
    ease: 'power.out4',
  });

  // Header video animation
  headerTl.from(headerVideo, {
    yPercent: 30,
    opacity: 0,
  });

  headerTl.to(headerVideo, {
    y: 100,
    scale: 0.0,
    scrollTrigger: {
      trigger: headerVideo,
      start: 'top 40%',
      end: 'bottom top',
      scrub: 0.5,
      // markers: true,
    },
  });

  // headerTl.set(headerVideo, {
  //   display: 'none',
  // });

  // General text reveal animation
  const revealTl = gsap.timeline();

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
  });

  // // Divider reveal animation
  const dividers = gsap.utils.toArray('[am-element="divider-animation"');

  dividers.forEach((divider) => {
    console.log(divider);
    gsap.from(divider, {
      scaleX: 0,
      duration: 0.75,
      // stagger: 0.1,
      ease: 'power.out4',
      scrollTrigger: {
        trigger: divider,
        start: 'top 70%',
        once: true,
      },
    });
  });

  // Cards hover animation
  const cards = gsap.utils.toArray('[am-element="card1-element"]');

  cards.forEach((card) => {
    const cardImage1 = card.querySelector('.is-image1');
    const cardImage2 = card.querySelector('.is-image2');

    const cardTl = gsap.timeline({ paused: true });

    cardTl.to(cardImage1, {
      width: 0,
      ease: 'power.out4',
    });

    cardTl.from(
      cardImage2,
      {
        xPercent: 30,
        ease: 'power.out4',
      },
      '<'
    );

    card.addEventListener('mouseenter', () => cardTl.play());
    card.addEventListener('mouseleave', () => cardTl.reverse());
  });

  // Cards movement animation
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  cards.forEach((card) => {
    const cardMoveSpeed = getRandomInt(100, 200);
    gsap.from(card, {
      y: cardMoveSpeed,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        // markers: true,
        scrub: 2,
      },
    });
  });

  const buttons = gsap.utils.toArray('[am-element="button"]');

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

  // Card rotate on scroll
  const cardCta = document.querySelector('[am-element="card-rotate"]');

  gsap.to(cardCta, {
    rotate: 3,
    scale: 0.95,
    duration: 1,
    scrollTrigger: {
      trigger: cardCta,
      start: 'bottom center',
      end: 'bottom top',
      markers: true,
      scrub: true,
      // once: true,
    },
  });
});

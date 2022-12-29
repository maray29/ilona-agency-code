// import { greetUser } from '$utils/greet';`
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // const name = 'John Doe';
  // greetUser(name);
  gsap.registerPlugin(ScrollTrigger);

  // Section color change when in viewport
  // select the section
  const section = document.querySelector('[am-animation=section-bg-change]');
  // const body = document.body;
  console.log(section);

  // when in viewport, change bg color to a bright color
  // console.log('.section_values');
  const bgTl = gsap.timeline();

  // bgTl.to('.industries_list-wrapper', {
  //   backgroungColor: 'red',
  //   // scrolltrigger: {
  //   //   trigger: '.industries_list-wrapper',
  //   //   // start: 'top bottom',
  //   //   // bottom: 'bottom top',
  //   //   markers: true,
  //   //   // pin: true, // pin the element to its starting position
  //   //   // anticipatePin: 1, // allow the animation to start before the element reaches the start position
  //   //   onEnter: () => {
  //   //     ({ progress, direction, isActive }) => console.log(progress, direction, isActive);
  //   //   },
  //   // },
  // });

  // gsap.to(section, {
  //   backgroundColor: '#e9e1d7',
  //   scrollTrigger: {
  //     trigger: section,
  //     start: 'top bottom',
  //     // end: () => `+=${section.offsetHeight}`,
  //     end: 'bottom center',
  //     // end: '+=500',
  //     scrub: true,
  //     markers: true,
  //   },
  // });

  // gsap.to('.page-wrapper', {
  //   // '--color': 'blue',
  //   immediateRender: false,
  //   backgroundColor: 'red',
  //   onStart: () => {
  //     ({ progress, direction, isActive }) => console.log(progress, direction, isActive);
  //   },
  //   scrollTrigger: {
  //     trigger: '.section_values',
  //     // scroller: section,
  //     scrub: 2,
  //     start: 'top bottom',
  //     end: 'bottom top',
  //   },
  // });

  const sections = gsap.utils.toArray('[data-color]');

  sections.forEach((section, i) => {
    gsap.set(section, { backgroundColor: 'transparent' });

    if (section.getAttribute('data-color') !== null) {
      var colorAttr = section.getAttribute('data-color');

      gsap.to('.page-wrapper', {
        backgroundColor:
          colorAttr === 'dark'
            ? gsap.getProperty('html', '--dark')
            : gsap.getProperty('html', '--light'),
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          start: 'top bottom',
          end: '+=100%',
        },
      });
    }
  });

  const headerTl = gsap.timeline();
  const nav = document.querySelector('[am-element="nav-element"]');
  const headerText = document.querySelector('[am-element="header-text"]');
  // const headerButtons = gsap.utils.toArray('[am-element="header-button"]');
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

  headerTl.from(
    splitText.words,
    {
      yPercent: 120,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power.out4',
      // scrollTrigger: {
      //   trigger: word,
      //   start: 'top 70%',
      //   once: true,
      // },
    },
    '<'
  );

  // Buttons reveal animation

  ScrollTrigger.batch('[am-reveal-animation="header-button"]', {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    start: 'top 70%',
    onEnter: (batch) => {
      gsap.set(batch, { yPercent: 30 });
      gsap.to(batch, { yPercent: 0, opacity: 1, stagger: 0.2 });
    },
  });

  // Heading animation
  const splitHeading = new SplitType(headerHeading, { types: 'words, chars' });

  gsap.set(headerHeading, { opacity: 1 });

  headerTl.from(
    splitHeading.chars,
    {
      yPercent: 150,
      stagger: 0.02,
      duration: 0.6,
      ease: 'power.out4',
    },
    '<'
  );

  // Header video animation
  headerTl.from(
    headerVideo,
    {
      yPercent: 30,
      opacity: 0,
      delay: 0.2,
    },
    '<'
  );

  headerTl.to(headerVideo, {
    y: 300,
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

  const text = document.querySelectorAll('[am-element="text-animation"]');

  text.forEach((textToAnimate) => {
    const split_Text = new SplitType(textToAnimate, { types: `lines, words` });

    gsap.from(split_Text.words, {
      yPercent: 120,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power.out4',
      scrollTrigger: {
        trigger: textToAnimate,
        start: 'top 70%',
        once: true,
      },
    });
  });

  // General reveal animation
  const revealAnimationElements = gsap.utils.toArray('[am-reveal-animation="item"]');

  ScrollTrigger.batch(revealAnimationElements, {
    // interval: 0.1, // time window (in seconds) for batching to occur.
    // batchMax: 3,   // maximum batch size (targets)
    // start: 'top 70%',
    onEnter: (batch) => {
      gsap.set(batch, { yPercent: 30, opacity: 0 });
      gsap.to(batch, { yPercent: 0, opacity: 1, stagger: 0.2, duration: 0.5 });
    },
  });

  // // Divider reveal animation
  const dividers = gsap.utils.toArray('[am-reveal-animation="divider"');

  dividers.forEach((divider) => {
    // console.log(divider);
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

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // Create an array with speed numbers
  let cardSpeedArray = [];
  let num = 60;
  cards.forEach(() => {
    num += 30;
    cardSpeedArray.push(num);
  });

  // Shuffle the array to randomize the speed values
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  shuffle(cardSpeedArray);

  cards.forEach((card, index) => {
    // const cardMoveSpeed = Math.floor(Math.random() * 9) * 30 + 60;
    const cardMoveSpeed = cardSpeedArray[index];
    // console.log(cardMoveSpeed, 'move speed');
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

  // button animation
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

    // Set bg color
    // const buttonBg = button.querySelector('[am-element="button-bg"]');
    // console.log(buttonBg);

    if (button.getAttribute('am-mode') === 'dark') {
      gsap.to(buttonBg, {
        backgroundColor: '#ffffff',
      });
    } else if (button.hasAttribute('am-mode=light')) {
      gsap.to(buttonBg, {
        backgroundColor: '#000000',
      });
    }

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
      start: 'center center',
      end: '+=500',
      // markers: true,
      scrub: true,
      // once: true,
    },
  });

  const marqueeAsterix = gsap.utils.toArray('[am-element="marquee_asterix"]');

  marqueeAsterix.forEach((asterix, index) => {
    if (index % 2 === 0) {
      gsap.to(asterix, {
        rotate: 360,
        repeat: -1,
        ease: 'none',
        duration: 7,
      });
    } else {
      gsap.to(asterix, {
        rotate: -360,
        repeat: -1,
        ease: 'none',
        duration: 7,
      });
    }
  });

  // gsap.to('[am-element="marquee_asterix"]', {
  //   rotate: 360,
  //   repeat: -1,
  //   ease: 'none',
  //   duration: 7,
  // });

  // features row reveal animation
  const featureRows = gsap.utils.toArray('[am-reveal-animation="row"]');
  // console.log(featureRows);
  let rowItems = [];

  // featureRows.forEach((row) => {
  //   rowItems = gsap.utils.toArray(row.children);
  //   ScrollTrigger.batch(rowItems, {
  //     start: 'top 30%',
  //     // once: true,
  //     onEnter: (batch) => {
  //       batch.forEach((item, index) => {
  //         const tl = gsap.timeline();
  //         tl.set(item, { yPercent: 120 });
  //         tl.to(item, { yPercent: 0, opacity: 1, delay: index * 0.4 });
  //       });
  //     },
  //   });
  // });

  const tl = gsap.timeline();

  featureRows.forEach((row, index) => {
    rowItems = gsap.utils.toArray(row.children);
    // console.log(rowItems);

    gsap.from(rowItems, {
      yPercent: 100,
      stagger: 0.1,
      delay: index * 0.4,
      scrollTrigger: {
        trigger: row,
        start: 'top 70%',
        once: true,
      },
    });

    // rowItems.forEach((item, index) => {

    // });

    // ScrollTrigger.batch(rowItems, {
    //   start: 'top 30%',
    //   // once: true,
    //   onEnter: (batch) => {
    //     batch.forEach((item, index) => {
    //       const tl = gsap.timeline();
    //       tl.set(item, { yPercent: 120 });
    //       tl.to(item, { yPercent: 0, opacity: 1, delay: index * 0.4 });
    //     });
    //   },
    // });
  });

  ScrollTrigger.refresh();
});

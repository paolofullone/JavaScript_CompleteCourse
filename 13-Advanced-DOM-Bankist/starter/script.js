'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const h1 = document.querySelector('h1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // this avoids the page to jump when we click in a button
  // that is almost hidden in the page due scroll down activity.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////

//? 183 Implementing Smooth Scrolling.mp4

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current Scroll (X,Y)', window.scrollX, window.scrollY);
  console.log(
    'Height and Width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //* getBoundingClientRect returns a DOMRect which is relative to the position of the page
  // in the moment it is executed, it returns the x and y coordinates, x is the distance
  // of the element to the left side of the page and y the distance to the top of the page.
  //* The BoundingClient is relative to the viewport of the page.
  //* The scrollX and scrollY shows the relative position of the button after the scroll
  // of the page. So it's also dynamic. Before any scroll it is 0, 0.
  //* clientHeight and With shows the relative size of the viewport, now if we change the
  // size of the window (increase cl area for example) it will change the size of the
  // viewport.

  //* Scrolling
  // window.scrollTo(s1coords.left, s1coords.top); // So if we leave like this, it
  // will only work before scrolling the page, because when we do scroll, the s1coords
  // change, and it will move only the new relative position.

  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // with this one we add the scrolled portion to the s1 new relative coords,
  // so it works anywhere in the page (this one we don't have x scroll, just for the
  // sake of completion.)
  //* Old School!

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //* Modern way of doing it! Only work in modern browsers.
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////
//? 187 Event Delegation_ Implementing Page Navigation.mp4
// Page Navigation

// Now we selected all buttons at once, and added a callback function inside the callback function.
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     // console.log(`LINK`);
//     e.preventDefault(); // this prevents the links to anchors in the page to work, with this command nothing happens when we click in the buttons.
//     const id = this.getAttribute('href'); // getAttribute returns only #section--1(2 or 3), this.href returns the entire url.
//     // console.log(this.href);
//     // console.log(this.getAttribute('href'));
//     // Scrolling smoothly to the anchor.
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// The problem with the above solution is that we are implementing the click callback function to all elements in the page, here it's only 2 elements
// than it should be fine, however if we have like 10.000 elements we will have performance issues. So we will apply the bubbling up technique.

// Event delegation:
// 1.  Add event listener to common parent element.
// 2.  Determine what element originated the event.

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // if we click on the elements we see which one was clicked, however if we click no the area between them, we see a
  // "nav__links", that is not relevant at all.

  //* Matching strategy => This is the most important part of implementing event delegation.
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK'); // when we click in the middle we don't get link...
    e.preventDefault(); // this prevents the links to anchors in the page to work, with this command nothing happens when we click in the buttons.
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//? 181 Selecting, Creating, and Deleting Elements.mp4
/*
// Selecting elements.
// Select the entire document, head and body
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

// select all the buttons
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// This returns a html collection, not a node list. HTML collection is so called live
// collection. If the DOM changes, this collection is immediately updated automatically.

// Select a class similar as we did to ID and Tag Name no selector (.btn) is needed.
document.getElementsByClassName('btn');

// Creating and inserting elements.
// .insertAdjacentHTML

// This creates the DOM element and stores that in the const message.
// It's not in the page yet.
const message = document.createElement('div');
// Add classes
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// Now we inserted an element as the first child of header element, so it appears
// on top of the screen.
// header.prepend(message);

// as a last element of the page:
header.append(message);

// Now if we inspect the Elements, we will see it in the body.
// And actually now the element is no longer in top of the screen, but in bottom.
// So we can use prepend and append to insert and/or move the elements.

// If we wan't to have more than 1 element, we need to copy it.
// header.append(message.cloneNode(true)); // With this we have it both top and bottom page.

// Now if we inspect we will see it really before the header.
// First a cookie message, then the header.
// header.before(message);

// Or we can put it after the header
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    // message.remove(); // This is pretty new, in old code bases it was like:
    message.parentElement.removeChild(message);
  });

//? 182 Styles, Attributes and Classes.mp4

// Styles
// since we already selected the message before, now we just call the methods on it.

message.style.backgroundColor = '#37383d';

message.style.width = '120%'; // now the message is wider and occupies the entire screen.
// and now if we inspect the element, we will see it has a background color and style.

console.log(message.style.height); // returns empty
console.log(message.style.backgroundColor); // returns the rgb code

// First CL returns empty because this only works for inline styles that we set
// ourselves also using the style property.
// If we really need them:
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// message.style.height = getComputedStyle(message).height + 40 + 'px'; // here we are
// trying to add a string to a number...not gonna work...
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// This changes the color from green to orangered in all page.
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// we can use setProperty to set everything. Usually is easier do like "message.style.backgroundColor = '#37383d';"

// Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

// Even if we add something to html, if it is non-standard, we get undefined when we
// try to print it in console.
console.log(logo.designer); //Non-standard

// If we need to read.
console.log(logo.getAttribute('designer'));

// we can set them also:
logo.alt = 'Beautiful minimalist logo'; // now if we inspect, this is in the logo element.
logo.setAttribute('company', 'Bankist'); // Now if we click on logo and then inspect
// we see a new company attribute.

//
console.log(logo.src); // absolute version
console.log(logo.getAttribute('src')); // relative version

// For a absolute link is the same
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Now to navigator link
const link1 = document.querySelector('.nav__link--btn');
console.log(link1.href);
console.log(link1.getAttribute('href'));

// Data Attributes
console.log(logo.dataset.versionNumber); // In the HTML we use - to separate(data-version-number)
// in JS we must convert to camelCase.

// Classes
logo.classList.add('class', 'multipleValue'); // we can pass multiple values.
logo.classList.remove('class');
logo.classList.toggle('class');
logo.classList.contains('class');

//* Don't use - this will override all the existing classes and whatever is already there
//* and also only allows one element.
//* The methods above allows us to include, exclude and maintain the remaining elements.
logo.className = 'jonas';
*/

//? 184 Types of Events and Event Handlers.mp4
/*
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });
// As we hoover the heading section, the alert window shows up.

// list of events: https://developer.mozilla.org/en-US/docs/Web/Events

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// with both of these (addEventListener and h1.onmouseenter) we get now 2 alerts.
// Nowadays is more common to use addEventListener, h1.onmouseenter is more old school.

// addEventListener allows us to add multiple event listeners to the same event.
// If we do 2 h1.onmouseenter the 2nd will override the 1st.
// we can remove an addEventListener if we don't want it anymore.

// Now this way it will alerts each time we enter the heading.
// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// Now we removed the event, so we only see it once.
// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// We can even do it after some time
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);
// Now after 2 seconds it is removed, we can hoover again and nothing will be alerted.
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 2000);

// A third way is also possible, however we should not use it...
// After the head title in the html file we can change <h1> to <h1 onclick="alert('HTML alert')">ß
*/

//? 185 Event Propagation_ Bubbling and Capturing.mp4
/*
when an event happens (click) in a page, we have the capturing phase, the target phase and the bubbling phase, 
in the capturing phase, even if a click happens in a paragraph as the example, the capture happens in the
document level, than travels down trough all the parents elements till the target element. After reaching the target the event 
travels all the way up to the DOCUMENT route again in the bubbling phase, and it again passes trough all the
parent elements, just the parent, not the siblings. 
As the event bubbles trough the elements, if we attach the same event listener in two or more elements, we will
have the same "alert" in both elements, in this case it was an alert.
By default events can happen in the capturing and bubble phase, but can be setup to work in the target phase
as well. Some events are created only in the target element, and must be manipulated there.
*/

// 186 Event Propagation in Practice.mp4
/*
// rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  //console.log('LINK', e.target, e.currentTarget); // just to see if it works, this one alone works only in the 'Features'
  // In the event listener, the this keyword points to the element on which that event
  // handler is attached, in this case: document.querySelector('.nav__link')
  console.log(e.currentTarget === this);
  console.log(this);

  // This stops the propagation to parent elements
  // e.stopPropagation;
  // This is usually not a good idea, but in case really needed we can use it.
  // it is a tool that can be used to stop errors in large applications, but not really a good
  // idea to use it. Maybe to debug?
});

// In order to test it we need to change the html as:
// <a class="nav__link" href="#section--1">Features</a>
// <a class="nav__link" href="#">Features</a>
// w/o the # it simply reloads the page.

// now let's do the same with the parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  document.querySelector('.nav__links').style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

// now let's do the same with the parent element
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
*/

//? 188 DOM Traversing.mp4
/*
// From the h1 element (When banking meets minimalist) we will go downwards, upwards and sideways.

// Going downwards: child of h1 element.
console.log(h1.querySelectorAll('.highlight')); // Got this from inspector. These are the two green ones.
console.log(h1.childNodes); // here we get text, elements, comments... gives every single node of every single type
console.log(h1.children); // this gives a html collection (that is live updated) and work only for direct children.
h1.firstElementChild.style.color = 'fuchsia';
h1.lastElementChild.style.color = 'lime';

// Going upwards: parents
console.log('---Parents---');
console.log(h1.parentNode);
console.log(h1.parentElement); //usually we are interested in this one, in this case is simply the same :(

// Find a parent element, no matter how far away it is on DOM tree.
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // the 'var(--gra...) is a css variable that
// we used here to change the background color.

h1.closest('h1').style.background = 'var(--gradient-primary)'; // the closest of h1 is h1 itself.

//* CLOSEST is the OPPOSITE of querySelector. CLOSEST find parents elements, the querySelector finds children elements.

// Going Sideways: siblings
console.log('---Siblings---');
console.log(h1.previousElementSibling); // theres no Sibling to h1 indeed.
console.log(h1.nextElementSibling); // the h4 element is the one that comes after the h1 in this page.

console.log(h1.previousSibling); // Not very important, we will be working with elements most of the time.
console.log(h1.nextSibling);

// If we really need all siblings, we need to go to parent and read all children from there.
console.log('---All the siblings (including itself)---');
console.log(h1.parentElement.children);

// The HTML collection is not an array, but still we can create an array using the spread operator.
// Let's say we want to scale all the sibling elements of h1 to 50% scale image size:
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

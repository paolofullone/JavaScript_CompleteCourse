'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

//? 181 Selecting, Creating, and Deleting Elements.mp4

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

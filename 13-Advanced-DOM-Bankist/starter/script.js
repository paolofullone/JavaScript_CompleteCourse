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

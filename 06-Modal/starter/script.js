'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// querySelector only gets the first element if we have more than one in the page.
const btnsOpenModal = document.querySelectorAll('.show-modal');

// wo first we built the function inside the for loop, then we named it openModal and moved it up here.
const openModal = function () {
  modal.classList.remove('hidden'); // the modal window has a hidden class, with this command we will remove the
  //hidden attribute and show the box.
  overlay.classList.remove('hidden'); // same thing with the overlay, note that we are removing a class, not selecting
  //with an '.'
};

// this function close the modal window
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// if the for loop has only one line of code, we can dismiss the {}
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); //we don't call the function with () because JS will do that when
// the button is clicked, otherwise it would execute when the line was read.

// this code will close the modal windows when clicking on the X
btnCloseModal.addEventListener('click', closeModal);

// this will close the modal window when clicking on the overlay
overlay.addEventListener('click', closeModal);

// this function happens for any key pressed
// document.addEventListener('keydown', function () {
//   console.log('a key was pressed');
// });

// with this code we can see on conole a KeyboardEvent that shows the key pressed
// document.addEventListener('keydown', function (e) {
//   //e stands for event
//   console.log(e);
//   console.log(e.key);
// });

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // first we wrote if (modal.classList.contains('hidden')) w/o the !, but we want to close the modal when it is not hidden, or when we can see the modal.
    // if the modal does not contain the hidden class, close the modal.
    closeModal();
  }
});


// refactoring 
// we transformed this:
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if !modal.classList.contains('hidden') {
      closeModal();
    }
  } 
});

// into this:
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
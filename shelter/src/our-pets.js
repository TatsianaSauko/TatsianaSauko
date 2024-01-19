// import { Article } from './js/Article';
// import { ArticleModal } from './js/ArticleModal';
// import { Modal } from './js/Modal';
// import data from './js/data.js';
//
// //Pets
// const navPets = document.querySelector('.navigation_pets');
// const navItemPets = document.querySelectorAll('.navigation-pets__link')
// const hamburgerPets = document.querySelector('.hamburger_pets');
// const menu = document.querySelector('.menu');
//
//
// if (hamburgerPets) {
//     hamburgerPets.addEventListener("click", hamburgerHandlerPets)
// }
//
//
// function hamburgerHandlerPets() {
//     hamburgerPets.classList.toggle('active-line');
//     navPets.classList.toggle('active-menu');
//     document.body.classList.add('body-overlay')
//     if (!(hamburgerPets.classList.contains('active-line'))) {
//         document.body.classList.remove('body-overlay')
//     }
//     navItemPets.forEach(item => {
//         item.addEventListener("click", closeOnClickPets)
//     })
//     document.addEventListener('click', (e) => {
//         const click = e.composedPath().includes(menu);
//         if (!click) {
//             closeOnClickPets()
//         }
//     })
// }
//
// function closeOnClickPets() {
//     hamburgerPets.classList.remove('active-line');
//     navPets.classList.remove('active-menu');
//     document.body.classList.remove('body-overlay')
// }
//
//
// // const getCardsWrapper = () => {
// //     const cardsContainer = document.querySelector('.pets-slider')
// //     cardsContainer.innerHTML = ''
// //     return cardsContainer
// // }
// //
// //
// // const addCardClickHandler = () => {
// //     document.querySelector('.pets-slider').addEventListener('click', (e) => {
// //         if (e.target.closest('.card')) {
// //             document.body.style.overflow = 'hidden';
// //             let clickedCardId = e.target.closest('.card').getAttribute('data-id');
// //             let clickedCardData = getClickedData(clickedCardId);
// //             renderArticleModalWindow(clickedCardData);
// //         }
// //     })
// // }


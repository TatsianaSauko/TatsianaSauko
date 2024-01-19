import { Article } from './js/Article';
import { ArticleModal } from './js/ArticleModal';
// import { Modal } from './js/Modal';
import data from './js/data.js';


window.onload = function () {
    // Render Articles
    console.log("Бесконечная карусель на разных расширениях у меня корректно работает только после перезагрузки страницы либо после двойного нажатия на стрелку.")
    if(data) {
        if (document.querySelector('.header')) {
            renderArticlesToDom()
            moveSliderRight()
            moveSliderLeft()
            // resizeMain()
        }
        if (document.querySelector('.header-pets')) {
            renderArticlesToDomPets()
            scrollForward()
            scrollForwardLast()
            scrollBack()
            scrollBackLast()
            resizePets()
        }
    }

    //Generate Base Modal from Modal Class
    // addToolsClickHandler()

}


const hamburger = document.querySelector('.hamburger');
const hamburgerPets = document.querySelector('.hamburger_pets');
const nav = document.querySelector('.navigation');
const navItem = document.querySelectorAll('.navigation__link')
const menu = document.querySelector('.menu');


if (hamburger) {
    hamburger.addEventListener("click", hamburgerHandler)
}

function hamburgerHandler() {
    hamburger.classList.toggle('active-line');
    nav.classList.toggle('active-menu');
    document.body.classList.add('body-overlay')
    if (!(hamburger.classList.contains('active-line'))) {
        document.body.classList.remove('body-overlay')
    }
    navItem.forEach(item => {
        item.addEventListener("click", closeOnClick)
    })
    document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(menu);
        if (!click) {
            closeOnClick()
        }
    })
}

function closeOnClick() {
    hamburger.classList.remove('active-line');
    nav.classList.remove('active-menu');
    document.body.classList.remove('body-overlay')
}

const renderArticlesToDom = () => {
    let cardsWrapper = getCardsWrapper()
    generateArticles(data).forEach(article => {
        cardsWrapper.append(article.generateArticle())
    })
    lineUpCards()
    addCardClickHandler()
}

const renderArticlesToDomPets = () => {
    let cardsWrapper = getCardsWrapper()

    generateArticlePets(data).forEach(article => {
        cardsWrapper.append(article.generateArticle())
    })

    addCardClickHandler()
}
const getCardsWrapper = () => {
    let cardsContainer = document.querySelector('.our-friends__cards') ?  document.querySelector('.our-friends__cards') : document.querySelector('.pets-slider')
    cardsContainer.innerHTML = ''
    return cardsContainer
}


let articles = [];
let articlesPets = [];
let arrayNum = [];
const generateArticles = (data) => {
    let viewport = document.querySelector('.wrapper-slider').offsetWidth
    let n = 3
    if (viewport > 580) {
        n = 8
    }
    if (viewport > 270 && viewport <= 580) {
        n = 6
    }
    while (articles.length < n) {
        let randomNum = Math.floor(Math.random() * 8)
        if (!(arrayNum.includes(randomNum))) {
            arrayNum.push(randomNum)
            articles.push(new Article(data[randomNum]))
        }
     }
     if (viewport > 580) {
         arrayNum.push(2)
         articles.push(articles[2])
     }
    return articles
}

const generateArticlePets =(data) => {
    let startEnd = getStartEnd()
    let arrayNum = [];
    while (arrayNum.length < 6) {
        let prom = []

        while (prom.length < 8) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 1  && prom.length < 4) {
                let lastNum = arrayNum[0].slice(-2)
                if (!(prom.includes(randomNum)) && !(lastNum.includes(randomNum))) {
                    prom.push(randomNum)
                    articlesPets.push(new Article(data[randomNum]))
                }
            } else if (arrayNum.length === 2  && prom.length < 2) {
                let lastNum = arrayNum[1].slice(-4)
                if (!(prom.includes(randomNum)) && !(lastNum.includes(randomNum))) {
                    prom.push(randomNum)
                    articlesPets.push(new Article(data[randomNum]))
                }
            }else if (arrayNum.length === 4  && prom.length < 4) {
                let lastNum = arrayNum[3].slice(-2)
                if (!(prom.includes(randomNum)) && !(lastNum.includes(randomNum))) {
                    prom.push(randomNum)
                    articlesPets.push(new Article(data[randomNum]))
                }
            }else if (arrayNum.length === 5  && prom.length < 2) {
                let lastNum = arrayNum[4].slice(-4)
                if (!(prom.includes(randomNum)) && !(lastNum.includes(randomNum))) {
                    prom.push(randomNum)
                    articlesPets.push(new Article(data[randomNum]))
                }
            }

            else {
                if (!(prom.includes(randomNum))) {
                    prom.push(randomNum)
                    articlesPets.push(new Article(data[randomNum]))
                }
            }

        }
        arrayNum.push(prom)
    }
    // while (arrayNum.length < 6) {
    //     let prom = []
    //     while (prom.length < 8) {
    //         let randomNum = Math.floor(Math.random() * 8)
    //         if (!(prom.includes(randomNum))) {
    //             prom.push(randomNum)
    //             articlesPets.push(new Article(data[randomNum]))
    //         }
    //     }
    //     arrayNum.push(prom)
    // }

    return articlesPets.slice(startEnd[0], startEnd[1])
}

const prev = document.querySelector('.button-arrow_left')
const next = document.querySelector('.button-arrow_right')

let offset;


const lineUpCards = () => {
    let viewport = document.querySelector('.wrapper-slider').offsetWidth
    let cards = document.querySelectorAll('.card')
    let i = -1;
    offset = 270
    if (viewport > 580) {
        i = -3
        offset = 360
    }
    if (viewport > 270 && viewport <= 580) {
        i = -2
        offset = 310
    }
    cards.forEach(item => {
        item.style.left = i * offset + 'px'
        i++
    })
}

const drawRight = () => {
    let viewport = document.querySelector('.wrapper-slider').offsetWidth
    let cardsContainer = document.querySelector('.our-friends__cards')

    if (viewport > 580) {

        while (arrayNum.length < 9) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 6 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2] && randomNum !== arrayNum[arrayNum.length - 3]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 1080 + 'px'
                cardsContainer.append(newCard)

            }
            if (arrayNum.length === 7 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2] && randomNum !== arrayNum[arrayNum.length - 3] && randomNum !== arrayNum[arrayNum.length - 4]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 1440 + 'px'
                cardsContainer.append(newCard)

            }
            if (arrayNum.length === 8 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2] && randomNum !== arrayNum[arrayNum.length - 3] && randomNum !== arrayNum[arrayNum.length - 4] && randomNum !== arrayNum[arrayNum.length - 5]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 1800 + 'px'
                cardsContainer.append(newCard)

            }
        }

    } else if (viewport > 270 && viewport <= 580) {
        while (arrayNum.length < 6) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 3 && randomNum !== arrayNum[arrayNum.length - 1]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 620 + 'px'
                cardsContainer.append(newCard)
            }
            if (arrayNum.length === 4 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 620 + 'px'
                cardsContainer.append(newCard)
            }
            if (arrayNum.length === 5 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2] && randomNum !== arrayNum[arrayNum.length - 3]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 930 + 'px'
                cardsContainer.append(newCard)
            }

        }
    } else {
        while (arrayNum.length < 3) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 2 && randomNum !== arrayNum[arrayNum.length - 1] && randomNum !== arrayNum[arrayNum.length - 2]) {
                arrayNum.push(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = 270 + 'px'
                cardsContainer.append(newCard)
            }
        }
    }
}

const drawLeft = () => {
    let viewport = document.querySelector('.wrapper-slider').offsetWidth
    let cardsContainer = document.querySelector('.our-friends__cards')

    if (viewport > 580) {
        while (arrayNum.length < 9) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 6 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1] && randomNum !== arrayNum[2]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -360 + 'px'
                cardsContainer.prepend(newCard)
            }
            if (arrayNum.length === 7 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1] && randomNum !== arrayNum[2] && randomNum !== arrayNum[3]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -720 + 'px'
                cardsContainer.prepend(newCard)
            }
            if (arrayNum.length === 8 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1] && randomNum !== arrayNum[2] && randomNum !== arrayNum[3] && randomNum !== arrayNum[4]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -1080 + 'px'
                cardsContainer.prepend(newCard)
            }
        }

    } else if (viewport > 270 && viewport <= 580) {
        while (arrayNum.length < 6) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 4 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -310 + 'px'
                cardsContainer.prepend(newCard)
            }
            if (arrayNum.length === 5 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1] && randomNum !== arrayNum[2]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -620 + 'px'
                cardsContainer.prepend(newCard)
            }
        }
    } else {
        while (arrayNum.length < 3) {
            let randomNum = Math.floor(Math.random() * 8)
            if (arrayNum.length === 2 && randomNum !== arrayNum[0] && randomNum !== arrayNum[1]) {
                arrayNum.unshift(randomNum)
                let newCard = new Article(data[randomNum]).generateArticle()
                newCard.style.left = -270 + 'px'
                cardsContainer.prepend(newCard)
            }
        }
    }
}



const moveSliderRight = () => {
    prev.addEventListener('click', () => {
        let viewport = document.querySelector('.wrapper-slider').offsetWidth
        const cards2 = document.querySelectorAll('.card')
        let j = 0
        offset = 270
        if (viewport > 580) {
            offset = 360
            if (cards2.length < 9) {
                drawRight()
            }
        }
        if (viewport > 270 && viewport <= 580) {
            offset = 310
            if (cards2.length < 9) {
                drawRight()
            }
        }

        for (let i = 0; i < cards2.length; i++) {
            cards2[i].style.left = j * offset + 'px'
            j++
        }
        if (viewport > 580) {
            cards2[cards2.length - 1].remove()
            cards2[cards2.length - 2].remove()
            cards2[cards2.length - 3].remove()
            arrayNum.pop()
            arrayNum.pop()
            arrayNum.pop()
        } else if (viewport > 270 && viewport <= 580) {
            cards2[cards2.length - 1].remove()
            cards2[cards2.length - 2].remove()
            arrayNum.pop()
            arrayNum.pop()
        } else {
            cards2[cards2.length - 1].remove()
            arrayNum.pop()
        }
        drawLeft()
    })

}

const moveSliderLeft = () => {
    next.addEventListener('click', () => {
        let viewport = document.querySelector('.wrapper-slider').offsetWidth
        const cards3 = document.querySelectorAll('.card')
        let j = -2
        offset = 270
        if (viewport > 580) {
            j = -6
            offset = 360
            if (cards3.length < 9) {
                drawRight()
                lineUpCards()
            }
        }
        if (viewport > 270 && viewport <= 580) {
            offset = 310
            j = -4
            if (cards3.length < 6) {
                drawRight()
                lineUpCards()
            }
        }
        for (let i = 0; i < cards3.length; i++) {
            cards3[i].style.left = j * offset + 'px'
            j++
        }
        if (viewport > 580) {
            cards3[0].remove()
            cards3[1].remove()
            cards3[2].remove()
            arrayNum.shift()
            arrayNum.shift()
            arrayNum.shift()
        } else if (viewport > 270 && viewport <= 580) {
            cards3[0].remove()
            cards3[1].remove()
            arrayNum.shift()
            arrayNum.shift()
        } else {
            cards3[0].remove()
            arrayNum.shift()
        }
        drawRight()
    })

}


// const addToolsClickHandler = () => {
//     if (document.querySelector('.tel-in-addition')) {
//         document.querySelector('.tel-in-addition').addEventListener('click', () => {
//             generateToolsModal()
//         })
//     } else {
//         document.querySelector('.button-paginator_active').addEventListener('click', () => {
//             generateToolsModal()
//         })
//     }
//
// }

// const generateToolsModal = () => {
//     renderModalWindow("Test content for Tools Modal")
//
// }


// const renderModalWindow = (content) => {
//     let modal = new Modal('tools-modal')
//     modal.buildModal(content)
// }


const addCardClickHandler = () => {
    if (document.querySelector('.our-friends__cards')) {
        document.querySelector('.our-friends__cards').addEventListener('click', (e) => {
            if (e.target.closest('.card')) {
                document.body.style.overflow = 'hidden';
                let clickedCardId = e.target.closest('.card').getAttribute('data-id');
                let clickedCardData = getClickedData(clickedCardId);
                renderArticleModalWindow(clickedCardData);
            }
        })
    }else {
        document.querySelector('.pets-slider').addEventListener('click', (e) => {
            if (e.target.closest('.card')) {
                document.body.style.overflow = 'hidden';
                let clickedCardId = e.target.closest('.card').getAttribute('data-id');
                let clickedCardData = getClickedData(clickedCardId);
                renderArticleModalWindow(clickedCardData);
            }
        })
    }


}


const getClickedData = (id) => {
    return data.find(article => article.id === id)
}

const renderArticleModalWindow = (article) => {
    let modal =  new ArticleModal ('article-modal', article);
    modal.renderModal();
}



//Pets
const navPets = document.querySelector('.navigation_pets');
const navItemPets = document.querySelectorAll('.navigation-pets__link')


if (hamburgerPets) {
    hamburgerPets.addEventListener("click", hamburgerHandlerPets)
}


function hamburgerHandlerPets() {
    hamburgerPets.classList.toggle('active-line');
    navPets.classList.toggle('active-menu');
    document.body.classList.add('body-overlay')
    if (!(hamburgerPets.classList.contains('active-line'))) {
        document.body.classList.remove('body-overlay')
    }
    navItemPets.forEach(item => {
        item.addEventListener("click", closeOnClickPets)
    })
    document.addEventListener('click', (e) => {
        const click = e.composedPath().includes(menu);
        if (!click) {
            closeOnClickPets()
        }
    })
}

function closeOnClickPets() {
    hamburgerPets.classList.remove('active-line');
    navPets.classList.remove('active-menu');
    document.body.classList.remove('body-overlay')
}


const getStartEnd = () => {
    let widthPets = document.querySelector('.header-pets').offsetWidth
    let cardsOnPages = 3
    if (widthPets > 1260) {
        cardsOnPages = 8
    }
    if (widthPets > 640 && widthPets <=1260) {
        cardsOnPages = 6
    }
    let pageNumber = document.querySelector('.button-paginator_active').innerHTML
    let start = (+pageNumber - 1) * cardsOnPages
    let end = start + cardsOnPages
    return [start, end]
}

const checkPageRightLast = () => {
    let pageNumber = +document.querySelector('.button-paginator_active').innerHTML
    let widthPets = document.querySelector('.header-pets').offsetWidth
    if (widthPets > 1260 && pageNumber === 5) {
        makeButtonsRightInactive()
    }
    if (widthPets > 640 && widthPets <= 1260 && pageNumber === 7) {
        makeButtonsRightInactive()
    }
    if (widthPets <= 640 && pageNumber === 15) {
        makeButtonsRightInactive()
    }
    showPagePaginator()
}

const makeButtonsRightInactive = () => {
    pageRightLastActive.classList.add('inactive')
    pageRightActive.classList.add('inactive')
    pageRightLastInactive.classList.remove('inactive')
    pageRightInactive.classList.remove('inactive')
}

let pageLeftLastInactive = document.querySelector('.button-paginator_inactive-left-last')
let pageLeftLastActive = document.querySelector('.button-paginator_active-left-last')
let pageLeftInactive = document.querySelector('.button-paginator_inactive-left')
let pageLeftActive = document.querySelector('.button-paginator_active-left')
let pageRightActive = document.querySelector('.button-paginator_active-right')
let pageRightInactive = document.querySelector('.button-paginator_inactive-right')
let pageRightLastActive = document.querySelector('.button-paginator_active-right-last')
let pageRightLastInactive = document.querySelector('.button-paginator_inactive-right-last')


const scrollForward = () =>{
    pageRightActive.addEventListener('click', () =>{
        makeButtonsLeftActive()
        checkPageRightLast()
        let btnPageNumber = document.querySelector('.button-paginator_active')
        let pageNumber = +btnPageNumber.innerHTML
        btnPageNumber.innerHTML = `${pageNumber + 1}`
        showPagePaginator()
    })
}

const makeButtonsLeftActive = () => {
    if (!(pageLeftLastInactive.classList.contains('inactive'))) {
        pageLeftLastInactive.classList.add('inactive')
    }
    pageLeftLastActive.classList.remove('inactive')
    if (!(pageLeftInactive.classList.contains('inactive'))) {
        pageLeftInactive.classList.add('inactive')
    }
    pageLeftActive.classList.remove('inactive')
}
const showPagePaginator = () => {
    let startEnd = getStartEnd()
    let cardsWrapper = getCardsWrapper()
    let articleSlice = articlesPets.slice(startEnd[0], startEnd[1])
    articleSlice.forEach(article => {
        cardsWrapper.append(article.generateArticle())
    })
    checkPageLast()
    checkNumberOfPages()


}

const checkNumberOfPages = () => {
    let pageNumber = +document.querySelector('.button-paginator_active').innerHTML
    let widthPets = document.querySelector('.header-pets').offsetWidth
    if (widthPets > 1260 && pageNumber === 6) {
        makeButtonsRightInactive()
    }
    if (widthPets > 640 && widthPets <= 1260 && pageNumber === 6) {
        makeButtonsRightActive()
    }
    if (widthPets > 640 && widthPets <= 1260 && pageNumber === 8) {
        makeButtonsRightInactive()
    }
    if (widthPets <= 640 && pageNumber === 8) {
        makeButtonsRightActive()
    }

}

const checkPageLast = () => {
    let widthPets = document.querySelector('.header-pets').offsetWidth
    let pageNumber = document.querySelector('.button-paginator_active')
    let cardsWrapper = document.querySelector('.pets-slider')
    if (cardsWrapper.innerHTML === '') {
        pageNumber.innerHTML = '16'
        if (widthPets > 1260) {
            pageNumber.innerHTML = '6'
        }
        if (widthPets > 640 && widthPets <= 1260) {
            pageNumber.innerHTML = '8'
        }
        showPagePaginator()
        makeButtonsRightInactive()
    }
}

const scrollForwardLast = () => {
    pageRightLastActive.addEventListener('click', () =>{
        let widthPets = document.querySelector('.header-pets').offsetWidth
        let pageNumber = document.querySelector('.button-paginator_active')
        pageNumber.innerHTML = '16'
        if (widthPets > 1260) {
            pageNumber.innerHTML = '6'
        }
        if (widthPets > 640 && widthPets <= 1260) {
            pageNumber.innerHTML = '8'
        }
        showPagePaginator()
        makeButtonsRightInactive()
        makeButtonsLeftActive()


    })
}

const scrollBack = () =>{
    pageLeftActive.addEventListener('click', () =>{
        makeButtonsRightActive()
        checkPageLeftLast()
        let btnPageNumber = document.querySelector('.button-paginator_active')
        let pageNumber = +btnPageNumber.innerHTML
        btnPageNumber.innerHTML = `${pageNumber - 1}`
        showPagePaginator()
        makeButtonsRightActive()
    })

}

const makeButtonsRightActive = () => {
    if (!(pageRightLastInactive.classList.contains('inactive'))) {
        pageRightLastInactive.classList.add('inactive')
    }
    pageRightLastActive.classList.remove('inactive')
    if (!(pageRightInactive.classList.contains('inactive'))) {
        pageRightInactive.classList.add('inactive')
    }
    pageRightActive.classList.remove('inactive')
}

const checkPageLeftLast = () => {
    let pageNumber = +document.querySelector('.button-paginator_active').innerHTML
    if (pageNumber === 2) {
        makeButtonsLeftInactive()
    }
    showPagePaginator()
}

const makeButtonsLeftInactive = () => {
    pageLeftLastInactive.classList.remove('inactive')
    pageLeftLastActive.classList.add('inactive')
    pageLeftInactive.classList.remove('inactive')
    pageLeftActive.classList.add('inactive')
}

const scrollBackLast = () => {
    pageLeftLastActive.addEventListener('click', () =>{
        let pageNumber = document.querySelector('.button-paginator_active')
        pageNumber.innerHTML = '1'
        showPagePaginator()
        makeButtonsLeftInactive()
        makeButtonsRightActive()
    })
}

const resizePets = () => {
    window.addEventListener('resize', () =>{
        showPagePaginator()

    })
}


// const resizeMain = () => {
//     window.addEventListener('resize', () =>{
//         let viewport = document.querySelector('.wrapper-slider').offsetWidth
//         if (viewport === 580 || viewport === 270 || viewport === 1220) {
//             location.reload()
//         }
//     })
// }
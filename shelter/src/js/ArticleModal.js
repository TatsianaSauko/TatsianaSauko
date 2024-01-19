import {Modal} from "./Modal";

export class ArticleModal extends Modal {
    constructor(classes, {id, name, img, type, breed, description, age, inoculations, diseases, parasites }) {
        super(classes);
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }
    // Article Modal generator
    generateContent() {
        let template = '';
        let article = document.createElement('div');
        article.className = 'article-modal__content';

        this.img &&
        (template += `<img class="pets-card" src=${this.img} alt="card">`)
        if (this.name || this.type || this.breed || this.description || this.age || this.inoculations || this.diseases || this.parasites) {
            template += `<div class="card__content">`
            template += `<div class="card__title">${this.name}</div>`
            template += `<h3 class="card__subtitle">${this.type}</h3>`
            template += `<div class="card__text">${this.description}</div>`
            template += `<ul class="card__list">`
            template += `<li><span class="marker"></span><span class="list__name">Age: </span>${this.age}</li>`
            template += `<li><span class="marker"></span><span class="list__name">Inoculations: </span>${this.inoculations}</li>`
            template += `<li><span class="marker"></span><span class="list__name">Diseases: </span>${this.diseases}</li>`
            template += `<li><span class="marker"></span><span class="list__name">Parasites: </span>${this.parasites}</li>`
            template += `</ul>`
            template += `</div>`
        }

        article.innerHTML = template;
        return article;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
    }
}
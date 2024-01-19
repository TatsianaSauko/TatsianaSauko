export class Article {
    constructor({ id, name, img, ...rest }) {
        this.id = id;
        this.name = name;
        this.img = img;
    }

    // Article generator
    generateArticle() {
        let template = '';
        let article = document.createElement('article');
        article.className = 'card';
        article.setAttribute('data-id', this.id);
        this.img &&
        (template += `<img class="pets-card" src=${this.img} alt="card">`)
        if (this.name) {
            template += `<div class="card__title">${this.name}</div>`
        }
        template += `<button class="button button_bordered">Learn more</button>`
        article.innerHTML = template;
        return article;
    }

}

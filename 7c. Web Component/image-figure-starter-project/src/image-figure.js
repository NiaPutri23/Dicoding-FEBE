class ImageFigure extends HTMLElement{
    constructor() {
        super();

        this.render(); //untuk render kon

        // this.innerHTML = 'Halo, saya image-figure';
    }
    render() {
        this.innerHTML = 
        <figure>
            <img src="src/logo-g.jpg" alt="Dicoding Logo g" width="200"></img>
            <figcaption>Huruf g dalam logo Dicoding</figcaption>
        </figure>
    }
}

customElements.define('image-figure', ImageFigure); //daftarin dengan method customElement.define
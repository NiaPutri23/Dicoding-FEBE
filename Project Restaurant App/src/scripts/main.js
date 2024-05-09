function main() {
  const restaurants = [
      {
        id: "6c7bqjgi84kcowlqdz",
        name: "Bring Your Phone Cafe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/41",
        city: "Medan",
        rating: 4.6,
      },
      {
        id: "ljx8i0qu2uckcowlqdz",
        name: "Run The Gun",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/07",
        city: "Bali",
        rating: 4.6,
      },
      {
        id: "fe8bbxoazddkcowlqdz",
        name: "Pangsit Express",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/29",
        city: "Ternate",
        rating: 4.8,
      },
      {
        id: "ik1zljmlf68kcowlqdz",
        name: "Ducky Duck",
        description:
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/38",
        city: "Malang",
        rating: 4.7,
      },
      {
        id: "9jpuzkm6n6jkcowlqdz",
        name: "Kafein",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/40",
        city: "Bali",
        rating: 3.8,
      },
      {
        id: "cpl5jpsnuqkkcowlqdz",
        name: "Makan mudah",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/08",
        city: "Malang",
        rating: 4.6,
      },
      {
        id: "iqtf9hmdzvbkcowlqdz",
        name: "Saya Suka",
        description:
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/32",
        city: "Surabaya",
        rating: 3.6,
      },
      {
        id: "8i06gqcc2dpkcowlqdz",
        name: "Gigitan Cepat",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/45",
        city: "Aceh",
        rating: 4,
      },
      {
        id: "wf5o19xhxxkcowlqdz",
        name: "Fairy Cafe",
        description:
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
        pictureId: "https://restaurant-api.dicoding.dev/images/medium/04",
        city: "Malang",
        rating: 3.9,
      },
  ]

  console.log(restaurants);

  class RestoCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    set data(value) {
      this._data = value;
      this.render()
    }

    get data() {
      return this._data;
    }

    render(){
      const template = document.createElement("template");
      template.innerHTML = `
                <style>
                .resto-card {
                  max-width: 300px;
                  min-width: 200px;
                  border: 1px solid grey;
                  border-radius: 10px;
                  background-color: white;
                }
                
                .resto-card *{
                  margin: 0;
                }
                
                .resto-card .pict {
                  width: 100%;
                  height: 220px;
                  object-fit: cover;
                  border-radius: 10px 10px 0 0;
                }
                
                .city-rating {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 15px 25px 0 12px; 
                }
                
                .city,
                .rating {
                  display: flex;
                  align-items: center;
                }
                
                .city p,
                .rating p{
                  margin-left: 7px;
                }
                
                .name {
                  margin: 10px 15px 0 15px;
                }
                
                .desc{
                  margin: 10px 15px 25px 15px;
                }
                
                .resto-card .desc p {
                  line-height: 1.2;
                  height: 6em; 
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                @media (max-width: 600px){
                  .resto-card{
                    width: 200px;
                  }

                  .resto-card .pict{
                    width: 100%;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 10px 10px 0 0;
                  
                  }
                }

                @media (max-width: 250px){
                  .resto-card {
                    width: 100vw;
                    max-width: 200px;
                    min-width: 20px;
                    border: 1px solid grey;
                    border-radius: 10px;
                    background-color: white;
                    margin: 5px auto;
                  }
                  
                  .resto-card .pict {
                    display: none;
                  }
                  
                  .city-rating {
                    display: block;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 5vw 0px 0vw 5vw; 
                  }
                  
                  .city,
                  .rating {
                    display: flex;
                    align-items: center;
                  }

                  .city svg,
                  .rating svg{
                    width: 6vw;
                  }

                  .city p,
                  .rating p{
                    font-size: 6vw;
                  }
                  
                  .name {
                    font-size: 8vw;
                    margin: 3vw 5vw 5vw 5vw;
                  }
                  
                  .desc{
                    display: none;
                  }
                }
                </style>
                <div class="resto-card">
                    <img class="pict" src=${this.data.pictureId} alt=${this.data.name} />
                    <div class="city-rating">
                        <div class="city">
                        <svg aria-label="kota" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="none" />
                            <path fill="#1e1e1e"
                            d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
                        </svg>
                        <p>${this.data.city}</p>
                        </div>
                        <div class="rating">
                        <svg aria-label="rating" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="none" />
                            <path fill="#ffc700"
                            d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z" />
                        </svg>
                        <p>${this.data.rating}</p>
                        </div>
                    </div>
                    <h3 class="name">${this.data.name}</h3>
                    <div class="desc">
                        <p>${this.data.description}</p>
                    </div>
                    </div>
            `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  customElements.define("resto-card", RestoCard);

  //append ke div resto gallery
  const restoGallery = document.getElementById("resto-gallery");
  restoGallery.innerHTML = ''
  console.log(restoGallery)
  restaurants.forEach(resto => {
    const restocard = new RestoCard();
    restocard.data = {
      pictureId: resto.pictureId,
      city: resto.city,
      rating: resto.rating,
      name: resto.name,
      description: resto.description
    };
   
    restoGallery.appendChild(restocard);
  });

  document.addEventListener('DOMContentLoaded', function () {
    const openNav = document.querySelector('.open-button');
    const closeNav = document.querySelector('.close-button');
    const navbar = document.querySelector('.navbar');

    openNav.addEventListener('click', function () {
      navbar.classList.add('active');
    })

    closeNav.addEventListener('click', function () {
      navbar.classList.remove('active')
    })
  })
}

module.exports = main;

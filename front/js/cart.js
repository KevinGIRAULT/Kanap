// const cartItemsElement = document.getElementById("cart__items");
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");

let object = {
    urlOfProduct: null,
    altTexte: null,
    nameOfProduct: null,
    priceOfProduct: null,
};

// function unePromesse() {
//     return new Promise((htmlElementsGeneration) => {
//         if (getProduct) {
//             console.log(getProduct);
//             htmlElementsGeneration();
//         }
//     });
// }

// promise = unePromesse();
// promise.then(htmlElementsGeneration);

function getProduct(itemId /*price, alt, name, url*/) {
    fetch("http://localhost:3000/api/products/" + itemId)
        .then((result) => result.json())
        .then((product) => {
            console.log(product);
            object.urlOfProduct = product.imageUrl;
            object.altTexte = product.altTxt;
            object.nameOfProduct = product.name;
            object.priceOfProduct = product.price;
        })
        .catch((error) => console.log(error));
}

function htmlElementsGeneration() {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    let html = "";
    itemsFromLocalStorage.forEach((item) => {
        getProduct(item.id);
        console.log(object.urlOfProduct);
        html += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${object.urlOfProduct}" alt="${object.altTexte}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${object.nameOfProduct}</h2>
            <p>${item.color}</p>
            <p>${object.priceOfProduct},00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${item.quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

        document.getElementById("cart__items").innerHTML = html;

        console.log(item);
    });
}

htmlElementsGeneration();

// const cartItemsElement = document.getElementById("cart__items");
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");

let product = {
    urlOfProduct: null,
    altTexte: null,
    nameOfProduct: null,
    priceOfProduct: null,
};

async function getProduct(itemId) {
    try {
        const returnedProduct = await (
            await fetch("http://localhost:3000/api/products/" + itemId)
        ).json();
        product.urlOfProduct = returnedProduct.imageUrl;
        product.altTexte = returnedProduct.altTxt;
        product.nameOfProduct = returnedProduct.name;
        product.priceOfProduct = returnedProduct.price;
    } catch (error) {
        console.log(error);
    }
}

async function htmlElementsGeneration() {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    let html = "";

    for (const item of itemsFromLocalStorage) {
        insertQuantity(itemsFromLocalStorage);
        
        // let additionPrice = 0;
        // additionPrice += product.priceOfProduct
        // totalPriceElement.textContent = additionPrice;

        await getProduct(item.id);
        html += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${product.urlOfProduct}" alt="${product.altTexte}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.nameOfProduct}</h2>
            <p>${item.color}</p>
            <p>${product.priceOfProduct},00 €</p>
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
    }
}

htmlElementsGeneration();

function insertQuantity(itemsFromLocalStorage) {
    let additionQuantity = 0;
    itemsFromLocalStorage.forEach((element) => {
        additionQuantity += element.quantity;
    });
    totalQuantityElement.textContent = additionQuantity;
}
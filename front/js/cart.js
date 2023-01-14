// fetch("http://localhost:3000/api/products/product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1")


// const cartItemsElement = document.getElementById("cart__items");
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");

function getProduct(itemId) {
    fetch("http://localhost:3000/api/products/" + itemId)
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((product) => {
        // let html = "";
        // products.forEach((product) => {
        //     console.log(product);
        // });
    })
    .catch((error) => {
        console.log(error);
    });

}

function htmlElementsGeneration() {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    let html = "";
    itemsFromLocalStorage.forEach((item) => {
        html += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${/*l'url du produit ayant l'id correspondant à celui de l'item*/}" alt="${/*altTxt du produit ayant l'id correspondant à cleui de l'item*/}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${/*Nom du produit ayant l'id correspondant à celui de l'item */}</h2>
            <p>${item.color}</p>
            <p>${/*prix du produit ayant l'id correspondant à celui de l'item*/},00 €</p>
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
      </article>`

        document.getElementById("cart__items").innerHTML = html;
        
        console.log(item);
    });
}

htmlElementsGeneration();
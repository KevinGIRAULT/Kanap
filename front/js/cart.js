// // for ( let [key, value] of Object.entries(localStorage)) {
// //     console.log(key, value);
// // }

// const cartItemsElement = document.getElementById("cart__items");
// const totalQuantityElement = document.getElementById("totalQuantity");
// const totalPriceElement = document.getElementById("totalPrice");
// const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");

// let productObject;

// function aReflechir() {
 
//     let html = "";
//     for (let index = 0; index < localStorage.length; index++) {
//         let key = localStorage.key(index);
//         let value = localStorage.getItem(key);
//         let idOfProduct = JSON.parse(value).id;
//         let colorOfProduct = JSON.parse(value).color;
//         let quantityOfProduct = JSON.parse(value).quantity;

//         /* Pour compléter le HTML, obtenir le tableau issu de l'API. Le transformer en tableau d'objets.
//         Pour chaque objet, inclure dans le html ce qu'il faut*/
//         html += `<article class="cart__item" data-id="${idOfProduct}" data-color="${colorOfProduct}">
//     <div class="cart__item__img">
//       <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__description">
//         <h2>${productObject._id}</h2>
//         <p>${colorOfProduct}</p>
//         <p>42,00 €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : ${quantityOfProduct} </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityOfProduct}">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>
//     </article>`;
//     }
//     cartItemsElement.innerHTML = html;
// }

fetch("http://localhost:3000/api/products/product.html?id=415b7cacb65d43b2b5c1ff70f3393ad1")
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((products) => {
        let html = "";
        products.forEach((product) => {
            console.log(product);
        });
    })
    .catch((error) => {
        console.log(error);
    });    

// aReflechir();

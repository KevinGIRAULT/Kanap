/* Fait :
Quand je clique sur le bouton "Ajouter au panier", un tableau situé dans cart.js se remplie des informations présentes sur la page

Pour cela, par étape :
- remplir, depuis la page product, le localStorage les informations ajoutées via le bouton "ajouter au panier" présent sur la page product



À faire ici :
- les récupérer ici depuis le localstorage et les mettres dans un objet
-
*/

// for ( let [key, value] of Object.entries(localStorage)) {
//     console.log(key, value);
// }

for (let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index);
    let value = localStorage.getItem(key);
    console.log(key, value);

    
}



const cartItemsElement = document.getElementById("cart__items");
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");

cartItemsElement.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;

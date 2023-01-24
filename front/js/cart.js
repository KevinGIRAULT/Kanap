const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
const firstNameErrorMsgElement = document.getElementById("firstNameErrorMsg");
let addedUpPrices = 0;

let product = {
    urlOfProduct: null,
    altTexte: null,
    nameOfProduct: null,
    priceOfProduct: null,
};

async function htmlElementsGeneration() {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    let html = "";
    insertQuantity(itemsFromLocalStorage);
    // for..of instead forEach wich is not designed for asynchronous code
    // look https://gist.github.com/joeytwiddle/37d2085425c049629b80956d3c618971
    for (const item of itemsFromLocalStorage) {
        await getProductFromAPI(item.id);
        addingUpPricesForTotal(product, item);

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
    totalPriceElement.textContent = addedUpPrices;
    deleteAnItem();
}

htmlElementsGeneration();

document.getElementById("order").addEventListener("click", () => {
    changeQuantity();
});

async function getProductFromAPI(itemId) {
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

function insertQuantity(itemsFromLocalStorage) {
    let additionQuantity = 0;
    itemsFromLocalStorage.forEach((element) => {
        additionQuantity += element.quantity;
    });
    totalQuantityElement.textContent = additionQuantity;
}

function addingUpPricesForTotal(product, anItem) {
    addedUpPrices += product.priceOfProduct * anItem.quantity;
}

function changeQuantity() {
    let itemQuantityElements = document.getElementsByClassName("itemQuantity");
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

    let index = 0;
    for (const itemQuantityElement of itemQuantityElements) {
        index++;
        console.log(index);
        itemsFromLocalStorage[index - 1].quantity = parseInt(
            itemQuantityElement.value
        );
        console.log("quantity : " + itemsFromLocalStorage[index - 1].quantity);
    }
    console.log(itemsFromLocalStorage);
    localStorage.setItem("cart", JSON.stringify(itemsFromLocalStorage));
    addedUpPrices = 0;
    htmlElementsGeneration();
}

function deleteAnItem() {
    deleteButtons = document.getElementsByClassName("deleteItem");
    console.log(deleteButtons);
    for (const OneDeleteButton of deleteButtons) {
        OneDeleteButton.addEventListener("click", () => {
            console.log(OneDeleteButton.closest("article").dataset.id);

            const itemsFromLS = JSON.parse(localStorage.getItem("cart"));

            i = itemsFromLS.findIndex((element) => {
                return (
                    element.id ===
                        OneDeleteButton.closest("article").dataset.id &&
                    element.color ===
                        OneDeleteButton.closest("article").dataset.color
                );
            });
            itemsFromLS.splice(i, 1);
            console.log(itemsFromLS);
            localStorage.setItem("cart", JSON.stringify(itemsFromLS));
            OneDeleteButton.closest("article").style.display = "none";
            /* Recharge la page pour que la somme totale soit bien affichée. Une meilleure solution peut être trouvée... Si nécessaire (tant que ça passe pour la soutenance 😁 car le temps presse) */
            location.reload();

            // const filteredItems = itemsFromLS.filter(
            //     (element) =>
            //         !(
            //             element.id ===
            //                 OneDeleteButton.closest("article").dataset.id &&
            //             element.color ===
            //                 OneDeleteButton.closest("article").dataset.color
            //         )
            // );
            // localStorage.setItem("cart", JSON.stringify(filteredItems));
        });
    }
}

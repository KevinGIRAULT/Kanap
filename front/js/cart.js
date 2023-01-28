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
    // let sum = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        item.addEventListener("input", function () {
            changeQuantity();
        });
    });
}

htmlElementsGeneration();

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
        console.log(itemQuantityElement.value);
        itemsFromLocalStorage[index - 1].quantity = parseInt(
            itemQuantityElement.value
        );
        console.log("quantity : " + itemsFromLocalStorage[index - 1].quantity);
    }
    console.log(itemsFromLocalStorage);
    localStorage.setItem("cart", JSON.stringify(itemsFromLocalStorage));
    let sum = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        sum +=
            parseInt(item.value) *
            parseInt(
                item
                    .closest(".cart__item__content")
                    .querySelector("p:last-child").textContent
            );
    });


    let totalQuantityAll = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        item.previousElementSibling.textContent = "Qté : " + item.value;
        totalQuantityAll +=
            parseInt(item.value)
    });


    totalQuantityElement.textContent = totalQuantityAll;
    totalPriceElement.textContent = sum;
}

function deleteAnItem() {
    deleteButtons = document.getElementsByClassName("deleteItem");
    for (const OneDeleteButton of deleteButtons) {
        OneDeleteButton.addEventListener("click", () => {
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
            localStorage.setItem("cart", JSON.stringify(itemsFromLS));
            OneDeleteButton.closest("article").style.display = "none";
        });
    }
}

// function manageForm() {
//     /* This regEx follow the official standard RFC 5322. From https://emailregex.com/ (POSIX norme) and adapted for JavaScript (ECMAScript norme) */
//     const regexEmail =
//         /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
//     console.log(regexEmail);
// }

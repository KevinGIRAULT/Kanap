import {
    regexEmail,
    regexFirstName,
    regexLastName,
    regexAddressLine,
    regexCity,
} from "./regex.js";

const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");
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
    if (itemsFromLocalStorage !== null) {
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
    }


    deleteAnItem();

    document.querySelectorAll(".itemQuantity").forEach((item) => {
        console.log(item);
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
    let itemsFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    let itemQuantityElements = document.getElementsByClassName("itemQuantity");

    let index = 0;
    for (const itemQuantityElement of itemQuantityElements) {
        if (itemsFromLocalStorage[index]) {
            itemsFromLocalStorage[index].quantity = parseInt(
                itemQuantityElement.value
            );
            index++;
            localStorage.setItem("cart", JSON.stringify(itemsFromLocalStorage));
        }
    }

    let sum = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        if (verifyInputOfQuantity(item)) {
            console.log("good");
            sum +=
                parseInt(item.value) *
                parseInt(
                    item
                        .closest(".cart__item__content")
                        .querySelector("p:last-child").textContent
                );
            location.reload();
        } else {
            alert("Rentrez un nombre en 1 et 100");
            location.reload();
        }
    });

    let totalQuantityAll = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        item.previousElementSibling.textContent = "Qté : " + item.value;
        totalQuantityAll += parseInt(item.value);
    });

    totalQuantityElement.textContent = totalQuantityAll;
    totalPriceElement.textContent = sum;
}

function deleteAnItem() {
    const deleteButtons = document.getElementsByClassName("deleteItem");
    for (const oneDeleteButton of deleteButtons) {
        oneDeleteButton.addEventListener("click", () => {
            const itemsFromLS = JSON.parse(localStorage.getItem("cart"));

            const indexOfItemToDelete = itemsFromLS.findIndex((element) => {
                return (
                    element.id ===
                        oneDeleteButton.closest("article").dataset.id &&
                    element.color ===
                        oneDeleteButton.closest("article").dataset.color
                );
            });
            itemsFromLS.splice(indexOfItemToDelete, 1);
            localStorage.setItem("cart", JSON.stringify(itemsFromLS));
            oneDeleteButton.closest("article").style.display = "none";

            let totalQuantity = 0;
            let totalPrice = 0;
            let itemPrice = 0;
            if (JSON.parse(localStorage.getItem("cart")).length > 0) {
                JSON.parse(localStorage.getItem("cart")).forEach((element) => {
                    getProductFromAPI(element.id).then(() => {
                        totalQuantity += element.quantity;
                        itemPrice = product.priceOfProduct;
                        totalPrice += itemPrice * element.quantity;
                        document.getElementById("totalQuantity").textContent =
                            totalQuantity;
                        document.getElementById("totalPrice").textContent =
                            totalPrice;
                    });
                });
            } else {
                document.getElementById("totalQuantity").textContent = 0;
                document.getElementById("totalPrice").textContent = 0;
            }
        });
    }
}

function verifyInputOfQuantity(InputObject) {
    return (
        InputObject.value >= 1 &&
        InputObject.value <= 100 &&
        InputObject.value !== "" &&
        InputObject.value !== undefined
    );
}

const contact = {
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    email: null,
};

function manageForm() {
    const label = document.querySelector('label[for="city"]');
    label.textContent = "Code postal et ville";

    document.getElementById("firstName").addEventListener("input", (event) => {
        if (regexFirstName.test(event.target.value)) {
            console.log("good : " + event.target.value);
            contact.firstName = event.target.value;
            document.getElementById("firstNameErrorMsg").textContent = "";
        } else {
            document.getElementById("firstNameErrorMsg").textContent =
                "Le prénom est incorrect";
        }
    });

    document.getElementById("lastName").addEventListener("input", (event) => {
        if (regexLastName.test(event.target.value)) {
            console.log("good : " + event.target.value);
            contact.lastName = event.target.value;
            document.getElementById("lastNameErrorMsg").textContent = "";
        } else {
            document.getElementById("lastNameErrorMsg").textContent =
                "Le nom de famille est incorrect";
        }
    });

    document.getElementById("address").addEventListener("input", (event) => {
        if (regexAddressLine.test(event.target.value)) {
            console.log("good : " + event.target.value);
            contact.address = event.target.value;
            document.getElementById("addressErrorMsg").textContent = "";
        } else {
            document.getElementById("addressErrorMsg").textContent =
                "Le numéro et/ou le nom de la rue est/sont incorrect(s)";
        }
    });

    document.getElementById("email").addEventListener("input", (event) => {
        if (regexEmail.test(event.target.value)) {
            console.log("good : " + event.target.value);
            contact.email = event.target.value;
            document.getElementById("emailErrorMsg").textContent = "";
        } else {
            document.getElementById("emailErrorMsg").textContent =
                "L'adresse courriel que vous avez saisie est incorrecte";
        }
    });

    document.getElementById("city").addEventListener("input", (event) => {
        if (regexCity.test(event.target.value)) {
            console.log("good : " + event.target.value);
            contact.city = event.target.value;
            document.getElementById("cityErrorMsg").textContent = "";
        } else {
            document.getElementById("cityErrorMsg").textContent =
                "Il y a une erreur dans votre code postal ou votre ville";
        }
    });
}

document.getElementById("order").addEventListener("click", (event) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
        alert("Ajoutez des produits aux panier");
    } else {
        event.preventDefault();
        ordering();
    }
});


manageForm();

function ordering() {
    if (
        regexCity.test(document.getElementById("city").value) &&
        regexEmail.test(document.getElementById("email").value) &&
        regexAddressLine.test(document.getElementById("address").value) &&
        regexLastName.test(document.getElementById("lastName").value) &&
        regexFirstName.test(document.getElementById("firstName").value)
    ) {
        (() => {
            contact.firstName = document.getElementById("firstName").value;
            contact.lastName = document.getElementById("lastName").value;
            contact.address = document.getElementById("address").value;
            contact.email = document.getElementById("email").value;
            contact.city = document.getElementById("city").value;
        })();

        const body = {
            contact: { ...contact },
            products: JSON.parse(localStorage.getItem("cart")).map(
                ({ id }) => id
            ),
        };
        console.log(body);
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data.orderId);
                window.location.assign(
                    "./confirmation.html?id=" + data.orderId
                );
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation: ",
                    error
                );
            });
        localStorage.clear();
    } else {
        alert("vérifier les champs");
    }
}
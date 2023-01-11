const urlSearchParams = new URLSearchParams(window.location.search);
const idProduct = urlSearchParams.get("id");
let nameOfProduct;

fetch("http://localhost:3000/api/products/" + idProduct)
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((product) => {
        nameOfProduct = product.name;

        document.querySelector(
            ".item__img"
        ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.getElementById("title").textContent = product.name;
        document.getElementById("description").textContent =
            product.description;
        document.getElementById("price").textContent = product.price;

        const colorOptionsString = product.colors.forEach((color) => {
            let colour = "";
            colour = `<option value="${color}">${color}</option>`;
            const selectElement = (document.querySelector(
                "#colors"
            ).innerHTML += colour);
        });
    })
    .catch(() => {
        console.log(error);
    });

let cart = [];
let productObject;

document.getElementById("addToCart").addEventListener("click", () => {
    const quantityElement = parseInt(document.getElementById("quantity").value);
    const colorsValue = document.getElementById("colors").value;

    productObject = {
        quantity: quantityElement,
        color: colorsValue,
        id: idProduct,
    };

    if (verifyLegalityUserInput(quantityElement, colorsValue)) {
        checkIfProductAlreadyInCart(productObject);
    } else {
        alert("Faites vos choix");
    }
});

function verifyLegalityUserInput(aQuantity, aColor) {
    return (
        aQuantity >= 1 &&
        aQuantity <= 100 &&
        aColor !== "" &&
        aColor !== undefined
    );
}

function checkIfProductAlreadyInCart(anObjectToPushInCart) {
    const cartGettedFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

    if (cartGettedFromLocalStorage === null) {
        cart.push(anObjectToPushInCart);
        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Le produit est ajouté au panier vide");
    } else {
        productIsInCartYet(anObjectToPushInCart, cartGettedFromLocalStorage);
    }
}

function productIsInCartYet(anObjetToCompare, anObjectGettedFromLocalStorage) {
    console.log(anObjectGettedFromLocalStorage);
    const returnedObject = anObjectGettedFromLocalStorage.find(
        (anObjectToReturn) => {
            return (
                anObjectToReturn.id === anObjetToCompare.id &&
                anObjectToReturn.color === anObjetToCompare.color
            );
        }
    );
    if (returnedObject === undefined) {
        console.log(" L'objet retourné est : " + returnedObject);
        cart.push(anObjetToCompare);
        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Le produit est ajouté au panier");
    } else {
        anObjetToCompare.quantity += returnedObject.quantity;
        // cart.push(anObjetToCompare);
        cart.splice(, , anObjetToCompare);
        console.log(cart);
        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Le produit est ajouté au panier");
    }
}

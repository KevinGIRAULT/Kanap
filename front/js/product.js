// This function extracts the query parameters from the current URL and saves the "id" value to a constant variable.
const urlSearchParams = new URLSearchParams(window.location.search);
const idProduct = urlSearchParams.get("id");

// This function retrieves product data from an API and populates the page with the data using DOM manipulation.
fetch("http://localhost:3000/api/products/" + idProduct)
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((product) => {
        // This code sets the image of the product on the webpage using the fetched data
        document.querySelector(
            ".item__img"
        ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
            // This code sets the title, description, and price of the product on the webpage using the fetched data
        document.getElementById("title").textContent = product.name;
        document.getElementById("description").textContent =
            product.description;
        document.getElementById("price").textContent = product.price;

    // This function creates an HTML option element for each color of the product and appends it to the color dropdown menu.
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

// Adds a listener to the "Add to Cart" button and calls the "checkIfProductAlreadyInCart" function if user input is valid
document.getElementById("addToCart").addEventListener("click", () => {
    const quantityElement = parseInt(document.getElementById("quantity").value);
    const colorsValue = document.getElementById("colors").value;
    console.log(quantityElement);

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

// This function verifies if the user input for quantity and color is legal
function verifyLegalityUserInput(aQuantity, aColor) {
    return (
        aQuantity >= 1 &&
        aQuantity <= 100 &&
        aColor !== "" &&
        aColor !== undefined
    );
}

// This function checks if the product is already in the cart and calls other functions accordingly
function checkIfProductAlreadyInCart(anObjectToPushInCart) {
    const cartGettedFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

        // This code pushes the product object into the cart and stores the cart in local storage
    if (cartGettedFromLocalStorage === null) {
        cart.push(anObjectToPushInCart);
        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Le produit est ajouté au panier vide");
        cart = [];
    } else {
        productIsInCartYet(anObjectToPushInCart, cartGettedFromLocalStorage);
    }
}

// This function checks if the product is already in the cart and updates the quantity accordingly
function productIsInCartYet(
    anObjetToCompare,
    anObjectsArrayGettedFromLocalStorage
) {
    const returnedObjectFromLocalStorage = anObjectsArrayGettedFromLocalStorage.find(
        (anObjectToReturn) => {
            return (
                anObjectToReturn.id === anObjetToCompare.id &&
                anObjectToReturn.color === anObjetToCompare.color
            );
        }
    );
    if (returnedObjectFromLocalStorage === undefined) {
        cart = [...anObjectsArrayGettedFromLocalStorage];
        cart.push(anObjetToCompare);
        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Le produit est ajouté au panier");
        cart = [];
    } else {
        anObjectsArrayGettedFromLocalStorage;
                const index = anObjectsArrayGettedFromLocalStorage.findIndex((anIndexToReturn) => {
            return (
                anIndexToReturn.id === anObjetToCompare.id &&
                anIndexToReturn.color === anObjetToCompare.color
            );
        });
        anObjectsArrayGettedFromLocalStorage[index].quantity += anObjetToCompare.quantity;
        cart = [...anObjectsArrayGettedFromLocalStorage];

        cartToString = JSON.stringify(cart);
        localStorage.setItem("cart", cartToString);
        alert("Ajout supplémentaire du produit au panier effectué");
        cart = [];
    }
}

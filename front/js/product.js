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
        nameOfProduct = product.name

        document.querySelector(
            ".item__img"
        ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
        document.getElementById("title").textContent =
            product.name;
        document.getElementById("description").textContent =
            product.description;
        document.getElementById("price").textContent =
            product.price;

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

let cart = {
    id: "",
    quantity: "",
    color: "",
};

function putInArray() {
    document.getElementById("quantity").addEventListener("input", (event) => {
        cart.quantity = event.target.value;
    });

    document.getElementById("colors").addEventListener("input", (event) => {
        cart.color = event.target.value;
    });

    cart.id = new URLSearchParams(window.location.search).get("id");
    console.log(cart.id);
}

putInArray();

function checkIfProductAlreadyInCart() {
    if (localStorage.getItem(nameOfProduct + "_" + cart.color) !== null) {
        let productFromLocalStorage = localStorage.getItem(nameOfProduct + "_" + cart.color);
        let toJSON = JSON.parse(productFromLocalStorage);

        if (toJSON.id === cart.id && toJSON.color === cart.color) {
            cart.quantity = +cart.quantity + +toJSON.quantity;
        }
    }
}

document.getElementById("addToCart").addEventListener("click", () => {
    if (
        cart.quantity <= 100 &&
        cart.quantity > 0 &&
        cart.color !== undefined &&
        cart.color !== ""
    ) {
        checkIfProductAlreadyInCart();
        const cartInString = JSON.stringify(cart);
        localStorage.setItem(nameOfProduct + "_" + cart.color, cartInString);
        alert("l'ajout au panier est bien pris en compte");
    } else {
        alert("Faites vos choix");
    }
});
let nameOfProduct;

fetch("http://localhost:3000/api/products")
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((arrayOfProducts) => {
        const searchParams = new URLSearchParams(window.location.search);
        const idProduct = searchParams.get("id");

        const objectProduct = arrayOfProducts.findIndex(function (element) {
            return element._id === idProduct;
        });

        function productGeneratedInPageFromAPI() {
            if (idProduct === searchParams.get("id")) {
                nameOfProduct = arrayOfProducts[objectProduct].name;

                document.querySelector(
                    ".item__img"
                ).innerHTML = `<img src="${arrayOfProducts[objectProduct].imageUrl}" alt="${arrayOfProducts[objectProduct].altTxt}">`;
                document.getElementById("title").textContent =
                    arrayOfProducts[objectProduct].name;
                document.getElementById("description").textContent =
                    arrayOfProducts[objectProduct].description;
                document.getElementById("price").textContent =
                    arrayOfProducts[objectProduct].price;

                const colorOptionsString = arrayOfProducts[
                    objectProduct
                ].colors.forEach((color) => {
                    let colour = "";
                    colour = `<option value="${color}">${color}</option>`;
                    const selectElement = (document.querySelector(
                        "#colors"
                    ).innerHTML += colour);
                });
            }
        }

        productGeneratedInPageFromAPI();
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

function CheckIfProductAlreadyInCart() {
    if (localStorage.getItem(nameOfProduct + "_" + cart.color) !== null) {
        let productFromLocalStorage = localStorage.getItem(nameOfProduct + "_" + cart.color);
        let toJSON = JSON.parse(productFromLocalStorage);

        if (toJSON.id === cart.id && toJSON.color === cart.color) {
            console.log("valeur :" + toJSON.id);
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
        CheckIfProductAlreadyInCart();
        const cartInString = JSON.stringify(cart);
        console.log(nameOfProduct);
        localStorage.setItem(nameOfProduct + "_" + cart.color, cartInString);
        alert("l'ajout au panier est bien pris en compte");
    } else {
        alert("Faites vos choix");
    }
});
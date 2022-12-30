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

        if (idProduct === searchParams.get("id")) {
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
    })
    .catch(() => {
        console.log(error);
    });

let cart = [
    {
        id: "",
        quantity: "",
        color: "",
    },
];

function putInArray() {
    document.getElementById("quantity").addEventListener("input", (event) => {
        cart.quantity = event.target.value;
    });

    document.getElementById("colors").addEventListener("input", (event) => {
        cart.color = event.target.value;
    });

    cart.id = new URLSearchParams(window.location.search).get("id");
}

putInArray();

document.getElementById("addToCart").addEventListener("click", () => {
    // const regexOnlyNumberBetween0AND100 = /^(?:100|[1-9][0-9]?)$/;

    if (
        // regexOnlyNumberBetween0AND100.test(cart.quantity) &&
        // cart.color !== undefined &&
        // cart.color !== ""
        cart.quantity <= 100 && cart.quantity > 0
    ) {
        const cartInString = JSON.stringify(cart);
        localStorage.setItem("autonoé", cartInString);
        alert("l'ajout au panier est bien pris en compte");
    } else {
        alert("Faites vos choix");
    }
});

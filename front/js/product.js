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

let cart = [];

function putInArray() {
    let obj = {
        id: "",
        quantity: "",
        color: "",
    };
    document.getElementById("quantity").addEventListener("input", (event) => {
        obj.quantity = event.target.value;
        console.log(obj.quantity);
        
    });

    document.getElementById("colors").addEventListener("input", (event) => {
        obj.color = event.target.value;
    });

    obj.id = new URLSearchParams(window.location.search).get("id");

    cart.push(obj);
}

putInArray();

// function checkIfProductAlreadyInCart() {
//     if () {
//         // si le local storage est différent de nul

//     }

//     for (let i = 0; i < cart.length; i++) {
//         if (cart[i].nameOfProduct === nameOfProduct && cart[i].color === cart.color) {
//             cart[i].quantity = +cart[i].quantity + +cart.quantity;
//             // return;
//         }
//     }
//     cart.push({nameOfProduct: nameOfProduct, color: cart.color, quantity: cart.quantity});
// }

function checkIfProductAlreadyInCart() {

    if (localStorage.getItem("cart") !== null) {
        let stringCart = localStorage.getItem("cart");
        let arrayCart = JSON.parse(stringCart);


        const index = arrayCart.findIndex(function(item) {
            return item.color === cart[0].color && item.id === cart[0].id;
          });

        // SI la couleur et l'ID de ce qu'on ajoute au panier correspondent à ceux déjà présents dans le panier
        if (cart[0].color === arrayCart[index].color && cart[0].id === arrayCart[index].id ) {
            cart[0].quantity = +cart[0].quantity + +arrayCart[index].quantity;
        }
        // Alors incrémenter la quantité
          
        // let productFromLocalStorage = localStorage.getItem(nameOfProduct + "_" + cart.color);
        // let toJSON = JSON.parse(productFromLocalStorage);

        // if (toJSON.id === cart.id && toJSON.color === cart.color) {
        //     cart.quantity = +cart.quantity + +toJSON.quantity;
        // }
    }
}


document.getElementById("addToCart").addEventListener("click", () => {
    if (
        cart[0].quantity <= 100 &&
        cart[0].quantity > 0 &&
        cart[0].color !== undefined &&
        cart[0].color !== ""
    ) {
        checkIfProductAlreadyInCart();
        const cartInString = JSON.stringify(cart);
        console.log(cartInString);
        localStorage.setItem("cart", cartInString);
        alert("l'ajout au panier est bien pris en compte");
    } else {
        alert("Faites vos choix");
    }
});
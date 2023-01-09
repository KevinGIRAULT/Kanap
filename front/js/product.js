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
/**/

// let cart = [];
// let obj;

// function putInArray() {
//     obj = {
//         id: "",
//         quantity: "",
//         color: "",
//     };
//     document.getElementById("quantity").addEventListener("input", (event) => {
//         obj.quantity = event.target.value;
//         console.log("objet quantity : " + obj.quantity);
//     });

//     document.getElementById("colors").addEventListener("input", (event) => {
//         obj.color = event.target.value;
//         console.log("objet color : " + obj.color);
//     });

//     obj.id = new URLSearchParams(window.location.search).get("id");

//     cart.push(obj);
// }

// putInArray();

// function ifProductAlreadyInCart() {
//     if (localStorage.getItem("cart") !== null) {
//         const itemObtained = localStorage.getItem("cart");
//         const itemJSON = JSON.parse(itemObtained);

//         const index = itemJSON.findIndex(function (item) {
//             return item.color === cart[0].color && item.id === cart[0].id;
//         });
//         console.log(index);

//         //
//         if (index !== -1) {
//             if (
//                 cart[0].id === itemJSON[index].id &&
//                 cart[0].color === itemJSON[index].color
//             ) {
//                 cart[0].quantity =
//                     +cart[0].quantity + +itemJSON[index].quantity;
//             }
//         } else {
//             console.log("dans le else");
//             cart = cart.concat(itemJSON);
//         }
//     }
// }

// document.getElementById("addToCart").addEventListener("click", () => {
//     if (
//         cart[0].quantity <= 100 &&
//         cart[0].quantity > 0 &&
//         cart[0].color !== undefined &&
//         cart[0].color !== ""
//     ) {
//         ifProductAlreadyInCart();
//         const cartInString = JSON.stringify(cart);
//         localStorage.setItem("cart", cartInString);
//         alert("L'ajout au panier est bien pris en compte");
//         cart[0].quantity = 1;
//         document.getElementById("quantity").value = 1;
//         const selectElement = document.getElementById("colors");
//         selectElement.selectedIndex = 0;
//     } else {
//         alert("Faites vos choix");
//     }
// });

let cart = [];

document.getElementById("addToCart").addEventListener("click", () => {
    const quantityElement = document.getElementById("quantity").value;
    const colorsValue = document.getElementById("colors").value;

    productObject = {
        quantity: quantityElement,
        color: colorsValue,
        id: idProduct,
    };

    if (verifyLegalityUserInput(quantityElement, colorsValue)) {
        checkIfProductAlreadyInCart(productObject);
        // cart.push(productObject);
        console.log(cart);
    } else {
        console.log("Faites vos choix");
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
    }
}

function ProductIsInCartYet() {
    const index = cartGettedFromLocalStorage.find((objet) => {
        // Retourner l'objet qui a le même id et la même couleur que ce qui est ajouté
        return
    });
}

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
        itemsFromLocalStorage[index - 1].quantity = parseInt(
            itemQuantityElement.value
        );
    }
    localStorage.setItem("cart", JSON.stringify(itemsFromLocalStorage));

    let sum = 0;
    document.querySelectorAll(".itemQuantity").forEach((item) => {
        if (verifyInputOfQuantity(item)) {
            console.log("good");
        } else {
            alert("Rentrez un nombre en 1 et 100");
        }
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
        totalQuantityAll += parseInt(item.value);
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

function verifyInputOfQuantity(InputObject) {
    return (
        InputObject.value >= 1 &&
        InputObject.value <= 100 &&
        InputObject.value !== "" &&
        InputObject.value !== undefined
    );
}

function manageForm() {
    const label = document.querySelector('label[for="city"]');
    label.textContent = "Code postal et ville";

    /* This regEx follow the official standard RFC 5322. From https://emailregex.com/ (POSIX norme) and adapted for JavaScript (ECMAScript norme) */
    const regexEmail =
        /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    /* Pattern de regexFirstName : 
        For the 1st letter : 
- the 26 letters of the alphabet used in the French language in upper case,
- 15 letters with diacritical marks in capital letters (À Â Ä Ç É È Ê Ë Î Ï Ô Ö Ù Û Ü),
- 2 ligatures in capital letters (Æ Œ).
        For the following :
- the 26 letters of the alphabet used in the French language in lower case,
- 15 letters with diacritical marks in lower case (à â ä ç é ê ë î ï ô ö ù û ü),
- 2 lowercase ligatures (æ, œ)
- the apostrophe, the hyphen without space before and after (mandatory for compound names)
- The space
- The capital letter is required for the first letter of the second word of the compound name */
    const regexFirstName =
        /^[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+((?:-|\s)[A-Z][a-zàâäçéèêëîïôöùûüæœ']+)*$/;

    /* regexLastName, unlike regexFirstName, accepts fully capitalized names and does not accept hyphens for compound names */
    const regexLastName =
        /^(([A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+)(\s[A-ZÀÂÄÇÉÈÊËÎÏÔÖÙÛÜÆŒ][a-zàâäçéèêëîïôöùûüæœ']+)*|([A-Z]+)(\s[A-Z]+)*)$/;

    /* Only for number and name of street, not city and postal code */
    const regexAddressLine =
        /^\d+\s(?:rue|avenue|boulevard|impasse|place|allée)\s(du|de la)\s\w+(\s\w+)*$/i;

    regexCity = /^\d{5}\s\w+$/;

    document.getElementById("firstName").addEventListener("input", (event) => {
        if (regexFirstName.test(event.target.value)) {
            console.log("good : " + event.target.value);
            document.getElementById("firstNameErrorMsg").textContent = "";
        } else {
            document.getElementById("firstNameErrorMsg").textContent =
                "Le prénom est incorrect";
        }
    });

    document.getElementById("lastName").addEventListener("input", (event) => {
        if (regexLastName.test(event.target.value)) {
            console.log("good : " + event.target.value);
            document.getElementById("lastNameErrorMsg").textContent = "";
        } else {
            document.getElementById("lastNameErrorMsg").textContent =
                "Le nom de famille est incorrect";
        }
    });

    document.getElementById("address").addEventListener("input", (event) => {
        if (regexAddressLine.test(event.target.value)) {
            console.log("good : " + event.target.value);
            document.getElementById("addressErrorMsg").textContent = "";
        } else {
            document.getElementById("addressErrorMsg").textContent =
                "Le numéro et/ou le nom de la rue est/sont incorrect(s)";
        }
    });

    document.getElementById("email").addEventListener("input", (event) => {
        if (regexEmail.test(event.target.value)) {
            console.log("good : " + event.target.value);
            document.getElementById("emailErrorMsg").textContent = "";
        } else {
            document.getElementById("emailErrorMsg").textContent =
                "L'adresse courriel que vous avez saisie est incorrecte";
        }
    });

    document.getElementById("city").addEventListener("input", (event) => {
        if (regexCity.test(event.target.value)) {
            console.log("good : " + event.target.value);
            document.getElementById("cityErrorMsg").textContent = "";
        } else {
            document.getElementById("cityErrorMsg").textContent =
                "L'adresse courriel que vous avez saisie est incorrecte";
        }
    });

    // For v2
    // document.getElementById("city").addEventListener("input", event => getCityFromAPI(event.target.value));
}

manageForm();

async function getCityFromAPI(input) {
    try {
        await (await fetch("https://geo.api.gouv.fr/communes"))
            .json()
            .then((cities) => {
                let relatedCities = cities
                    .filter((city) =>
                        city.nom.toLowerCase().includes(input.toLowerCase())
                    )
                    .map((city) => city.nom);
                console.log(relatedCities);
                const selectElementOfCities = document.createElement("select");

                document.getElementById(
                    "city"
                ).previousElementSibling.innerHTML = "";

                document
                    .getElementById("city")
                    .previousElementSibling.appendChild(selectElementOfCities);
                relatedCities.forEach((relatedCity) => {
                    const option = document.createElement("option");
                    option.textContent = relatedCity;
                    selectElementOfCities.appendChild(option);
                    console.log(relatedCity);
                });
            });
    } catch (error) {
        console.log(error);
    }
}

/*  Exhaustive list of lane types in France, according to the Ministry of the Interior : https://gist.github.com/384400/bf3c83a4e7d1aa66a87e */
// Pour une v2
// const regExvoies = /^\(agglomération|abbaye|aire|aires|allée|allées|ancien chemin|ancienne route|anciennes routes|anciens chemins|anse|arcade|arcades|autoroute|avenue|barriere|barrieres|bas chemin|bastide|bastion|beguinage|béguinages|berge|berges|bois|boucle|boulevard|bourg|butte|cale|camp|campagne|camping|carre|carreau|carrefour|carrière|carrières|castel|cavée|central|centre|centre commercial|chalet|chapelle|charmille|château|chaussée|chaussées|chemin|chemin vicinal|cheminement|cheminements|chemins|chemins vicinaux|chez|cite|cites|cloître|clos|col|colline|collines|contour|corniche|corniches|cote|côteau|cottage|cottages|cour|cours|darse|degré|degrés|descente|descentes|digue|digues|domaine|domaines|écluse|écluses|église|enceinte|enclave|enclos|escalier|escaliers|espace|esplanade|esplanades|étang|faubourg|ferme|fermes|fontaine|fort|forum|fosse|fosses|foyer|galerie|galeries|gare|garenne|grand boulevard|grand ensemble|grand rue|grande rue|grandes rues|grands ensembles|grille|grimpette|groupe|groupement|groupes|halle|halles|hameau|hameaux|haut chemin|hauts chemins|hippodrome|hlm|île|immeuble|immeubles|impasse|impasses|jardin|jardins|jetee|jetees|levée|lieu dit|lotissement|lotissements|mail|maison forestière|manoir|marche|marches|mas|métro|montée|montees|moulin|moulins|musée|nouvelle route|palais|parc|parcs|parking|parvis|passage|passage à niveau|passe|passerelle|passerelles|passes|patio|pavillon|pavillons|péripherique|péristyle|petit chemin|petite allée|petite avenue|petite impasse|petite route|petite rue|petites allées|place|placis|plage|plages|plaine|plan|plateau|plateaux|pointe|pont|ponts|porche|port|porte|portique|portiques|poterne|pourtour|pré|presqu'île|promenade|quai|quartier|raccourci|raidillon|rampe|rempart|résidence|r/;

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

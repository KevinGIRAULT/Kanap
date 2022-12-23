fetch("http://localhost:3000/api/products")
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((product) => {
        const searchParams = new URLSearchParams(window.location.search);
        console.log("searchParams vaut : " + searchParams);
        const idProduct = searchParams.get("id");
        console.log("idproduct vaut " + idProduct);
        const objectProduct = product.findIndex((element) => {
            element === idProduct;
            return idProduct;
        });
        console.log(product[objectProduct].imageUrl);
        console.log("objectProduct vaut " + objectProduct);
        if (idProduct === searchParams.get("id")) {
            document.querySelector(
                ".item__img"
            ).innerHTML = `<img src="${product[objectProduct].imageUrl}" alt="${product[objectProduct].altTxt}">`;

            document.getElementById("title").textContent =
                product[objectProduct].name;
            document.getElementById("description").textContent =
                product[objectProduct].description;
            document.getElementById("price").textContent =
                product[objectProduct].price;


            const selectElement = document.querySelector("select")
            const optionElement = document.createElement("option"); 
            optionElement.setAttribute("value", "test");
            selectElement.appendChild(optionElement);
        }
    });

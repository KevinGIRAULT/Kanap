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

        const objectProduct = product.findIndex(function(element) {
            // Dans findIndex (et find), il y a un if implicite. Il teste si chaque element._id vaut idProduct et quand c'est le cas, il le dit à findIndex. Alors, findIndex fait un return DE L'INDEX de l'élément dans le tableau (et non pas un true or false comme on pourrait le croire)
            return element._id == idProduct
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

            // console.log(product[1]["colors"]);
            // function loop() {
            //     for (let i = 0; i < product.length; i++) {
            //         optionElement.setAttribute("value", product[i].colors);
            //         optionElement.textContent = product[i].colors;
            //     }
            // }
            const selectElement = document.querySelector("select");
            const optionElement = document.createElement("option");
            optionElement.setAttribute("value", product[objectProduct].colors);
            optionElement.textContent = product[objectProduct].colors;
            selectElement.appendChild(optionElement);
        }
    });

fetch("http://localhost:3000/api/products")
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
    })
    .then((products) => {
        let html = "";
        products.forEach((product) => {
            const homeLink = "./";
            html += `<a href="${homeLink}product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
        });
        document.querySelector("#items").innerHTML = html;
    })
    .catch((error) => {
        console.log(error);
    });    
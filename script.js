const token = "TOKEN NON FUNZIONANTE";

// Funzione per chiamata fetch su prodotti da visualizzare in frontpage

async function fetchProducts() {
    try {
      console.log("chiamata fetchProducts effettuata");
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Chiamata fetch fallita");
      }
  
      const products = await response.json();
      const productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";
  
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <img src="${product.imageUrl}" alt="${product.name}">
            <p>Price: ${product.price}</p>
            <a href="product.html?id=${product._id}">View Product</a>
        `;
        productsDiv.appendChild(productElement);
      });
  
    } catch (error) {
      console.error(error);
    }
  }


// fetchProducts();

// Funzione per chiamata fetch e visualizzazione dettagli prodotto

async function fetchProductDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log("Product ID:", productId);

    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response ricevuta:", response);

    if (!response.ok) {
      throw new Error("Impossibile rilevare dettagli prodotti con la fetch");
    }

    const product = await response.json();
    console.log("Product details:", product);

    const productDiv = document.getElementById("product");
    productDiv.innerHTML = `
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <img src="${product.imageUrl}" alt="${product.name}">
          <p>Price: ${product.price}</p>
      `;
    console.log("I dettagli dei prodotti si vedono correttamente");
  } catch (error) {
    console.error(error);
    alert("Non è stato possibile rilevare i prodotti con la chiamata fetch");
  }
}

fetchProductDetails();

// Funzione per form submit
async function addProduct(event) {
  try {
    event.preventDefault();
    console.log("Form PREVENT");

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());
    console.log("Product data:", productData);

    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(productData),
      }
    );
    console.log("Response ricevuta:", response);

    if (response.ok) {
      alert("Prodotto aggiunto con successo!");
      event.target.reset();
      console.log("Form reset");
    } else {
      throw new Error("Errore di inserimento prodotto");
    }
  } catch (error) {
    console.error(error);
    alert("Errore di inserimento prodotto");
  }
}

// Event listener per il form
const productForm = document.getElementById("productForm");
if (productForm) {
  productForm.addEventListener("submit", addProduct);
  console.log("Event listener aggiunto al form");
}

// Chiamata della funzione corretta basata sulla pagina in uso
if (window.location.pathname === "/product.html") {
  fetchProductDetails();
  console.log("Fetching dettagli prodotto per la pagina product.html");
} else {
  fetchProducts();
  console.log("Fetching prodotti per altre pagine");
}

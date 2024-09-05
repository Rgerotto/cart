document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelector(".section-cart");
  const navLink = document.querySelector(".nav-link");
  const mainContainer = document.querySelector(".main-container");

  navLink.addEventListener("click", () => {
    cart.classList.toggle("visible");
    if (cart.classList.contains("visible")) {
      mainContainer.style.width = "80%";
    } else {
      mainContainer.style.width = "100%";
    }
  });

  fetch('/products')
    .then(response => response.json())
    .then(shoppingCart => {
      //console.log("client side", shoppingCart);
      displayContainer(shoppingCart);
      listOfProducts(shoppingCart); // Populate the admin table dynamically
    })
    .catch(error => console.log(error)); // Fixed typo here
});

const container = document.getElementsByClassName("section-display")[0];
const containerCart = document.getElementsByClassName("section-cart")[0];
const notificationElement = document.querySelector('.item');

let cartItems = [];

function displayContainer(shoppingCart) {
  shoppingCart.forEach((product) => {
    const card = document.createElement("div");
    const img = document.createElement("img");
    const productName = document.createElement("p");
    const description = document.createElement("p");
    const price = document.createElement("p");
    const buy = document.createElement("div");
    const btnBuy = document.createElement("button");

    card.classList.add("card");
    img.classList.add("img-card");
    productName.classList.add("name");
    description.classList.add("description");
    price.classList.add("price");
    buy.classList.add("buy");
    btnBuy.classList.add("btn-add");

    img.src = product.imageUrl;
    img.alt = product.name;
    productName.textContent = product.name;
    description.textContent = product.description;
    let priceProduct = product.price.toString();
    let lastTwo = priceProduct.slice(-2);
    let mainPrice = priceProduct.slice(0, -2);
    let formmatedPrice = `${mainPrice},${lastTwo}`;
    price.textContent = formmatedPrice;
    btnBuy.textContent = "buy";

    btnBuy.addEventListener("click", () => {
      addToCart(product);
      updateNotification();
    });

    card.appendChild(img);
    card.appendChild(productName);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(buy);
    buy.appendChild(btnBuy);

    container.appendChild(card);
  });
}

function addToCart(product) {
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  cartContainer(cartItems);
}

function cartContainer(items) {
  containerCart.innerHTML = '';

  let subtitle = containerCart.querySelector('.h2');

  if (!subtitle) {
    subtitle = document.createElement('h2');
    subtitle.classList.add('h2');
    subtitle.innerText = "Your Cart";
    containerCart.appendChild(subtitle);
  }

  items.forEach((product) => {
    const cart = document.createElement("div");
    const imgCart = document.createElement("img");
    const productNameCart = document.createElement("p");
    const priceCart = document.createElement("p");
    const trash = document.createElement("p");

    cart.classList.add("cart");
    imgCart.classList.add("img-cart");
    productNameCart.classList.add("name-cart");
    priceCart.classList.add("price-cart");
    trash.classList.add("trash-cart");

    imgCart.src = product.imageUrl;
    imgCart.alt = product.name;
    productNameCart.textContent = `${product.name} (x${product.quantity})`;
    
    /* fommated Price */

    let price = product.price.toString();
    let priceTwoCharacter = price.slice(-2);
    let mainPrice = price.slice(0, -2)
    let formmatedPrice = `${mainPrice},${priceTwoCharacter}`
    priceCart.textContent = formmatedPrice;
    trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trash.addEventListener('click', () => {
      removeFromCart(product);
      updateNotification();
    });

    cart.appendChild(imgCart);
    cart.appendChild(productNameCart);
    cart.appendChild(priceCart);
    cart.appendChild(trash);

    containerCart.appendChild(cart);
  });

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let priceTotal = totalPrice.toString();
  let twoCharacterTotalPrice = priceTotal.slice(-2);
  let mainTotalPrice = priceTotal.slice(0, -2);
  let formattedTotalPrice = `${mainTotalPrice},${twoCharacterTotalPrice}`
  const priceFinal = formattedTotalPrice;
  let total = containerCart.querySelector('.h3');

  if (!total) {
    total = document.createElement('h3');
    total.classList.add('h3');
    containerCart.appendChild(total);
  }
  total.innerText = `Total: $${formattedTotalPrice}`;

  containerCart.appendChild(total);
}

function removeFromCart(product) {
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingProductIndex !== -1) {
    if (cartItems[existingProductIndex].quantity > 1) {
      cartItems[existingProductIndex].quantity -= 1;
    } else {
      cartItems.splice(existingProductIndex, 1);
    }
  }
  cartContainer(cartItems);
  updateNotification();
}

function updateNotification() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  notificationElement.textContent = totalItems;
}

/* SECTION ADMIN PAGE */
function listOfProducts() {
  // Fetch products from the server/database
  fetch('/products')
    .then(response => response.json())
    .then(products => {
      // Select the table body
      const section = document.querySelector('.list-of-products');
      let tBody = document.querySelector('tbody');

      // If tbody does not exist, create it
      if (!tBody) {
        tBody = document.createElement('tbody');
        tBody.classList.add('tbody-tr');
        section.appendChild(tBody);
      }

      // Clear existing rows
      tBody.innerHTML = '';

      // Loop through the products and create table rows
      products.forEach(product => {
        const tBodyTR = document.createElement('tr');

        const imageTD = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.imageUrl; // Assuming you have an image URL in the product data
        img.alt = product.name;
        img.style.width = '50px'; // Set a fixed width for the image
        imageTD.appendChild(img);

        const nameTD = document.createElement('td');
        nameTD.innerText = product.name;
        nameTD.classList.add('tbody-td');

        const descriptionTD = document.createElement('td');
        descriptionTD.innerText = product.description;
        descriptionTD.classList.add('tbody-td');
        
        const priceTD = document.createElement('td');
        let price = product.price.toString();
        let lastTwo = price.slice(-2);
        let mainPart = price.slice(0, -2);
        const formmatedPrice = `${mainPart},${lastTwo}`;
        priceTD.innerText = `$${formmatedPrice}`;
        priceTD.classList.add('tbody-td');

        const actionTD = document.createElement('td');
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', () => {
          console.log("teste", product.id)
          deleteProduct(product.id);
        });
        actionTD.appendChild(trashIcon);
        actionTD.innerHTML += '<span class="td"> | </span>';
        actionTD.innerHTML += '<i class="fa-solid fa-pen"></i>'
        actionTD.classList.add('tbody-td');

        // Append cells to the row
        tBodyTR.appendChild(imageTD);
        tBodyTR.appendChild(nameTD);
        tBodyTR.appendChild(descriptionTD);
        tBodyTR.appendChild(priceTD);
        tBodyTR.appendChild(actionTD);

        // Append row to the tbody
        tBody.appendChild(tBodyTR);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
}
function deleteProduct(productId){
  fetch(`/product/${productId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if(response.ok) {
      alert('Product delete seccessfully!');
      listOfProducts();
    }
    else{
      alert('Failed to delete product.')
    }
  })
  .catch(error => console.error('Error deleting product:', error))
}
// Call the function to populate the table when the page loads
listOfProducts();
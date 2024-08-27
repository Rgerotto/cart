/* responsive menu */
const hamburguer = document.querySelector(".hamburguer");
const navMenu = document.querySelector(".nav-menu");

hamburguer.addEventListener("click", () => {
  hamburguer.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburguer.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

const shoppingCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 1,
    imageUrl: "../assets/img/products/bluetooth-headphones.jpg",
    description:
      "High-quality over-ear headphones with noise-cancellation and up to 20 hours of battery life.",
  },
  {
    id: 2,
    name: "Men's Leather Wallet",
    price: 29.99,
    quantity: 2,
    imageUrl: "../assets/img/products//leather-wallet.jpg",
    description:
      "Elegant and durable leather wallet with multiple card slots and a secure coin pouch.",
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 149.99,
    quantity: 1,
    imageUrl: "../assets/img/products//smartwatch.jpg",
    description:
      "Feature-rich smartwatch with heart rate monitor, GPS, and customizable watch faces.",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    quantity: 1,
    imageUrl: "../assets/img/products//running-shoes.jpg",
    description:
      "Lightweight and comfortable running shoes with breathable mesh and superior cushioning.",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 39.99,
    quantity: 1,
    imageUrl: "../assets/img/products//gaming-mouse.jpg",
    description:
      "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    price: 24.99,
    quantity: 1,
    imageUrl: "../assets/img/products//desk-lamp.jpg",
    description:
      "Adjustable LED desk lamp with touch controls and different brightness levels.",
  },
  {
    id: 7,
    name: "Wireless Charger",
    price: 19.99,
    quantity: 3,
    imageUrl: "../assets/img/products//wireless-charger.jpg",
    description:
      "Fast wireless charger compatible with all Qi-enabled devices.",
  },
  {
    id: 8,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 1,
    imageUrl: "../assets/img/products/bluetooth-headphones.jpg",
    description:
      "High-quality over-ear headphones with noise-cancellation and up to 20 hours of battery life.",
  },
  {
    id: 9,
    name: "Men's Leather Wallet",
    price: 29.99,
    quantity: 2,
    imageUrl: "../assets/img/products//leather-wallet.jpg",
    description:
      "Elegant and durable leather wallet with multiple card slots and a secure coin pouch.",
  },
  {
    id: 10,
    name: "Smartwatch",
    price: 149.99,
    quantity: 1,
    imageUrl: "../assets/img/products//smartwatch.jpg",
    description:
      "Feature-rich smartwatch with heart rate monitor, GPS, and customizable watch faces.",
  },
  {
    id: 11,
    name: "Running Shoes",
    price: 89.99,
    quantity: 1,
    imageUrl: "../assets/img/products//running-shoes.jpg",
    description:
      "Lightweight and comfortable running shoes with breathable mesh and superior cushioning.",
  },
  {
    id: 12,
    name: "Gaming Mouse",
    price: 39.99,
    quantity: 1,
    imageUrl: "../assets/img/products//gaming-mouse.jpg",
    description:
      "Ergonomic gaming mouse with customizable buttons and RGB lighting.",
  },
  {
    id: 13,
    name: "LED Desk Lamp",
    price: 24.99,
    quantity: 1,
    imageUrl: "../assets/img/products//desk-lamp.jpg",
    description:
      "Adjustable LED desk lamp with touch controls and different brightness levels.",
  },
  {
    id: 14,
    name: "Wireless Charger",
    price: 19.99,
    quantity: 3,
    imageUrl: "../assets/img/products//wireless-charger.jpg",
    description:
      "Fast wireless charger compatible with all Qi-enabled devices.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelector(".section-cart");
  const navLink = document.querySelector(".nav-link");
  const mainContainer = document.querySelector(".main-container");

  // Add event listener to the nav-link
  navLink.addEventListener("click", () => {
    cart.classList.toggle("visible");
    if (cart.classList.contains("visible")) {
      mainContainer.style.width = "80%"; // Adjust width of main-container
    } else {
      mainContainer.style.width = "100%"; // Reset width of main-container
    }
  });

  displayContainer();

});

const container = document.getElementsByClassName("section-display")[0];
const containerCart = document.getElementsByClassName("section-cart")[0];

let cartItems = [] //Array to keep track of added items

function displayContainer() {
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
    price.textContent = `$ ${product.price.toFixed(2)}`;
    btnBuy.textContent = "buy";

    btnBuy.addEventListener("click", () => {
      addToCart(product)
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
    if(existingProductIndex !== -1){
        cartItems[existingProductIndex].quantity += 1;
    }
    else{
        cartItems.push({...product, quantity: 1 });
    }

    cartContainer(cartItems)
}

function cartContainer(items) {

    containerCart.innerHTML = '';

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
    priceCart.textContent = `$ ${(product.price * product.quantity).toFixed(2)}`;
    trash.innerHTML = '<i class="fa-solid fa-trash"></i>';

  trash.addEventListener('click', () => {
    removeFromCart(product)
  })

  cart.appendChild(imgCart);
  cart.appendChild(productNameCart);
  cart.appendChild(priceCart);
  cart.appendChild(trash);

  containerCart.appendChild(cart);

})
}

function removeFromCart(product) {
    cartItems = cartItems.filter(item => item.id !== product.id);

    cartContainer(cartItems)
}

displayContainer();
cartContainer();

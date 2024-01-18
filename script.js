// Get all thumbnails and hero images
let thumbnails = document.querySelectorAll(".thumbnail");
let images = document.querySelectorAll(".image");

// Add click event listener to each thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", function () {
    // Change the src of all images to match the clicked thumbnail
    images.forEach((image) => {
      image.src = thumbnail.src.replace("-thumbnail", "");
    });
  });
});

//Opens bigger image
let bigImage = document.querySelector(".imageCarousel");

function enlarge() {
  console.log("CLICKED");
  let hidden = document.querySelector(".hiddenContent");
  if (hidden.style.display === "none") {
    hidden.style.display = "flex";
    hidden.style.visibility = "visible";
  } else {
    hidden.style.display = "none";
    hidden.style.visibility = "hidden";
  }
}

bigImage.addEventListener("click", enlarge);

// Previous, next, and close
window.onload = function () {
  let currentImageIndex = 0;
  const hiddenImages = Array.from(document.querySelectorAll(".hiddenImage"));
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail1"));

  function updateImage() {
    hiddenImages.forEach((img, index) => {
      img.style.display = index === currentImageIndex ? "block" : "none";
    });
  }

  document.querySelector(".previous").addEventListener("click", function () {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateImage();
    }
  });

  document.querySelector(".next").addEventListener("click", function () {
    if (currentImageIndex < hiddenImages.length - 1) {
      currentImageIndex++;
      updateImage();
    }
  });

  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".hiddenContent").style.display = "none";
  });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      currentImageIndex = index;
      updateImage();
    });
  });

  updateImage();
};

// Cart object
let cart = {
  items: [],
  total: 0,
};

// Quantity variable
let quantity = 0;

// Function to toggle cart visibility
function toggleCart() {
  let cart = document.querySelector(".cart .cart-items");
  cart.style.display = cart.style.display === "none" ? "block" : "none";
}

// Function to update quantity display
function updateQuantityDisplay() {
  document.querySelector(
    ".quantity"
  ).innerHTML = `<img src="images/icon-minus.svg" alt="" />${quantity}<img src="images/icon-plus.svg" alt="" srcset="" />`;
}

// Function to add quantity
function addQuantity() {
  quantity++;
  updateQuantityDisplay();
}

// Function to remove quantity
function removeQuantity() {
  if (quantity > 0) {
    quantity--;
    updateQuantityDisplay();
  }
}

// Function to handle quantity button click
function handleQuantityButtonClick(event) {
  if (event.target.src.includes("icon-plus.svg")) {
    addQuantity();
  } else if (event.target.src.includes("icon-minus.svg")) {
    removeQuantity();
  }
}

// Function to add item to cart
function addToCart() {
  let quantity = parseInt(document.querySelector(".quantity").innerText);
  if (quantity > 0) {
    let item = {
      name: "Fall Limited Edition Sneakers",
      price: 125.0,
      quantity: quantity,
    };
    cart.items.push(item);
    cart.total += item.price * item.quantity;
    updateCart();
  }
}

// Function to update cart
function updateCart() {
  let cartItemsDiv = document.querySelector(".cart-items .addeditems");
  cartItemsDiv.innerHTML = "";
  cart.items.forEach(function (item, index) {
    let itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<img width="60px" src="images/image-product-1-thumbnail.jpg" alt="" />
                         <p>${item.name} $${item.price.toFixed(2)} x ${
      item.quantity
    } $${(item.price * item.quantity).toFixed(2)}</p>
                         <img class="delete" src="images/icon-delete.svg" alt="" />`;
    cartItemsDiv.appendChild(itemDiv);

    // Add event listener to the delete button
    itemDiv.querySelector(".delete").addEventListener("click", function () {
      cart.items.splice(index, 1);
      updateCart();
    });
  });
}

// Event listeners
document.getElementById("cart-icon").addEventListener("click", toggleCart);
document
  .querySelector(".quantity")
  .addEventListener("click", handleQuantityButtonClick);
document.querySelector(".addToCart").addEventListener("click", addToCart);

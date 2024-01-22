// Get all thumbnails and hero images
const thumbnails = document.querySelectorAll(".thumbnail");
const images = document.querySelectorAll(".image");
const bigImage = document.querySelector(".imageCarousel");

// Add click event listener to each thumbnail
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    // Change the src of all images to match the clicked thumbnail
    images.forEach((image) => {
      image.src = thumbnail.src.replace("-thumbnail", "");
    });
  });
});

// Function to toggle visibility of hidden content
function toggleHiddenContent() {
  const hiddenContent = document.querySelector(".hiddenContent");
  const isHidden = hiddenContent.style.display === "none";
  hiddenContent.style.display = isHidden ? "flex" : "none";
  hiddenContent.style.visibility = isHidden ? "visible" : "hidden";
}

// Event listener for enlarging image
bigImage.addEventListener("click", toggleHiddenContent);

// Function to update image
function updateImage(index, hiddenImages) {
  hiddenImages.forEach((img, imgIndex) => {
    img.style.display = imgIndex === index ? "block" : "none";
  });
}

// Previous, next, and close
window.onload = () => {
  let currentImageIndex = 0;
  const hiddenImages = Array.from(document.querySelectorAll(".hiddenImage"));
  const thumbnails = Array.from(document.querySelectorAll(".thumbnail1"));

  // Event listener for previous button
  document.querySelector(".previous").addEventListener("click", () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateImage(currentImageIndex, hiddenImages);
    }
  });

  // Event listener for next button
  document.querySelector(".next").addEventListener("click", () => {
    if (currentImageIndex < hiddenImages.length - 1) {
      currentImageIndex++;
      updateImage(currentImageIndex, hiddenImages);
    }
  });

  // Event listener for close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".hiddenContent").style.display = "none";
  });

  // Event listener for thumbnail click
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      currentImageIndex = index;
      updateImage(currentImageIndex, hiddenImages);
    });
  });

  updateImage(currentImageIndex, hiddenImages);
};

// Cart object
let cart = {
  items: [],
  total: 0,
  quantity: 0,

  // Function to toggle cart visibility
  toggleCart: function () {
    let cartElement = document.querySelector(".cart-items");
    cartElement.style.display =
      cartElement.style.display === "none" ? "block" : "none";
  },

  // Function to update quantity display
  updateQuantityDisplay: function () {
    document.querySelector(
      ".quantity"
    ).innerHTML = `<img src="images/icon-minus.svg" alt="" />${this.quantity}<img src="images/icon-plus.svg" alt="" />`;
  },

  // Function to add quantity
  addQuantity: function () {
    this.quantity++;
    this.updateQuantityDisplay();
  },

  // Function to remove quantity
  removeQuantity: function () {
    if (this.quantity > 0) {
      this.quantity--;
      this.updateQuantityDisplay();
    }
  },

  // Function to handle quantity button click
  handleQuantityButtonClick: function (event) {
    if (event.target.src.includes("icon-plus.svg")) {
      this.addQuantity();
    } else if (event.target.src.includes("icon-minus.svg")) {
      this.removeQuantity();
    }
  },

  // Function to add item to cart
  addToCart: function () {
    let quantity = parseInt(document.querySelector(".quantity").innerText);
    let itemName = "Fall Limited Edition Sneakers";
    let itemPrice = 125.0;
    let existingItemIndex = this.items.findIndex(
      (item) => item.name === itemName
    );

    if (quantity === 0) {
      this.clearCart();
    } else if (existingItemIndex !== -1) {
      this.updateExistingItem(existingItemIndex, quantity, itemPrice);
    } else {
      this.addNewItem(quantity, itemName, itemPrice);
    }
    this.updateCart();
  },

  clearCart: function () {
    this.items = [];
    this.total = 0;
    document.querySelector(".cart-items .addeditems").innerHTML =
      "Your cart is empty.";
  },

  updateExistingItem: function (existingItemIndex, quantity, itemPrice) {
    let quantityDifference = quantity - this.items[existingItemIndex].quantity;
    this.items[existingItemIndex].quantity = quantity;
    this.total += itemPrice * quantityDifference;
  },

  addNewItem: function (quantity, itemName, itemPrice) {
    let item = {
      name: itemName,
      price: itemPrice,
      quantity: quantity,
    };
    this.items.push(item);
    this.total += itemPrice * quantity;
  },

  // Function to update cart
  updateCart: function () {
    let cartItemsDiv = document.querySelector(".cart-items .addeditems");
    let itemCountElement = document.getElementById("item-count"); // Assuming you have an element with id "item-count" to display the number of items in the cart
    cartItemsDiv.innerHTML = "";

    if (this.items.length === 0) {
      cartItemsDiv.innerHTML = "Your cart is empty.";
      itemCountElement.innerText = "0"; // Update item count display to 0 when cart is empty
    } else {
      let totalItems = this.items.reduce(
        (total, item) => total + item.quantity,
        0
      ); // Calculate total number of items in the cart
      itemCountElement.innerText = totalItems.toString(); // Update item count display

      this.items.forEach(function (item, index) {
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `<img width="40px" src="images/image-product-1-thumbnail.jpg" alt="" />
                             <p>${item.name} $${item.price.toFixed(2)} x ${
          item.quantity
        } <b>$${(item.price * item.quantity).toFixed(2)}<b></p>
                             <img height="16px" class="delete" src="images/icon-delete.svg" alt="" />`;
        cartItemsDiv.appendChild(itemDiv);
        itemDiv.querySelector(".delete").addEventListener("click", function () {
          cart.items.splice(index, 1);
          cart.updateCart();
        });
      });
    }
  },
};

// Event listeners
document.getElementById("cart-icon").addEventListener("click", function () {
  cart.toggleCart();
});
document.querySelector(".quantity").addEventListener("click", function (event) {
  cart.handleQuantityButtonClick(event);
});
document.querySelector(".addToCart").addEventListener("click", function () {
  cart.addToCart();
});

// Hamburger open close
document.querySelector(".hamburger").addEventListener("click", () => {
  const navList = document.querySelector(".nav-list");
  if (navList.style.display === "none") {
    navList.style.display = "flex";
  } else {
    navList.style.display = "none";
  }
});

document.querySelector(".nav-close").addEventListener("click", () => {
  document.querySelector(".nav-list").style.display = "none";
});

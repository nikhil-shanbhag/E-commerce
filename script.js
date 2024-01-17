// Get all thumbnails and hero images
let thumbnails = document.querySelectorAll(".thumbnail");
let heroImages = document.querySelectorAll(".image");

// Add click event listener to each thumbnail
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", function () {
    // Change the src of all hero images to match the clicked thumbnail
    heroImages.forEach((heroImage) => {
      heroImage.src = thumbnail.src.replace("-thumbnail", "");
    });
  });
});

//Opens bigger image
let bigImage = document.querySelector(".imageCarousel");

function enlarge() {
  let hidden = document.querySelector(".hiddenContent");
  hidden.style.visibility = "visible";
}

bigImage.addEventListener("click", enlarge);

//Previous next and close
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

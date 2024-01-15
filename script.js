window.onload = function () {
  // Get all thumbnails and hero images
  var thumbnails = document.querySelectorAll(".thumbnail");
  var heroImages = document.querySelectorAll(".heroImage");

  // Add click event listener to each thumbnail
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      // Change the src of all hero images to match the clicked thumbnail
      heroImages.forEach((heroImage) => {
        heroImage.src = thumbnail.src.replace("-thumbnail", "");
      });
    });
  });
};

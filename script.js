
document.getElementById("shopBtn").addEventListener("click", function () {
  const menu = document.getElementById("shopMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});


function addToCart(productName) {
  alert("Added to cart: " + productName);
}


function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart: " + productName);
}

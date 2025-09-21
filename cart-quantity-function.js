
async function renderCart() {
  cartContainer.innerHTML = "";
  totalPriceEl.textContent = "";
  const products = await fetchProducts();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
    }

      
  const quantityMap = {};
  cart.forEach(name => {
    quantityMap[name] = (quantityMap[name] || 0) + 1;
  });

  let total = 0;

  Object.keys(quantityMap).forEach(name => {
  const item = products.find(p => p.name === name);
  if (!item) return;

  const div = document.createElement("div");
  div.className = "cart-card";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;

  const info = document.createElement("div");
  info.className = "cart-info";
  info.innerHTML = `<strong>${item.name}</strong><br>Price: $${item.price}`;

  const quantitySelect = document.createElement("select");
  quantitySelect.className = "add-cart-btn";
  quantitySelect.style.width = "60px";

  for (let i = 1; i <= 10; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    if (i === quantityMap[name]) opt.selected = true;
      quantitySelect.appendChild(opt);
    }
    quantitySelect.onchange = () => {
    const newQty = parseInt(quantitySelect.value);
    let updatedCart = cart.filter(p => p !== name);

    for (let j = 0; j < newQty; j++) updatedCart.push(name);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart();
    };

    const removeBtn = document.createElement("button");
    removeBtn.className = "add-cart-btn";
    removeBtn.textContent = "Remove";

    removeBtn.onclick = () => {
      const newCart = cart.filter(p => p !== name);
      localStorage.setItem("cart", JSON.stringify(newCart));
      renderCart();
    };

      div.appendChild(img);
      div.appendChild(info);
      div.appendChild(quantitySelect);
      div.appendChild(removeBtn);

      cartContainer.appendChild(div);

      total += item.price * quantityMap[name];
  });

  totalPriceEl.textContent = `Total: $${total}`;
}

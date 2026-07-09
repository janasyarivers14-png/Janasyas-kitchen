let cart = [];

function money(amount) {
  return Number(amount).toFixed(2);
}

function getElement(id) {
  return document.getElementById(id);
}

function getQty(id) {
  const value = Number(getElement(id).value);
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.floor(value);
}

function getSelectedOption(selectId) {
  const select = getElement(selectId);
  return select.options[select.selectedIndex];
}

function addToCart(name, price, qty = 1) {
  const cleanQty = Number(qty) > 0 ? Math.floor(Number(qty)) : 1;
  cart.push({
    name,
    price: Number(price),
    qty: cleanQty
  });
  updateCart();
  document.getElementById("checkout").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCart() {
  const cartList = getElement("cart");
  const totalBox = getElement("total");
  const emptyCart = getElement("emptyCart");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="cart-item-text">
        <strong>${item.qty}x</strong> ${item.name}<br>
        $${money(item.price)} each — $${money(item.price * item.qty)}
      </span>
      <button type="button" class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalBox.textContent = money(cartTotal());
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function addWing5() {
  addToCart(
    `5 Piece Wing Meal - ${getElement("wing5Flavor").value}, ${getElement("wing5Type").value}, ${getElement("wing5Drink").value}`,
    10,
    getQty("wing5Qty")
  );
}

function addWing10() {
  addToCart(
    `10 Piece Wing Meal - ${getElement("wing10Flavor").value}, ${getElement("wing10Type").value}, ${getElement("wing10Drink").value}`,
    15,
    getQty("wing10Qty")
  );
}

function addCombo() {
  addToCart(
    `Wing + Rasta Pasta Combo - ${getElement("comboFlavor").value}, ${getElement("comboDrink").value}`,
    18,
    getQty("comboQty")
  );
}

function addCake() {
  const size = getSelectedOption("cakeSize");
  addToCart(
    `${size.value} ${getElement("cakeFlavor").value} Mini Cake`,
    Number(size.dataset.price),
    getQty("cakeQty")
  );
}

function addCookies() {
  addToCart(`${getElement("cookieFlavor").value} Cookie`, 2, getQty("cookieQty"));
}

function addStrawberries() {
  const size = getSelectedOption("strawberrySize");
  addToCart(
    `${size.value} Chocolate Covered Strawberries`,
    Number(size.dataset.price),
    getQty("strawberryQty")
  );
}

function addPretzels() {
  addToCart("Chocolate Covered Pretzel", 1, getQty("pretzelQty"));
}

function addBrownies() {
  addToCart("Brownie", 1.5, getQty("brownieQty"));
}

function addRiceKrispies() {
  addToCart("Chocolate Covered Rice Krispie Treat", 2, getQty("riceQty"));
}

function addOreoBalls() {
  addToCart("Oreo Balls - 3 Count", 5, getQty("oreoBallQty"));
}

function addBananaPudding() {
  const size = getSelectedOption("bananaSize");
  addToCart(
    `${size.value} Banana Pudding Pan`,
    Number(size.dataset.price),
    getQty("bananaQty")
  );
}

function checkout() {
  const name = getElement("name").value.trim();
  const phone = getElement("phone").value.trim();
  const notes = getElement("notes").value.trim();

  if (cart.length === 0) {
    alert("Please add at least one item to your cart first.");
    return;
  }

  if (!name || !phone) {
    alert("Please enter your name and phone number before sending your order.");
    return;
  }

  const orderText = cart
    .map(item => `${item.qty}x ${item.name} - $${money(item.price * item.qty)}`)
    .join("\n");

  const message =
    `New Janasya's Kitchen Order:\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n\n` +
    `Order:\n${orderText}\n\n` +
    `Total: $${money(cartTotal())}\n\n` +
    `Payment Options: Cash App $Ayeitsnasya25, Chime $Janasya-Rivers, Apple Pay 912-592-9236, or Cash at pickup\n\n` +
    `Notes: ${notes || "None"}`;

  const encodedMessage = encodeURIComponent(message);
  window.location.href = `sms:9125929236?body=${encodedMessage}`;
}

document.addEventListener("DOMContentLoaded", updateCart);

function closeCateringPopup() {
    const popup = document.getElementById("catering-popup");
    popup.style.display = "none";
}
function toggleCateringCard() {
  document.getElementById("catering-card").classList.toggle("show");
}

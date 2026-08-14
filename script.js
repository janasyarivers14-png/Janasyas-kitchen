const cart = JSON.parse(localStorage.getItem('janasyaCart') || '[]');

const money = amount => `$${amount.toFixed(2)}`;

function saveCart() {
  localStorage.setItem('janasyaCart', JSON.stringify(cart));
}

function addItem(name, price, qty = 1) {
  qty = Math.max(1, parseInt(qty, 10) || 1);

  const existingItem = cart.find(
    item => item.name === name
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      name: name,
      price: price,
      qty: qty
    });
  }

 janasyaCart();
  renderCart();
}

function handleAdd(action) {

  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : "";
  };

  const getQty = (id) => {
    const element = document.getElementById(id);

    if (!element) return 1;

    const qty = parseInt(element.value, 10);

    return Number.isNaN(qty) || qty < 1 ? 1 : qty;
  };

  const actions = {

    wing5: () => addItem(
      `5 Piece Wing Meal - ${getValue("wing5Flavor")} - Drink: ${getValue("wing5Drink")} - Fries: ${getValue("wing5Fries")}`,
      10,
      getQty("wing5Qty")
    ),

    wing10: () => addItem(
      `10 Piece Wing Meal - ${getValue("wing10Flavor")} - Drink: ${getValue("wing10Drink")} - Fries: ${getValue("wing10Fries")}`,
      15,
      getQty("wing10Qty")
    ),

    boudin: () => addItem(
      "Boudin Balls - 2 Count",
      5,
      getQty("boudinQty")
    ),

    cakeSmall: () => addItem(
      `Small ${getValue("cakeFlavor")} Mini Cake`,
      2.5,
      getQty("cakeSmallQty")
    ),

    cakeLarge: () => addItem(
      `Large ${getValue("cakeFlavor")} Mini Cake`,
      4,
      getQty("cakeLargeQty")
    ),

    cookie: () => addItem(
      `${getValue("cookieFlavor")} Cookie`,
      2,
      getQty("cookieQty")
    ),

    brownie: () => addItem(
      "Brownie",
      1.5,
      getQty("brownieQty")
    ),

    rice: () => addItem(
      "Rice Krispie Treat",
      2,
      getQty("riceQty")
    ),

    pretzel: () => addItem(
      "Chocolate Covered Pretzel",
      1,
      getQty("pretzelQty")
    ),

    oreoBalls: () => addItem(
      "Oreo Balls - 3 Count",
      5,
      getQty("oreoBallsQty")
    ),

    straw6: () => addItem(
      "Chocolate Covered Strawberries - 6 Count",
      12,
      getQty("straw6Qty")
    ),

    straw12: () => addItem(
      "Chocolate Covered Strawberries - 12 Count",
      24,
      getQty("straw12Qty")
    ),

    straw24: () => addItem(
      "Chocolate Covered Strawberries - 24 Count",
      48,
      getQty("straw24Qty")
    )
  };

  if (actions[action]) {
    actions[action]();
  }
  
function renderCart() {
  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");

  const count = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartCount) {
    cartCount.textContent = count;
  }

  if (cartTotal) {
    cartTotal.textContent = money(total);
  }

  if (!cartItems) return;

  cartItems.innerHTML = cart.length
    ? cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-top">
            <strong>${item.name}</strong>
            <span>
              ${money(item.price * item.qty)}
            </span>
          </div>

          <div class="qty-controls">
            <button
              type="button"
              onclick="changeQty(${index}, -1)"
            >−</button>

            <span>${item.qty}</span>

            <button
              type="button"
              onclick="changeQty(${index}, 1)"
            >+</button>
          </div>
        </div>
      `).join("")
    : "<p>Your cart is empty.</p>";
}


function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function openCartPanel() {
  cartPanel.classList.add('open');
  overlay.classList.add('show');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('show');
  cartPanel.setAttribute('aria-hidden', 'true');
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1300);
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".add-button").forEach(button => {
    button.addEventListener("click", function () {
      handleAdd(this.dataset.item);
    });
  });

  const openCartButton =
    document.getElementById("openCart");

  const closeCartButton =
    document.getElementById("closeCart");

  const overlayElement =
    document.getElementById("overlay");

  const clearCartButton =
    document.getElementById("clearCart");

  if (openCartButton) {
    openCartButton.addEventListener(
      "click",
      openCartPanel
    );
  }

  if (closeCartButton) {
    closeCartButton.addEventListener(
      "click",
      closeCartPanel
    );
  }

  if (overlayElement) {
    overlayElement.addEventListener(
      "click",
      closeCartPanel
    );
  }

  if (clearCartButton) {
    clearCartButton.addEventListener(
      "click",
      () => {
        cart.length = 0;
        saveCart();
        renderCart();
      }
    );
  }

  renderCart();
});

  const form = new FormData(orderForm);
  const orderLines = cart.map(item =>
    `${item.qty} x ${item.name} - ${money(item.price * item.qty)}`
  ).join('\n');

  const total = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));

  const message = [
    `New Janasya's Kitchen Order`,
    ``,
    `Name: ${form.get('name')}`,
    `Phone: ${form.get('phone')}`,
    `Method: ${form.get('method')}`,
    `Requested time: ${form.get('dateTime')}`,
    `Notes: ${form.get('notes') || 'None'}`,
    ``,
    `Items:`,
    orderLines,
    ``,
    `Total: ${total}`
  ].join('\n');

  window.location.href = `sms:9125929236?&body=${encodeURIComponent(message)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
renderCart();

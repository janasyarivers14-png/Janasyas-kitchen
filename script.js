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

  saveCart();
  renderCart();
  showToast();
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
    
      soulFood: () => addItem(
      `Soul Food Sunday Plate - ${
        document.getElementById("soulFoodMeal").textContent.trim()
      } - Drink: ${getValue("soulFoodDrink")}`,
      15,
      getQty("soulFoodQty")
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

    cupcake1: () => addItem(
      `${getValue("cupcakeFlavor")} Cupcake`,
      2,
      getQty("cupcake1Qty")
    ),

    cupcake6: () => addItem(
      `${getValue("cupcakeFlavor")} Cupcakes - 6 Count`,
      12,
      getQty("cupcake6Qty")
    ),

    cupcake12: () => addItem(
      `${getValue("cupcakeFlavor")} Cupcakes - 12 Count`,
      24,
      getQty("cupcake12Qty")
    ),

    cupcake24: () => addItem(
      `${getValue("cupcakeFlavor")} Cupcakes - 24 Count`,
      48,
      getQty("cupcake24Qty")
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
  const cartPanel = document.getElementById("cartPanel");
  const overlay = document.getElementById("overlay");

  if (cartPanel) {
    cartPanel.classList.add("open");
    cartPanel.setAttribute("aria-hidden", "false");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

  renderCart();
}

function closeCartPanel() {
  const cartPanel = document.getElementById("cartPanel");
  const overlay = document.getElementById("overlay");

  if (cartPanel) {
    cartPanel.classList.remove("open");
    cartPanel.setAttribute("aria-hidden", "true");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }
}

function showToast() {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1300);
}

document.addEventListener("click", function (event) {
  const button = event.target.closest(".add-button");

  if (button) {
    event.preventDefault();
    handleAdd(button.dataset.item);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const openCartButton = document.getElementById("openCart");
  const closeCartButton = document.getElementById("closeCart");
  const overlayElement = document.getElementById("overlay");
  const clearCartButton = document.getElementById("clearCart");

  if (openCartButton) {
    openCartButton.addEventListener("click", openCartPanel);
  }

  if (closeCartButton) {
    closeCartButton.addEventListener("click", closeCartPanel);
  }

  if (overlayElement) {
    overlayElement.addEventListener("click", closeCartPanel);
  }

  if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
      cart.length = 0;
      saveCart();
      renderCart();
    });
  }

  renderCart();
});

  const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!cart.length) {
      alert("Please add at least one item to your cart first.");
      return;
    }

    const form = new FormData(orderForm);

    const orderLines = cart.map(item =>
      `${item.qty} x ${item.name} - ${money(item.price * item.qty)}`
    ).join("\n");

    const total = money(
      cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      )
    );

    const message = [
      "New Janasya's Kitchen Order",
      "",
      `Name: ${form.get("name") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Method: ${form.get("method") || ""}`,
      `Requested time: ${form.get("dateTime") || ""}`,
      `Notes: ${form.get("notes") || "None"}`,
      "",
      "Items:",
      orderLines,
      "",
      `Total: ${total}`
    ].join("\n");

    window.location.href =
      `sms:9125929236?&body=${encodeURIComponent(message)}`;
  });
}
const cateringForm = document.getElementById("cateringForm");

if (cateringForm) {
  cateringForm.addEventListener("submit", event => {
    event.preventDefault();

    const form = new FormData(cateringForm);

    const message = [
      "New Janasya's Kitchen Catering Request",
      "",
      `Name: ${form.get("name") || ""}`,
      `Phone: ${form.get("phone") || ""}`,
      `Event type: ${form.get("eventType") || ""}`,
      `Event date: ${form.get("eventDate") || ""}`,
      `Event time: ${form.get("eventTime") || ""}`,
      `Estimated guests: ${form.get("guestCount") || ""}`,
      `Location: ${form.get("eventLocation") || ""}`,
      `Food requests/details: ${form.get("details") || "None"}`
    ].join("\n");

    window.location.href =
      `sms:9125929236?&body=${encodeURIComponent(message)}`;
  });
}

const cateringModal = document.getElementById("cateringModal");
const openCateringButton = document.getElementById("openCatering");
const closeCateringButton = document.getElementById("closeCatering");

function openCateringModal() {
  if (!cateringModal) return;
  cateringModal.classList.add("open");
  cateringModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("catering-modal-open");
  setTimeout(() => document.getElementById("cateringName")?.focus(), 100);
}

function closeCateringModal() {
  if (!cateringModal) return;
  cateringModal.classList.remove("open");
  cateringModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("catering-modal-open");
}

openCateringButton?.addEventListener("click", openCateringModal);
closeCateringButton?.addEventListener("click", closeCateringModal);
cateringModal?.addEventListener("click", event => {
  if (event.target === cateringModal) closeCateringModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCateringModal();
});

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

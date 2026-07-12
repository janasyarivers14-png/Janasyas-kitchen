const cart = JSON.parse(localStorage.getItem('janasyaCart') || '[]');

const money = amount => `$${amount.toFixed(2)}`;

function saveCart() {
  localStorage.setItem('janasyaCart', JSON.stringify(cart));
}

function addItem(name, price, qty = 1) {
  qty = Math.max(1, Number(qty) || 1);
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  saveCart();
  renderCart();
  showToast();
}

function handleAdd(action) {
  const actions = {
    wing5: () => addItem(
      `5 Piece Wing Meal - ${wing5Flavor.value} - Drink: ${wing5Drink.value}`,
      10,
      wing5Qty.value
    ),
    wing10: () => addItem(
      `10 Piece Wing Meal - ${wing10Flavor.value} - Drink: ${wing10Drink.value}`,
      15,
      wing10Qty.value
    ),
    boudin: () => addItem('Boudin Balls - 2 Count', 5, boudinQty.value),
    cakeSmall: () => addItem(`Small ${cakeFlavor.value} Mini Cake`, 2.5),
    cakeLarge: () => addItem(`Large ${cakeFlavor.value} Mini Cake`, 4),
    cookie: () => addItem(`${cookieFlavor.value} Cookie`, 2),
    brownie: () => addItem('Brownie', 1.5),
    rice: () => addItem('Rice Krispie Treat', 2),
    pretzel: () => addItem('Chocolate Covered Pretzel', 1),
    oreoBalls: () => addItem('Oreo Balls - 3 Count', 5),
    straw6: () => addItem('Chocolate Covered Strawberries - 6 Count', 12),
    straw12: () => addItem('Chocolate Covered Strawberries - 12 Count', 24),
    straw24: () => addItem('Chocolate Covered Strawberries - 24 Count', 48)
  };

  if (actions[action]) actions[action]();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = count;
  cartTotal.textContent = money(total);

  cartItems.innerHTML = cart.length
    ? cart.map((item, index) => `
      <div class="cart-item">
        <div class="cart-item-top">
          <strong>${item.name}</strong>
          <span>${money(item.price * item.qty)}</span>
        </div>
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `).join('')
    : '<p>Your cart is empty.</p>';
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

document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => handleAdd(button.dataset.item));
});

openCart.addEventListener('click', openCartPanel);
closeCart.addEventListener('click', closeCartPanel);
overlay.addEventListener('click', closeCartPanel);

clearCart.addEventListener('click', () => {
  cart.length = 0;
  saveCart();
  renderCart();
});

orderForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!cart.length) {
    orderMessage.textContent = 'Please add at least one item to your cart first.';
    return;
  }

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

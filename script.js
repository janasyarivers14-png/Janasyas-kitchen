let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  const totalBox = document.getElementById("total");

  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.item} - $${product.price}`;
    cartList.appendChild(li);
  });

  totalBox.textContent = total;
}

function checkout() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const notes = document.getElementById("notes").value;

  if (!name || !phone || cart.length === 0) {
    alert("Please add items to your cart and enter your name and phone number.");
    return;
  }

  const orderText = cart.map(product => `${product.item} - $${product.price}`).join("%0A");

  const message =
    `New Janasya's Kitchen Order:%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A%0A` +
    `Order:%0A${orderText}%0A%0A` +
    `Total: $${total}%0A%0A` +
    `Notes: ${notes}`;

  window.location.href = `sms:9125929236?&body=${message}`;
}
function addBananaPudding() {
  const size = document.getElementById("bananaSize").value;
  const qty = document.getElementById("bananaQty").value;

  const cart = document.getElementById("cart");
  const item = document.createElement("li");

  item.textContent = `${qty} x ${size}`;
  cart.appendChild(item);
}
function addBananaPudding() {
  const select = document.getElementById("bananaSize");
  const selected = select.options[select.selectedIndex];
  const name = selected.value;
  const price = Number(selected.dataset.price);
  const qty = Number(document.getElementById("bananaQty").value);

  for (let i = 0; i < qty; i++) {
    addToCart(name, price);
  }
}
select,
input[type="number"]{
    width:90%;
    max-width:400px;
    margin:10px auto;
    padding:12px;
    display:block;
    border-radius:12px;
    border:1px solid #ddd;
    font-size:16px;
    background:white;
}
function addPretzels() {
    const qty = Number(document.getElementById("pretzelQty").value);

    for (let i = 0; i < qty; i++) {
        addToCart("Chocolate Covered Pretzel", 1);
    }
}

function addBrownies() {
    const qty = Number(document.getElementById("brownieQty").value);

    for (let i = 0; i < qty; i++) {
        addToCart("Brownie", 1.50);
    }
}

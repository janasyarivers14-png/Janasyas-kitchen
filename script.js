let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price: Number(price) });
  total += Number(price);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  const totalBox = document.getElementById("total");

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button class="remove-btn" onclick="removeItem(${index})">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });

  totalBox.textContent = total.toFixed(2);
}

function addWing5() {
  addMultiple(
    `5 Piece Wing Meal - ${wing5Flavor.value}, ${wing5Type.value}, ${wing5Drink.value}`,
    10,
    Number(wing5Qty.value)
  );
}

function addWing10() {
  addMultiple(
    `10 Piece Wing Meal - ${wing10Flavor.value}, ${wing10Type.value}, ${wing10Drink.value}`,
    15,
    Number(wing10Qty.value)
  );
}

function addCombo() {
  addMultiple(
    `Wing + Rasta Pasta Combo - ${comboFlavor.value}, ${comboDrink.value}`,
    18,
    Number(comboQty.value)
  );
}

function addCake() {
  const option = cakeSize.options[cakeSize.selectedIndex];

  addMultiple(
    `${option.value} ${cakeFlavor.value} Mini Cake`,
    Number(option.dataset.price),
    Number(cakeQty.value)
  );
}

function addCookies() {
  addMultiple(
    `${cookieFlavor.value} Cookie`,
    2,
    Number(cookieQty.value)
  );
}

function addStrawberries() {
  const option = strawberrySize.options[strawberrySize.selectedIndex];

  addMultiple(
    `${option.value} Chocolate Covered Strawberries`,
    Number(option.dataset.price),
    Number(strawberryQty.value)
  );
}

function addPretzels() {
  addMultiple(
    "Chocolate Covered Pretzel",
    1,
    Number(pretzelQty.value)
  );
}

function addBrownies() {
  addMultiple(
    "Brownie",
    1.50,
    Number(brownieQty.value)
  );
}

function addBananaPudding() {
  const option = bananaSize.options[bananaSize.selectedIndex];

  addMultiple(
    `${option.value} Banana Pudding Pan`,
    Number(option.dataset.price),
    Number(bananaQty.value)
  );
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}
function checkout() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const notes = document.getElementById("notes").value;

  if (!name || !phone || cart.length === 0) {
    alert("Please add items to your cart and enter your name and phone number.");
    return;
  }
  const orderText = cart
    .map(item => `${item.name} - $${item.price.toFixed(2)}`)
    .join("%0A");

const message =
`New Janasya's Kitchen Order:%0A%0A` +
`Name: ${name}%0A` +
`Phone: ${phone}%0A%0A` +
`Order:%0A${orderText}%0A%0A` +
`Total: $${total.toFixed(2)}%0A%0A` +
`Notes: ${notes}`;

window.location.href =
`sms:9125929236?body=${message}`;
}

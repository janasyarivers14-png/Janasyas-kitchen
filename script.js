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

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });

  totalBox.textContent = total.toFixed(2);
}

function addMultiple(name, price, qty) {
  for (let i = 0; i < qty; i++) {
    addToCart(name, price);
  }
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
    1.5,
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

function checkout() {
  alert("Order button works! Cart total is $" + total.toFixed(2));
}

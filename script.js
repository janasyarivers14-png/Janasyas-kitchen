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

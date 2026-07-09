let cart = JSON.parse(localStorage.getItem("janasyasCart")) || [];

function saveCart(){localStorage.setItem("janasyasCart", JSON.stringify(cart));}
function addToCart(name, price, quantity = 1) {
  quantity = Number(quantity);
  cart.push({
    name: quantity + "x " + name,
    price: price * quantity
  });
  saveCart();
renderCart();
}
function removeItem(index){cart.splice(index,1);saveCart();renderCart();}
function clearCart(){cart=[];saveCart();renderCart();}
function renderCart(){const box=document.getElementById('cart-items');const totalBox=document.getElementById('total');if(!box||!totalBox)return;if(cart.length===0){box.innerHTML='<p>Your cart is empty.</p>';totalBox.textContent='0.00';return;}let total=0;box.innerHTML='';cart.forEach((item,index)=>{total+=item.price;const div=document.createElement('div');div.className='cart-item';div.innerHTML=`<span>${item.name}</span><strong>$${item.price.toFixed(2)}</strong><button class="remove-btn" onclick="removeItem(${index})">Remove</button>`;box.appendChild(div);});totalBox.textContent=total.toFixed(2);}
function sendOrderText(){const name=document.getElementById('customerName').value.trim();const phone=document.getElementById('customerPhone').value.trim();const notes=document.getElementById('orderNotes').value.trim();if(cart.length===0){alert('Please add something to your cart first.');return;}if(!name||!phone){alert('Please enter your name and phone number.');return;}const total=cart.reduce((sum,item)=>sum+item.price,0);const order=cart.map(item=>`- ${item.name}: $${item.price.toFixed(2)}`).join('\n');const msg=`Hi Janasya! I would like to place an order.\n\nName: ${name}\nPhone: ${phone}\n\nOrder:\n${order}\n\nTotal: $${total.toFixed(2)}\n\nNotes: ${notes}`;window.location.href=`sms:19125929236?&body=${encodeURIComponent(msg)}`;}
function toggleCateringCard(){document.getElementById('catering-card').classList.toggle('show');}
document.addEventListener('DOMContentLoaded', renderCart);

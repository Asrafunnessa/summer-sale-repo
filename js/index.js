

let total = 0;
 

function handleCLickBtn(target) {
  const selectedItemContainer = document.getElementById("selected-items");
  const itemName = target.parentNode.childNodes[1].innerText;
  const li = document.createElement("li");
  li.innerText = itemName;
  selectedItemContainer.appendChild(li);
  const price = target.parentNode.childNodes[5].innerText.split(" ")[1];
  total = parseInt(total) + parseInt(price);
  document.getElementById("total").innerText = total;
}

// JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  const selectedItemsContainer = document.getElementById("selected-items");
  const totalAmount = document.getElementById("total");
  const discountAmount = document.getElementById("discount");
  const grandTotalAmount = document.getElementById("grand-total");

  let cart = [];
  let promoCodeApplied = false;

  function updateCartUI() {
    selectedItemsContainer.innerHTML = cart
      .map((item) => `<p>${item.name} - ${item.price}tk</p>`)
      .join("");

    let totalPrice = cart.reduce((total, item) => total + item.price, 0);
    let grandTotal = totalPrice;
    let discount = 0;

    if (promoCodeApplied && totalPrice >= 200) {
      discount = totalPrice * 0.2; // 20% discount
      grandTotal -= discount;
    }

    totalAmount.textContent = totalPrice.toFixed(2);
    discountAmount.textContent = discount.toFixed(2);
    grandTotalAmount.textContent = grandTotal.toFixed(2);
  }

  function handleCLickBtn(element) {
    const productName = element.querySelector(".card-action p").textContent;
    const productPrice = parseFloat(
      element.querySelector(".card-action h2").textContent
    );

    const newItem = { name: productName, price: productPrice };
    cart.push(newItem);

    updateCartUI();
  }

  const applyButton = document.querySelector(".btn-accent");
  applyButton.addEventListener("click", () => {
    const promoCodeInput = document.querySelector(".input-bordered");
    const promoCode = promoCodeInput.value.trim();

    if (promoCode === "SELL200") {
      promoCodeApplied = true;
      updateCartUI();
    }
  });

  const productCards = document.querySelectorAll(".card");
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCLickBtn(card);
    });
  });
});





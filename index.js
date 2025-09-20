const ITEMS_KEY = "items_key";

function subscribe(event) {
  event.preventDefault();
  alert("Thank you for subscribing.");
}

function addToCart(event) {
  const button = event.target;
  const sku = button.getAttribute("data-sku");
  let items = [];
  try {
    items = JSON.parse(sessionStorage.getItem(ITEMS_KEY) || "[]");
  } catch (e) {
    console.log(e);

    alert("Isn't valid value in the store. Couldn't parse");
  }
  if (sku) {
    items.push(sku);
  }
  sessionStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

function clearCart() {
  sessionStorage.setItem(ITEMS_KEY, JSON.stringify([]));
  const cartItemsUl = document.getElementById("cartItems");
  if (cartItemsUl) {
    cartItemsUl.replaceChildren();
  }
}

function processOrder() {
  sessionStorage.setItem(ITEMS_KEY, JSON.stringify([]));
  const cartItemsUl = document.getElementById("cartItems");
  if (cartItemsUl) {
    cartItemsUl.replaceChildren();
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target.closest("form");
  const formData = {
    name: form.querySelector("#name").value,
    email: form.querySelector("#email").value,
    phone: form.querySelector("#phone").value,
    message: form.querySelector("#message").value,
    contactMethod: form.querySelector('input[name="contact_method"]:checked')
      .value,
    timestamp: new Date().toISOString(),
  };
  const CONTACT_FORM_KEY = "contact_form_submissions";
  let submissions = JSON.parse(localStorage.getItem(CONTACT_FORM_KEY) || "[]");
  submissions.push(formData);
  localStorage.setItem(CONTACT_FORM_KEY, JSON.stringify(submissions));

  form.reset();
}

function closeCart(event) {
  const cartModalContainer = document.getElementById("cartModalContainer");
  if (cartModalContainer) {
    cartModalContainer.style.visibility = "hidden";
  }
}

function viewCart(event) {
  const cartModalContainer = document.getElementById("cartModalContainer");

  if (cartModalContainer) {
    cartModalContainer.style.visibility = "visible";
  }

  const items = JSON.parse(sessionStorage.getItem(ITEMS_KEY));
  const cartItemsUl = document.getElementById("cartItems");
  if (cartItemsUl) {
    cartItemsUl.replaceChildren();
    items.forEach((item) => {
      const newLi = document.createElement("li");
      newLi.innerText = item;
      cartItemsUl.appendChild(newLi);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const subscribeForms = document.querySelectorAll(".footer_form");
  if (subscribeForms) {
    subscribeForms.forEach((form) => {
      form.addEventListener("submit", subscribe);
    });
  }

  const viewCartEl = document.getElementById("viewCart");
  if (viewCartEl) {
    viewCartEl.addEventListener("click", viewCart);
  }

  const closeCartEl = document.getElementById("closeCart");
  if (closeCartEl) {
    closeCartEl.addEventListener("click", closeCart);
  }

  const addToCartButtons = document.querySelectorAll(".product-card_cta");
  if (addToCartButtons) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }

  const clearCartBtn = document.getElementById("clearCart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  const processOrderBtn = document.getElementById("processOrder");
  if (processOrderBtn) {
    processOrderBtn.addEventListener("click", processOrder);
  }

  const contactFormSubmitButton = document.getElementById(
    "contactFormSubmitButton"
  );
  if (contactFormSubmitButton) {
    contactFormSubmitButton.addEventListener("click", handleContactSubmit);
  }
});

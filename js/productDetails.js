document.addEventListener("DOMContentLoaded", function () {
  handlePayment();

  addToCart();

  setQuantityCarts();
});

/**
 * Function set quantity of carts in header.
 */
function setQuantityCarts() {
  const carts = JSON.parse(localStorage.getItem("carts")) || [];
  const cartCount = document.querySelector(".product-quantity");

  // when there are no carts, hide the cart count
  if (carts.length === 0) {
    cartCount.style.display = "none";
    return;
  }
  // show the cart count
  cartCount.style.display = "block";
  cartCount.innerText = carts.length;
}
/**
 * Function to add product details to cart stored in localstorage
 */
function addToCart() {
  document
    .querySelector(".group-btn-purcharse button.btn-outline-custom")
    .addEventListener("click", function () {
      const productName = document.querySelector(".product-name h1");
      const productPrice = document.querySelector(".sale-price");
      const productImage = document.querySelector("#productImg").src;
      const quantity = 1;
      const valuePrice = parseFloat(
        productPrice.innerText.replace(/[^\d]/g, "")
      );

      const product = {
        name: productName.innerText,
        price: valuePrice,
        image: productImage,
        quantity: quantity,
      };

      const carts = JSON.parse(localStorage.getItem("carts")) || [];
      carts.push(product);
      localStorage.setItem("carts", JSON.stringify(carts));

      // Update the cart count in the header
      setQuantityCarts();
      showAddToCartSuccess(product.name);
    });
}

/**
 * Function get product details and store in local storage. Later, redirect to payment page.
 */
function handlePayment() {
  document
    .querySelector(".group-btn-purcharse button.btn-warning")
    .addEventListener("click", function () {
      const productName = document.querySelector(".product-name h1");
      const productPrice = document.querySelector(".sale-price");
      const productImage = document.querySelector("#productImg").src;

      const valuePrice = parseFloat(
        productPrice.innerText.replace(/[^\d]/g, "")
      );

      const product = {
        name: productName.innerText,
        price: valuePrice,
        image: productImage,
      };

      localStorage.setItem("product", JSON.stringify(product));
      window.location.href = "../html/payment.html";
    });
}

function showAddToCartSuccess(productName) {
  // Tạo alert element
  const alertEl = document.createElement("div");
  alertEl.className = "alert alert-success d-flex align-items-center fade show";
  alertEl.setAttribute("role", "alert");
  alertEl.style.minWidth = "250px";

  // Nội dung alert với tên sản phẩm
  alertEl.innerHTML = `
        <i class="fa-solid fa-circle-check me-1"></i>
        <div>
            <strong>${productName}</strong> đã được thêm vào giỏ hàng
        </div>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  // Thêm alert vào container
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.appendChild(alertEl);

  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    const bsAlert = new bootstrap.Alert(alertEl);
    bsAlert.close();

    // Xóa alert element sau khi animation kết thúc
    alertEl.addEventListener("closed.bs.alert", () => {
      alertEl.remove();
    });
  }, 3000);
}

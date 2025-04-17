document.addEventListener("DOMContentLoaded", function () {
  setupLoginEventHandlers();
  setUpChatbot();
  setupLocationHandler();
  handleSearch();
  setQuantityCarts();
});

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

function setupLoginEventHandlers() {
  const phone = document.getElementById("phone-login");
  const password = document.getElementById("password-login");
  const toggleIcon = document.querySelector(".toggle-password i");

  const patternPhone = /^0[^14]\d{8}$/;
  const patternPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*=])(?=.*\d)(?!.*\s).{8,}$/;

  // Show/Hide Password Toggle
  document
    .querySelector(".toggle-password")
    .addEventListener("click", function () {
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      toggleIcon.classList.toggle("fa-eye");
      toggleIcon.classList.toggle("fa-eye-slash");
    });

  // Real-time Validation
  phone.oninput = () =>
    isValid(
      phone,
      document.querySelector(".valid-phone-login"),
      patternPhone,
      "Số điện thoại không hợp lệ"
    );
  password.oninput = () =>
    isValid(
      password,
      document.querySelector(".valid-pass-login"),
      patternPass,
      "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
    );

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let isFormValid = true;

      if (
        !isValid(
          phone,
          document.querySelector(".valid-phone-login"),
          patternPhone,
          "Số điện thoại không hợp lệ"
        )
      )
        isFormValid = false;
      if (
        !isValid(
          password,
          document.querySelector(".valid-pass-login"),
          patternPass,
          "Mật khẩu phải từ 8-20 ký tự, gồm chữ, số, ký tự đặc biệt"
        )
      )
        isFormValid = false;

      if (isFormValid) {
        alert("🎉 Đăng nhập thành công!");
      }
    });

  function isValid(elem, valid, pattern, message) {
    const value = elem.value.trim();
    if (value === "") {
      valid.innerHTML = "Không được để trống trường này";
      return false;
    }
    if (!pattern.test(value)) {
      valid.innerHTML = message;
      return false;
    }
    valid.innerHTML = "";
    return true;
  }
}

function setUpChatbot() {
  const chatButton = document.getElementById("chatbot-button");
  const chatBox = document.getElementById("chatbot-box");
  const btnClose = document.getElementById("close-chat");

  chatButton.addEventListener("click", () => {
    chatBox.style.display =
      chatBox.style.display === "none" || chatBox.style.display === ""
        ? "block"
        : "none";
  });

  btnClose.addEventListener("click", function () {
    chatBox.style.display = "none";
    chatButton.style.display = "block";
  });
}

function setupLocationHandler() {
  let currentLocation = "Hồ Chí Minh";

  const locationBtn = document.querySelector('[data-bs-target="#modalA"]');

  const locationOptions = document.querySelectorAll(".location-option");
  locationOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const location = this.getAttribute("data-location");
      currentLocation = location;

      if (locationBtn) {
        locationBtn.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${location}`;
      }

      locationOptions.forEach((btn) => {
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-outline-secondary");
      });

      this.classList.remove("btn-outline-secondary");
      this.classList.add("btn-danger");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalA")
      );
      if (modal) {
        modal.hide();
      }
    });
  });

  // Đánh dấu nút đang được chọn khi mở modal
  document
    .getElementById("modalA")
    .addEventListener("show.bs.modal", function () {
      locationOptions.forEach((option) => {
        if (option.getAttribute("data-location") === currentLocation) {
          option.classList.remove("btn-outline-secondary");
          option.classList.add("btn-custom");
        } else {
          option.classList.remove("btn-custom");
          option.classList.add("btn-outline-secondary");
        }
      });
    });
}

function handleSearch() {
  const searchInput = document.querySelector(
    ".input-group input[type='search']"
  );

  let searchResultsContainer = document.querySelector(
    ".search-results-container"
  );
  if (!searchResultsContainer) {
    searchResultsContainer = document.createElement("div");
    searchResultsContainer.className =
      "search-results-container position-absolute bg-white w-100 shadow-sm rounded mt-5 z-3";
    searchResultsContainer.style.display = "none";
    searchResultsContainer.style.maxHeight = "400px";
    searchResultsContainer.style.overflowY = "auto";
    searchResultsContainer.style.zIndex = "1000";

    const inputGroup = document.querySelector(".input-group");
    inputGroup.parentNode.style.position = "relative";
    inputGroup.parentNode.appendChild(searchResultsContainer);
  }

  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim().toLowerCase();

    let products = JSON.parse(localStorage.getItem("data")) || [];

    searchResultsContainer.innerHTML = "";

    if (searchTerm === "") {
      searchResultsContainer.style.display = "none";
      return;
    }

    const filteredProducts = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm)
    );

    console.log("Filtered products:", filteredProducts.length);
    searchResultsContainer.style.display = "block";

    if (filteredProducts.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="p-3 text-center text-muted">
          <i class="fa-solid fa-magnifying-glass-minus mb-2"></i>
          <p class="mb-0">Không tìm thấy sản phẩm nào phù hợp</p>
        </div>
      `;
      return;
    }

    filteredProducts.forEach((product) => {
      const resultItem = document.createElement("a");

      // range: 0 - 8
      let range = Math.floor(Math.random() * 9);

      resultItem.href = `../html/productDetails${range}.html`;
      resultItem.className = "text-decoration-none text-dark";

      const imgPath = product.img.replace("./", "../");

      resultItem.innerHTML = `
        <div class="d-flex align-items-center p-2 border-bottom hover-bg">
          <div class="me-3" style="width: 60px; height: 60px;">
            <img src="${imgPath}" alt="${product.name}" class="img-fluid" 
                 onerror="this.src='../img/products/product-placeholder.png'">
          </div>
          <div>
            <div class="fw-medium">${highlightSearchTerm(
              product.name,
              searchTerm
            )}</div>
            <div class="text-danger">${product.price.toLocaleString()}₫</div>
          </div>
        </div>
      `;

      searchResultsContainer.appendChild(resultItem);
    });
  });

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".input-group") &&
      !e.target.closest(".search-results-container")
    ) {
      searchResultsContainer.style.display = "none";
    }
  });

  function highlightSearchTerm(text, searchTerm) {
    if (!text) return "";
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="bg-warning">$1</span>');
  }

  const style = document.createElement("style");
  style.textContent = `.hover-bg:hover { background-color: #f8f9fa; }`;
  document.head.appendChild(style);
}

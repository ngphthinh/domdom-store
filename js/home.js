document.addEventListener("DOMContentLoaded", function () {
  clearLocalStorage();
  displayAllProduct();
  setQuantityCarts();
  handleSortProduct();
});

function handleSortProduct() {
  const sortButton = document.getElementById("sort");
  const sortSelect = document.getElementById("select-sort");
  const productsContainer = document.querySelector(".products");

  sortButton.addEventListener("click", function () {
    const sortValue = sortSelect.value; 
    const productCards = Array.from(productsContainer.children);

    if (sortValue === "price-asc") {
      productCards.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".fw-bold.text-custom")
            .textContent.replace(/[^\d]/g, "")
        );
        const priceB = parseFloat(
          b
            .querySelector(".fw-bold.text-custom")
            .textContent.replace(/[^\d]/g, "")
        );
        return priceA - priceB;
      });
    } else if (sortValue === "price-desc") {
      productCards.sort((a, b) => {
        const priceA = parseFloat(
          a
            .querySelector(".fw-bold.text-custom")
            .textContent.replace(/[^\d]/g, "")
        );
        const priceB = parseFloat(
          b
            .querySelector(".fw-bold.text-custom")
            .textContent.replace(/[^\d]/g, "")
        );
        return priceB - priceA;
      });
    } else {
      return;
    }

    productCards.forEach((card) => productsContainer.appendChild(card));
  });
}

function displayAllProduct() {
  const cards = document.querySelectorAll(".products .card");
  const initialVisibleCount = 8; 
  const incrementCount = 8; 
  let currentVisibleCount = initialVisibleCount; 
  let isExpanded = false;


  cards.forEach((card) => {
    card.classList.add("hidden-card");
    card.classList.remove("visible-card");
  });


  cards.forEach((card, index) => {
    if (index < initialVisibleCount) {
      card.classList.add("visible-card");
      card.classList.remove("hidden-card");
    }
  });

  const showMoreLink = document.createElement("a");
  showMoreLink.innerHTML =
    "Xem thêm sản phẩm <i class='fa-solid fa-chevron-down'></i> ";
  showMoreLink.className = "btn d-block text-center border-0 text-custom";
  showMoreLink.href = "#";
  document.querySelector(".suggest").appendChild(showMoreLink);

  showMoreLink.addEventListener("click", function (event) {
    event.preventDefault();
    
    if (isExpanded) {
      cards.forEach((card, index) => {
        if (index >= initialVisibleCount) {
          card.classList.add("hidden-card");
          card.classList.remove("visible-card");
        }
      });
      showMoreLink.innerHTML =
        "Xem thêm sản phẩm <i class='fa-solid fa-chevron-down'></i> ";
      isExpanded = false;
      currentVisibleCount = initialVisibleCount;
    } else {
      const nextVisibleCount = currentVisibleCount + incrementCount;
      
      cards.forEach((card, index) => {
        if (index >= currentVisibleCount && index < nextVisibleCount) {
          card.classList.add("visible-card");
          card.classList.remove("hidden-card");
        }
      });
      
      currentVisibleCount = nextVisibleCount;
      
      if (currentVisibleCount >= cards.length) {
        showMoreLink.innerHTML = "Thu gọn <i class='fa-solid fa-chevron-up'></i>";
        isExpanded = true;
      }
    }
  });
}

/**
 * Function clear local storage when user first time visit the page.
 */
function clearLocalStorage() {
  if (!localStorage.getItem("alreadyCleared")) {
    localStorage.clear();
    localStorage.setItem("alreadyCleared", "true");
  }
}

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

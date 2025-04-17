document.addEventListener("DOMContentLoaded", function () {
  clearLocalStorage();
  displayAllProduct();
  setQuantityCarts();
  handleSortProduct();
  createData();
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

    productCards.forEach((card) => {
      card.classList.remove("hidden-card");
      card.classList.add("visible-card");
    });

    productCards.forEach((card) => productsContainer.appendChild(card));

    productCards.forEach((card, index) => {
      if (index > 7) {
        card.classList.remove("visible-card");
        card.classList.add("hidden-card");
      }
    });
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
        showMoreLink.innerHTML =
          "Thu gọn <i class='fa-solid fa-chevron-up'></i>";
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

function createData() {
  const data = [
    {
      id: 1,
      name: "Sumsung inverter 280 lít RT22M4032BU/SV",
      price: 7070000,
      priceOld: 8990000,
      img: "./img/tl1.jpg",
      discount: "-21%",
      rating: 4.9,
      sold: "28k",
      brand: "Samsung",
    },
    {
      id: 2,
      name: "Tủ lạnh LG Inverter 519 lít Side By Side GR-B256JDS",
      price: 11990000,
      priceOld: 19990000,
      img: "./img/pd21.jpg",
      discount: "-40%",
      rating: 4.9,
      sold: "18.3k",
      brand: "LG",
    },
    {
      id: 3,
      name: "Tủ lạnh Toshiba Inverter 460 lít Side By Side GR-RS600WI-PMV(37)-SG",
      price: 13940000,
      priceOld: 14490000,
      img: "./img/pd33.jpg",
      discount: "-14%",
      rating: 4.9,
      sold: "23.1k",
      brand: "Toshiba",
    },
    {
      id: 4,
      name: "Tủ lạnh Aqua Inverter 189 lít AQR-T220FA(FB)",
      price: 15440000,
      priceOld: 17990000,
      img: "./img/pd42.jpg",
      discount: "-14%",
      rating: 4.9,
      sold: "20.5k",
      brand: "Aqua",
    },
    {
      id: 5,
      name: "Tủ lạnh Sharp Inverter 401 lít Multi Door SJ-FXP480VG-BK",
      price: 15980000,
      priceOld: 20490000,
      img: "./img/pd53.jpg",
      discount: "-22%",
      rating: 4.9,
      sold: "5.4k",
      brand: "Sharp",
    },
    {
      id: 6,
      name: "Tủ lạnh Aqua Inverter 646 lít Side By Side AQR-S682XA(SLB)",
      price: 20900000,
      priceOld: 24490000,
      img: "./img/pd62.jpg",
      discount: "-22%",
      rating: 4.9,
      sold: "8.9k",
      brand: "Aqua",
    },
    {
      id: 7,
      name: "Tủ lạnh Samsung Inverter 488 lít Multi Door RF48A4000B4/SV",
      price: 17940000,
      priceOld: 19190000,
      img: "./img/pd71.jpg",
      discount: "-6%",
      rating: 4.9,
      sold: "1.5k",
      brand: "Samsung",
    },
    {
      id: 8,
      name: "Tủ lạnh Aqua Inverter 189 lít AQR-T220FA(FB)",
      price: 13890000,
      priceOld: 15490000,
      img: "./img/pd81.jpg",
      discount: "-10%",
      rating: 4.9,
      sold: "1.6k",
      brand: "Aqua",
    },
    {
      id: 9,
      name: "Tủ lạnh LG Inverter 635 Lít Side By Side InstaView Door-in-Door GR-X257BL",
      price: 38440000,
      priceOld: 56990000,
      img: "./img/i635.jpg",
      discount: "-32%",
      rating: 4.9,
      sold: "28k",
      brand: "LG",
    },
    {
      id: 10,
      name: "Tủ lạnh Samsung Inverter 648 lít Multi Door Bespoke RF59CB66F8S/SV",
      price: 43440000,
      priceOld: 51990000,
      img: "./img/i658.jpg",
      discount: "-16%",
      rating: 4.9,
      sold: "18.3k",
      brand: "Samsung",
    },
    {
      id: 11,
      name: "Tủ lạnh Hitachi Inverter 573 lít Side By Side R-SX800GPGV0 GBK",
      price: 47440000,
      priceOld: 51990000,
      img: "./img/i574.jpg",
      discount: "-8%",
      rating: 4.9,
      sold: "23.1k",
      brand: "Hitachi",
    },
    {
      id: 12,
      name: "Tủ lạnh Panasonic Inverter 540 lít Multi Door PRIME+ Edition NR-YW590YMMV",
      price: 63990000,
      priceOld: 65990000,
      img: "./img/i540.jpg",
      discount: "-3%",
      rating: 4.9,
      sold: "20.5k",
      brand: "Panasonic",
    },
    {
      id: 13,
      name: "Tủ lạnh Hitachi Inverter 735 lít Multi Door R-ZX740KV X",
      price: 124000000,
      priceOld: 129090000,
      img: "./img/i735.jpg",
      discount: "-4%",
      rating: 4.9,
      sold: "5.4k",
      brand: "Hitachi",
    },
    {
      id: 14,
      name: "Tủ lạnh Funiki 46 lít FR-51CD",
      price: 2500000,
      priceOld: 3490000,
      img: "./img/f46.jpg",
      discount: "-22%",
      rating: 4.9,
      sold: "8.9k",
      brand: "Funiki",
    },
    {
      id: 15,
      name: "Tủ lạnh Panasonic Inverter 170 lít NR-BA190PPVN",
      price: 6790000,
      priceOld: 10190000,
      img: "./img/i170.jpg",
      discount: "-38%",
      rating: 4.9,
      sold: "1.5k",
      brand: "Panasonic",
    },
    {
      id: 16,
      name: "Tủ lạnh Funiki 90 lít FR-91CD",
      price: 2870000,
      priceOld: 3000000,
      img: "./img/f90.jpg",
      discount: "-4%",
      rating: 4.9,
      sold: "1.6k",
      brand: "Funiki",
    },
    {
      id: 17,
      name: "Tủ lạnh LG Inverter 374 lít LTD37BLM",
      price: 10150000,
      priceOld: 16790000,
      img: "./img/i374.jpg",
      discount: "-39%",
      rating: 4.9,
      sold: "1.6k",
      brand: "LG",
    },
    {
      id: 18,
      name: "Tủ lạnh Toshiba Inverter 474 lít Multi Door GR-RF611WI-PGV(22)-XK",
      price: 15440000,
      priceOld: 17490000,
      img: "./img/i474.jpg",
      discount: "-14%",
      rating: 4.9,
      sold: "1.6k",
      brand: "Toshiba",
    },
    {
      id: 19,
      name: "Tủ lạnh Aqua 50 lít AQR-D60FA(BS)",
      price: 2870000,
      priceOld: 2890000,
      img: "./img/a50.jpg",
      discount: "-10%",
      rating: 4.9,
      sold: "1.6k",
      brand: "Aqua",
    },
  ];

  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  const users = [
    {
      phone: "0900000000",
      password: "Admin123@",
    },
  ];

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }
}



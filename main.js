// used to save and load this shopping list in the browser
const STORAGE_KEY = "shopping-list-items";

// restore the saved list, or start with an empty list if nothing is saved yet
let shoppinglist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// save the current shopping list so it is available after a page reload
function saveItems() {
    // convert the array into text because localStorage stores string values
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppinglist));
}

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const shoppingList = document.getElementById("shoppingList");
const totalSpent = document.getElementById("totalSpent");

const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");

addButton.addEventListener("click", addProduct);
let products = JSON.parse(localStorage.getItem("shopping products")) || [];

[productName, productPrice].forEach(function (input) {
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addProduct();
        }
    });
});

function addProduct() {
    const name = productName.value.trim();
    const priceText = productPrice.value.trim();
    const price = Number(priceText);

    if (name === "") {
        alert("Please enter a product name.");
        return;
    }

    if (priceText === "" || !Number.isFinite(price) || price < 0) {
        alert("Please enter a valid price.");
        return;
    }

    const li = document.createElement("li");
    li.dataset.price = price;

    const details = document.createElement("span");
    details.className = "product-details";
    details.textContent = `${name} - KSh ${price.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
        li.remove();
        calculateTotal();
    });

    li.append(details, deleteButton);
    shoppingList.appendChild(li);

    productName.value = "";
    productPrice.value = "";
    productName.focus();
    calculateTotal();
}

function calculateTotal() {
    let total = 0;

    shoppingList.querySelectorAll("li").forEach(function (item) {
        total += Number(item.dataset.price);
    });

    totalSpent.textContent = total.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


clearButton.addEventListener("click", function () {
    shoppingList.innerHTML = "";
    calculateTotal();
});
// used to save and load this shopping list in the browser
const STORAGE_KEY = "shopping-list-items";

// restore the saved list, or start with an empty list if nothing is saved yet
let shoppinglist = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// save the current shopping list so it is available after a page reload
function saveItems() {
    // convert the array into text because localStorage stores string values
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Myshoppinglist));
    // Check whether shopping data exists in Local Storage
if (localStorage.getItem("shoppingProducts") !== null) {
    products = JSON.parse(localStorage.getItem("shoppingProducts"));
} else {
    products = [];
}
}

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const shoppingList = document.getElementById("shoppingList");
const totalSpent = document.getElementById("totalSpent");

const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");

let products = [];

try {
    products = JSON.parse(
        localStorage.getItem("shoppingProducts") || "[]"
    );

    if (!Array.isArray(products)) {
        products = [];
    }

    products = products.map(function (product) {
        return {
            name: product.name,
            price: Number(product.price),
            purchased: product.purchased === true
        };
    });
} catch (error) {
    products = [];
}

function saveProducts() {
    localStorage.setItem(
        "shoppingProducts",
        JSON.stringify(products)
    );
}

function displayProducts() {
    shoppingList.innerHTML = "";

    let total = 0;

    products.forEach(function (product, index) {
        const li = document.createElement("li");

        const name = document.createElement("span");

        name.textContent =
            `${product.name} - KSh ${product.price.toFixed(2)}`;

        if (product.purchased) {
            name.style.textDecoration = "line-through";
            name.style.color = "gray";
        }

        const purchasedButton = document.createElement("button");

        purchasedButton.textContent = product.purchased
            ? "Mark Unpurchased"
            : "Mark Purchased";

        purchasedButton.addEventListener("click", function () {
            products[index].purchased = !products[index].purchased;

            saveProducts();
            displayProducts();
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            products.splice(index, 1);

            saveProducts();
            displayProducts();
        });

        li.append(name, purchasedButton, deleteButton);

        shoppingList.appendChild(li);
        total += product.price;
    });

    totalSpent.textContent = total.toFixed(2);
}

addButton.addEventListener("click", function () {
    const name = productName.value.trim();
    const priceText = productPrice.value.trim();
    const price = Number(priceText);

    if (name === "") {
        alert("Please enter a product name.");
        return;
    }

    if (
        priceText === "" ||
        !Number.isFinite(price) ||
        price < 0
    ) {
        alert("Please enter a valid price.");
        return;
    }

    products.push({
        name: name,
        price: price,
        purchased: false
    });

    try {
        saveProducts();
    } catch (error) {
        alert("Could not save your shopping list.");
        products.pop();
        return;
    }

    productName.value = "";
    productPrice.value = "";

    displayProducts();
});

clearButton.addEventListener("click", function () {
    const confirmClear = confirm(
        "Are you sure you want to clear your entire shopping list?"
    );

    if (confirmClear) {
        products = [];

        saveProducts();
        displayProducts();
    }
});

displayProducts();

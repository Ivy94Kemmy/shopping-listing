
// Get elements from the HTML
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const shoppingList = document.getElementById("shoppingList");
const totalSpent = document.getElementById("totalSpent");

const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");

// Add a product when the button is clicked
addButton.addEventListener("click", addProduct);

// Allow Enter to add a product
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

    // Check that the name and price are valid
    if (name === "") {
        alert("Please enter a product name.");
        return;
    }

    if (priceText === "" || !Number.isFinite(price) || price < 0) {
        alert("Please enter a valid price.");
        return;
    }

    // Create a new list item
    const li = document.createElement("li");

    // Save the price for calculating the total
    li.dataset.price = price;

    // Display the product name and price
    const details = document.createElement("span");
    details.className = "product-details";
    details.textContent = `${name} - KSh ${price.toFixed(2)}`;

    // Create a delete button for this product
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
        li.remove();
        calculateTotal();
    });

    // Add the product details and delete button
    li.append(details, deleteButton);
    shoppingList.appendChild(li);

    // Clear the fields for the next product
    productName.value = "";
    productPrice.value = "";
    productName.focus();

    // Update the total
    calculateTotal();
}

// Calculate the total of all products
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

// Clear the entire shopping list
clearButton.addEventListener("click", function () {
    shoppingList.innerHTML = "";
    calculateTotal();
});



    document.addEventListener('DOMContentLoaded', function() {
        const cartItems = [];
        const cartItemsContainer = document.getElementById('cart-items');

        // Listen for clicks on all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(function(button) {
            button.addEventListener('click', function(e) {
                // Find the product card element
                const productCard = e.target.closest('.product-card');
                
                // Get product details from the card's data attributes
                const productName = productCard.getAttribute('data-name');
                const productPrice = productCard.getAttribute('data-price');

                // Add the product to the cart
                addToCart(productName, productPrice);
            });
        });

        function addToCart(name, price) {
            // Check if the item is already in the cart
            const existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                alert(`${name} is already in the cart.`);
                return;
            }

            // Create a new cart item object
            const cartItem = { name, price };

            // Add the new cart item to the cart items array
            cartItems.push(cartItem);

            // Update the cart offcanvas
            renderCartItems();
        }

        function renderCartItems() {
            // Clear the cart container
            cartItemsContainer.innerHTML = ''; 

            // Loop through the cart items and add them to the offcanvas
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-3');
                itemDiv.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        <small class="text-muted">$${item.price}</small>
                    </div>
                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });

            // If there are no items in the cart, show a message
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
            }

            // Add event listeners for the "Remove" buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemIndex = this.getAttribute('data-index');
                    removeFromCart(itemIndex);
                });
            });

            // Automatically open the offcanvas when an item is added
            const shoppingCartCanvas = new bootstrap.Offcanvas(document.getElementById('shoppingCartCanvas'));
            shoppingCartCanvas.show();
        }

        function removeFromCart(index) {
            // Remove the item from the cart items array
            cartItems.splice(index, 1);

            // Re-render the cart items
            renderCartItems();
        }
    });

    
    


    
     // Fetch products from Fake Store API
    //  fetch('https://fakestoreapi.com/products')
    //      .then(response => response.json())
    //      .then(data => {
    //          const productGrid = document.getElementById('product-grid');
    //          let output = '<div class="row">'; // Start first row
    //          data.forEach((product, index) => {
    //              // Add a product card
    //              output += `
    //                  <div class="col-md-3 mb-4">
    //                      <div class="card h-100">
    //                          <img src="${product.image}" class="card-img-top" alt="${product.title}">
    //                          <div class="card-body">
    //                              <h5 class="card-title">${product.title}</h5>
    //                              <p class="card-text">$${product.price}</p>
    //                          </div>
    //                      </div>
    //                  </div>
    //              `;

    //              // Close the row after every 4 cards
    //              if ((index + 1) % 4 === 0) {
    //                  output += '</div><div class="row">';
    //              }
    //          });

    //          output += '</div>'; // Close the final row

    //          // Inject the generated rows and product cards into the grid
    //          productGrid.innerHTML = output;
    //      })
    //      .catch(error => console.log('Error fetching products:', error));
//new
   // Array of product data
   const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 15 },
    { id: 3, name: 'Product 3', price: 20 },
    { id: 4, name: 'Product 4', price: 25 },
    { id: 5, name: 'Product 5', price: 30 },
    { id: 6, name: 'Product 6', price: 35 },
    { id: 7, name: 'Product 7', price: 40 },
    { id: 8, name: 'Product 8', price: 45 }
];

// Inject product cards into the grid
const productGrid = document.getElementById('product-grid');
products.forEach(product => {
    productGrid.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Price: $${product.price}</p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
});

// Handle Add to Cart button click
const cartItems = [];
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        const productName = e.target.getAttribute('data-name');
        const productPrice = e.target.getAttribute('data-price');

        // Add item to cart array
        cartItems.push({ id: productId, name: productName, price: productPrice });

        // Update the cart UI
        updateCartUI();
    });
});

// Update Cart UI in Offcanvas
function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = ''; // Clear the list

    cartItems.forEach(item => {
        cartList.innerHTML += `
            <li class="list-group-item">
                ${item.name} - $${item.price}
            </li>
        `;
    });

    // Trigger the offcanvas to open
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasCart'));
    offcanvas.show();
}
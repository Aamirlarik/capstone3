


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

    let cart = []; // Initialize the cart array

    // Function to update cart badge
    function updateCartBadge(count) {
        const badge = document.querySelector('.btn-outline-secondary .badge');
        if (badge) {
            badge.textContent = count;
        }
    }
    
    // Function to update cart display in offcanvas
    function updateCartDisplay(cart) {
        const cartItemsContainer = document.getElementById('cart-items');
        let output = '';
    
        cart.forEach(item => {
            output += `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h6 class="mb-1">${item.title}</h6>
                        <p class="mb-0">$${item.price}</p>
                    </div>
                    <button class="btn btn-outline-danger btn-sm remove-from-cart" data-id="${item.id}">Remove</button>
                </div>
            `;
        });
    
        cartItemsContainer.innerHTML = output;
    }
    
    // Function to update cart total
    function updateCartTotal(cart) {
        const totalElement = document.getElementById('cart-total');
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        totalElement.textContent = `$${total}`;
    }
    
    // Fetch products and handle cart functionality
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.getElementById('product-grid');
            let output = '<div class="row">';
    
            data.forEach((product, index) => {
                output += `
                    <div class="col-md-3 mb-4">
                        <div class="card text-center">
                            <img  src="${product.image}" class="  w-50 h-55 card-img-top " alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text text-center">$${product.price}</p>
                                <button class="btn btn-dark add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    
                if ((index + 1) % 4 === 0) {
                    output += '</div><div class="row">';
                }
            });
    
            output += '</div>';
            productGrid.innerHTML = output;
    
            const cartButtons = document.querySelectorAll('.add-to-cart');
            cartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.getAttribute('data-id');
                    const productTitle = event.target.getAttribute('data-title');
                    const productPrice = parseFloat(event.target.getAttribute('data-price'));
    
                    const productToAdd = {
                        id: productId,
                        title: productTitle,
                        price: productPrice
                    };
    
                    cart.push(productToAdd); 
                    updateCartBadge(cart.length); 
                    updateCartDisplay(cart); 
                    updateCartTotal(cart); 
                });
            });
    
            // Handle removal of items from cart
            document.getElementById('shoppingCartCanvas').addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-from-cart')) {
                    const productId = event.target.getAttribute('data-id');
                    cart = cart.filter(item => item.id !== productId); 
                    updateCartBadge(cart.length);
                    updateCartDisplay(cart); 
                    updateCartTotal(cart); 
                }
            });
        })
        .catch(error => console.log('Error fetching products:', error));
    
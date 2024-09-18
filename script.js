


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

     // Fetch products from the Fake Store API
     fetch('https://fakestoreapi.com/products')
     .then(response => response.json())
     .then(data => {
         const productGrid = document.getElementById('product-grid');

         data.forEach((product) => {
             // Create a new div element for each product
             const productCard = document.createElement('div');
             productCard.classList.add('col-6', 'col-md-3', 'position-relative', 'product-card');

             // Create the inner HTML of the product card
             productCard.innerHTML = `
                 <div class="text-end me-5"><iconify-icon icon="mdi:heart-outline"></iconify-icon></div>
                 <img class="img-fluid" height="200px" src="${product.image}" width="200px" />
                 <div class="fw-bold">$${product.price}</div>
                 <div class="mt-2" id="underline">${product.title}</div>
                 <div class="mt-1 opacity-50">${product.category}</div>
                 <div class="d-flex justify-content-center mt-2">
                     <div class="favorite"><i class="far fa-heart"></i></div>
                     <div style="background-color:#F5F7F8;" id="addtocart" class="add-to-cart ms-3 rounded-2 py-1 px-2 position-absolute top-50 start-50 translate-middle ms-5 mt-2">+</div>
                 </div>
             `;

             // Append the new product card to the grid
             productGrid.appendChild(productCard);
         });
     })
     .catch(error => console.error('Error fetching products:', error));


    
     // Fetch products from Fake Store API
     fetch('https://fakestoreapi.com/products')
         .then(response => response.json())
         .then(data => {
             const productGrid = document.getElementById('product-grid');
             let output = '<div class="row">'; // Start first row
             data.forEach((product, index) => {
                 // Add a product card
                 output += `
                     <div class="col-md-3 mb-4">
                         <div class="card h-100">
                             <img src="${product.image}" class="card-img-top" alt="${product.title}">
                             <div class="card-body">
                                 <h5 class="card-title">${product.title}</h5>
                                 <p class="card-text">$${product.price}</p>
                             </div>
                         </div>
                     </div>
                 `;

                 // Close the row after every 4 cards
                 if ((index + 1) % 4 === 0) {
                     output += '</div><div class="row">';
                 }
             });

             output += '</div>'; // Close the final row

             // Inject the generated rows and product cards into the grid
             productGrid.innerHTML = output;
         })
         .catch(error => console.log('Error fetching products:', error));


let productDom = document.querySelector(".products-holder");
let cartDom = document.querySelector(".products");
let miniCartDom = document.querySelector(".mini-cart");
let openCartDom = document.querySelector(".open-cart");
let cartSpanDom = document.querySelector(".cart");
let products = JSON.parse(localStorage.getItem('products'));
let overLayDom = document.querySelector(".overlay");





$(".open-cart").on("click", function(){
    $(".mini-cart").toggleClass("open-mini-cart");
    $(".overlay").toggleClass("show-overlay");
})

$(".overlay").on("click", function(){
    $(".mini-cart").toggleClass("open-mini-cart");
    $(".overlay").toggleClass("show-overlay");
})

$(".close-cart").on("click", function(){
    $(".mini-cart").toggleClass("open-mini-cart");
    $(".overlay").toggleClass("show-overlay");
})

function drawProducts () {
    let productsUI = products.map((item) => {
        return `
        <div class="col-lg-3 col-md-4 col-sm-6 d-none d-sm-block">
            <div class="card" style="width: 100%;">
                <img src="${item.imgUrl}" class="card-img-top" alt="sporty" height="350px">
                <div class="card-body">
                    <h2 onclick="saveItemData(${item.id})" class="card-title text-center small">${item.title}</h2>
                    <p class="card-text text-center small"><img src="${item.starImgUrl}" width="100rem"></p>
                    <h2 class="card-text text-center small">$${item.price}</h2>
                    <button class="add-cart btn btn-danger" onclick="addToCart(${item.id})"><i class="fas fa-plus mr-2"></i>add to cart</button>
                    <button class="add-cart btn btn-danger" onclick="addToFav(${item.id})"><i class="fas fa-plus mr-2"></i>add to fav</button>
                </div>
            </div>
        </div>
        `;
    });
    productDom.innerHTML = productsUI.join('');
}
drawProducts();


let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
if (addedItem.length > 0) {
        addedItem.map(item => {
        cartDom.innerHTML += `
        <div class="cart-item col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h3 class="col-12  mb-1  mx-3 mx-lg-auto">${item.title}</h3>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12  my-1  mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h6 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="  mx-3 my-1 ">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        cartSpanDom.style.display="block";
        cartSpanDom.innerHTML = addedItem.length;
    });
    totalCost();
}else {
    cartDom.innerHTML = `<p class="text-danger text-center">There are no Products in your Cart</p>`;
}

// add to cart 

function addToCart(id) {
    
    let product = products.find((item) => item.id ===id);

    let isProductInCart = addedItem.some((i) => i.id ===product.id);
    if (isProductInCart) {
        addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
        });
    } else {
        addedItem.push(product);
    }

    cartDom.innerHTML = '';
    addedItem.forEach(item => {
        cartDom.innerHTML += `
        <div class="cart-item col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h3 class="col-12  mb-1  mx-3 mx-lg-auto">${item.title}</h3>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12  my-1  mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h6 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="  mx-3 my-1 ">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ` ;
    })

    
    localStorage.setItem('productsInCart', JSON.stringify(addedItem));
    let cartItemsNumber = document.querySelectorAll(".cart-item");
    cartSpanDom.style.display="block";
    cartSpanDom.innerHTML = cartItemsNumber.length;
    totalCost();
}



function saveItemData(id) {
    localStorage.setItem('productId', id);
    window.location = "product-details.html";
}




function totalCost() {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
    if (items.length > 0) {
        tCost = document.querySelector(".total-cost");
    cost = 0;
    items.forEach(item =>{
        cost += item.price * item.qty;
    });
    
    tCost.innerHTML = `
    <h5 class="col">Subtotal:</h5>
    <h5 class="col text-success">$${cost.toFixed(2)}</h5>
    `;
    } else {
        tCost.innerHTML = '';
    }
}

function removeFrmCart (id) {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
     if (productsInCart) {
        
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem('productsInCart', JSON.stringify(filteredItems));
        drawProducts(filteredItems); 


        if (filteredItems.length > 0) {
                cartDom.innerHTML = '';
                filteredItems.forEach(item => {
                cartDom.innerHTML += `
                <div class="cart-item col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h3 class="col-12  mb-1  mx-3 mx-lg-auto">${item.title}</h3>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12  my-1  mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h6 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="  mx-3 my-1 ">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
                    
                cartSpanDom.style.display="block";
                cartSpanDom.innerHTML = filteredItems.length;
            })
        } else {
            cartSpanDom.style.display="none";
            cartDom.innerHTML = `<p class="text-danger text-center">There are no Products in your Cart</p>`;
        }
    }
}

function incQty (id) {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
    let item = items.find((i) => i.id === id);
    if (item) {
        item.qty += 1;
    }
    localStorage.setItem('productsInCart', JSON.stringify(items));
    drawProducts(items);
    if (items.length > 0) {
        cartDom.innerHTML = '';
        items.forEach(item => {
        cartDom.innerHTML += `
        <div class="cart-item col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h3 class="col-12  mb-1  mx-3 mx-lg-auto">${item.title}</h3>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12  my-1  mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h6 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="  mx-3 my-1 ">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ` ;
        cartSpanDom.style.display="block";
        cartSpanDom.innerHTML = items.length;
    })
    } else {
        cartSpanDom.style.display="none";
        cartDom.innerHTML = '';
    }  
}

function decQty (id) {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
    let item = items.find((i) => i.id === id);
    if (item.qty > 1) {
        item.qty -= 1; 
    } 
    localStorage.setItem('productsInCart', JSON.stringify(items));
    drawProducts(items);
    if (items.length > 0) {
        cartDom.innerHTML = '';
        items.forEach(item => {
        cartDom.innerHTML += `
        <div class="cart-item col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h3 class="col-12  mb-1  mx-3 mx-lg-auto">${item.title}</h3>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12  my-1  mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h6 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12  my-1  mx-3 mx-lg-auto h6 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="  mx-3 my-1 ">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ` ;
        cartSpanDom.style.display="block";
        cartSpanDom.innerHTML = items.length;
    })
    } else {
        cartSpanDom.style.display="none";
        cartDom.innerHTML = '';
    }
}
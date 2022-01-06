
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
if (addedItem) {
        addedItem.map(item => {
        cartDom.innerHTML += `
        <div class="cart-item row px-5 mb-2 justify-content-between">
            <img src="${item.imgUrl}"
            <p class="">${item.title}</p>
            <p>${item.qty}</p>
        </div>`;
        cartSpanDom.style.display="block";
        cartSpanDom.innerHTML = addedItem.length;
        
    });
    totalCost();
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
        <div class="cart-item row px-5 my-2 justify-content-between border-bottom border-1">
            <img src="${item.imgUrl}"
            <p class="">${item.title}</p>
            <p>${item.qty}</p>
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
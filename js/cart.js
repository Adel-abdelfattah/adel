
let productDom = document.querySelector(".product-holder");
let noProductsDom = document.querySelector(".no-products");
let miniCartDom = document.querySelector(".mini-cart");
let openCartDom = document.querySelector(".open-cart");
let cartSpanDom = document.querySelector(".cart");
let cartDom = document.querySelector(".products");



let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
if (addedItem) {
        addedItem.map(item => {
        cartDom.innerHTML += `
        <div class="cart-item row px-5 mb-2 justify-content-between border-bottom border-1">
            <img src="${item.imgUrl}"
            <p class="">${item.title}</p>
            <p>${item.qty}</p>
        </div>`;
        cartSpanDom.style.display="block";
        cartSpanDom.innerHTML = addedItem.length;
    });
    
}




// openCartDom.addEventListener('click', displayMiniCart)
// function displayMiniCart (){
    
//     if(miniCartDom.style.display == "block"){
//         miniCartDom.style.display = "none";
//     } else{
//         miniCartDom.style.display = "block";
//     }
// }
$(".open-cart").on("click", function(){
    $(".mini-cart").toggleClass("open-mini-cart");
    $(".overlay").toggleClass("show-overlay");
})

$(".overlay").on("click", function(){
    $(".mini-cart").toggleClass("open-mini-cart");
    $(".overlay").toggleClass("show-overlay");
})



function drawProducts (allProducts = []) {
    if (JSON.parse(localStorage.getItem('productsInCart')).length === 0)
    noProductsDom.innerHTML= `<p>There are no Products in your Cart</p>`;
    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
    let productsUI = products.map((item) => {
        return `
        <div class="col-12 my-2 border-bottom py-2">
            <div class="row justify-content-start align-items-center">
                <div class="">
                    <img src="${item.imgUrl}">
                </div>
                <div class="col flex-grow-1 ">
                    <div class=" justify-content-start align-items-center row flex-grow-1">
                        <h2 class="col-12 col-lg-2 my-1 my-lg-0 mx-3 mx-lg-auto">${item.title}</h2>
                        <p class="col-12 col-lg-2 my-1 my-lg-0 mx-3 mx-lg-auto h5 text-success"><span class="pr-2 text-dark">price</span>$${item.price}</p>
                        <div class="col-12 col-lg-2 my-1 my-lg-0 mx-3 mx-lg-auto d-flex qty align-items-center">
                            <div class="dec mr-2"><i class="fa fa-minus badge-danger rounded-circle p-1 hvr-pop" onclick="decQty(${item.id})"></i></div>
                            <div class="numb mx-2 text-success h5 mb-0">${item.qty}</div>
                            <div class="dec mx-2"><i class="fa fa-plus badge-danger rounded-circle p-1 hvr-pop" onclick="incQty(${item.id})"></i></div>
                        </div>
                        <p class="col-12 col-lg-2 my-1 my-lg-0 mx-3 mx-lg-auto h5 pr-2 text-success"><span class="pr-2 text-dark">Total</span>$${item.price * item.qty}</p>
                        <div class="col-lg-2 mx-lg-auto mx-3 my-1 my-lg-0">
                            <button class="add-cart btn btn-danger" onclick="removeFrmCart(${item.id})"><i class="fas fa-trash mr-2"></i>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    productDom.innerHTML = productsUI.join('');
    totalCost();
}
drawProducts();

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
                <div class="cart-item row px-5 mb-2 justify-content-between border-bottom border-1">
                    <img src="${item.imgUrl}"
                    <p class="">${item.title}</p>
                    <p>${item.qty}</p>
                </div>`;
                    
                cartSpanDom.style.display="block";
                cartSpanDom.innerHTML = filteredItems.length;
            })
        } else {
            cartSpanDom.style.display="none";
            cartDom.innerHTML = '';
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
        <div class="cart-item row px-5 mb-2 justify-content-between border-bottom border-1">
                    <img src="${item.imgUrl}"
                    <p class="">${item.title}</p>
                    <p>${item.qty}</p>
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
        <div class="cart-item row px-5 mb-2 justify-content-between border-bottom border-1">
                    <img src="${item.imgUrl}"
                    <p class="">${item.title}</p>
                    <p>${item.qty}</p>
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

function totalCost() {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
    if (items.length > 0) {
        tCost = document.querySelector(".totalCost");
    cost = 0;
    items.forEach(item =>{
        cost += item.price * item.qty;
    });
    
    tCost.innerHTML = `
    <h3 class="float-right mr-5">Subtotal  <span class="text-success">$${cost.toFixed(2)}</span></h3>
    
    `;
    } else {
        tCost.innerHTML = '';
    }
}


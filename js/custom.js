
let productDom = document.querySelector(".products-holder");
let cartDom = document.querySelector(".products");
let miniCartDom = document.querySelector(".mini-cart");
let openCartDom = document.querySelector(".open-cart");
let cartSpanDom = document.querySelector(".cart");
let products = JSON.parse(localStorage.getItem('products'));
let overLayDom = document.querySelector(".overlay");
let favSpanDom = document.querySelector(".fav");




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
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 px-4 px-sm-3 mt-4">
        <div class="row mx-0">
            <div class="overflow-hidden position-relative card-carousel col-12 px-0">
                <img src="${item.imgUrl}"  alt="sporty" class="w-100" >
                <div class="bton-grp position-absolute d-flex justify-content-between">
                    <button class="add-cart btn btn-danger px-3 py-1 mx-1" data-toggle="modal" data-target="#preview" onclick="preview(${item.id})"><i class="fas fa-expand-alt"></i></button>
                    <button class="add-cart btn btn-danger px-3 py-1 mx-1" onclick="addToFav(${item.id})"><i class="fas fa-heart"></i></button>
                    <button class="add-cart btn btn-danger px-3 py-1 mx-1" onclick="addToCart(${item.id})"><i class="fas fa-shopping-bag  "></i></button>
                </div>
            </div>
            <div class="col-12">
                <div class="">
                    <h6 onclick="saveItemId(${item.id})" class="details">${item.title}</h6>
                    <h5 class="text-success">$${item.price}<img src="${item.starImgUrl}" class="w-25 ml-2"></h5>
                </div>
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
            <div class="row justify-content-start align-items-stretch">
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
    })
} else {
    cartDom.innerHTML = `<p class="text-danger text-center">There are no Products in your Cart</p>`;
}

let favItem = localStorage.getItem('favProducts') ? JSON.parse(localStorage.getItem('favProducts')) : [];
if (favItem.length > 0) {
    favSpanDom.style.display="block";
    favSpanDom.innerHTML = favItem.length;
}
// add to cart 

function addToCart(id) {
    let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
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
            <div class="row justify-content-start align-items-stretch">
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



function saveItemId(id) {
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
            <div class="row justify-content-start align-items-stretch">
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
    totalCost();
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
            <div class="row justify-content-start align-items-stretch">
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
    totalCost();  
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
            <div class="row justify-content-start align-items-stretch">
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
    totalCost();
}

function addToFav(id) {
    let favItem = localStorage.getItem('favProducts') ? JSON.parse(localStorage.getItem('favProducts')) : [];
    let product = products.find((item) => item.id ===id);

    let isProductInCart = favItem.some((i) => i.id ===product.id);
    if (isProductInCart) {
        favItem = favItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
        });
    } else {
        favItem.push(product);
    }
    
    favSpanDom.style.display="block";
    favSpanDom.innerHTML = favItem.length;
    localStorage.setItem('favProducts', JSON.stringify(favItem));
    
}


function preview(id){
    let prevModalTitle = document.querySelector(".prev-title");
    let prevModalImg = document.querySelector(".preview-modal");
    let product = products.find((item) => item.id ===id);

    prevModalImg.innerHTML=  `<img src="${product.imgUrl}" class="w-100">`;
    prevModalTitle.innerHTML=  product.title;
}

let productDom = document.querySelector(".product-holder");
let noProductsDom = document.querySelector(".no-products");
let miniCartDom = document.querySelector(".mini-cart");
let openCartDom = document.querySelector(".open-cart");
let cartSpanDom = document.querySelector(".cart");
let cartDom = document.querySelector(".products");
let products = JSON.parse(localStorage.getItem('products'));
let carouselDom = document.querySelector(".carousel-holder");



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
    })
} else {
    cartDom.innerHTML = `<p class="text-danger text-center">There are no Products in your Cart</p>`;
}



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

    let productsInCart = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];

    if (productsInCart.length ===0) {
        noProductsDom.innerHTML= `<p>There are no Products in your Cart</p>`;
    } else {
        console.log(productsInCart);
        let productsUI = productsInCart.map((item) => {
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
        noProductsDom.innerHTML= '';
        totalCost();
    }
}
drawProducts();

function removeFrmCart (id) {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
     if (productsInCart) {
        
        let filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem('productsInCart', JSON.stringify(filteredItems));
        
        
        if (filteredItems.length < 1) {
            cartSpanDom.style.display="none";
            cartDom.innerHTML = `<p class="text-danger text-center">There are no Products in your Cart</p>`;
            noProductsDom.innerHTML= `<p>There are no Products in your Cart</p>`;
            productDom.innerHTML ='';
        } else {
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
            drawProducts();
            console.log("ffhgfh");
            console.log(filteredItems.length);
            
        })
        }
        totalCost();
        drawProducts();

        
        
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
    totalCost();
}



function totalCost() {
    let productsInCart = localStorage.getItem('productsInCart');
    let items = JSON.parse(productsInCart);
    tCost = document.querySelector(".total-cost");
    totCost = document.querySelector(".tot-cost");
    if (items && items.length > 0) {
    cost = 0;
    items.forEach(item =>{
        cost += item.price * item.qty;
    });
    
    tCost.innerHTML = `
    <h3 class="float-right mr-5">Subtotal  <span class="text-success">$${cost.toFixed(2)}</span></h3>
    
    `;
    totCost.innerHTML = `
    <h3 class="float-right mr-5">Subtotal  <span class="text-success">$${cost.toFixed(2)}</span></h3>
    
    `;
    } else {
        tCost.innerHTML = '';
        totCost.innerHTML = '';
    }
}


$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            smartSpeed: 3000,
            autoplay: false,
            dots: 0,
            navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
            responsive:{
                0:{
                    items:2
                },
                576:{
                    items:2
                },
                768:{
                    items:3
                },
                992:{
                    items:4
                },			
                1200:{
                    items:5
                }
            }
    });
})

function drawCarousel () {
    let products = JSON.parse(localStorage.getItem('products'));
    let productsUI = products.map((item) => {
        return `
        <div>
            <div class="overflow-hidden position-relative card-carousel">
                <img src="${item.imgUrl}"  alt="sporty">
                <div class="bton-grp position-absolute d-flex justify-content-between">
                    <button class="add-cart btn btn-danger px-3 py-1 mx-1" onclick="addToCart(${item.id})"><i class="fas fa-shopping-bag  "></i></button>
                    <button class="add-cart btn btn-danger px-3 py-1 mx-1" onclick="addToFav(${item.id})"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="row mx-0">
                <h5 onclick="saveItemData(${item.id})" class="col-12 pl-2">${item.title}</h5>
                <h5 class="col-6 px-0"><img src="${item.starImgUrl}" ></h5>
                <h5 class="col-6 text-success">$${item.price}</h5>
            </div>
        </div>
        `;
    });
    carouselDom.innerHTML = productsUI.join('');
}
drawCarousel();

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
    drawProducts(); 
}

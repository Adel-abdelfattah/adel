let miniCartDom = document.querySelector(".mini-cart");
let openCartDom = document.querySelector(".open-cart");
let cartSpanDom = document.querySelector(".cart");
let cartDom = document.querySelector(".products");




let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];

if (addedItem) {
            addedItem.map(item => {
            cartDom.innerHTML += `
            <div class="cart-item row justify-content-around">
                <p>${item.title}</p>
                <p>${item.qty}</p>
            </div>`;
            cartSpanDom.style.display="block";
            cartSpanDom.innerHTML = addedItem.length;
        });
    
}



openCartDom.addEventListener('click', displayMiniCart)
function displayMiniCart (){
    
    if(miniCartDom.style.display == "block"){
        miniCartDom.style.display = "none";
    } else{
        miniCartDom.style.display = "block";
    }
}

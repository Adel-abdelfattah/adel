let products = JSON.parse(localStorage.getItem('products'));
let productId = localStorage.getItem('productId');
let productDetailsDom = document.querySelector(".products-details");
let productDetails = products.find(item => item.id == productId);




productDetailsDom.innerHTML =`
    <div class="col-lg-3 col-md-4 col-sm-6 d-none d-sm-block">
        <div class="card" style="width: 100%;">
            <img src="${productDetails.imgUrl}" class="card-img-top" alt="sporty" height="350px">
            <div class="card-body">
                <h2 onclick="saveItemData(${productDetails.id})" class="card-title text-center small">${productDetails.title}</h2>
                <p class="card-text text-center small"><img src="${productDetails.starImgUrl}" width="100rem"></p>
                <h2 class="card-text text-center small">$${productDetails.price}</h2>
                <button class="add-cart btn btn-danger" onclick="addToCart(${productDetails.id})"><i class="fas fa-plus mr-2"></i>add to cart</button>
            </div>
        </div>
    </div>
`


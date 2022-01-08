let products = JSON.parse(localStorage.getItem('products'));
let productId = localStorage.getItem('productId');
let productDetailsDom = document.querySelector(".products-details");
let productDetails = products.find(item => item.id == productId);




productDetailsDom.innerHTML =`
    <img src="${productDetails.imgUrl}">
`


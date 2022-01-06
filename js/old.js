let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'blac vest',
        description: 'very nice black vest',
        tag: 'product-1',
        price: 10,
        incart: 0,
        image: 'product-1',
    },
    {
        name: 'blac Tshirt',
        description: 'very nice black Tshirt',
        tag: 'blackTshirt',
        price: 20,
        incart: 0,
        image: 'product-2'
    },
    {
        name: 'white vest',
        description: 'very nice white vest',
        tag: 'whitevest',
        price: 30,
        incart: 0,
        image: 'product-3'
    },
    {
        name: 'white Tshirt',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt',
        price: 40,
        incart: 0,
        image: 'product-4'
    },
    {
        name: 'adel-1',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt1',
        price: 40,
        incart: 0,
        image: 'product-5'
    },
    {
        name: 'adel-2',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt2',
        price: 40,
        incart: 0,
        image: 'product-6'
    },
    {
        name: 'adel-3',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt3',
        price: 40,
        incart: 0,
        image: 'product-7'
    },
    {
        name: 'adel-4',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt4',
        price: 40,
        incart: 0,
        image: 'product-8'
    },
    {
        name: 'adel-5',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt5',
        price: 40,
        incart: 0,
        image: 'product-9'
    },
    {
        name: 'adel-6',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt6',
        price: 40,
        incart: 0,
        image: 'product-10'
    },
    {
        name: 'adel-7',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt7',
        price: 40,
        incart: 0,
        image: 'product-11'
    },
    {
        name: 'adel-8',
        description: 'very nice white Tshirt',
        tag: 'whiteTshirt8',
        price: 40,
        incart: 0,
        image: 'product-12'
    }
]

for (let i=0; i < carts.length; i++) {
    
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.shop span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {
        productNumbers = parseInt(productNumbers);
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.shop span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.shop span').textContent =  1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems, [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    } else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}



function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null) {
        cartCost= parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    let productHolder = document.querySelector(".product-holder");
    cartItems = JSON.parse(cartItems);
    if (cartItems && productHolder) {
        productHolder.innerHTML = '';
        Object.values(cartItems).map(item => {
            productHolder.innerHTML += ` 
            <tr>
                <td class="align-middle"><img src="img/product/${item.image}.jpg"></td>
                <td class="align-middle">${item.name}</td>
                <td class="align-middle">${item.price}</td>
                <td class="align-middle">
                    <button type="button" class="btn btn-danger rounded-circle py-1 px-2">
                        <i class="fas fa-minus"></i>
                    </button>
                    
                    <span class="h5 mb-0 align-middle mx-3">${item.incart}</span>
                    <button type="button" class="btn btn-danger rounded-circle py-1 px-2">
                        <i class="fas fa-plus"></i>
                    </button>

                    <button type="button" class="btn btn-danger rounded-circle py-1 px-2 ml-3 ">
                        <i class="fas fa-trash-alt remove-cart"></i>
                    </button>
                    
                    
                </td>
                <td class="align-middle">${item.price * item.incart}</td>

            </tr>
            `
        })
    }
}
onLoadCartNumbers();
displayCart();

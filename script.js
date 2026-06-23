// Get products from local storage

let products =
JSON.parse(localStorage.getItem("products")) || [];

displayProducts();

document
.getElementById("productForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
    document.getElementById("productName").value;

    let quantity =
    document.getElementById("quantity").value;

    let price =
    document.getElementById("price").value;

    let editIndex =
    document.getElementById("editIndex").value;

    let product = {
        name,
        quantity,
        price
    };

    if(editIndex !== ""){

        products[editIndex] = product;

        document.getElementById("editIndex").value = "";

    }else{

        products.push(product);

    }

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    document.getElementById("productForm").reset();

    displayProducts();

});

function displayProducts(){

    let table =
    document.getElementById("productTable");

    table.innerHTML = "";

    let totalQuantity = 0;
    let totalValue = 0;

    products.forEach((product,index)=>{

        totalQuantity += Number(product.quantity);

        totalValue +=
        Number(product.quantity) *
        Number(product.price);

        table.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>${product.quantity}</td>

            <td>₹${product.price}</td>

            <td>

                <button
                class="btn btn-warning btn-sm"
                onclick="editProduct(${index})">

                Edit

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteProduct(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;
    });

    document.getElementById(
        "totalProducts"
    ).innerText = products.length;

    document.getElementById(
        "totalQuantity"
    ).innerText = totalQuantity;

    document.getElementById(
        "totalValue"
    ).innerText = "₹" + totalValue;
}

function editProduct(index){

    document.getElementById(
        "productName"
    ).value = products[index].name;

    document.getElementById(
        "quantity"
    ).value = products[index].quantity;

    document.getElementById(
        "price"
    ).value = products[index].price;

    document.getElementById(
        "editIndex"
    ).value = index;
}

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );

        displayProducts();
    }
}

document
.getElementById("search")
.addEventListener("keyup", function(){

    let value =
    this.value.toLowerCase();

    let rows =
    document.querySelectorAll(
        "#productTable tr"
    );

    rows.forEach(row=>{

        let name =
        row.children[0]
        .innerText
        .toLowerCase();

        row.style.display =
        name.includes(value)
        ? ""
        : "none";

    });

});
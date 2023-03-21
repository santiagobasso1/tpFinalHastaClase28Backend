
const idCarrito = "64193a74027df4fc25ebc08c"; //Hasta ver forma de como pasar el id 
async function renderProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        console.log(products)
        products.payload.forEach(product => {
            document.getElementById("productsCard").innerHTML +=
                `
                    <div class="card col-sm-2 cardProduct">
                    <img class="card-img-top imagenCardProducts" src="${product.thumbnail}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description} </p>
                        <p class="card-text">Precio: ${product.price} </p>       
                        <p class="card-text">Stock: ${product.stock} </p>   
                        <p class="card-text">Code: ${product.code} </p>                                               
                        <a id="botonProductoEliminar${product._id}" class="btn btn-primary">Eliminar</a>
                        <a id="botonProductoAddCart${product._id}" class="btn btn-primary">Agregar al Carrito</a>

                    </div>
                    `
        })
        products.payload.forEach(product => {
            document.getElementById(`botonProductoEliminar${product._id}`).addEventListener("click", async (e) => {
                const response = await fetch(`/api/products/${product._id}`, {
                    method: 'DELETE'
                });
                document.getElementById("productsCard").innerHTML = ""
                renderProducts();
            })
        })
        products.payload.forEach(product => {
            document.getElementById(`botonProductoAddCart${product._id}`).addEventListener("click", async (e) => {
                const response = await fetch(`/api/carts/${idCarrito}/products/${product._id}`, {
                    method: 'POST'
                });
                document.getElementById("productsCard").innerHTML = ""
                renderProducts();
            })
        })
        


    } catch (error) {
        console.error(error);
    }
}

async function botonEnviar() {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = parseFloat(document.getElementById('price').value);
        const thumbnail = [document.getElementById('thumbnail').value];
        const code = document.getElementById('code').value;
        const stock = parseInt(document.getElementById('stock').value);
        const status =true;
        const category = document.getElementById('category').value;

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, //Sin estas lineas no agrega
                body: JSON.stringify(newProduct),
            });
            document.getElementById("productsCard").innerHTML = ""
            renderProducts(); //Para recargar la pagina
        } catch (error) {
            console.log(error);
        }
        productForm.reset();
    });
}


renderProducts();
botonEnviar();
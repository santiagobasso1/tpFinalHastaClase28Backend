import fs from "fs";



class Producto {
    constructor(title, description, price, thumbnail, code, stock,status,category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.category = category;
    }
}



const producto1 = new Producto("Ryzen Threadripper 3990x", "Procesador Gaming gama alta", 490000, [] , "aaaa", 23,true,"procesadores");
const producto2 = new Producto("Z590 Ultra", "Motherboard Gama Alta", 82000, [] , "aaab", 256,true,"motherboards");
const producto3 = new Producto("Zenith II Alpha", "Motherboard Gama Alta", 1000000, [] , "aaac", 56,true,"motherboards");
const producto4 = new Producto("Rx 5500 xt ASUS", "Grafica Gama Media Alta", 100000, [] , "aaad", 32,true,"tarjetas graficas");
const producto5 = new Producto("I7 4790", "Procesador Gama Media", 82000, [] , "aaae", 22,true,"procesadores");

const producto6 = new Producto("Z97_Gaming_3", "Motherboard", 24232, [] , "aaaf", 253,true,"motherboards");
const producto7 = new Producto("IX570 Plus", "Motherboard", 46200, [] , "aaag", 56,true,"motherboards");
const producto8 = new Producto("I7 11700K", "Procesador gama alta", 2525234, [] , "aaah", 526,true,"procesadores");
const producto9 = new Producto("RTX 3090 EVGA", "Grafica Gama Alta", 32421, [] , "aaai", 32,true,"tarjetas graficas");
const producto10 = new Producto("Ryzen 5 5600", "Procesador Gama Media", 132512, [] , "aaaj", 22,true,"procesadores");

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    checkArchivo = ()=>{
        return fs.existsSync(this.path)       
    }
    crearArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    addProduct = async (newProduct,pathImg) => {
        if (newProduct.status===true && newProduct.category.length>0 &&toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0  && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; //Esto para que sea incremental dependiendo del ultimo elemento
                    newProduct.thumbnail=pathImg;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    newProduct.thumbnail=pathImg;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async({id, title, description, price, thumbnail, code, stock, status, category})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (aux.some(prod => prod.code==code)){
                console.error("No puede poner un codigo que ya existe")
            }else if(code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }        
            if (status!=undefined){
                if (status==false)
                {
                    aux[pos].status = false;
                }else{
                    aux[pos].status = true;
                }
            }
            if (category!=undefined){
                if (category.length>0)
                {
                    aux[pos].category = category;
                }
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return null
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
    }
        
    cargarArchivo = async () => {
        //tests pedidos y adicionales:
        await this.crearArchivo(); //Es para que si no tiene el array vacio al inicio se lo ponga así evitamos errores, y para asegurarnos que existe el archivo
        await this.addProduct(producto1, ["public/img/threadripper3990x.jpg","Otra posible imagen"]);
        await this.addProduct(producto2, ["public/img/aorusZ590ULTRA.jpg"]);
        await this.addProduct(producto3, ["public/img/ROGthreadripper.jpg"]);
        await this.addProduct(producto4, ["public/img/rx5500xt.jpg"]);
        await this.addProduct(producto5, ["public/img/i7_4790.jpg"]);
        await this.addProduct(producto6, ["public/img/Z97Gaming3.jpg"]);
        await this.addProduct(producto7, ["public/img/X570plus.jpg"]);
        await this.addProduct(producto8, ["public/img/i7_11700k.jpg"]);
        await this.addProduct(producto9, ["public/img/rtx3090.jpg"]);
        await this.addProduct(producto10, ["public/img/Ryzen_5_5600.jpg"]);

    }

}
// const manager = new ProductManager('../models/products.json');
// const tests = async()=>{
//     await manager.updateProduct({id:1,title:"2",description:"3",price:"4",thumbnail:["5"],code:"6",stock:"7",status:false,category:"9"})
// };

// tests();




// tests()






import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";



const url = process.env.URLMONGODB

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: Array,
        required: true,
        default: ["/img/noImg"]
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})



productSchema.plugin(paginate);

export class productManagerMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "products", productSchema)
        //Aqui irian los atributos propios de la clase
    }
    async paginate(filtro,opciones){
        this.setConnection();
        try{
            return await this.model.paginate(filtro,opciones)
        }catch(error){
            return error;
        }
    }
    async aggregate(opciones){
        this.setConnection();
        try{
            return await this.model.aggregate(opciones)
        }catch(error){
            return error;
        }
    }
}

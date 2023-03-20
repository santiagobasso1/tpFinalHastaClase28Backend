import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

export class ManagerMongoDB {

    #url
    constructor(url, collection, schema) {
        this.#url = url //Atributo privado
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema) 
    }

    async setConnection() { //Le tuve que sacar el privado ya que necesité utilizarlo en "product.js" por el tema del paginate
        try {
            await mongoose.connect(this.#url)
            console.log("DB is connected")
        } catch (error) {
            return error
        }
    }

    async addElements(elements) { //Agrego 1 o varios elementos
        this.setConnection()
        try {
            return await this.model.insertMany(elements)
        } catch (error) {
            return error
        }
    }

    async getElements() {
        this.setConnection()
        try {
            return await this.model.find()
        } catch (error) {
            return error
        }
    }

    async getElementById(id) { //Agrego 1 o varios elementos
        this.setConnection()
        try {
            return await this.model.findById(id)
        } catch (error) { 
            return undefined //CAMBIE A UNDEFINED PARA PODER SABER SI ES O NO UN PRODUCTO LO QUE DEUVELVE
        }
    }

    async updateElement(id, info) {
        this.setConnection()
        try {
            return await this.model.findByIdAndUpdate(id, info)
        } catch (error) {
            return error
        }
    }

    async deleteElement(id) {
        this.setConnection()
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }

}
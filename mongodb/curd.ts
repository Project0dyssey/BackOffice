import { ObjectId } from "mongodb"
import { GetCollection } from "./mongoConnect"

//Variaveis de ambiente, está no ficheiro .env
const dbName: string = process.env.DBNAME!
const collectionName: string = process.env.DBCOLLECTION!

/////////////////////////////// site ///////////////////// 
export async function FilterProducts(category: string, collectionP: Array<string>) {
    const collection = await GetCollection(dbName, collectionName)

    let result
    if(category !== 'All' && collectionP.length > 0){
        result = await collection.find({category: category, collection: {$in: collectionP}}).toArray()
        //Pega os produtos que tenham uma categoria e que tenha uma coleção/es selecionadas
    
    } else if(category === 'All' && collectionP.length > 0){
        result = await collection.find({collection: {$in: collectionP}}).toArray()
        //Pega os produtos em que que a categoria não está selecionada mas tem coleçõa/es selecionadas

    } else if(category !== 'All' && collectionP.length === 0){
        result = collection.find({category: category}).toArray()
        //Pega os produtos em que a categoria está selecionada mas não tem coleções selecionadas

    } else {
        result = await collection.find().toArray()
        //Caso não tenha nenhum filtro selecionado
    }
    return result
}

/////////////////////////////// site /////////////////////
//////////////////////////////BackOffice/////////////////

//Adicionar novos produtos
export async function AddNewProduct(products: any) {
    const collection = await GetCollection(dbName, collectionName)
    const result = await collection.insertMany(products)
    return result
}

//Apagar produto
export async function DeleteProduct(id: string) {
    const collection = await GetCollection(dbName, collectionName)
    const result = await collection.deleteOne({_id: new ObjectId(id)})
    return result
}

interface modifyType{
    _id: string
    productName: string
    productNameEng: string
    category: string
    collection: string
    descriptionPt: string
    descriptionEn: string
    imgUrl: string
    smallImg: Array<string>
}

//Modificar produto
export async function ModifyProduct(modify: modifyType) {
    const collection = await GetCollection(dbName, collectionName)
    const result = await collection.replaceOne({_id: new ObjectId(modify._id)}, {productName: modify.productName,
    productNameEng: modify.productNameEng,
    category: modify.category,
    collection: modify.collection,
    descriptionPt: modify.descriptionPt,
    descriptionEn: modify.descriptionEn,
    imgUrl: modify.imgUrl,
    smallImg: modify.smallImg })
    return result
}
import { lchown } from "fs"
import { clearLine } from "readline"

interface infoType{
    category: string
    collection: Array<string>
}

export async function products(info: infoType){

    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(info)
    }

    const res = await fetch('/api/v1/products', options)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    } else {
        return []
    }
}

export async function GetProduct(id: string) {
    const option = {
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
    }

    const res = await fetch(`/api/v1/manage/${id}`, option)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return 'Error'
}

export async function ModifyProduct(product: any, savedPhotos: any, page: string){
    //Upload da foto principal Cloudinary
    if(savedPhotos.photoPrincipal && page === 'modify'){
        try{
            const formData = new FormData()
            formData.append('file', savedPhotos.photoPrincipal)
            formData.append('upload_preset', 'irwceypd')

            const options1Photo = {
                method: 'POST',
                body: formData
            }

            const uploadCloud1Photo = await fetch(`https://api.cloudinary.com/v1_1/cloudorganicmean/image/upload`, options1Photo)
            if(uploadCloud1Photo.status === 200){
                const body = await uploadCloud1Photo.json()
                product.imgUrl = body.url
            }

        } catch(err){
            console.log(err);
        }

        
    }

    //Upload das outras fotos cloudinary
    if(savedPhotos.otherPhotos.length > 0 && page === 'modify'){
        if(savedPhotos.otherPhotos.length === 1){

            const formData = new FormData()
            formData.append('file', savedPhotos.otherPhotos[0])
            formData.append('upload_preset', 'irwceypd') 

            const options1SmallPhoto = {
                method: 'POST',
                body: formData
            }

            const uploadCloud1Photo = await fetch(`https://api.cloudinary.com/v1_1/cloudorganicmean/image/upload`, options1SmallPhoto)
            if(uploadCloud1Photo.status === 200){
                const body = await uploadCloud1Photo.json()
                product.smallImgs = product.smallImgs.map((el: string) => el.startsWith('blob') ? body.url : el)
            }
        } else {
            const formData = new FormData()
            for(let i = 0; i < savedPhotos.otherPhotos.length; i ++){
                formData.append('file', savedPhotos.otherPhotos[i][0])
                formData.append('upload_preset', 'irwceypd')

                const options1SmallPhoto2 = {
                    method: 'POST',
                    body: formData
                }

                const uploadCloud1Photo = await fetch(`https://api.cloudinary.com/v1_1/cloudorganicmean/image/upload`, options1SmallPhoto2)
                if(uploadCloud1Photo.status === 200){
                const body = await uploadCloud1Photo.json()
                product.smallImgs = product.smallImgs.map((el: string) => el.startsWith('blob') ? body.url : el)
            }
            }
        }
    }
    // Adicionar novo produto
    if(page === 'addProduct'){
        const formData = new FormData()
            formData.append('file', savedPhotos.photoPrincipal)
            formData.append('upload_preset', 'irwceypd')
        const options1Photo = {
            method: 'POST',
            body: formData
        }
        const uploadCloud1Photo = await fetch(`https://api.cloudinary.com/v1_1/cloudorganicmean/image/upload`, options1Photo)
            if(uploadCloud1Photo.status === 200){
                const body = await uploadCloud1Photo.json()
                product.imgUrl = body.url
            }
            
        const formData2 = new FormData()
            for(let i = 0; i < savedPhotos.otherPhotos.length; i ++){
                formData2.append('file', savedPhotos.otherPhotos[i])
                formData2.append('upload_preset', 'irwceypd')

                const options1SmallPhoto2 = {
                    method: 'POST',
                    body: formData2
                }

                const uploadCloud1Photo = await fetch(`https://api.cloudinary.com/v1_1/cloudorganicmean/image/upload`, options1SmallPhoto2)
                if(uploadCloud1Photo.status === 200){
                    const body = await uploadCloud1Photo.json()
                    product.smallImgs = product.smallImgs.map((el: string) => el.startsWith('blob') ? body.url : el)
                }
            }

    }
    // fazer o update à base de dados
    const options4DB = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(product)
    }

    const UpdateDatabase = await fetch('/api/v1/manage/modify', options4DB)
    if(UpdateDatabase.status === 200){
        return true
    }

    return false
}
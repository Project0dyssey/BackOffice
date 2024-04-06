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

export async function ModifyProduct(product: any, savedPhotos: any){
    if(savedPhotos.photoPrincipal){
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
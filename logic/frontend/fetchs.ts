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

export async function ModifyProduct(product: any){
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(product)
    }

    const res = await fetch('/api/v1/manage/modify', options)
    if(res.status === 200){
        return true
    }

    return false
}
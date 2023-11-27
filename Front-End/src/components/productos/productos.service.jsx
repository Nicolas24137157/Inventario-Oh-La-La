export async function postProducto(producto){
    console.log(producto)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: producto
    };    
    const response = await fetch('http://127.0.0.1:3000/productos', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}

export async function getProductos(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },        
    };
    const response = await fetch('http://127.0.0.1:3000/productos', requestOptions)    
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data   
}

export async function getProductoById(id_producto){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
    };
    console.log(id_producto+ 'servicio')
    const response = await fetch('http://127.0.0.1:3000/productos/'+id_producto, requestOptions)
    const data = await response.json();
    console.log(response.status)    
    if(response.status != 200){
        console.log('oeeee')
        throw new Error(data);
    }
    
    return data[0]
}

export async function updateProducto(id_producto, producto){
    console.log(producto)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: producto
    };    
    const response = await fetch('http://127.0.0.1:3000/productos/'+id_producto, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function deleteProducto(id_producto){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },
    };
    const response = await fetch('http://127.0.0.1:3000/productos/'+id_producto, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

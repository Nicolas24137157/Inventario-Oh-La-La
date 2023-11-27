export async function postProveedor(proveedor){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: proveedor
    };    
    const response = await fetch('http://127.0.0.1:3000/proveedores', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data 
}

export async function getProveedor(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/proveedores', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data        
}

export async function getProveedorById(id_proveedor){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    console.log(id_proveedor)
    console.log("hola")
    const response = await fetch('http://127.0.0.1:3000/proveedores/'+ id_proveedor, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data [0]   
}

export async function updateProveedor(id_proveedor, proveedor){
    console.log(proveedor)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: proveedor
    };    
    const response = await fetch('http://127.0.0.1:3000/proveedores/'+ id_proveedor, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function deleteProveedor(id_proveedor){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/proveedores/'+ id_proveedor, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

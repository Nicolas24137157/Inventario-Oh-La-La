export async function postInventario(inventario){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: inventario
    };    
    const response = await fetch('http://127.0.0.1:3000/inventario', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data 
}

export async function getinventario(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/inventario', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data        
}

export async function getInsumos(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/insumos', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        console.log("hola")
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

export async function getinventarioById(id_inventario){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    
    const response = await fetch('http://127.0.0.1:3000/inventario/'+ id_inventario, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data [0]   
}

export async function updateinventario(id_inventario, inventario){
    console.log(id_inventario + 'HOLAAAA')
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' ,
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: inventario
    };    
    const response = await fetch('http://127.0.0.1:3000/inventario/'+ id_inventario, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function deleteinventario(id_inventario){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/inventario/'+ id_inventario, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

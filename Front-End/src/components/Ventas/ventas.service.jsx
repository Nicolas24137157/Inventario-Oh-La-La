export async function postventa(venta){
    console.log(venta)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: venta
    };    
    const response = await fetch('http://127.0.0.1:3000/ventas', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}

export async function getventas(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },        
    };
    const response = await fetch('http://127.0.0.1:3000/ventas', requestOptions)    
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data   
}

export async function getventaById(id_venta){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
    };
    console.log(id_venta+ 'servicio')
    const response = await fetch('http://127.0.0.1:3000/ventas/'+id_venta, requestOptions)
    const data = await response.json();
    console.log(response.status)    
    if(response.status != 200){
        console.log('oeeee')
        throw new Error(data);
    }
    
    return data[0]
}

export async function updateventa(id_venta, venta){
    console.log(venta)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: venta
    };    
    const response = await fetch('http://127.0.0.1:3000/ventas/'+id_venta, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function deleteventa(id_venta){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },
    };
    const response = await fetch('http://127.0.0.1:3000/ventas/'+id_venta, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function postDevolucion(devolucion){
    console.log(devolucion)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: devolucion
    };    
    const response = await fetch('http://127.0.0.1:3000/devoluciones', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}

export async function getdevolucion(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },        
    };
    const response = await fetch('http://127.0.0.1:3000/devoluciones', requestOptions)    
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data   
}

export async function getdevolucionById(id_devolucion){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
    };
    console.log(id_devolucion+ 'servicio')
    const response = await fetch('http://127.0.0.1:3000/devoluciones/'+id_devolucion, requestOptions)
    const data = await response.json();
    console.log(response.status)    
    if(response.status != 200){
        console.log('oeeee')
        throw new Error(data);
    }
    
    return data[0]
}

export async function updatedevolucion(id_devolucion, devolucion){
    console.log(devolucion)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: devolucion
    };    
    const response = await fetch('http://127.0.0.1:3000/devoluciones/'+id_devolucion, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function deletedevolucion(id_devolucion){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },
    };
    const response = await fetch('http://127.0.0.1:3000/devoluciones/'+id_devolucion, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

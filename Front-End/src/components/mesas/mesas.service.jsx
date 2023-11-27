export async function postMesa(mesa){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: mesa
    };    
    const response = await fetch('http://127.0.0.1:3000/mesa', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function getMesas(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/mesa', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data          
}

export async function getMesaById(id_mesa){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/mesa/'+id_mesa, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data [0]   
}

export async function updateMesa(id_mesa, mesa){
    console.log(mesa)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: mesa
    };    
    const response = await fetch('http://127.0.0.1:3000/mesa/'+id_mesa, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data 
}

export async function deleteMesa(id_mesa){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/mesa/'+id_mesa, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data 
}

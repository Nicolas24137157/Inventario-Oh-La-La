export async function postInsumo(insumo){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token") 
    },
        body: insumo
    };
    const response = await fetch('http://127.0.0.1:3000/insumos', requestOptions)
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
        throw new Error(data);
    }
    return data     
}

export async function getInsumoById(id_insumo){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/insumos/'+id_insumo, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data [0] 
}

export async function updateInsumo(id_insumo, insumo){
    console.log(insumo)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: insumo
    };    
    const response = await fetch('http://127.0.0.1:3000/insumos/'+id_insumo, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function deleteInsumo(id_insumo){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")  
    },
    };
    const response = await fetch('http://127.0.0.1:3000/insumos/'+id_insumo, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

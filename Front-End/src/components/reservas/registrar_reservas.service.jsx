export async function postReservaMesas(reservas_mesas){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token") 
    },
        body: reservas_mesas
    };    
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

export async function getReservasMesas(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data        
}

export async function getReservasMesasById(id_reservas_mesas){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas/'+id_reservas_mesas, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data [0]
}

export async function updateReservasMesas(id_reservas_mesas, reservas_mesas){
    console.log(reservas_mesas)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: reservas_mesas
    };    
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas/'+id_reservas_mesas, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function updateEstadoReservasMesas(id_reservas_mesas, estado){
    console.log(id_reservas_mesas)
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: JSON.stringify({estado: estado})
    };    
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas/estado/'+id_reservas_mesas, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function deleteReservasMesas(id_reservas_mesas){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
    };
    const response = await fetch('http://127.0.0.1:3000/reservas_mesas/'+id_reservas_mesas, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

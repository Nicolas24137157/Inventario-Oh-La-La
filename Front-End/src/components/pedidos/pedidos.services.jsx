export async function postPedido(pedido){
    console.log(pedido)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: pedido
    };    
    const response = await fetch('http://127.0.0.1:3000/pedidos', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}


// Post Pedido Reserva
export async function postPedidoReserva(pedido){
    console.log(pedido)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: pedido
    };    
    const response = await fetch('http://127.0.0.1:3000/pedidos/pedidoReserva/', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}

// Post Pedido Domicilio
export async function postPedidoDomicilio(pedido){
    console.log(pedido)
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: pedido
    };    
    const response = await fetch('http://127.0.0.1:3000/pedidos/pedidodomicilio/', requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data    
}

export async function getpedidos(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },        
    };
    const response = await fetch('http://127.0.0.1:3000/pedidos', requestOptions)    
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data   
}

//Get Domicilio
export async function getdomicilio(){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },        
    };
    const response = await fetch('http://127.0.0.1:3000/pedidos/domicilio/', requestOptions)    
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data   
}

export async function getpedidoById(id_pedido){
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
    };
    console.log(id_pedido+ 'servicio')
    const response = await fetch('http://127.0.0.1:3000/pedidos/'+id_pedido, requestOptions)
    const data = await response.json();
    console.log(response.status)    
    if(response.status != 200){
        throw new Error(data);
    }
    
    return data[0]
}

export async function updatepedido(id_pedido, pedido){
    console.log(pedido)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        }, 
        body: pedido
    };    
    const response = await fetch('http://127.0.0.1:3000/pedidos/'+id_pedido, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

//Update Estado
export async function updateEstado(id_pedido, estado, identificacion){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 
        Authorization: 'Bearer '+localStorage.getItem("token")
    },
        body: JSON.stringify({estado: estado,identificacion:identificacion})
    };    
    const response = await fetch('http://127.0.0.1:3000/pedidos/estado/'+id_pedido, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data
}

export async function deletepedido(id_pedido){
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+localStorage.getItem("token")            
        },
    };
    const response = await fetch('http://127.0.0.1:3000/pedidos/'+id_pedido, requestOptions)
    const data = await response.json();
    if(response.status != 200){
        throw new Error(data);
    }
    return data  
}

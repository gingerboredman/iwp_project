async function getServices(){
    const url = '/servicesAdm'
    const token = sessionStorage.getItem('token')
    
        const response = await fetch(url, {
        method: 'GET', // or '
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    console.log(response)
    if(response.ok){
        const json = await response.json()
        console.log(json)
        
            for(i = json.length - 1; i>=0; --i)
            {
                tag = 'c'+i
                newItem = document.createElement("LI")
                newItem.setAttribute("class", "list-group-item")
                newItem.setAttribute("id", tag)
                document.getElementById('complaintsList').appendChild(newItem)
                document.getElementById(tag).innerHTML = '<strong>' + json[i]['serviceType'] + ': </strong>' +json[i]['description']
            }
            
    }
    // else if (response.status = 401)
    //     window.location.pathname = "/signin"
    }

async function getOrders(){
    const url = '/ordersAdm'
    const token = sessionStorage.getItem('token')
    
        const response = await fetch(url, {
        method: 'GET', // or '
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        const json = await response.json()
        console.log(json)
        
            for(i = json.length - 1; i>=0; --i)
            {
                tag = 'o'+i
                newItem = document.createElement("LI")
                newItem.setAttribute("class", "list-group-item")
                newItem.setAttribute("id", tag)
                document.getElementById('ordersList').appendChild(newItem)
                document.getElementById(tag).innerHTML = '<strong>' + json[i]['item'] + ': </strong>' +json[i]['quantity']
            }
        
    }
    // else if (response.status = 401)
    //     window.location.pathname = "/signin"
    }

async function getInfo(){
    if(sessionStorage.getItem('token') === null){
        window.location.pathname = "/signin"
    }
    getOrders()
    getServices()
    
}


window.addEventListener('load', () => getInfo())
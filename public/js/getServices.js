async function getServices(){
    const url = '/services'
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
        
            for(i = 0; i< json.length; ++i)
            {
                tag = 'c'+i
                newItem = document.createElement("LI")
                newItem.setAttribute("class", "list-group-item")
                newItem.setAttribute("id", tag)
                document.getElementById('complaintsList').appendChild(newItem)
                document.getElementById(tag).innerHTML = json[i]['description']
            }
        
    }
    else if (response.status = 401)
        window.location.pathname = "/signin"
    }
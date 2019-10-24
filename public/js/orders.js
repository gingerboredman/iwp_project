

async function markOrder(){
    console.log('selected')
const url = '/orders/' + this.name
    const token = sessionStorage.getItem('token')
    const data = {completed: true}
        const response = await fetch(url, {
        method: 'PATCH', // or '
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        getOrders()}
    

}


async function delOrder(){
const url = '/orders/' + this.name
    const token = sessionStorage.getItem('token')
        const response = await fetch(url, {
        method: 'DELETE', // or '
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        getOrders()}
    

}

async function postOrder() {
    console.log('runnung')
const url = '/orders'
    const token = sessionStorage.getItem('token')
    const item = document.getElementById('type').value
    const quantity = document.getElementById('quantity').value
    
    var data = {}
    data = {item, quantity}

    // console.log(data.serviceType)
        const response = await fetch(url, {
        method: 'POST', // or '
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        location.reload()}
}



async function getOrders(){
    const url = '/orders'
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

        var e = document.getElementById('ordersBody') 

        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
            var j = 1
            for(i = json.length - 1; i>=0; --i)
            {
                if(json[i]['completed'] === false)
                {
                tag = 'c'+i
                newItem = document.createElement("TR")
                no = document.createElement('TD')
                th1 = document.createElement('TD')
                th2 = document.createElement('TD')
                th3 = document.createElement('TD')
                th4 = document.createElement('TD')

                newItem.setAttribute("id", tag)
                no.setAttribute("id", (tag+'-'+0))
                th1.setAttribute("id", (tag+'-'+1))
                th2.setAttribute("id", (tag+'-'+2))
                th3.setAttribute("id", (tag+'-'+3))
                th4.setAttribute("id", (tag+'-'+4))

                
                
                if(json[i]['completed'] === false)
                {
                    markComplete = document.createElement('button')
                    // markComplete.setAttribute('class','')
                    markComplete.setAttribute('name', json[i]['_id']) 
                    markComplete.innerHTML = "✓" 
                    markComplete.className = "btn btn-success completedButton"
                    th4.appendChild(markComplete) 
                    
                    del = document.createElement('button')
                    // del.setAttribute('class','')
                    del.setAttribute('name', json[i]['_id']) 
                    del.setAttribute('style','margin-left:1rem; ')
                    del.className = "btn btn-danger fa fa-trash deleteButton"
                    th4.appendChild(del) 
                } else{
                    markComplete = document.createElement('button')
                    // markComplete.setAttribute('class','')
                    markComplete.setAttribute('name', json[i]['_id']) 
                    markComplete.innerHTML = "✓" 
                    markComplete.setAttribute('disabled', 'disabled')
                    markComplete.className = "btn btn-success disabled completedButton"
                    th4.appendChild(markComplete)   

                    del = document.createElement('button')
                    // del.setAttribute('class','')
                    del.setAttribute('name', json[i]['_id']) 
                    del.setAttribute('style','margin-left:1rem; ')
                    del.setAttribute('disabled', 'disabled')
                    del.className = "btn btn-danger fa fa-trash disabled deleteButton"
                    th4.appendChild(del) 
                }

              


                newItem.appendChild(no)
                newItem.appendChild(th1)
                newItem.appendChild(th2)
                newItem.appendChild(th3)
                newItem.appendChild(th4)
                
                newItem.appendChild(th4)


                document.getElementById('ordersBody').appendChild(newItem)

                document.getElementById('completedButton')
                document.getElementById((tag+'-'+0)).innerHTML = j
                document.getElementById((tag+'-'+0)).style.fontWeight = "bold"

                document.getElementById((tag+'-'+1)).innerHTML = json[i]['item']
                document.getElementById((tag+'-'+2)).innerHTML = json[i]['quantity']

                if(json[i]['completed'] === false){
                    document.getElementById((tag+'-'+3)).innerHTML = 'Pending'
                }else{
                    document.getElementById((tag+'-'+3)).innerHTML = 'Completed'
                }
            }
        j+=1}
        try{
                        // console.log('here')

        completed = document.getElementsByClassName('completedButton')
        console.log(completed.length)
        for (var i = 0; i < completed.length; i++) {
            completed[i].addEventListener('click', function() {markOrder.bind(this)();}, false);
            // console.log('here')
        }    
        
        // console.log('here')

        deleted =  document.getElementsByClassName('deleteButton')
        // console.log('here')
        for (var i = 0; i < deleted.length; i++) {
            deleted[i].addEventListener('click', function() {delOrder.bind(this)();}, false);
            // console.log('here')
        }       

        } catch(e){

        }
        
        document.getElementById('postOrder').addEventListener('click', () => postOrder())
    }
    else if (response.status = 401){
                window.location.pathname = "/signin"

    }

}




window.addEventListener('load', () => getOrders())







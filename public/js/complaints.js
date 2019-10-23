

async function markService(){
const url = '/services/' + this.name
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
        getServices()}
    

}


async function delService(){
const url = '/services/' + this.name
    const token = sessionStorage.getItem('token')
        const response = await fetch(url, {
        method: 'DELETE', // or '
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        getServices()}
    

}

async function postService() {
const url = '/services'
    const token = sessionStorage.getItem('token')
    const serviceType = document.getElementById('type').value
    const block = document.getElementById('block').value
    const roomNo = document.getElementById('roomNo').value
    const description = document.getElementById('description').value
    const data = {serviceType,
                    roomNo,
                    block,
                    description}

    console.log(data)
        const response = await fetch(url, {
        method: 'POST', // or '
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
        }
    });
    if(response.ok){
        getServices()}
}

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

        var e = document.getElementById('complaintsBody') 

        var child = e.lastElementChild;  
        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        } 
        
            for(i = json.length - 1; i>=0; --i)
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
                    markComplete.setAttribute('id','completedButton')
                    markComplete.setAttribute('name', json[i]['_id']) 
                    markComplete.innerHTML = "✓" 
                    markComplete.className = "btn btn-success"
                    th4.appendChild(markComplete)           
                } else{
                    markComplete = document.createElement('button')
                    markComplete.setAttribute('id','completedButton')
                    markComplete.setAttribute('name', json[i]['_id']) 
                    markComplete.innerHTML = "✓" 

                    markComplete.className = "btn btn-secondary disabled"
                    th4.appendChild(markComplete)   
                }

                
                del = document.createElement('button')
                del.setAttribute('id','deleteButton')
                del.setAttribute('name', json[i]['_id']) 
                del.setAttribute('style','margin-left:1rem; ')
                del.className = "btn btn-danger fa fa-trash"
                th4.appendChild(del)           
                


                newItem.appendChild(no)
                newItem.appendChild(th1)
                newItem.appendChild(th2)
                newItem.appendChild(th3)
                newItem.appendChild(th4)
                
                newItem.appendChild(th4)


                document.getElementById('complaintsBody').appendChild(newItem)

                document.getElementById('completedButton')
                document.getElementById((tag+'-'+0)).innerHTML = json.length - i
                document.getElementById((tag+'-'+0)).style.fontWeight = "bold"

                document.getElementById((tag+'-'+1)).innerHTML = json[i]['serviceType']
                document.getElementById((tag+'-'+2)).innerHTML = json[i]['description']

                if(json[i]['completed'] === false){
                    console.log(json[i]['status'])
                    document.getElementById((tag+'-'+3)).innerHTML = 'Pending'
                }else{
                    document.getElementById((tag+'-'+3)).innerHTML = 'Completed'
                }
            }

        try{
        document.getElementById('completedButton').addEventListener('click', function() {markService.bind(this)();})
        document.getElementById('deleteButton').addEventListener('click', function() {delService.bind(this)();})
        } catch(e){

        }
        
        document.getElementById('postService').addEventListener('click', () => postService())
    }
    else if (response.status = 401){
                window.location.pathname = "/signin"

    }

}




window.addEventListener('load', () => getServices())







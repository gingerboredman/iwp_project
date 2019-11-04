

async function markService(){
    console.log('selected')
const url = '/services/' + this.name
    const token = sessionStorage.getItem('token')
    const data = {completed: 1}
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
    console.log('runnung')
const url = '/services'
    const token = sessionStorage.getItem('token')
    const serviceType = document.getElementById('type').value
    const block = document.getElementById('block').value
    const roomNo = document.getElementById('roomNo').value
    const description = document.getElementById('description').value
    
    var data = {}
    data = {serviceType,
                    roomNo,
                    block,
                    description}

    console.log(data.serviceType)
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



async function getServices(){
    const url = '/services'
    const token = sessionStorage.getItem('token')

    if(token){
        window.location.pathname = "/signin"
    }
    
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
                if(json[i]['completed'] === 0 || json[i]['completed'] === 1)
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

                
                
                if(json[i]['completed'] === 0 || json[i]['completed'] === 1)
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


                document.getElementById('complaintsBody').appendChild(newItem)

                document.getElementById('completedButton')
                document.getElementById((tag+'-'+0)).innerHTML = json.length - i
                document.getElementById((tag+'-'+0)).style.fontWeight = "bold"

                document.getElementById((tag+'-'+1)).innerHTML = json[i]['serviceType']
                document.getElementById((tag+'-'+2)).innerHTML = json[i]['description']

                if(json[i]['completed'] === 0){
                    document.getElementById((tag+'-'+3)).innerHTML = 'Pending'
                }else if(json[i]['completed'] === 1) {
                    document.getElementById((tag+'-'+3)).innerHTML = 'In Progress'
                } else{
                    document.getElementById((tag+'-'+3)).innerHTML = 'Completed'
                }
            }}
        try{
                        // console.log('here')

        completed = document.getElementsByClassName('completedButton')
        console.log(completed.length)
        for (var i = 0; i < completed.length; i++) {
            completed[i].addEventListener('click', function() {markService.bind(this)();}, false);
            // console.log('here')
        }    
        
        // console.log('here')

        deleted =  document.getElementsByClassName('deleteButton')
        // console.log('here')
        for (var i = 0; i < deleted.length; i++) {
            deleted[i].addEventListener('click', function() {delService.bind(this)();}, false);
            // console.log('here')
        }       

        } catch(e){

        }
        
        document.getElementById('postService').addEventListener('click', () => postService())
    }
    else if (response.status = 401){
                window.location.pathname = "/signin"

    }

}




window.addEventListener('load', () => getServices())







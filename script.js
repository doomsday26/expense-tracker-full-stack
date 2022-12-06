let myForm = document.getElementById('myform');
let description= document.getElementById('descriptionInput')
let category= document.getElementById('category')
let expanse= document.getElementById('expanse')
let expanseId= document.getElementById('expanseId');
const userList = document.querySelector('#displayList');

const http= "http://localhost:4000/";


myForm.addEventListener('submit',add);
userList.addEventListener('click',removeItem)
userList.addEventListener('click',EditItem)

window.addEventListener('DOMContentLoaded',async()=>{
  await axios.get(http).then(res=>{ 
    console.log(res);
    displayExpanses(res);
   }).catch(err=>{console.log("error found"); console.log(err)});  

})

async function add(e){
e.preventDefault();
if(description.value===''||expanse.value===''){ alert('please enter all fields')}
else{
   
  let obj={"ammount":expanse.value, "category":category.value,"description": description.value}
await axios.post(http,obj).then(res=> console.log(res.data)).catch(err=>{console.log(err);})
await axios.get(http).then(res=>{ 
  displayExpanses(res)
  ; }).catch(err=>{console.log(err)});  
}
}

//display expanses
function displayExpanses(data){
//clear previous list items,
let ul = document.getElementById('displayList');
while(ul.firstChild){ul.removeChild(ul.lastChild)}
//create new childs.
for (let i = 0; i < data.length  ; i++) {
    let destring=data[i];
  console.log(destring.id,destring.ammount, destring.category,destring.description);
//creating li object
let li= document.createElement('li');
li.id=destring.id;
li.appendChild(document.createTextNode(destring.ammount + ': ' ))
li.appendChild(document.createTextNode(destring.category+ " - "))
li.appendChild(document.createTextNode(destring.description))
//create span
let span = document.createElement('span');
span.appendChild(document.createTextNode('  '))
li.appendChild(span)
//delete button
let btn = document.createElement('button');
btn.className='delete'
btn.appendChild(document.createTextNode('DEL'))
li.appendChild(btn)
// edit button
let span2 = document.createElement('span');
span2.appendChild(document.createTextNode('  / '))
li.appendChild(span2)
let editbtn = document.createElement('button');
editbtn.className='edit'
editbtn.appendChild(document.createTextNode('EDIT'))
li.appendChild(editbtn)
ul.appendChild(li);
}
expanse.value=''
description.value=''

};


async function removeItem(e){
  if(e.target.classList.contains('delete')){
    var li= e.target.parentElement;
     let key = li.id;
     console.log(key);
    await axios.delete(http+key).
     then( res=>{console.log(res);
     }).catch(err=>{console.log(err);})
    }
  
   await axios.get(http).then(res=>{
  displayExpanses(res);
  } )
  .catch(err=>console.log(err))
    }


//update the value,

async function EditItem(e){

  if(e.target.classList.contains('edit')){
  let li= e.target.parentElement;
  let key = li.id;
  console.log(key);
  await axios.get(http+key).then( (res)=>{
    console.log(res);
expanse.value= res.ammount;
description.value=res.description;
category.value=res.category
  console.log(res.id); 
  } ).catch(err=>console.log(err))
  
  expanseId.value=key;
  myForm.removeEventListener('submit',add)
  myForm.addEventListener('submit', updated)
  }
  
  }
  
  async function updated(e){
    console.log(expanseId.value);
    let key = expanseId.value;
   e.preventDefault();
    await axios.put(http+key,{
      "ammount":expanse.value, "category":category.value,"description": description.value
    }).then(res=>{console.log(res);}).catch(err=>{console.log(err);})
  
    myForm.removeEventListener('submit',updated)
    myForm.addEventListener('submit', add)

  
  
    await axios.get(http).then(res=>{
      displayExpanses(res);console.log(res);
      } )
      .catch(err=>console.log(err))
  }
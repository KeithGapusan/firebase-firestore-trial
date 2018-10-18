const cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form')
const formUpdate = document.querySelector('#update-cafe-form')
//create elements and render cafe
function updateCell(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    console.log(doc.data());
    console.log(doc.id);
    let data = document.getElementById(doc.id)
    console.log(data);

    const listItems = document.querySelectorAll('li');
    for (let i = 0; i < listItems.length; i++) {
        console.log(listItems[i].getAttribute('data-id'));
    }
    //  li.setAttribute('data-id', doc.id)

   // document.querySelectorAll('li')[0].getAttribute('data-id')
//     console.log(li.getAttribute('data-id'));
//     console.log(li.getAttribute('data-id').name);
//     // name.textContent = doc.data().name;
//     // city.textContent = doc.data().city;
//     // cross.textContent = 'x';
//    // li.replaceChild()

//     var item1 = document.getElementsByClassName('#cafe-list').childNodes[li.getAttribute('data-id')];
  

    // var textnode = document.createTextNode('#cafe-list');
    // var item = document.getElementById("myList").childNodes[0];
    // item.replaceChild(textnode, item.childNodes[0]);
    
}
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafelist.appendChild(li);

    //console.log(cafelist);
    //deleting data

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}

//.where('city', '==', 'pasig')
//need an index 
//.where('city', '==', 'pasig').orderBy('name')
// db.collection('cafes').get().then((snapshot) => {
//     //console.log(snapshot.docs);
//     snapshot.docs.forEach(element => {
       
//         renderCafe(element)
//     });
// })

//saving date
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value, 
        city: form.city.value
    });
    form.name.value = ''
    form.city.value = ''
} )

// real time listener

db.collection('cafes').orderBy("city").onSnapshot( snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach( change =>{
        console.log(change.type);
        if(change.type == 'added'){
           // console.log(change.doc.data);
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafelist.querySelector('[data-id=' + change.doc.id + ']')
            cafelist.removeChild(li)
        }else if(change.type == 'modified'){
           // console.log(change.doc.data);
            updateCell(change.doc);
        }
        
    })
})


formUpdate.addEventListener('submit' , (e) =>{
    e.preventDefault();
    db.collection('cafes').doc(formUpdate.id.value).update({
        
        name: formUpdate.name.value, 
        city: formUpdate.city.value
    });
    
})
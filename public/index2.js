let userList = document.querySelector('#userList');
let form = document.querySelector('#addUser');

function renderUser(doc){
    let li = document.createElement('li');
  /*   let userId = document.createElement('span');
    let displayName = document.createElement('span');  */
    let name = document.createElement('span'); 
    let weight = document.createElement('span');
    let height = document.createElement('span');
    let del = document.createElement('div');
    del.className = 'del';

    
}



db.collection('user').get().then(user => {
    user.docs.forEach(doc => {
        console.log(doc.data())
        renderUser(doc);
    })
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('user').add({
       /*  userId:form.userId.value,
        displayName:form.displayName.value, */
        name: form.name.value , 
        weight: form.weight.value ,
        height: form.height.value 
       


        
    });
   /*  form.userId.value='';
    form.displayName.value=''; */
    form.name.value = '';
    form.weight.value = '';
    form.height.value = '';



});


console.log("connected")

function loadCategories(){
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( res => res.json()) // convert promise to json
    .then( data => { // send data to displayCategories r
        displayCategories(data.categories);
    })
}

function displayCategories(categories){
    // get container 
   const container =  document.getElementById('categories-container');
   

   for(let categorie of categories){
       const button = document.createElement('button');
       console.log(categorie);

       button.innerText = categorie.category;
       console.log(button);
       container.appendChild(button);
       button.classList = "btn btn-sm"
   }

    // loop operation on array of object 
      // create Element 
      // Append element 
}

loadCategories();
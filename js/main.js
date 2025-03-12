function removeActiveClass(){
    const activeButton = document.getElementsByClassName('active');
    for(let btn of activeButton){
        btn.classList.remove('active')
    }
}

function loadCategories(){
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( res => res.json()) // convert promise to json
    .then( data => { // send data to displayCategories r
        displayCategories(data.categories);
    })
}

function loadVideo (){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( res => res.json())
    .then( data =>{
        displayVideos(data.videos)
    })
}

function displayCategories(categories){
    // get container 
   const container =  document.getElementById('categories-container');
   

   for(let categorie of categories){
       const button = document.createElement('button');
    

       button.innerHTML = `
          <button id = "${categorie.category_id}" onclick="loadCategorisVideos(${categorie.category_id})"class = "btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${categorie.category}</button>
       `
       
       container.appendChild(button);
    //    button.classList = "btn btn-sm hover:bg-[#FF1F3D] hover:text-white"
    //    button.addEventListener("click", loadCategorisVideos.bind(null,categorie.category_id));
       

   }

}

const loadCategorisVideos = (id) => {
    const link = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(link);
    fetch(link)
    .then( res => res.json())
    .then(data =>{
        removeActiveClass()
        const clickedButton = document.getElementById(`${id}`)
        clickedButton.classList = "active btn btn-sm"
        console.log(clickedButton);
        displayVideos(data.category)
    })

}

const displayVideos =(allVideos) =>{
    console.log(allVideos)
     
    const videosContainer =  document.getElementById('video-container');

    videosContainer.innerHTML = ' '
    
    if(allVideos.length == 0){
        videosContainer.innerHTML = `
           <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
                <img class="w-[120px]" src="Assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Opps!!! There is no content here </h2>
               </div>
        `
    }
    for(let video of allVideos){
        const videoContainer = document.createElement("div");
        videoContainer.innerHTML = `
                <div class="card bg-base-100  ">
                    <figure class="relative">
                        <img class="w-full h-[250px] object-cover"
                            src="${video.thumbnail}"
                             alt="Shoes" />

                         <span class="absolute bottom-2 right-2 text-white bg-black px-3 text-sm rounded">3hrs 56 min ago</span>
                    </figure>
                    <div class=" flex gap-3 px-0 py-5 S">
                         
                         <div class="profile">
                            <div class="avatar">
                                <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                  <img src="${video.authors[0].profile_picture}" />
                                </div>
                              </div>
                            
                         </div>
                         <div>
                            <h2 class="card-title">${video.title}</h2>
                            <P class="text-sm text-gray-400 flex gap-2 ">${video.authors[0].profile_name}
                                <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                            </P>
                            <p class="text-sm text-gray-400  pt-4">${video.others.views}</p>
                         </div>
                    </div>
                    <button class = "btn btn-block hover:bg-[#FF1F3D]">Details</button>
                    </div>`
        
        videosContainer.appendChild(videoContainer);
        

    }
}

loadCategories();

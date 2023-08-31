const allCatagory = async ()=>{
         const res =await fetch("https://openapi.programming-hero.com/api/videos/categories")
         const data = await res.json()
         const categorys = data.data;
        //  console.log(categorys);

        const AllCataGory= document.getElementById("All-catagory");
        categorys.forEach(catagory => {
            const div=document.createElement("div");
            div.innerHTML=`
            <button onclick="handelCategory('${catagory.category_id}')" class="btn">${catagory.category}</button>
            `
            AllCataGory.appendChild(div);
        });
}

const handelCategory = async (category_id) =>{
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const data = await res.json()
    const categoryData= data.data;
    // console.log(data.status)

    const cardContainer = document.getElementById("card-Container");
    const noDataCard = document.getElementById("no-data-card");

    cardContainer.innerHTML="";
    noDataCard.innerHTML="";
    
    if(data.status==true)
    {
        categoryData.forEach(categoryDt =>{
            const div=document.createElement("div");
            div.classList.add("card","card-compact","bg-base-100","shadow-xl")
            // <div class="card card-compact bg-base-100 shadow-xl">
            // </div>
            
            div.innerHTML=`
            <figure class="relative">
                <img  src=${categoryDt?.thumbnail} />
                <div>
                    <p class=" bg-gray-800 text-white absolute bottom-0 right-0 p-3">${categoryDt?.others?.posted_date}</p>
                </div>
            </figure>
            <div class=" flex gap-4 justify-start items-start mt-4 px-3 pb-4">
              <div>
                <img class=" w-10 rounded-full bg-slate-300" src=${categoryDt?.authors[0]?.profile_picture} alt="">
              </div>
              <div>
                <h2 class="card-title ">${categoryDt?.title.slice(0,15)}</h2>
                <p>${categoryDt?.authors[0]?.profile_name} <span class="text-yellow">${categoryDt?.authors[0]?.verified ? "<i class='fa-solid fa-circle-check'></i>":" "  }</span> </p>
                <p>${categoryDt?.others.views}</p>
              </div>
            </div>
            
                   
            `
         
            cardContainer.appendChild(div);        
        });
    }
    else
    {
        
            const div=document.createElement("div");
            // div.classList.add("card","card-compact","bg-base-100","shadow-xl")
            // <div class="card card-compact bg-base-100 shadow-xl">
            // </div>
            
            div.innerHTML=`

            <div class="flex justify-center">
            <div class=" flex flex-col  gap-4 justify-center  mt-4 px-3 pb-4">
              <div class="flex justify-center ">
                    <img class=" w-10 rounded-full bg-slate-300" src="../Icon.png" alt="">
              </div>
              <div class="flex justify-center">
                <h2 class="card-title "> Oops!! Sorry, There is no content here</h2>
              </div>
            </div>
            </div>
            
            
                   
            `
         
            noDataCard.appendChild(div);        
       
    }

   
    

}


allCatagory()


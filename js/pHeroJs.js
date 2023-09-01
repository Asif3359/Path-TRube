let isChanged = false;
const allCatagory = async ()=>{
         const res =await fetch("https://openapi.programming-hero.com/api/videos/categories")
         const data = await res.json()
         const categorys = data.data;

        const AllCataGory= document.getElementById("All-catagory");
        categorys.forEach(catagory => 
        {
            
            const div=document.createElement("div");
            div.innerHTML=`
            <button id="${catagory.category_id}" onclick="handelCategory('${catagory.category_id}')" class="btn px-2 ">${catagory.category}</button>
            `
            AllCataGory.appendChild(div);
        const sortDiv = document.getElementById("sort-Div");
        sortDiv.innerHTML=`
           <button id="btn-color" onclick="SortHandle();" class="btn mr-4 md:mr-28 px-2">Short By</button>
          `
          // isChanged = true;

          // const  btnColor = document.getElementById(`${catagory.category_id}`)
          
          // if(isChanged){
          // btnColor.style.backgroundColor = "blue";
          // btnColor.style.color = "white";
          // }
          // else 
          // {
          //   btnColor.style.backgroundColor = "";
          //   btnColor.style.color = "black";  
          // }
        });
        
        handelCategory( "1000");
       
}


const handelCategory = async (category_id) =>{

    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`)
    const data = await res.json()
    const categoryData= data.data;

    const cardContainer = document.getElementById("card-Container");
    const noDataCard = document.getElementById("no-data-card");

    cardContainer.innerHTML="";
    noDataCard.innerHTML="";
    
    isChanged = true;

    const  btnColor = document.getElementById(`${category_id}`)
    
    if(isChanged){
     btnColor.style.backgroundColor = "blue";
     btnColor.style.color = "white";
    }
    else 
    {
      btnColor.style.backgroundColor = "";
      btnColor.style.color = "black";  
    }
 

    if(data.status==true)
    {
             
      if(isAscendingOrder){
        
        categoryData.sort((a, b) => {
          const dateA = parseFloat(a?.others?.views) ;
          const dateB = parseFloat(b?.others?.views) ;
          return dateB - dateA; 
        });  
      }
        
        categoryData.forEach(categoryDt =>{
         
           
            const div=document.createElement("div");
            div.classList.add("card","card-compact","bg-base-100","shadow-xl")
            const  houre =Math.floor(categoryDt?.others?.posted_date/3600) ;
            const NowSecondIS = categoryDt?.others?.posted_date%3600;
            const  minuit = Math.floor(NowSecondIS/60)
            let timeValue=true;
            if(houre===0 && minuit===0){
              timeValue=false
            }

            div.innerHTML=`
            <div class="relative">
                <img class="w-full h-[200px] rounded-t-xl "  src=${categoryDt?.thumbnail} />
                <div class="absolute mb-2 mr-2 bottom-0 right-0">
                    <p id="view-time" class=" bg-gray-800 text-white   px-2 rounded-lg">  ${ timeValue? houre+" hrs "+minuit+" min ago":""} </p>
                </div>
            </div>
            <div class=" flex gap-4 justify-start items-start mt-4 px-3 pb-4">
              <div>
                <img class=" w-10 h-10 rounded-full bg-slate-300" src=${categoryDt?.authors[0]?.profile_picture} alt="">
              </div>
              <div>
                <h2 class="card-title ">${categoryDt?.title.slice(0,18)}</h2>
                <p class="flex gap-2 items-center " >${categoryDt?.authors[0]?.profile_name} <span class="text-yellow">${categoryDt?.authors[0]?.verified ? "<img src='/fi_10629607.svg'>":" "  }</span> </p>
                <p>${categoryDt?.others.views} views</p>
              </div>
            </div>
                   
            `
           
  
            cardContainer.appendChild(div);        
        });

    }
    else
    {
            const div=document.createElement("div");
      
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

let currentCategoryId = "1000"; 
let isAscendingOrder = false; 
let isRes = 0;

const SortHandle = () => {
  
  isRes = 1;

  const btnColor =document.getElementById("btn-color");
  isAscendingOrder = !isAscendingOrder;
   
  handelCategory(currentCategoryId); 
  if(isAscendingOrder)
  {
    btnColor.style.backgroundColor = "blue";
    btnColor.style.color = "white";
    // handelCategory(currentCategoryId); 
  }
  if(!isAscendingOrder)
  {
    btnColor.style.backgroundColor = "";
    btnColor.style.color = "black";
    
  }
  
  
};


allCatagory()


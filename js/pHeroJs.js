let timeArray = [];
const allCatagory = async ()=>{
         const res =await fetch("https://openapi.programming-hero.com/api/videos/categories")
         const data = await res.json()
         const categorys = data.data;

        // //  console.log(categoryData);
        

        const AllCataGory= document.getElementById("All-catagory");
        categorys.forEach(catagory => {
            const div=document.createElement("div");
            div.innerHTML=`
            <button id="default-click-handel" onclick="handelCategory('${catagory.category_id}')" class="btn">${catagory.category}</button>
            `
            AllCataGory.appendChild(div);
        });
        handelCategory( "1000");
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
  

    let i = 0 ;
    timeArray=[]
    if(data.status==true)
    {
        
        categoryData.forEach(categoryDt =>{
            timeArray.push(categoryData[i++]?.others?.posted_date)
            const div=document.createElement("div");
            div.classList.add("card","card-compact","bg-base-100","shadow-xl")
            // <div class="card card-compact bg-base-100 shadow-xl">
            // </div>
            // timeArray.push(categoryDt?.others?.posted_date);
            const  houre =Math.floor(categoryDt?.others?.posted_date/3600) ;
            const NowSecondIS = categoryDt?.others?.posted_date%3600;
            // console.log(NowSecondIS);
            const  minuit = Math.floor(NowSecondIS/60)



            div.innerHTML=`
            <figure class="relative">
                <img class="w-[300px] h-[200px]"  src=${categoryDt?.thumbnail} />
                <div>
                    <p class=" bg-gray-800 text-white absolute mb-2 mr-2 bottom-0 right-0 px-2 py-1 rounded-lg">${houre} Hour ${minuit} min ago </p>
                </div>
            </figure>
            <div class=" flex gap-4 justify-start items-start mt-4 px-3 pb-4">
              <div>
                <img class=" w-10 h-10 rounded-full bg-slate-300" src=${categoryDt?.authors[0]?.profile_picture} alt="">
              </div>
              <div>
                <h2 class="card-title ">${categoryDt?.title.slice(0,18)}</h2>
                <p>${categoryDt?.authors[0]?.profile_name} <span class="text-yellow">${categoryDt?.authors[0]?.verified ? "<i class='fa-solid fa-circle-check'></i>":" "  }</span> </p>
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
            let timeArray = [];
    }

 
 

}

let count=0 ;
function SortHandle(){
    count=1;
    dataSort();
}

function dataSort()
{
    console.log(timeArray);
    const stringArray= timeArray.filter(item => item !== '');
    // console.log(numberArray);
    const NumberArray = stringArray.map(item => parseInt(item))
    console.log(NumberArray);

    for(let i = 0 ; i< timeArray.length-1 ; i++)
    {
        for(let j = 0 ; j<timeArray.length-i ; j++){
            if(NumberArray[j] < NumberArray[j+1])
            {
                [NumberArray[j], NumberArray[j + 1]] = [NumberArray[j + 1], NumberArray[j]];
            }
        }
    }

    console.log(NumberArray);
}


allCatagory()


//---------------------Catching the html elements by their unique IDs here-----------------------------------

let container = document.querySelector("#container > table > tbody");
let Prev = document.getElementById("prev");
let Next = document.getElementById("next");
let filterByDepartment = document.getElementById("departments");
let sortByPRICE = document.getElementById("sortByPrice");
sortByPRICE.addEventListener("change", function(e){
    sortByPrice(e);
})
filterByDepartment.addEventListener("change", function(e){
    getDept(e);
});
let gender = document.getElementById("gender");
gender.addEventListener("change", function(e){
    getgender(e);
})


//-----------Data is filtered by gender here by using getgender function------------------------------------------------------------

async function getgender(e){
    // let res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees");
    // let data = await res.json();
    // let Data = data.data;

    let genderdata = e.target.value;
    if(genderdata){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=gender&filterValue=${genderdata}`)
    }
    // let arr = [];
    // Data.filter(function(el, i){
    //     if(genderdata === el.gender){
    //         arr.push(el);

    //     }
    // })
    // console.log(arr)
    // showData(arr);
}


//-----------Data is filtered by department here by using getDept function------------------------------------------------------------

async function getDept(e){
    // let res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees");
    // let data = await res.json();
    // let Data = data.data;

    let deptdata = e.target.value;
    if(deptdata){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=${deptdata}`)
    }
//    let arr = [];
//     Data.filter(function(el, i){
//         if(deptdata === el.department){
//             arr.push(el);

//         }
//     })
//     console.log(arr)
//     showData(arr);
}



//-----------Data is validate here by using Prev and Next button ---------------------------------------------------------------------

var count = 1;   //initial count 

Prev.addEventListener("click", function(){
    count = count-1;
    if(count > 0){
        Prev.disabled = false;
        Next.disabled = false;
    }else{
        Prev.disabled = true;
    }
    if(count <= 1){
        count = 1;
        let link = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10`
        getData(link); 
    } 
});

Next.addEventListener("click", function(){
    count = count+1;
    if(count <= 9){
        Prev.disabled = false;
        Next.disabled = false;
    }else{
        Next.disabled = true;
    }
    if(count <= 10){
        let link = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10`
        getData(link);
    }
    
})


//-----------Data is fetch here from the given api to show on user interface by using getData function ---------------------------------------------------------------------


async function getData(link){
    let res = await fetch(link);
    let data = await res.json();
    let Data = data.data;
    console.log(Data)
    showData(Data);

}

getData("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10")  //initially render with given API


//-----------Data is shown here from the given api by using showData function ---------------------------------------------------------------------
function showData(arr){
    container.innerHTML = "";
    arr.forEach(function(ele, i){

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = i+1;

        let td2 = document.createElement("td");
        td2.innerHTML = ele.name;

        let td3 = document.createElement("td");
        td3.innerHTML = ele.gender;

        let td4 = document.createElement("td");
        td4.innerHTML = ele.department;

        let td5 = document.createElement("td");
        td5.innerHTML = ele.salary;

        tr.append(td1, td2, td3, td4, td5);
        container.append(tr);


    })
    
}


//-----------Data is sorting by price here by using sortByPrice function------------------------------------------------------------


async function sortByPrice(e){
    // let res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10");
    // let data = await res.json();
    // let Data = data.data;
    // console.log(Data)

    let text = e.target.value;
    if(text){
        getData(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=gender&filterValue=female&sort=salary&order=${text}`)
    }
    // if(text === "asc"){
    //     let responce = Data.sort((a, b)=>{
    //         return b.price - a.price;
    //     })
    //     showData(responce);
    // }else if(text === "desc"){
    //     let responce = Data.sort((a, b)=>{
    //         return a.price - b.price;
    //     })
    //     showData(responce);
    // }
   
}




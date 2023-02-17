const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".close-button");
const browse = document.querySelector(".browse");
const openOrderPage = document.querySelector("#orderPage"); // open order page
const fakeWindow = document.querySelector("#fakeWindow"); // open order page fake window
const placeOrder = document.querySelector(".placeOrder"); // add to order button
const closeOrderPage = document.querySelector(".closeOrderPage");
// Variables for selection modal
const menuItem = document.querySelectorAll("li p:first-child"); // returns all menuItemHeadings into an NodeList Array
const menuDesc = document.querySelectorAll("li p:nth-child(2)");
const itemImg = document.getElementById("dean");
const itemName = document.querySelector("#menuName");
const itemDesc = document.querySelector("#menuDescription");
const itemPrice = document.querySelector("#menuPrice");

const subTotal = document.getElementById("subTotal");
const subTotalTax = document.getElementById("subTotalTax");
const total = document.getElementById("total");



let trash = null;
let mealName = "";
let mealPrice = 0;
const mealSum = [];
const orders = [];


// modal & side order page

closeModal.addEventListener("click", function () {
  modal.close();
})

browse.addEventListener("click", function () {
  modal.close();
  openOrderPage.style.display = "none";
})

closeOrderPage.addEventListener("click", function () {
  openOrderPage.style.display = "none"; 
  fakeWindow.style.display = "none";
})

// add meals to the order form
// this might need to be a submit button not click
placeOrder.addEventListener("click", function () {
  modal.close();
  fakeWindow.style.display = "block";
  openOrderPage.style.display = "block";
  
  
  const meal = mealName;

  // create a new list element
  const newLi = document.createElement('li');
  newLi.innerHTML = `
  <img class="trash" src="./assets/trash-can-solid.svg" alt="" />
  <p>${meal}</p>
  <p>$${mealPrice}</p>
  `;
  // append new list element to the DOM
  const ulTarget = document.getElementById('clientOrder');
  ulTarget.appendChild(newLi);

  const trash = document.querySelectorAll(".trash");

  // create an array for storing the meals price
  mealSum.push(Number(mealPrice)); // adds stored items to an array for total

  // calculates the subTotal and return it
  const mealSumTotal = mealSum.reduce((totalValue, currentAmount) => {
    return totalValue + currentAmount;
  });
  // takes the tallied total of the ordered meals and passes it as an argument to the function taxCalc
  orderArray(mealName, mealPrice);
  taxCalc(mealSumTotal);

  console.log(trash);
  
  
  getTrash(trash); // passed to the bin parameter
  
  console.log(trash.length);
  // getTrash();
  
});


// function to target the trash can thats clicked, return the menu item index and remove it from the orders array
const getTrash = (bin) => {
  for ( let j = 0; j < bin.length; j++ ) {
    bin[j].addEventListener('click',function (){
      // returns the name of the meal next to the trash
      mealTarget = this.nextElementSibling.textContent;

      // remove the returned index from the array
      returnMeal = orders.findIndex(meal => meal.mealName === this.nextElementSibling.textContent);

      // removes targeted index from the orders array
      orders.splice(returnMeal,1);
    });
  };
};    
    

// function to add meal name and meal price to an array
const orderArray = (name, price) => {
  orders.push({"mealName": name, "mealPrice": Number(price)});
  return orders;
};

  


//   // create a new list element
//   const newLi = document.createElement('li');
//   newLi.innerHTML = `
//   <i class="fa-solid fa-trash-can"></i>
//   <p>${meal}</p>
//   <p>$${mealPrice}</p>
//   `;
//   // append new list element to the DOM
//   const ulTarget = document.getElementById('clientOrder');
//   ulTarget.appendChild(newLi);
  
  
//   // create an array for storing the meals price
//   mealSum.push(Number(mealPrice)); // adds stored items to an array for total
  
//   // calculates the subTotal and return it
//   const mealSumTotal = mealSum.reduce((totalValue, currentAmount) => {
//     return totalValue + currentAmount;
//   });
//   // takes the tallied total of the ordered meals and passes it as an argument to the function taxCalc
//   taxCalc(mealSumTotal);
// });

// function to calculate the tax and totals and add them to the DOM
const taxCalc = (sub) => {
  // current tax percentage
  const tax = 0.13;
  // total tax tallied
  let subTax = sub * tax;
  // added the tallied tax and grand total to the order window  
  subTotal.textContent = (sub).toFixed(2); // correct
  subTotalTax.textContent = (sub * tax).toFixed(2); // correct
  total.textContent = (sub + subTax).toFixed(2);
};

// delete items from the order window
// when you click the trash can it targets that rows menu item
// 


// menuItem.forEach((meal)=>{
  //   menuItem[i].addEventListener('click', function (e) {
    //     modal.showModal();
    //     console.log(e.target);
    //     itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    //     itemName.textContent = e.target.textContent;
    //     itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    //     itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;
    //   });
    // });
    
// iterates through the menuItem Node List array and returns the clicked on content
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener('click', function (e) {
    // console.log(e.target.textContent);
    // show selection modal
    modal.showModal();
    mealName = e.target.textContent;
    mealPrice = e.target.nextElementSibling.firstElementChild.textContent;
    // img input
    // console.log(itemImg.attributes.src);
    // console.log(e.target);
    // let newAttribute = e.target.attributes.value.textContent;
    // console.log(newAttribute);

    itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    // console.log(itemImg.attributes.src);
    // add selection to the header inside modal
    itemName.textContent = e.target.textContent;
    
    // add description to modal
    // console.log(e.target.nextElementSibling.firstChild.textContent);
    itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    
    // console.log(e.target.nextElementSibling.firstElementChild.textContent);
    // console.log(itemPrice.textContent);
    itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;

    return mealName, mealPrice;
  })
};



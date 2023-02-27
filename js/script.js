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
// order window DOM targets for costs
const orderSubTotal = document.getElementById("subTotal");
const subTotalTax = document.getElementById("subTotalTax");
const total = document.getElementById("total");

let mealName = ""; 
let mealPrice = 0;
let mealValue = "";

const orders = [];

// const subTotalArr = []; // array for storing the all the costs
let subTotalArr = []; // array for storing the all the costs
let orderTotal = 0; // order total after tax has been applied to the subTotal 
let subTotal = 0; // variable to store the summed total of all orders
const tax = 0.13; // Tax to be applied to subTotal




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

// ADDING ITEMS TO THE ORDER FROM THE QUICK DISPLAY MODAL //
// ?? This could also be a submit button? change click to submit? why?
placeOrder.addEventListener("click", function () {
  modal.close();
  fakeWindow.style.display = "block";
  openOrderPage.style.display = "block";
  const meal = mealName;
  // create a new list element
  const newLi = document.createElement('li');
  // newLi.innerHTML = `
  // <img class="trash" id="${mealValue}" src="./assets/trash-can-solid.svg" alt="" />
  // <p>${meal}</p>
  // <p>$${mealPrice}</p>
  // `;
  newLi.innerHTML = `
  <button class="trash" id="${mealValue}"></button>
  <p>${meal}</p>
  <p>$${mealPrice}</p>
  `;
  // append new list element to the DOM
  const ulTarget = document.getElementById('clientOrder');
  ulTarget.appendChild(newLi);
  // this creates the variable Trash and stores the targets of the trash can delete button
  // console.log("*EventListener - whats in Trash?", trash);
  
  // add value to new list item
  newLi.setAttribute("id",mealValue);
  // console.log("what does trash return?", trash); // returns the nodeList item of img of the trashcan
  
  // mealSum.push(Number(mealPrice)); // adds stored items to an array for total
  // subTotalArr.push(Number(mealPrice)); // adds stored items to an array for total
  orderArray(mealName, mealPrice, mealValue);
  mapCostArr();
  getSubTotal();
  // takes the tallied total of the ordered meals and passes it as an argument to the function taxCalc
  tallyTotal(); // call talleyTotal to tally and display totals

  remove();

});


// REMOVING ITEMS FROM THE ORDER //
// function to target the trash can thats clicked, return the menu item index and remove it from the orders array
// TODO - look into why this for each() method keeps looping

const remove = () => {
  const bins = document.querySelectorAll(".trash");
  console.log(bins);
  
  bins.forEach((bin) => {
    bin.addEventListener('click', function(e){
      // e.preventDefault();
      const selectedItem = e.target.nextElementSibling.textContent;
      const mealCostIndex = orders.findIndex(meal => meal.mealName === selectedItem);
      e.target.parentElement.remove('li');
      reCalc(mealCostIndex);
    });
  });
};



const reCalc = (index) => {
  if(index < 0) {
    console.log("error, item not found in array");
  } else {
    console.log("*reCalc-index of item to remove", index);
    orders.splice(index,1);
    console.log("*reCalc-item has been removed", orders);
    // re-run mapping function and roll up costs
    mapCostArr();
    console.log("*reCalc-New Cost map Array", subTotalArr);
    subtractTotal();
    console.log("*reCalc-sub total", subTotal);
  };
};


// function to add meal name, value and meal price to the orders array
const orderArray = (name, price, value) => {
  orders.push({"mealName": name, "mealPrice": Number(price), "mealValue": value});
  return orders;
};

// COSTING SECTION //
// function to tally up all the values in the array    
const getSubTotal = () => {
  // if conditional to check if the array is empty to avoid returning an error
  if (subTotalArr.length <= 0) {
    // if the array is empty...
    subTotal = 0;
    orderTotal = 0;
  } else {
    // if the array has values...
    // store the summed sub total amount in the subTotal Variable
    subTotal = subTotalArr.reduce((totalValue, currentAmount) => {
      // return the array summed sub total amount
      return totalValue + currentAmount;
    });
  };
};

const mapCostArr = () => {
  subTotalArr = orders.map((order)=>{
    return order.mealPrice
  });
};

// ? Could these two function be cleaner as they basically do the same thing
// Tallying Totals for new additions
const tallyTotal = () => {
  // console.log("*tallyTotal-EXECUTED...");
  // console.log("*tallyTotal-RUNNING...");
  // calling the getSubTotal function to tally the array of values after the new cost has been added
  getSubTotal();
  // storing the new grand total of the bill in a variable after tax has been applied
  orderTotal = (subTotal * tax) + subTotal;
  // console.log("*tallyTotal-total order amount", orderTotal);
  
  // append new totals to the DOM
  // console.log("*tallyTotal-appending DOM");
  orderSubTotal.textContent = (subTotal).toFixed(2);
  subTotalTax.textContent = (subTotal * tax).toFixed(2);
  total.textContent = (orderTotal).toFixed(2);
  // console.log("*tallyTotal-COMPLETED");
}

// Subtracting Totals for new Subtractions
const subtractTotal = () => {

  getSubTotal();
  orderTotal = (subTotal * tax) + subTotal;

  // append new totals to the DOM
  orderSubTotal.textContent = (subTotal).toFixed(2);
  subTotalTax.textContent = (subTotal * tax).toFixed(2);
  total.textContent = (orderTotal).toFixed(2);

}
    
// QUICK VIEW FOR SELECTED MENU ITEM //
// iterates through the menuItem Node List array and returns the clicked on content
for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener('click', function (e) {
    // show selection modal
    modal.showModal();
    mealName = e.target.textContent;
    mealPrice = e.target.nextElementSibling.firstElementChild.textContent;
    mealValue = e.target.attributes.value.textContent
    itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    // add selection to the header inside modal
    itemName.textContent = e.target.textContent;
    // add description to modal
    itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;
    // return mealName, mealPrice, mealValue;
  })
};



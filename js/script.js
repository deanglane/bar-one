const modal = document.querySelector("#modal");
const openModal = document.querySelector(".openModal");
const closeModal = document.querySelector(".close-button");
const browse = document.querySelector(".browse");


const openOrderPage = document.querySelector("#orderPage"); // open order page
const fakeWindow = document.querySelector("#fakeWindow"); // open order page fake window
const orderPlace = document.querySelector(".placeOrder"); // add to order button
const closeOrderPage = document.querySelector(".closeOrderPage");
// Variables for selection modal
const menuItem = document.querySelectorAll("li p:first-child"); // returns all menuItemHeadings into an NodeList Array
const menuDesc = document.querySelectorAll("li p:nth-child(2)");
const itemImg = document.getElementById("mealImage");
const itemName = document.querySelector("#menuName");
const itemDesc = document.querySelector("#menuDescription");
const itemPrice = document.querySelector("#menuPrice");
// order window DOM targets for costs
const orderSubTotal = document.getElementById("subTotal");
const subTotalTax = document.getElementById("subTotalTax");
const total = document.getElementById("total");

let mealName = ""; 
let mealPrice = 0;
let mealId = "";

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
orderPlace.addEventListener("click", function () {
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
  <button class="trash" id="${mealId}"></button>
  <p>${meal}</p>
  <p>$${mealPrice}</p>
  `;
  // append new list element to the DOM
  const ulTarget = document.getElementById('clientOrder');
  ulTarget.appendChild(newLi);
  remove();
  // this creates the variable Trash and stores the targets of the trash can delete button
  // console.log("*EventListener - whats in Trash?", trash);
  
  // add value to new list item
  newLi.setAttribute("id", mealId);
  newLi.setAttribute("id", "list");
  // console.log("what does trash return?", trash); // returns the nodeList item of img of the trashcan
  
  // mealSum.push(Number(mealPrice)); // adds stored items to an array for total
  // subTotalArr.push(Number(mealPrice)); // adds stored items to an array for total
  orderArray(mealName, mealPrice, mealId);
  mapCostArr();
  getSubTotal();
  // takes the tallied total of the ordered meals and passes it as an argument to the function taxCalc
  tallyTotal(); // call talleyTotal to tally and display totals
  placeOrder();
  cancel();

  console.log(orders);
  
});


// REMOVING ITEMS FROM THE ORDER //
// function to target the trash can thats clicked, return the menu item index and remove it from the orders array

const remove = () => {
  const bins = document.querySelectorAll(".trash");
  
  bins.forEach((bin) => {
    bin.addEventListener('click', function(e){
      const selectedItem = e.target.nextElementSibling.textContent;
      const mealCostIndex = orders.findIndex(meal => meal.mealName === selectedItem);
      e.target.parentElement.remove('li');
      reCalc(mealCostIndex);
      console.log(mealCostIndex);
      
    });
  });
};


const placeOrder = () => {
  const orderPlacedModal = document.getElementById
  ('modalOrderPlaced');
  const placeOrderBtn = document.getElementById('placeOrder');
  const closeThanks = document.getElementById('closeThanks');
  
  placeOrderBtn.addEventListener('click', function() {
    openOrderPage.style.display = "none";
    fakeWindow.style.display = "none";
    orderPlacedModal.showModal();
    
  });
  closeThanks.addEventListener("click", function () {
    orderPlacedModal.close();
  });
};



// function to cancel all orders and clear the totals
const cancel = () => {
  const cancel = document.getElementById("cancel");
  const allLi = document.querySelectorAll('#list')

  allLi.forEach((li) => {
    cancel.addEventListener('click', function () {
      li.remove('#list');
      orders.splice(0, orders.length);
      mapCostArr();
      subtractTotal();
      openOrderPage.style.display = "none";
      fakeWindow.style.display = "none";
    });
  });
};


const reCalc = (index) => {
  if (index >= 0) {
    orders.splice(index, 1);
    // re-run mapping function and roll up costs
    mapCostArr();
    subtractTotal();
  };
};


// function to add meal name, value and meal price to the orders array
const orderArray = (name, price, id) => {
  orders.push({"mealName": name, "mealPrice": Number(price), "mealValue": id});
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
  // calling the getSubTotal function to tally the array of values after the new cost has been added
  getSubTotal();
  // storing the new grand total of the bill in a variable after tax has been applied
  orderTotal = (subTotal * tax) + subTotal;
  
  // append new totals to the DOM
  orderSubTotal.textContent = (subTotal).toFixed(2);
  subTotalTax.textContent = (subTotal * tax).toFixed(2);
  total.textContent = (orderTotal).toFixed(2);
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
    mealId = e.target.attributes.id.textContent
   
    itemImg.attributes.src.textContent = e.target.attributes.value.textContent;
    // add selection to the header inside modal
    itemName.textContent = e.target.textContent;
    // add description to modal
    itemDesc.textContent = e.target.nextElementSibling.firstChild.textContent;
    itemPrice.textContent = e.target.nextElementSibling.firstElementChild.textContent;
    // return mealName, mealPrice, mealValue;
  })
};



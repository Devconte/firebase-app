import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-firebase-8723e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputField(inputFieldEl)
})

onValue(shoppingListInDB, (snapshot) => {
    if (snapshot.exists() ) {
        const itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemKey = currentItem[0];
            let currentItemValue = currentItem[1];
    
                addItemToShoppingList(currentItem);
        }
    } else {
        shoppingListEl.innerHTML = "No items in the shopping list.";
    }

    
})
function clearShoppingList() {
    shoppingListEl.innerHTML = "";
}

function addItemToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newItem = document.createElement("li");
    newItem.textContent = itemValue;
    shoppingListEl.appendChild(newItem);
    newItem.addEventListener("click", function() {
        let itemLocation = ref(database, `shoppingList/${itemID}`);
        remove(itemLocation);
    })
}


function clearInputField(inputFieldEl) {
    inputFieldEl.value = "";
}
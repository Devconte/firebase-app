import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    const itemsArray = Object.values(snapshot.val())
    clearShoppingList()
    for (let i = 0; i < itemsArray.length; i++) {
        addItemToShoppingList(itemsArray[i]);
    }
    
})
function clearShoppingList() {
    shoppingListEl.innerHTML = "";
}

function addItemToShoppingList(inputValue) {
    shoppingListEl.innerHTML += `<li>${inputValue}</li>`;
}

function clearInputField(inputFieldEl) {
    inputFieldEl.value = "";
}
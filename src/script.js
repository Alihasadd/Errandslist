import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://choreslist-86076-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "chores")

const choreInputEl = document.getElementById("chore-input")
const addButtonEl = document.getElementById("add-button")
const deleteAllButtonEl = document.getElementById("delete-all-button")
const ulEl = document.getElementById("chores-list")

function render(chores) {
    let listItems = ""
    for (let i = 0; i < chores.length; i++) {
        listItems += `
            <li>${chores[i]}</li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotValues = snapshot.val()
    const chores = Object.values(snapshotValues)
    render(chores)
})

deleteAllButtonEl.addEventListener("dblclick", function() {
    
})

addButtonEl.addEventListener("click", function() {
    push(referenceInDB, choreInputEl.value)
    choreInputEl.value = ""
})
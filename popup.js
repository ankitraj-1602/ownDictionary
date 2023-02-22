const container = document.getElementsByClassName("container");
const btnsave = document.querySelector('.saveBtn');
const btnremove = document.querySelector('.removeBtn');
const con=document.querySelector(".con")
var text=""


btnsave.addEventListener('click', async () => {
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: saveWord,
        },
        async () => {
           
            con.innerText ="saved! reopen to see words";
           
            
        }
    );
});
btnremove.addEventListener('click', async () => {
    
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: removeAll,
        },
        async () => {
           
            con.innerText ="deleted reopen to see empty";
            
            
        }
    );
});

const saveWord=async()=> {
    document.getElementsByTagName("body")[0].setAttribute("contentEditable", "");
    document.execCommand("underline");
    document.getElementsByTagName("body")[0].setAttribute("contentEditable", "false");
   
    let arr=[]
    try {
    val= window.getSelection().toString()
    var name
    val= val.trim()
    console.log(val)
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'dd2d5acc2bmshc4fc5724f091007p119b1cjsnf1486980fd41',
        'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
  }
}
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`, options)
.then(response => response.json())
.then(response =>{ 
    var s = response[0].meanings[0].definitions[0].definition;
    var fields = s.split(/;/);
     name = fields[0];
    console.log(name)
    chrome.storage.sync.set({
        [val]: [...arr, name]
        
    });
   
})
.catch(err => console.error(err));
}
  catch (err) {
        console.error(err);
    }
}

const removeAll=async ()=>{
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        
        else {
            console.log("hello")
            
        }
    });
    chrome.storage.sync.clear(); 
    
}
const getdata=()=>{
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        var allvalue = Object.values(items);
        for(let i=0;i<allKeys.length;i++){
            console.log(allKeys[i])
            console.log(allvalue[i])
            const container = document.getElementsByClassName("container")[0];
            container.innerHTML +=`<p>${allKeys[i]} => ${allvalue[i]}</p>`;
    
        }
    });
}
document.addEventListener("DOMContentLoaded", async () => {
const container = document.getElementsByClassName("container");
const btnsave = document.querySelector('.saveBtn');
const btnremove = document.querySelector('.removeBtn');
const con=document.querySelector(".con")
    getdata()
  
});

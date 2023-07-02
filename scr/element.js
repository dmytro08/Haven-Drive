// Функція для побудови елемента та розміщення його в DOM
function buildElementToPage(id, elem) {                               
    const element = document.createElement('div')
    element.classList.add('element')
    element.insertAdjacentHTML('afterbegin', `
    <div class="element-data">
        <img src="img/${elem.pictname}" class="element-img">
        <div class="element-name">${elem.name}</div>
        <p class="element-text">Capacity: <span class="element-volume">${elem.volume}</span>gb</p> 
        <p class="element-text">Type: <span class="element-material">${elem.material}</span></p> 
        <p class="element-text">Connector type: <span class="element-connector">${elem.connector}</span></p>
        <p class="element-text">Form-factor: <span class="element-formfactor">${elem.formfactor}</span>"</p>
        <p class="element-text">Rotational speed: <span class="element-rotationalspeed">${elem.rotationalspeed}</span>rpm</p>
    </div>
    <div class="element-footer">
        <button class="blue-button" onclick="modifyModalToEdit(${id})">Edit</button><span> </span>
        <button class="red-button" onclick="removeElementFromStorage(${id})">Delete</button>
    </div>
    <p></p>
    `)
    document.getElementsByClassName("displayzone")[0].appendChild(element)
}

// Зміна параметрів модального вікна для створення нового елементу
function modifyModalToCreate() {
    document.getElementsByClassName("modal-title")[0].innerText = "Create new element"
    document.getElementById("submitbtn").setAttribute("onclick", `addElementToLocalStorage()`)
    document.getElementById("submitbtn").innerText = "Create"
    document.getElementById("img-prev-section").setAttribute("style", "display: none")
    document.getElementById("label-select-img").innerText = "Select image file:"
    //  Вікриваємо модальне вікно
    modal.open()
}

// Зміна параметрів модального вікна для редагування поточного елементу
function modifyModalToEdit(id) {
    document.getElementsByClassName("modal-title")[0].innerText = "Edit element"
    document.getElementById("submitbtn").innerText = "Update"
    document.getElementById("submitbtn").setAttribute("onclick", `editElementInLocalStorage(${id})`)
    //  Вибираємо елемент по ID з LS і парсимо в об'єкт
    let edElem = JSON.parse(localStorage.getItem(id))
    //  Встановлюємо значення полів форми
    document.getElementById("name").value = edElem.name;   
    document.getElementById("volume").value = edElem.volume;   
    document.getElementById("material").value = edElem.material;
    document.getElementById("connector").value = edElem.connector;
    document.getElementById("formfactor").value = edElem.formfactor;
    document.getElementById("rotationalspeed").value = edElem.rotationalspeed;
    document.getElementById("imgprev").setAttribute("src", `img/${edElem.pictname}`)
    document.getElementById("label-select-img").innerText = "You can choose another image file:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block") 
    //  Вікриваємо модальне вікно
    modal.open()
}

//  Відображення зменшеної картинки в модальному вікні
function showPrewImg(){
    let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
    document.getElementById("imgprev").setAttribute("src", `img/${filename}`)
    document.getElementById("label-select-img").innerText = "You can choose another image file:"
    document.getElementById("img-prev-section").setAttribute("style", "display: block")
}

//Слухаємо, чи змінилося значення поля input type="file" (чи вибралася інша картинка)
document.getElementById("imgfile").addEventListener("change", showPrewImg)






//Валідація введеного імені і об'єму диску
function validNameAndVolume(){
    let valid = true;
    let showMsg = '';
    let formName = document.getElementById("name").value.trim();
    let formVolume = document.getElementById("volume").value.trim();
    let formConnector = document.getElementById("connector").value.trim();
    let formFormfactor = document.getElementById("formfactor").value.trim();
    let formRotationalspeed = document.getElementById("rotationalspeed").value.trim();
    if (!formName) {
        showMsg = 'Disk name is field empty. INPUT DISK NAME. '
        valid = false;
    }  
    
    if (!formVolume) {
        showMsg = showMsg + 'Disk capacity is field empty. INPUT THE DISK CAPACITY. '
        valid = false;
    } else
    if (+formVolume > 20000) {
        showMsg = showMsg + 'Disk capacity more than 20000 gb. INPUT THE CORRECT CAPACITY. '
        valid = false;
    } else
    
    if (+formVolume < 500) {
        showMsg = showMsg + 'Disk capacity less than 500 gb. INPUT THE CORRECT CAPACITY. '
        valid = false;
    } 

    if (!formConnector) {
        showMsg = 'Connector type is field empty. SELECT CONNECTOR TYPE. '
        valid = false;
    } 

    if (!formFormfactor) {
        showMsg = 'Form-factor is field empty. SELECT FORM-FACTOR VALUE. '
        valid = false;
    }

    if (!formRotationalspeed) {
        showMsg = 'Rotational speed is field empty. INPUT ROTATIONAL SPEED VALUE. '
        valid = false;
    }

    if (+formRotationalspeed > 20000) {
        showMsg = showMsg + 'Rotational speed more than 20000 rpm. INPUT THE CORRECT VALUE. '
        valid = false;
    } else
    
    if (+formRotationalspeed < 4000) {
        showMsg = showMsg + 'Rotational speed less than 4000 rpm. INPUT THE CORRECT VALUE. '
        valid = false;
    }
    if (valid) {return valid} else {alert (showMsg)}
   
}
function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("The image for the disk was not selected. SELECT AN IMAGE FOR THE DISK. ")
        return false} ;
}

// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (validNameAndVolume() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
        // Будуємо новий елемент
        const newElement = {};
        newElement.name =  document.getElementById("name").value;   
        newElement.volume = document.getElementById("volume").value;   
        newElement.material = document.getElementById("material").value;
        newElement.connector = document.getElementById("connector").value;
        newElement.formfactor = document.getElementById("formfactor").value; 
        newElement.rotationalspeed = document.getElementById("rotationalspeed").value; 
        newElement.pictname = filename;   
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement)
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000)
    }
}
   
// Редагування параметрів елемента та розміщення його в LS
function editElementInLocalStorage(id) {
    if (validNameAndVolume()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.name =  document.getElementById("name").value;   
        edElem.volume = document.getElementById("volume").value;   
        edElem.material = document.getElementById("material").value;
        edElem.connector = document.getElementById("connector").value;
        edElem.formfactor = document.getElementById("formfactor").value;
        edElem.rotationalspeed = document.getElementById("rotationalspeed").value;
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
            edElem.pictname = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt)
        modal.close()
        setTimeout(location.reload(), 1000) //Перезавантажуємо вікно
    }
   
}

function removeElementFromStorage(id) {
    // Отримуємо посилання на модальне вікно
    const modal = document.querySelector(".delete-modal");
  
    // Відображаємо модальне вікно
    modal.style.display = "block";
  
    // Отримуємо кнопки підтвердження та скасування
    const confirmBtn = document.querySelector(".delete-confirm-btn");
    const cancelBtn = document.querySelector(".delete-cancel-btn");
  
    // Додаємо обробник події для кнопки підтвердження
    confirmBtn.addEventListener("click", function () {
      // Видаляємо елемент з localStorage
      localStorage.removeItem(id);
      
      // Перезавантажуємо вікно
      location.reload();
    });
  
    // Додаємо обробник події для кнопки скасування
    cancelBtn.addEventListener("click", function () {
      // Приховуємо модальне вікно
      modal.style.display = "none";
    });
  }
  

let keyNumbers = Object.keys(localStorage).length //Визначаємо кількість об'єктів LocalStorage

for (let k=0; k<keyNumbers; k++) {
    let keyName = localStorage.key(k)
    let row = JSON.parse(localStorage.getItem(keyName))
    buildElementToPage(keyName, row)
}


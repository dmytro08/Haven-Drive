// Задання вихідних параметрів (title, [x], content) конфігурації модального вікна
const modal = $.modal({
    title: 'Disk options',
    closable: true,
    content: `
        <div class="modal-form">
            <label for="name">Disk name:</label><br>
            <input type="text" id="name" name="name" class="modal-form-field" placeholder="Input diskname..."/><br><br>
            <label for="volume">Disk capacity:</label><br>
            <input type="number" id="volume" name="volume" step ="500" min="500" max="20000" class="modal-form-field" placeholder="Input disk capacity (gb) between 500 & 20000"/><br><br>
            <label for="material">Disk type:</label><br>
            <select id="material" name="material" class="modal-form-field">
                <option value="Internal">Internal</option>
                <option value="External">External</option> 
            </select><br><br>
            <label for="connector">Connector type:</label><br>
            <select id="connector" name="connector" class="modal-form-field">
                <option value="ATA">ATA</option>
                <option value="SATA">SATA</option>
                <option value="SCSI">SCSI</option>
                <option value="SAS">SAS</option>
                <option value="USB">USB</option>
            </select><br><br>
            <label for="formfactor">Form-factor:</label><br>
            <select id="formfactor" name="formfactor" class="modal-form-field">
                <option value="3.5"">3.5"</option>
                <option value="2.5"">2.5"</option>
                <option value="1.8"">1.8"</option>
                <option value="1.3"">1.3"</option>
            </select><br><br>
            <label for="rotationalspeed">Rotational-speed:</label><br>
            <input type="number" id="rotationalspeed" name="rotarionalspeed" step ="20" min="4000" max="20000" class="modal-form-field" placeholder="Input disk rotational speed (rpm) between 4000 & 20000"/><br><br>
                
                
            <div id= "img-prev-section">
                <img id="imgprev" src="" >
            </div>   
                <label for="file" id="label-select-img">Select image file:</label><br>
                <input type="file" id="imgfile" name="imgfile"><br><br>
            
            <button id="submitbtn" class="blue-button" onclick="myFunction()">Click me</button>
        </div> 
    `,
    width: '500px'
})



// Вибірка всіх "Capacity" та обчислення "Total capacity"
function countTotalVolume(){
    let volArr = document.getElementsByClassName("element-volume")
    let totalVolume = 0
    for (let i=0; i<volArr.length; i++) {
        totalVolume+= Number(volArr[i].outerText)
    }
    document.getElementById("countresult").innerHTML = `Total capacity:  <b>${totalVolume} gb   </b>`
}



countbtn.addEventListener('click', countTotalVolume)







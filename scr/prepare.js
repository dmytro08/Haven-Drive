
 // Масив startArray містить початкові дані, які будуть збережені в localStorage
function prepare(){
    let startArray = [
        {name: "Westrn Digital Portable ", volume: 1000, material: "External",connector:"USB",formfactor:"3.5",rotationalspeed:"5400",pictname: "western digital portable_1tb.jpg"},
        {name: "Seagate IronWolf", volume: 4000, material: "Internal",connector:"SCSI",formfactor:"3.5",rotationalspeed:"7200",pictname: "seagate_ironwolf_pro_4tb_.jpg"},
        {name: "Western Digital WD1005FBYZ ", volume: 10000, material: "Internal",connector:"ATA",formfactor:"3.5",rotationalspeed:"10000",pictname: "western digital yellow_10tb.jpg"},
        {name: "Seagate Barracuda", volume: 1000, material: "Internal",connector:"SATA",formfactor:"3.5",rotationalspeed:"7200",pictname: "seagate-barracuda-1tb.jpg"},
        {name: "Toshiba HDWD110UZSVA", volume: 1000, material: "Internal",connector:"SAS",formfactor:"3.5",rotationalspeed:"7200",pictname: "toshiba_1tb.jpg"},
        {name: "Western Digital WD1005FBYZ", volume: 8000, material: "Internal",connector:"SATA",formfactor:"3.5",rotationalspeed:"5400",pictname: "western digital purple_8tb.jpg"},
        {name: "Seagate Basic", volume: 1000, material: "External",connector:"USB",formfactor:"2.5",rotationalspeed:"7200",pictname: "seagate_portable_1tb.jpg"},
    ]
    
    localStorage.clear() //Очищуємо LocalStorage
    
    //Додаємо нові елементи в LocalStorage
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(`${i}`, rowSt)
    }

    location.reload();  //Перезавантажуємо вікно
}
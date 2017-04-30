var debut = new Date();
var timerID = 0;
function temps(){
 var encours = new Date();
    heure = encours.getHours() - debut.getHours();
    minute = encours.getMinutes() - debut.getMinutes();
    seconde = encours.getSeconds() - debut.getSeconds();
console.log(encours.getHours());
    console.log(heure+ ":" + minute + ":" + seconde );
    timerID = setTimeout("temps()",1000);
    
}

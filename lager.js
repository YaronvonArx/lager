var state = 0;

var form = document.querySelector('form');
form.addEventListener('submit', function (event) {
   event.preventDefault();
   var data = new FormData(form);
   check(data);
});

function check (data){
   var request = new XMLHttpRequest();
   request.addEventListener('load', function(event) {
      if (request.status >= 200 && request.status < 300) {
         console.log(request.responseText);
	     document.getElementById("content12").innerHTML = request.responseText+"---";
      } else {
         console.warn(request.statusText, request.responseText);
	     document.getElementById("content12").innerHTML = request.statusText+"//"+request.responseText;
      }
	  alert("Ja Ja");
   });
   request.open("POST","lager.php");
   request.send(data);
}

function showIdentification () {   
 
   try {
      var e = document.getElementById("idMode");
      state = e.selectedIndex;
   }
   catch(err) {
      ;
   }
   
   var txt = ''
   txt = txt + '<select name=\"mode\" onchange=\"showIdentification()\" id=\"idMode\">';
   txt = txt + '<option value=0'+(state==0?' selected':'')+'>Suche</option>';
   txt = txt + '<option value=1'+(state==1?' selected':'')+'>Edit</option>';
   txt = txt + '<option value=2'+(state==2?' selected':'')+'>Neu</option>';
   txt = txt + '<option value=3'+(state==3?' selected':'')+'>Einstellungen</option>';
   txt = txt + '</select>';
   switch (state) {
      case 3:
         txt = txt + '<form method=\"POST\" action=\"lager.php\">';
         txt = txt + '<label for=\"username\">Benutzername</label>'
         txt = txt + '<input id=\"username\" name=\"username\" pattern=\"^[a-z0-9]{4,20}$\">' 
         txt = txt + '<p>Der Benutzername muss aus kleinen Buchstaben(a-z) oder Ziffern(0-9) bestehen und 4-20 Zeichen lang sein</p>'
         txt = txt + '<button>Prüfe</button>'
         txt = txt + '</form>'
         break;
      default:
         ;
   }

   document.getElementById("content12").innerHTML = txt;
}

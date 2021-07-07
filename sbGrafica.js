$(document).ready(function() {
  var db = firebase.database();
  var coleccionPais = db.ref().child("pais");    
  var coleccionSucursal=db.ref().child("sucursal"); 
  var coleccionCanal=db.ref().child("canal");     
  var coleccionOpcion=db.ref('opcion');
  var coleccionEncuesta=db.ref().child("encuesta");    
  var Pais,Ciudad,Canal,Pregunta,Opcion,Comentario;
    
  var Preguntas = [] ;  
  var PreguntasID = [] ;       
  var Opciones=[];
  var Encuestas=[];
    
var Excelente=[0,0,0,0];
var Bueno=[0,0,0,0];
var Regular=[0,0,0,0];
var Malo=[0,0,0,0];
    
var Tabulacion = [
     [0,0,0,0],
     [0,0,0,0],
     [0,0,0,0],
     [0,0,0,0]
];
    
    
     var myChart; 
    
 $("#cbopais").empty();
    
 coleccionPais.on("value", function(data) { 
    
     data.forEach(function(e){
      var row = e.val();
       key= e.key? e.key:'--'; 
       descripcion= row['pais'] ? row['pais']:'--';        
       $('#cbopais').prepend("<option value="+ key + ">"+descripcion+"</option>");
  });
      Pais= $('#cbopais').val();  
        
});   

 $('#cbocanal').empty();
    
 $('#cbocanal').on('change',function(){    
    Canal=$('#cbocanal').val();     
});       

 coleccionCanal.on("value", function(data) {     
     data.forEach(function(e){
      var row = e.val();
       key= e.key? e.key:'--'; 
       descripcion= row['canal'] ? row['canal']:'--';        
       $('#cbocanal').prepend("<option value="+ key + ">"+descripcion+"</option>");
  });  
        Canal=$('#cbocanal').val(); 
});   
    
 $("#cbosucursal").empty();  
 
 coleccionSucursal.on("value", function(data) {     
 data.forEach(function(e){
  var row = e.val();
   key= e.key? e.key:'--'; 
   descripcion= row['descripcion'] ? row['descripcion']:'--'; 
   pais= row['pais'] ? row['pais']:'--';      
   if (pais==Pais) {
    $('#cbosucursal').prepend("<option value="+ key + ">"+descripcion+"</option>");
   }
 });  
});        

 $('#cbopais').on('change',function(){    
 Pais= $('#cbopais').val();  
  $("#cbosucursal").empty();
    
  
 coleccionSucursal.on("value", function(data) {     
 data.forEach(function(e){
  var row = e.val();
   key= e.key? e.key:'--'; 
   descripcion= row['descripcion'] ? row['descripcion']:'--'; 
   pais= row['pais'] ? row['pais']:'--';      
   if (pais==Pais) {
    $('#cbosucursal').prepend("<option value="+ key + ">"+descripcion+"</option>");
   }
 });     
     Ciudad=$('#cbosucursal').val();

});    
           
}); 
 
 $(document).on('click','#btnenviar',function(){  

    Canal= $('#cbocanal').val();   
    
    coleccionPreguntas=coleccionCanal.child(Canal).child('Preguntas');      

     $('.grafica').empty();
     $('.grafica').append( '<canvas id="myChart" style="position: relative; height:30vh; width:70vw"></canvas>');
     $('.grafica').append('<div class="PreguntasLabel">');
     
     
    coleccionPreguntas.on("value", function(data) {    
    Preguntas=[];
    PreguntasID=[];
     data.forEach(function(e){
      var row = e.val();
         key= e.key? e.key:'--'; 
         pregunta= row[key] ? row[key]:'--';
         var texto=row['item'];   
        Preguntas.push(pregunta) ;
        PreguntasID.push(key);  
});
    
     
    Preguntas.forEach(function(elemento, indice, array) {
    $('.PreguntasLabel').append('<div class="rellenoitem">'+PreguntasID[indice]+'.'+elemento+'</div>');
});
 });
    
    coleccionEncuesta.on("value", function(data) {       
    var ps1=$("#cbopais").val();
    var cd1=$("#cbosucursal").val();
    var cl1=$("#cbocanal").val();   
    Excelente=[0,0,0,0];
        Bueno=[0,0,0,0];
      Regular=[0,0,0,0];
         Malo=[0,0,0,0];
    
Tabulacion = [
     [0,0,0,0],
     [0,0,0,0],
     [0,0,0,0],
     [0,0,0,0],
];
    
    data.forEach(function(e){       
         var row = e.val();             
         key= e.key? e.key:'--'; 
         var pg=row['Pregunta'];
         var op=row['Opcion'];  
         var ps=row['Pais'];        
         var cd=row['Ciudad'];
         var cl=row['Canal'];         
     
         
    if((ps==ps1) && (cd==cd1) && (cl==cl1)){      
        
         var p=1;
         
         while(p<=4){
          if(pg==p){
             
            if(op==1){
            Excelente[p-1]=Excelente[p-1]+1; 
            Tabulacion[0][p-1]= Tabulacion[0][p-1]+1;
            
            }
              
                       
           if(op==2){
            Bueno[p-1]=Bueno[p-1]+1;   
            Tabulacion[1][p-1]= Tabulacion[1][p-1]+1;
           }
              
              
           if(op==3){
            Regular[p-1]=Regular[p-1]+1; 
            Tabulacion[2][p-1]= Tabulacion[2][p-1]+1;   
           }
                
        
           if(op==4){
            Malo[p-1]=Malo[p-1]+1; 
            Tabulacion[3][p-1]= Tabulacion[3][p-1]+1;
           }
         }
            p=p+1;
        } 
    };         
      
});

});
     
var ctx = document.getElementById('myChart').getContext('2d');     

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: PreguntasID, //preguntas
        datasets: [{
              
            label: 'Excelente',//opcion
            data: Tabulacion[0],//Excelente, //frecuencia PREGUNTA
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)'
              
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 100, 1)',
             
            ],
            borderWidth: 1
        },
                   
         {
            
            label: 'Bueno',
            data: Tabulacion[1],
            backgroundColor: [
                  'rgb(0, 0, 255)',
                  'rgb(0, 0, 255)',
                  'rgb(0, 0, 255)',
                  'rgb(0, 0, 255)'
           
            ],
            borderColor: [
                'rgba(200, 99, 132, 1)',
                'rgba(200, 162, 235, 1)',
                'rgba(200, 206, 86, 1)',
                'rgba(200, 192, 192, 1)',
              
            ],
            borderWidth: 1
        },
        
        {     
            label: 'Regular',//opcion
            data: Tabulacion[2], //frecuencia PREGUNTA
            backgroundColor: [
                'rgb(0, 255, 0)',
                'rgb(0, 255, 0)',
                'rgb(0, 255, 0)',
                'rgb(0, 255, 0)'
          
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
             
            ],
            borderWidth: 1
        },
                   
        {    
            label: 'Malo',//opcion
            data: Tabulacion[3], //frecuencia PREGUNTA
            backgroundColor: [
                  'rgb(75, 0, 100)',
                  'rgb(75, 0, 100)',
                  'rgb(75, 0, 100)',
                  'rgb(75, 0, 100)'
          
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
             
            ],
            borderWidth: 1
        },           
                  
        ]
    },
    
    
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});    

coleccionOpcion.on("value",function(d){            
         d.forEach(function(e){
              k=e.key;  
              fila=e.val();   
              Opciones.push(fila[k]);              
       });    
     }); 

 });
});  
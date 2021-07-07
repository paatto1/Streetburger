$(document).ready(function() {
  var db = firebase.database();
  var coleccionPais = db.ref().child("pais");    
  var coleccionSucursal=db.ref().child("sucursal"); 
  var coleccionCanal=db.ref().child("canal");     
  var coleccionOpcion=db.ref('opcion');
  var coleccionEncuesta=db.ref().child("encuesta");    
  var Pais,Ciudad,Canal,Pregunta,Opcion,Comentario;    
    
    
 
    
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

 function writeEncuesta(pais, ciudad, canal, pregunta,opcion,comentario,clienteid) {
     var newEncuesta = coleccionEncuesta.push();    
      var id=newEncuesta.key;      
     $('.opcion').children('#'+Pregunta).val(id);
    
    newEncuesta.set({
                Pais: pais,
                Ciudad: ciudad,
                Canal: canal,
                Pregunta:pregunta,
                Opcion:opcion,
                Comentario:comentario,
                Clienteid:clienteid
 });
    
    
    //var newEncuesta = db.ref('encuesta').Push().key;    
/*var newEncuesta = coleccionEncuesta.push();
newEncuesta.set({
                username: name,
                email: email,
                  profile_picture : imageUrl
});*/
    
    
   /* db.ref('encuesta/'+newEncuesta +'/Pais').set(Pais);
    db.ref('encuesta/'+newEncuesta +'/Ciudad').set(Ciudad);
    db.ref('encuesta/'+newEncuesta +'/Canal').set(Canal);    
    db.ref('encuesta/'+newEncuesta +'/Pregunta').set(Preguta);   
    db.ref('encuesta/'+newEncuesta +'/Opcion').set(Opcion);   
    db.ref('encuesta/'+newEncuesta +'/Comentario').set(Comentario);  
    db.ref('encuesta/'+newEncuesta +'/Clienteid').set(Clienteid);  */  
}  
    
 function editEncuesta(pais, ciudad, canal, pregunta,opcion,comentario,clienteid,EncuestaId){
    data={
             'Pais': pais,
             'Ciudad': ciudad,
             'Canal': canal,
             'Pregunta':pregunta,
             'Opcion':opcion,
             'Comentario':comentario,
             'Clienteid':clienteid
          };    
    
    var edit= coleccionEncuesta.child(EncuestaId);
    edit.update(data);  
    
}    
    
    
$(document).on('click','.1',function(){  
  Pais=$('#cbopais').val();
  Ciudad=$('#cbosucursal').val();
  Canal=$('#cbocanal').val();
  Pregunta=$(this).parent().attr('id');      
  Opcion='1';
  Clienteid='C01';  
  Comentario=  $('.opcion').parent().find('#c'+Pregunta).val();
 
  codigo= $(this).parent().find('#'+Pregunta).val();   
  
    

   padre=$(this).parent().attr('id');

    
      coleccionOpcion.on("value",function(d){
             d.forEach(function(e){
             k=e.key;  
             fila=e.val();   
             var imagen=fila['img']; 
             $('div#'+padre+'.opcion').find('.'+k).attr('src',imagen);
             
           }); 
        });
     
    
    
  $(this).attr('src','https://raw.githubusercontent.com/paatto1/Streetburger/main/images/jv_exelente_activo.png');
    
  num=codigo.length;
  
  if(num==0){     
    writeEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid)
  }
    
 if(num>0){   
      
    editEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid,codigo);
  }    
    
});  
    

$(document).on('click','.2',function(){
  Pais=$('#cbopais').val();
  Ciudad=$('#cbosucursal').val();
  Canal=$('#cbocanal').val();
  Pregunta=$(this).parent().attr('id');      
  Opcion='2' ;
  Clienteid='C01';  
  Comentario=  $('.opcion').parent().find('#c'+Pregunta).val();
  codigo= $(this).parent().find('#'+Pregunta).val();
  
    padre=$(this).parent().attr('id');

    
   padre=$(this).parent().attr('id');

    
      coleccionOpcion.on("value",function(d){
             d.forEach(function(e){
             k=e.key;  
             fila=e.val();   
             var imagen=fila['img']; 
             $('div#'+padre+'.opcion').find('.'+k).attr('src',imagen);
             
           }); 
        });
     
    
    
  $(this).attr('src','https://raw.githubusercontent.com/paatto1/Streetburger/main/images/jv_bueno_activo.png');
        
    num=codigo.length;   

  
  if(num==0){     
    writeEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid)
  }
    
 if(num>0){   
    editEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid,codigo);
  }   
    
});  
    
    
$(document).on('click','.3',function(){
  Pais=$('#cbopais').val();
  Ciudad=$('#cbosucursal').val();
  Canal=$('#cbocanal').val();
  Pregunta=$(this).parent().attr('id');      
  Opcion='3';   
  Clienteid='C01';  
  Comentario=  $('.opcion').parent().find('#c'+Pregunta).val();
  codigo= $(this).parent().find('#'+Pregunta).val();
 
    
   padre=$(this).parent().attr('id');

    
      coleccionOpcion.on("value",function(d){
             d.forEach(function(e){
             k=e.key;  
             fila=e.val();   
             var imagen=fila['img']; 
             $('div#'+padre+'.opcion').find('.'+k).attr('src',imagen);
             
           }); 
        });
     
    
    
  $(this).attr('src','https://raw.githubusercontent.com/paatto1/Streetburger/main/images/jv_regular_activo.png');

        
    
num=codigo.length;
    

  
  if(num==0){     
    writeEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid)
  }
    
 if(num>0){   
    editEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid,codigo);
  }
                    
});  
    
    
$(document).on('click','.4',function(){
  Pais=$('#cbopais').val();
  Ciudad=$('#cbosucursal').val();
  Canal=$('#cbocanal').val();
  Pregunta=$(this).parent().attr('id');      
  Opcion='4' ; 
  Clienteid='C01';  
  Comentario=  $('.opcion').parent().find('#c'+Pregunta).val();
   codigo= $(this).parent().find('#'+Pregunta).val();
  
   padre=$(this).parent().attr('id');

    
      coleccionOpcion.on("value",function(d){
             d.forEach(function(e){
             k=e.key;  
             fila=e.val();   
             var imagen=fila['img']; 
             $('div#'+padre+'.opcion').find('.'+k).attr('src',imagen);
             
           }); 
        });
     $(this).attr('src','https://raw.githubusercontent.com/paatto1/Streetburger/main/images/jv_malo_activo.png');
        
    
num=codigo.length;
    

  
  if(num==0){     
    writeEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid)
  }
    
 if(num>0){ 
     console.log(codigo);
    editEncuesta(Pais, Ciudad, Canal, Pregunta,Opcion,Comentario,Clienteid,codigo);
  }  
      
});        
        
var imagenes='';
imagenes='<div class="opcion">'; 
        
coleccionOpcion.on("value",function(d){
     d.forEach(function(e){
     k=e.key;     
     fila=e.val();   
      var imagen=fila['img']; 
         console.log(k);
         imagenes=imagenes+'<img src="'+ imagen +'" class="'+k+'">';   
      });             
});
         
imagenes=imagenes+'</div>';  
    
    
$('#btnenviar').on('click',function(){   
     $('.pregunta').remove(); 
     $('.opcion').remove(); 
  coleccionPreguntas=coleccionCanal.child(Canal).child('Preguntas');    
  coleccionPreguntas.on("value", function(data) {
     data.forEach(function(e){
      var row = e.val();
         key= e.key? e.key:'--'; 
         pregunta= row[key] ? row[key]:'--';
         var texto=row['item'];
         
      $('#preguntas').append('<div class="pregunta" id="'+key+'"><strong>'+ pregunta+'</strong></div>');
       
         
        imagenes='';
        imagenes='<div class="opcion" id="'+key+'">';
        
         coleccionOpcion.on("value",function(d){
             d.forEach(function(e){
              k=e.key;  
              k1='img'+k;
              fila=e.val();   
              var imagen=fila['img'];  
                imagenes=imagenes+'<img src="'+ imagen +'" class="'+k+'">';   
             
           });             
             
         });
         
     imagenes=imagenes+'<input type="hidden" class="codigo" id="'+key+'"></div>';      
         

      $('#preguntas').append(imagenes);
        
        var cm='c'+key;
      
$('#preguntas').append('<div class="opcion"><textarea class="comentario" id="'+cm+'"  placeholder="'+ texto +'" cols="30" rows="3" class="form-control"></textarea></div>');    
  });
 }); 
    $('#preguntas').append('<div class="opcion"><button class="finalizar button">Finalizar</button></div>'); 
});   
   
 
    $(document).on("click", ".finalizar", function() { 
       $('#content').load('sbFinalizar.html');
    });    
    
});
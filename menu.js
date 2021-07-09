$(document).ready(function(){

	$('.menu_bar').click(function(){
	
        if ($('nav').is(':hidden')){
            $('nav').show();
            	$('nav').animate({
				left: '0'
			}); 
        }else{
           $('nav').hide();
          }
        
         console.log($('nav').css('display'));
        }) ;
        
        
       
        
});
$(document).ready(function() {
    $('#drop').hide();
  /*input click*/
    $( "#search" ).keyup(function(){ 
     
      var insText = $( "#search" ).val();
      if (insText!=""){               
        $('#drop').empty();
        $('#drop').show();
        $('#drop').append('<ul class="col-12 p-0" id="dropdown"></ul>');
    /*get API data*/
        $.get('https://restcountries.eu/rest/v2/all').done(function(data){
          $.each(data, function(i) {
            var re = new RegExp(insText, 'ig');  
            var n = data[i].name;  
            if(n.match(re)){
              $('#dropdown').append('<li class="li">'+n+'</li>')
            }            
          });  
      /*insert selection li in input*/
          $("li").click(function(){            
            var selText = $(this).text();                 
            $('#search').val(selText);
            $('#drop').empty();
            $('#drop').hide(); 
            countryInfo(); 
          });     
      /*insert selection li in input END*/

      /*animation drop height*/
          var contentHeight = $("#dropdown").outerHeight(true);
          $("#drop").animate({height: contentHeight}, 500);   
      /*animation drop height END*/       
        }); 
    /*get API data END*/         
      }  
      else {
        $('#drop').empty(); 
        $('#drop').hide();
      }

      if($('ul').hover()&&event.keyCode == 38||event.keyCode == 40){  
        $("#drop").focus();
      } 
    });  
  /*input click END*/
    
/*scroll*/
  $(function(){  
    $("#drop").niceScroll({
        cursorcolor:"rgba(20,20,20,0.6)",
        cursorwidth:"5px",
        cursorborder:"1px solid rgba(20,20,20,0.6)",
        cursorborderradius:10,
    });   
  }); 

  var countryInfo = function(){
    $('#countryInfo').empty();
    var countryName = $('#search').val();
    $.get('https://restcountries.eu/rest/v2/name/'+countryName).done(function(data){
      $('#countryInfo').append('<table class="p-0"></table>');  
        
/*ф-ия определяет какие ключи остаются*/
      var dataArr = Object.keys(data[0]);
      var removeVal = new Array(1,2,3,4,6,10,11,12,13,14,15,16,17,20,22,23); 
      var arr = $.grep(dataArr, function(n, i) {
          return $.inArray(i, removeVal) ==-1;
        });
      $.each(arr, function(key, val) {
        if(val!="flag"){
          $('table').append('<tr><td><p>'+val+'</p></td><td id='+val+'></td>');
        }
      });
/*ф-ия определяет какие ключи остаются END*/

      $.each(data[0], function(key, value) {  

        if($.isArray(value)){           
           $.each(value, function(key1, value1) {             
            if(value1.constructor === Object){             
              $.each(value1, function(key2, value2) {
                if(value2.constructor === Object){
                  $.each(value2, function(key3, value3) {
                    $('#'+key).append('<p>'+key3+': '+value3+'</p>');
                  });
                }
                else{
                  $('#'+key).append('<p>'+key2+': '+value2+'</p>');
                }
              });                         
            }   
            else{$('#'+key).append(value1);}        
          });           
        }
        else{
          if(key!='flag'){
          $('#'+key).append(value);
          }
          else{$('#flag').css('background', function () {
            return('url('+value+') no-repeat top center')});
            $('#flag').css('background-size', 'cover');
            $('#flag').css('display', 'block');
          }
        }        
      });       
    });
  }            
});

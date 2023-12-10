    
function run(){
              
    let code=document.getElementById("html-code").value; 
    let ccode=document.getElementById("css-code").value;
    let jcode=document.getElementById("jscode").value;
    let output=document.getElementById("output");  
   
    output.contentDocument.body.innerHTML=code+"<style>"+ccode+"</style>";
   output.contentWindow.eval(jcode);
  
}
function function_print()
{
    let print_html =document.getElementById("html-code").value;
   
    let print_css=document.getElementById("css-code").value;
    let print_js=document.getElementById("jscode").value;

   let print_area=window.open();
   print_area.document.body.innerHTML="<plaintext>"+print_html+print_css+print_js;
   print_area.document.close();
   print_area.focus();
   print_area.print();
   print_area.close();


}


var h_tab = document.getElementById('html-code');  
 h_tab.onkeydown = function(e) {

 if (e.keyCode === 9) { 

     this.setRangeText(

             '\t',

             this.selectionStart,
             this.selectionStart,

             
             'end'

         )

     return false; 

 }

};

var j_tab = document.getElementById('jscode');  
 j_tab.onkeydown = function(e) {

 if (e.keyCode === 9) { 

     this.setRangeText(

             '\t',

             this.selectionStart,
             this.selectionStart,

             
             'end'

         )

     return false; 

 }

};

var c_tab = document.getElementById('css-code');  
 c_tab.onkeydown = function(e) {

 if (e.keyCode === 9) { 

     this.setRangeText(

             '\t',

             this.selectionStart,
             this.selectionStart,

             
             'end'

         )

     return false; 

 }

};

function refresh()
{
    location.reload();
}
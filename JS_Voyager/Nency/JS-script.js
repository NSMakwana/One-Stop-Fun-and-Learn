function run(){
    let code=document.getElementById("html-code").value; 
    let ccode=document.getElementById("css-code").value;
    let jcode=document.getElementById("jscode").value;
    let output=document.getElementById("output");                 
    
   
    output.contentDocument.body.innerHTML=code+"<style>"+ccode+"</style>";
    output.contentWindow.eval(jcode);
  
}
// const code=document.querySelector('#code textarea');
// const jcode=document.querySelector('#jcode textarea');
// const output=document.querySelector('#output');

// function run(){

//     localStorage.setItem('html-code',html-code).value;
//     localStorge.setItem('jscode',jscode.value);
//     output.contentDocument.body.innerHTML=localStorage.html-code;
//     output.contentWindow.eval(localStorage.jscode);
// }

// code.onkeyup= () =>run();
// code.onkeyup= () =>run();

// code.value = localStorage.html-code;
// jcode.value-localStorage.jscode;


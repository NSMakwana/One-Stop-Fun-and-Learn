function print()
{
    let print_text =document.getElementById("text").innerHTML; 
    let print_example =document.getElementById("ex").innerHTML; 
    let print_area=window.open();
    print_area.document.body.innerHTML="<pre>"+print_text+"</pre>"+"<pre>"+print_example+"</pre>";
     print_area.document.close();
    print_area.focus();
    print_area.print();
    print_area.close();
}
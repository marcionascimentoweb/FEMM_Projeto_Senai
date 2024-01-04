function enviarLogin(){
    
    const resultado = document.querySelector('#resultado');

    if(document.getElementById("loginEmail").value=="" && document.getElementById("loginPassword").value==""){
        alert("Por favor preencha os campos Email e Senha");
    }
    else if(document.getElementById("loginEmail").value=="") {
        alert("Por favor preencha os campo Email");
    }
    else if(document.getElementById("loginPassword").value=="") {
       alert("Por favor preencha os campo Senha");
    }
    else if(document.getElementById("loginEmail").value!="livro@senai.com" || document.getElementById("loginPassword").value!="livro") {
    alert("Email e Senha inválidos");
    }
    else if (document.getElementById("loginEmail").value=="livro@senai.com" && document.getElementById("loginPassword").value=="livro") {
        addEventListener("submit", (event) => {
            event.preventDefault();
            window.location = "http://127.0.0.1:5500/livro.html";
        })
    }
    else{
        alert("Opção inválida")
    }
}




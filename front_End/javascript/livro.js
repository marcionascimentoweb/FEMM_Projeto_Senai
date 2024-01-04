     //GET ALL
     const url = "http://localhost:3000/api/livros/";
     
     async function getAllLivros() {
         
         const response = await fetch(url);
         console.log(response);
         const data = await response.json();
         console.log(data);
         
     
    const modal = document.querySelector('.modal-container')
    const tbody = document.querySelector('tbody')
    const sId = document.querySelector('#m-id')
    const sNome = document.querySelector('#m-nome')
    const sAutor = document.querySelector('#m-autor')
    const sEditora = document.querySelector('#m-editora')
    const sAno = document.querySelector('#m-ano')
    const btnSalvar = document.querySelector('#btnSalvar')

    let itens
    let id
    
    function openModal(edit = false, index = 0) {
        modal.classList.add('active')
      
        modal.onclick = e => {
          if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
          }
        }

        if (edit) {
            sId.value = itens[index].id_livro
            sNome.value = itens[index].nome_livro
            sAutor.value = itens[index].autor
            sEditora.value = itens[index].Editora
            sAno.value = itens[index].ano_lancamento 
            id = index
        } else {
            sId.value = ''
            sNome.value = ''
            sAutor.value = ''
            sEditora.value = ''
            sAno.value = ''
        }
    }

    function editItem(index) {
        openModal(true, index)
    }

    function deleteItem(index) {
        itens.splice(index, 1)
        setItensBD()
        loadItens()
    }

    function insertItem(item, index){
        let tr = document.createElement('tr')

        tr.innerHTML = `
        <td>${item.id_livro}</td>
        <td>${item.nome_livro}</td>
        <td>${item.autor}</td>
        <td>${item.editora}</td>
        <td>${item.ano_lancamento}</td>
        <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
        </td>
        <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
        `
        tbody.appendChild(tr)
    }

    btnSalvar.onclick = e => {
        if(sId.value == '' || 
           sNome.value == '' || 
           sAutor.value == '' ||
           sEditora.value == '' ||
           sAno.value == ''
        ){
            return
        }
        e.preventDefault();

        if(id_livro !== undefined){
            itens[id].nome_livro = sNome.value
            itens[id].autor = sAutor.value
            itens[id].editora = sEditora.value
            itens[id].ano_lancamento = sAno.value
        }else {
            itens.push({
                'id_livro': sId.value,
                'nome_livro': sNome.value,
                'autor': sAutor.value,
                'editora': sEditora.value,
                'ano_lancamento': sAno.value
            })
        }
        setItensBD()

        modal.classList.remove('active')
        loadItens()
        id = undefined
    }

    function loadItens() {
        itens = getItensBD()
        tbody.innerHTML = ''
        itens.forEach((item, index) => {
            insertItem(item, index)
        })
    }

    //const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
    //const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

    const getItensBD = () => data;
    const setItensBD = () => data;

    loadItens()
    
}

getAllLivros()
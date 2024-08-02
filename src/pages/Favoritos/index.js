import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./favoritos.css"
import { toast } from "react-toastify"
function Favoritos(){
    const [filmes, setFilmes] = useState([])
    
    useEffect(()=>{
        function LoadFavoritos(){
            const minhaLista = JSON.parse(localStorage.getItem("@primeflix"))
            //Recebe a lista do local storage
            setFilmes(minhaLista)
        }

        LoadFavoritos()
       
    },[])

    function ExcluirFilme(id){
        //O filtro vai devolver toda a lista menos o que tem id igual o id do parametro, retorna uma lista
        let filtro = filmes.filter((item)=>{
            return (item.id != id)
        })
        setFilmes(filtro)
        toast.success("Filme removido com sucesso", {
            position: "top-right"
          });
        localStorage.setItem("@primeflix", JSON.stringify(filtro))

    }
    return (
       
            <div className="favoritos_filmes">
            {filmes.length ===0 && <span>Não tem filmes salvos</span>}
            <ul>
            {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <h1>{filme.title}</h1>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={()=>ExcluirFilme(filme.id)}> Excluir </button>
                            </div>
                            
                        </li>
                    )
                })}
                   </ul>
        </div>
    )
}

export default Favoritos
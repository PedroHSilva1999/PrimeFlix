import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import api from "../../Services/api"
import "./style.css"
import { toast } from "react-toastify"

function Filmes(){
    const navigate= useNavigate()
    const {id} = useParams() 
    const [Filme, SetFilme] = useState({})
    const [loading, SetLoading] = useState(true)
    useEffect(()=>{
        async function LoadApi(){
            const response = await api.get(`movie/${id}`,{
                params:{
                    api_key:"{chave da api}",
                    language:"pt-BR",
                }
            }).then((response)=>{
                SetFilme(response.data)
                SetLoading(false)
                console.log(response.data)
            }).catch((err)=>{
                navigate("/", {replace:true})
                return
            })
   
        }

        LoadApi()

        return () =>{
            console.log("Fim")
        }
    },[id,navigate])



    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhaLista)|| []
        const hasFilmes = filmesSalvos.some((filme)=>filme.id === Filme.id)

        if(hasFilmes){
            toast.warn("Esse filme já está salvo!", {
                position: "top-right"
              });
            return
            
        }
        filmesSalvos.push(Filme)
        localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos) )
        toast.success("Filme salvo com sucesso")



    }


    if(loading){
        return (
            <div>
                <h1 className="info">Carregando detalhes....</h1>
            </div>
        )
    }
    return(
        <div className="info">
            <h1>{Filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${Filme.backdrop_path}`} alt={Filme.title}/>
           <h3>Sinopse</h3>
           <span>{Filme.overview}</span>
           <strong>Avaliação: {Filme.vote_average.toFixed(2)} / 10</strong>

           <div className="area-button">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${Filme.title} Trailer`}>Trailer</a>
                </button>
           </div>
        </div>
    )
}
export default Filmes
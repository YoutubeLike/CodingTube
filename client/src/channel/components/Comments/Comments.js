import React from 'react'
import img from "../../assets/logo.jpg"
import dislike from '../../assets/dislike.png'
import like from '../../assets/like.png'

export default function Comments() {
  return (
    <div className="flex flex-col pl-40 mt-8 w-4/5">
        <p className="font-bold text-2xl">39 commentaires</p>
        <div className='flex items-center mt-8'>
        <img src={img} className="w-12 mr-4" />
        <div>
                <p className="text-xl font-bold mt-2">Nom de la chaîne</p>
                <p>Incroyable vidéo, j'aime le caca</p>
        <div className="flex">
        <button><img src={like} className='w-8 h-8 mr-14 mt-2' ></img></button>
        <button><img src={dislike} className='w-8 h-8 mt-2'></img></button> 
        <p className='mt-2 ml-10'>Répondre</p>  
        </div>
         
        </div>
        </div>
        <div className='flex items-center mt-8'>
        <img src={img} className="w-12 mr-4" />
        <div>
                <p className="text-xl font-bold mt-2">Nom de la chaîne</p>
                <p>Incroyable vidéo, j'aime le caca</p>
        <div className="flex">
        <button><img src={like} className='w-8 h-8 mr-14 mt-2' ></img></button>
        <button><img src={dislike} className='w-8 h-8 mt-2'></img></button> 
        <p className='mt-2 ml-10'>Répondre</p>  
        </div>
         
        </div>
        </div>
        <div className='flex items-center mt-8'>
        <img src={img} className="w-12 mr-4" />
        <div>
                <p className="text-xl font-bold mt-2">Nom de la chaîne</p>
                <p>Incroyable vidéo, j'aime le caca</p>
        <div className="flex">
        <button><img src={like} className='w-8 h-8 mr-14 mt-2' ></img></button>
        <button><img src={dislike} className='w-8 h-8 mt-2'></img></button> 
        <p className='mt-2 ml-10'>Répondre</p>  
        </div>
         
        </div>
        </div>
    </div>
    
  )
}



import React, { useState } from 'react';
import axios from 'axios';



export default function Test() {

    const [name, setName] = useState('');

    const submit = (event) => {
        event.preventDefault();
        try {
            axios.get("http://localhost:5000/api/channel/submitChannel", { 
                name: name 
            })
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'envoi : ", error); // Gestion des erreurs
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <label>
                    Nom de la personne :
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /> {/* Utilisez handleChange ici */}
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}

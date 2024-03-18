import React, { useEffect, useState } from "react";
import axios from "axios";
import img from '../../assets/logo.jpg'
import dislike from '../../assets/dislike.png'
import like from '../../assets/like.png'
import share from '../../assets/share.png'

export default function Video() {

  const [test, setTest] = useState("Coucou");

    const submit = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/channel/request", {
          testData: test 
        });
        console.log(response.data); // Logging the response data to the console
      } catch (error) {
        console.error("An error occurred while searching: ", error); // Handling errors if any
      }
    };

  return (
   <>
    <button onClick={submit}>Clique</button>
    <div className="pl-40 mt-8 w-4/5">
      <iframe
        width="100%"
        height="680"
        src="https://www.youtube.com/embed/Oflbho9ZG2U?start=103"
        
      />

        <h1 className="font-bold mt-4 text-3xl mb-2">Titre de la vidéo</h1>
        
        <div className="flex justify-between">
            <div className="flex">
            <img src={img} className="w-14 mr-4" />
            <div className="flex flex-col">
                <p className="text-xl font-bold">Nom de la chaîne</p>
                <p>Nombre d'abonné</p>
            </div>
            {/*Button qui permet de s'abonner, liker, et partager*/}
            <button className="font-bold bg-neutral-900 text-white px-8 ml-10 rounded-full">S'abonner</button> 
            </div>
           <div>
            <button className="bg-gray-100 px-8 ml-10 rounded-l-full"><img className="w-8 py-2" src={like}/></button>
            <button className="bg-gray-100 px-8 rounded-r-full"><img className="w-8 py-2" src={dislike}/></button>
            <button className="bg-gray-100 px-8 ml-10 rounded-full"><img className="w-8 py-2" src={share}/></button>
            </div> 
        </div>
        
     
    
        <div className="p-4 bg-gray-100 rounded-xl mt-4" >
        <p className="font-bold">1 735 380 vues  1 sept. 2023 <span className="text-blue-600">#sifu #nodamage</span></p>
    <p className="text-justify">World's First Sifu run with these conditions met:
- Master Difficulty
- No Damage
- New Game
- Wude Ending / True Ending
- Single Segment

The run was completed on 31st August 2023. Played on PC, Epic Games Store version.
At the end of the video is the proof of the run. Its shown that I bought all the skills only once, and confirm all my level scores. If at any point, I had spliced my run with another run, the high scores would not have matched.

Timestamps
0:00 Breathe in
0:43 Level 1 - The Squats 
8:29 Fajar, The Botanist 
12:05 Level 2 - The Club
23:09 Sean, The Fighter 
26:38 Level 3 - The Museum 
40:59 Kuroki, The Artist  
45:24 Level 4 - The Tower 
55:40 Jinfeng, The CEO 
59:26 Level 5 - The Sanctuary 
1:05:17 Yang, The Leader 
1:09:23 Wude 
1:10:27 Breathe out 
1:11:27 Proof of run - Skills purchased and Level High Scores

Special thanks:
 @Sloclap   for making the best melee combat game in the last 10 years. And especially for making the awesome Master Hand outfit, without which I wouldn't have started running no damage runs lol.
 @Hiro02   An amazing player who did the first no shortcut no damage run, and definitely inspired me to do a similar run myself.
 @Skirish   for the badass thumbnail. You can commission him to do your thumbnails right here:
https://ko-fi.com/skirish/commissions.
 @justas   and the discord Sifu community he built, for all the banter between all the rage inducing attempts at this (and other) challenge runs.

Other general notes:
This run does not have any cheese or exploits to make the run easier. I really enjoy the combat so I wanted to showcase the combat as it was meant to be played. 
This is my natural playstyle though i do take certain fights a little bit more cautiously as the nature of the run does not allow any mistakes.
For example, I am a little more safe and defensive with bosses compared to my usual playstyle, but I don't make them complete non issues by relying on exploits either.
    </p>

    </div>
    </div>
      
    
    </>
  );
}

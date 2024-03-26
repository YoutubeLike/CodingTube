import { useLoaderData } from "react-router-dom";
import ReactPlayer from "react-player";
// syntaxe "import"
import { io } from "socket.io-client";
import Chat from "./chat.js";

export async function loader({ params }) {
  const user = params.user;
  return { user };
}

export default function LiveFromUser() {
  const { user } = useLoaderData();
  return (
    <>
      <p> {user} </p>
      <ReactPlayer
        url={"http://localhost:8090/live/" + user + ".flv"}
        controls={true}
        playing={false}
        pip={false}
      />
      <Chat user={user} />
      <button onClick={SendWidget}> Appuye moi </button>
    </>
  );
}

export async function ConnectToRoom() {}
// envoie un signal au localhost5000 pour pouvoir ajouter à une div une image qui nous sert de widget
export async function SendWidget() {
  io("http://localhost:5000").emit("send");
  // axios.get('http://localhost:5000/api/live/test')
}

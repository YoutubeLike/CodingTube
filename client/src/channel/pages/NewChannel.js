import React, { useState, useEffect } from "react";
import Create from "../components/CreateChannel/Create";
import axios from "axios";

export default function NewChannel() {
	const [msg, setMsg] = useState("");

	useEffect(() => {
		const fetchTest = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/channel/test"
				);
				setMsg(response.data);
			} catch (error) {
				console.error("Erreur :", error);
			}
		};

		fetchTest();
	}, []);

	return (
		<div>
			<button className="bg-black text-white">Test appel Back</button>

			<p>résultat du back : {msg}</p>

			<Create />
		</div>
	);
}

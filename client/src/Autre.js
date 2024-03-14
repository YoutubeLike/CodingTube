import React, { useEffect, useState } from 'react';
import { useLoaderData } from "react-router-dom";
import "./index.css"

export async function loader({params})
{
  const parameter = await params.test
  return { parameter }
}

export default function Autre() {
  const { parameter } = useLoaderData();
  console.log(parameter)
  console.log('passed here')
  const [message, setMessage] = useState('');
    useEffect(() => {
      fetch('http://localhost:5000/api/live/test/' + parameter)
        .then((res) => res.text())
        .then((data) => setMessage(data))
        .catch((err) => console.log(err));
    }, []);
    return (
        <div>
          <h1 className="text-3xl font-bold underline">{message} NON </h1>
        </div>
    );
  }
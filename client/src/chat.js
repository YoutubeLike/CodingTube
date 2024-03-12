import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io('http://localhost:5000');

function Chat() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('possible')
            socket.on('test', (data) => {
                console.log(data)
            })
        })
    }, [])
    console.log("test");
    return (
        <div>
            <p>{socket.connected}</p>
        </div>
    )    
}

export default Chat;
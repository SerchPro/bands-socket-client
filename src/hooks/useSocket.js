import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
const { io } = require("socket.io-client");

//if the argument not change we use usememo
export const useSocket = ( serverPath ) =>{

    const socket = useMemo( () => io.connect(serverPath,{
        transports: ['websocket']
    }), [serverPath]);

    const [online, setOnline] = useState(false);

    useEffect(() => {
        console.log(socket)
        setOnline(socket.connected)
    }, [socket]);

    useEffect(() => {
    socket.on('connect', () =>{
        setOnline(true);
    });
    }, [socket])

    useEffect(() => {
    socket.on('disconnect', () =>{
        setOnline(false);
    });
    }, [socket])


    return {
        socket,
        online
    }

}
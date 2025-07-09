import { useContext } from "react";

import { AccountContext } from "../../../context/AccountProvider";

import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import Footer from "./Footer";

import { Box } from "@mui/material";


const ChatBox=()=>{

    const {person} = useContext(AccountContext);

    return(
        <Box>
            <ChatHeader person={person}/>
            <Messages person={person}/>
            <Footer/>
        </Box>
    )
}

export default ChatBox;
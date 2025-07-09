import { useState } from "react";

import Header from "./Header";
import Conversations from "./Conversations";


import { Box } from "@mui/material";
import Search from "./Search";


const Menu =() =>{

    const [text,setText]=useState('');

    return(
        <>
        <Box>
            <Header/>
        </Box>
        <Search setText={setText}/>

        <Conversations text={text}/>
        </>
    )

}

export default Menu;
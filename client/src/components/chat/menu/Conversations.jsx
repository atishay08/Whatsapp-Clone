import {useEffect, useState, useContext} from 'react';
import Conversation from './Conversation';


import { getUsers } from '../../../service/api';
import { Box,styled,Divider } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';


const Component=styled(Box)`
    height:81vh;
    overflow:overlay;
`
const StyledDivider=styled(Divider)`
    margin: 0 0 0 70px;
    background-color:#e9edef;
    opacity:6;
`

const Conversations=({text})=>{


    const[users,setUsers]=useState([]);
    const {account,socket,setActiveUsers}=useContext(AccountContext);

    useEffect(()=>{
        const fetchData=async ()=>{
            const response= await getUsers();
            const filteredData = response.filter(user=>user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData); 
        }
        fetchData();
    },[text]);

    useEffect(()=>{
        socket.current.emit('addUsers',account);
        socket.current.on("getUsers",users=>{
            setActiveUsers(users);

        });
    },[account])

    return(
        <Box>
            {
                users.map(user =>(
                    user.sub!==account.sub &&
                    <>
                    <Conversation user={user}/>  
                    <StyledDivider/>
                    </>
                ))
            }
        </Box>
    )
}

export default Conversations;
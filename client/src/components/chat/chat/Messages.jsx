
import { Box, styled} from "@mui/material";
import Footer from "./Footer";
import Message from "./Message";
import { useContext,useState , useEffect} from "react";
import {AccountContext} from '../../../context/AccountProvider';
import { newMessage,getMessages } from "../../../service/api";

const Wrapper=styled(Box)`
    background-image: url('/Screenshot.png');   
    height: 80.5vh;
    width: 100%;
    background-size: cover;
    background-position: center;
`;

const Component=styled(Box)`
    overflow-y:scroll;
    height:80.5vh;
`


const Messages = ({person,conversation})=>{

    const {account} = useContext(AccountContext);
    const [value,setValue]=useState('');
    const [messages,setMessages]=useState([]);


    useEffect(()=>{
        const getMessageDetails=async()=>{
            let data = await getMessages(conversation._id);
            setMessages(data);

        }
        conversation._id && getMessageDetails();
    },[person._id,conversation._id])



    const sendText=async(e)=>{
        const code=e.keyCode || e.which;
        if(code===13){
            let message={
                senderId:account.sub,
                receiverId:person.sub,
                conversationId:conversation._id,
                type:'text',
                text:value
            }
            await newMessage(message);

            setValue('');
        }
        
    }
    return(
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message =>{
                        return <Message message={message}/>
                    })
                }
            </Component>
            <Footer
                sendText={sendText}
                setValue ={setValue}
                value={value}/>

        </Wrapper>
    )
}

export default Messages;
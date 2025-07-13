
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

const Container=styled(Box)`
    padding:1px 80px;
`


const Messages = ({person,conversation})=>{



    const {account, socket,newMessageFlag,setNewMessageFlag} = useContext(AccountContext);
    const [value,setValue]=useState('');
    const [messages,setMessages]=useState([]);
    
    const [image,setImage] = useState('');
    const [incomingMessage, setIncomingMessage] = useState(null);

    const [file,setFile]=useState();

    useEffect(()=>{
        socket.current.on('getMessage',data =>{
            setIncomingMessage({
                ...data,
                createdAt : Date.now()
            })
        })
    },[])


    useEffect(()=>{
        const getMessageDetails=async()=>{
            let data = await getMessages(conversation._id);
            setMessages(data);

        }
        conversation._id && getMessageDetails();
        // conversation._id && getMessageDetails();
    },[person._id,conversation._id,newMessageFlag])

    useEffect(()=>{
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages(prev=> [...prev,incomingMessage])
    },[incomingMessage,conversation])


    const sendText=async(e)=>{
        const code=e.keyCode || e.which;

        if(code===13){
            let message={};
            if(!file){
                message={
                    senderId:account.sub,
                    receiverId:person.sub,
                    conversationId:conversation._id,
                    type:'text',
                    text:value
                }
            }else{
                message={
                    senderId:account.sub,
                    receiverId:person.sub,
                    conversationId:conversation._id,
                    type:'file',
                    text:image
                }
            }

            socket.current.emit('sendMessage',message);

            await newMessage(message);

            setValue('');
            setFile('');
            setImage('');
            setNewMessageFlag(prev =>!prev);
        }
        
    }
    return(
        <Wrapper>
            <Component>
                {   
                    
                    messages && messages.map(message =>(
                        <Container>
                            <Message message={message}/>
                        </Container>
                            
                    ))
                
                    
                }
            </Component>
            <Footer
                sendText={sendText}
                setValue ={setValue}
                value={value}
                file={file}
                setFile={setFile}
                setImage={setImage}/>


        </Wrapper>
    )
}

export default Messages;
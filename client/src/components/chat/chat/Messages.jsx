import { Box, styled} from "@mui/material";


const Wrapper=styled(Box)`
    background-image: url('/Screenshot.png');   
    height: 80.5vh;
    width: 100%;
    background-size: cover;
    background-position: center;
`;

const Component=styled(Box)`
    overflow-y:scroll;
`


const Messages = ()=>{
    return(
        <Wrapper>
            <Component>
                
            </Component>

        </Wrapper>
    )
}

export default Messages;
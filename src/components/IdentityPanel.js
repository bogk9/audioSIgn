import styled from 'styled-components'
import { useContext, useState } from 'react'
import { Box } from './styled'
import { TextArea } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { setKeys } from '../redux/appActions'
import {Button} from './styled';

export const IdentityPanel = (props) => {
    
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const appState = useSelector(state => state.app);

    const onSubmit = () => {
        setLoading(true);
        fetch(`http://localhost:8080/getIdentity`)
        .then(data => data.json())
        .then(data => {
            dispatch(setKeys({privateKey: data.privateKey, publicKey: data.publicKey}));
            setLoading(false);
        })
        .catch(error => console.log(error))
    }

    return(
        <Box>
            <p><b>Step 1: </b> get your identity</p> 

            <p>(private key)</p>
            <TextArea style={{height: 60}} placeholder="private key" value={appState.privateKey}>
            </TextArea>

            <p>(public key)</p>
            <TextArea style={{height: 60}}  placeholder="public key" value={appState.publicKey}>
            </TextArea>

            <Button onClick={onSubmit} disabled={loading}>Get</Button>

        </Box>
    )
}
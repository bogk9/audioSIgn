import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Box, TextArea } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { setSign } from '../redux/appActions'
import { Button } from './styled'


export const SignPanel = () => {
    const [formMessage, setFormMessage] = useState("");
    const [formKey, setFormKey] = useState("");

    const appState = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        setFormKey(appState.privateKey)
    }, [appState.privateKey])
    

    const onSubmit = () => {
        fetch(`http://localhost:8080/signMessage?key=${encodeURIComponent(formKey)}&message=${encodeURIComponent(formMessage)}`)
        .then(data => data.json())
        .then(data => dispatch(setSign(data.sign)))
        .catch(error => console.log(error))
    }

    return(
        <Box>
            <p><b>Step 2:</b> sign.</p>

            (key)
            <TextArea value={formKey} onChange={(e) => setFormKey(e.target.value)}></TextArea>

            (message)
            <TextArea value={formMessage} onChange={(e) => setFormMessage(e.target.value)}></TextArea>

            <Button onClick={onSubmit}>Get</Button>
            <br/>

            (result: sign)
            <TextArea style={{maxWidth: 300, wordBreak: "break-all"}} value={appState.sign}>
            </TextArea>
            
        </Box>
    )
}
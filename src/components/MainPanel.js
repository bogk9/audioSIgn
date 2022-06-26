import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Box } from './styled'
import { Input } from './styled'
import { useSelector } from 'react-redux';
import { TextArea } from './styled';
import { Button } from './styled';

export const MainPanel = () => {
    const [formKey, setFormKey] = useState("");
    const [formSign, setFormSign] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [response, setResponse] = useState("");
    const appState = useSelector(state => state.app);

    useEffect(() => {
        setFormSign(appState.sign);
        setFormKey(appState.publicKey);

    }, [appState]);

    const onSubmit = () => {
        fetch(`http://localhost:8080/verifySign?key=${encodeURIComponent(formKey)}&sign=${encodeURIComponent(formSign)}&message=${encodeURIComponent(formMessage)}`)
        .then(data => data.json())
        .then(data => setResponse(data))
        .catch(error => console.log(error))
    }

    return(
        <Box>
            <p><b>Step 3: </b> verify.</p>

            <p>(public key)</p>
            <TextArea  value={formKey} onChange={(e) => setFormKey(e.target.value)}></TextArea>

            <p>(sign)</p>
            <TextArea  value={formSign} onChange={(e) => setFormSign(e.target.value)}></TextArea>

            <p>(message)</p>
            <TextArea value={formMessage} onChange={(e) => setFormMessage(e.target.value)}></TextArea>

            <br/>
            <Button onClick={onSubmit}>check</Button>
            {JSON.stringify(response)}
        </Box>
    )
}
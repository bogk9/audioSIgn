import styled from 'styled-components'


export const Box = styled.div`
    border: solid;
    border-width: 2px;
    border-radius: 10px;
    background-color: #272727;
    border-color: #656565;
    color: #eeeff2;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 50px;
    margin: 10px;
    height: 50vh;
`

export const Button = styled.button`
  border-radius: 10px;
  border: 0px;
  margin: 0 1em;
  padding: 0.25em 1em;
`

export const TextArea = styled.textarea`
    border-width: 0px;
    border-radius: 10px;
    height: 30px;
    max-width: 300px;
    word-break: break-all;

`
import React from 'react'
import styled from 'styled-components';
import backgroundImg  from './assets/background.jpg';
import FormContainer from './components/FormContainer.js'

const Container = styled.div`
 height: 100vh;
 width: 100vw;
 background: url(${backgroundImg});
 background-size: cover;
 background-position: center;
 padding: 2rem 0;
`;

const App = () => {
  return (
    <Container>
      <FormContainer />
    </Container>
  )
}

export default App
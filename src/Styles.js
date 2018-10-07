import styled from 'styled-components';

export const StyledApp = styled.div`
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const StyledMain = styled.main`
  height: 75vh;

  @media screen and (min-width: 500px) {
    height: 85vh;
  }

  @media screen and (min-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledMenu = styled.div`
  background-color: #f9f0dc;
  padding: 0.5em;
  position: absolute;
  top: 3em;
  transform: translateY(${props => props.open ? 0 : -100}%);
  transition: transform 0.5s ease-out;
  width: 100vw;

  @media screen and (min-width: 500px) {
    display: flex;
    flex-flow: row nowrap;
  }

  @media screen and (min-width: 850px) {
    flex-flow: row wrap;
    top: 0;
    transform: none;
    width: 30vw;
  }
`;

export const StyledMenuButton = styled.button`
  background-color: #d4b766;
  border: 1px solid #645c56;
  font-size: 1em;
  font-family: 'Special Elite',cursive;
  height: 3em;
  position: relative;
  z-index: 2;

  @media screen and (min-width: 850px) {
    display: none;
  }
`;

export const StyledHeader = styled.header`
  background-color: #e2cf9f;
  color: black;
  height: 25vh;
  position: relative;
  text-align: center;
  z-index: 5;

  > h1 {
    font-family: 'Special Elite',cursive;
    font-size: 2em;
    margin: 0;
    padding: 0.5em;
    padding-bottom: 0.25em;
  }

  > h2 {
    font-family: 'Josefin Slab', serif;
    font-style: italic;
    margin: 0;
  };

  @media screen and (min-width: 500px) {
    height: 15vh;
  }
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;
export const ErrorMsg = styled.div`
  background-color: white;
  height: 100%;
  padding: 1em;
  position: absolute;
  z-index: 5;
`;

export const StyledForm = styled.form`
  color: #645c56;
  display: flex;
  flex-direction: column;
  font-family: 'Special Elite',cursive;

  > :first-child {
    padding-bottom: 0.5em;
  }

  > :last-child {
    display: flex;
    flex-flow: row wrap;
  }

  @media screen and (min-width: 500px) {
    flex-grow: 0;
  }
`;

export const StyledMapDiv = styled.div`
  height: calc(100% - 3em);

  > div {
    height: 100%;
  }

  @media screen and (min-width: 850px) {
    height: 100%;
  }
`;

export const StyledList = styled.ul`
  color: #645c56;
  font-family: 'Josefin Slab',serif;
  list-style: none;
  font-size: 1.25em;
  margin: 0;
  padding: 0.5em;
  display: flex;
  flex-flow: row wrap;

  > li::after {
    content: ' |';
  }

  > li:hover {
    background-color: white;
    color: black;
  }

  @media screen and (min-width: 500px) {
    flex-shrink: 1;
  }
`;

export const ListButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.25em;
  letter-spacing: -0.01em;
  font-size: 0.9em;
  font-family: 'Josefin Slab',serif;
`;

import * as React from 'react';
import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500&display=swap');
  html{
        font-family: 'Roboto', sans-serif;
        font-weight: 100;
    }
`;

interface Props {
    children: React.ReactChild;
}

const WithGlobalStyles: React.FC<Props> = ({children}: Props) => {
    return (
        <>
            <GlobalStyles />
            {children}
        </>
    );
};

export {WithGlobalStyles};

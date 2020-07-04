import * as React from 'react';
import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;1,200;1,300&display=swap');
   html{
        font-family: 'Titillium Web';
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

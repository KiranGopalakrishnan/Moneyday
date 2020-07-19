import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../Colors';

const getHeight = ({height}: {height: number}) => height;
const getWidth = ({width}: {width: number}) => width;
const getColor = ({color}: {color: string}) => color;
const getTextColor = ({textColor}: {textColor: string}) => textColor;
const getBackgroundColor = ({fillColor}: {fillColor: string}) => fillColor;
const getHoverColor = ({hoverColor}: {hoverColor: string}) => hoverColor;

const ButtonControl = styled.button<{
    color: string;
    textColor: string;
    fillColor: string;
    hoverColor: string;
    width: number;
    height: number;
}>`
    background: ${getBackgroundColor};
    height: ${getHeight}px;
    width: ${getWidth}px;
    padding: 8px;
    color: ${getTextColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: solid 1px ${getColor};
    boz-sizing: border-box;
    cursor: pointer;
    font-weight: bold;
    transition: all 1s;
    font-weight: 100;

    &:hover {
        background: ${getHoverColor};
    }

    &:focus {
        outline: none;
    }
`;

interface Props {
    color: string;
    width?: number;
    height?: number;
    fillColor?: string;
    textColor?: string;
    hoverColor?: string;
    children: React.ReactNode;
    onClick: () => any;
}

const Button: React.FC<Props> = ({
    color,
    width,
    height,
    fillColor,
    textColor,
    hoverColor,
    children,
    onClick,
}: Props) => {
    return (
        <ButtonControl
            type="button"
            color={color}
            textColor={textColor}
            height={height}
            width={width}
            fillColor={fillColor}
            hoverColor={hoverColor}
            onClick={onClick}
        >
            {children}
        </ButtonControl>
    );
};

Button.defaultProps = {
    height: 40,
    width: 300,
    fillColor: colors.PURPLE[900],
    textColor: colors.WHITE[500],
    hoverColor: colors.PURPLE[400],
};

export {Button};

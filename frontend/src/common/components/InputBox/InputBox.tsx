import * as React from 'react';
import styled from 'styled-components';

const getHeight = ({height}: {height: number}) => height;
const getWidth = ({width}: {width: number}) => (width ? `${width}px` : '100%');
const getColor = ({color}: {color: string}) => color;
const getFocusedColor = ({
    focused,
    color,
    invisible,
}: {
    focused: boolean;
    color: string;
    invisible: boolean;
}) => (focused && !invisible ? color : invisible?'#FFF':'#E1E1E1');
const getFontsize = ({fontSize}:{fontSize: number}) => `${fontSize}px`;
const getTextAlign = ({textAlign}: {textAlign?: string}) => `${textAlign}`;

const Container = styled.div<{
    height: number;
    width: number;
    color: string;
    focused: boolean;
    invisible: boolean;
}>`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    height: ${getHeight}px;
    width: ${getWidth};
    border: solid 1px ${getFocusedColor};
    border-radius: 5px;
    justify-content: center;
    position: relative;
    transition: all 1s linear;
`;

const Input = styled.input<{
    height: number;
    width: number;
    color: string;
    fontSize: number;
    invisible: boolean;
    textAlign: string;
}>`
    font-family: 'Roboto',sans-serif;
    display: flex;
    flex-direction: column;
    padding: 4px 8px;
    box-sizing: border-box;
    width: ${getWidth};
    color: #333;
    font-weight: 100;
    background: transparent;
    border: none;
    flex: 1;
    width: 100%;
    font-size: ${getFontsize};
    text-align: ${getTextAlign};

    &:focus {
        outline: none;
    }

    ::placeholder {
        color: #d3d3d3;
    }
`;

const Label = styled.label<{color: string}>`
    padding: 0 4px;
    color: ${getColor};
    position: absolute;
    top: -12px;
    left: 32px;
    background: #fff;
    font-size: 14px;
`;

interface Props {
    height?: number;
    value: string;
    placeholder?: string;
    width?: number;
    onChange: (value: string) => any;
    type?: string;
    label: string;
    color: string;
    fontSize?: number;
    invisible?: boolean;
    textAlign?: string;
}

const InputBox: React.FC<Props> = ({
    height,
    value,
    placeholder,
    width,
    onChange,
    type,
    label,
    color,
    fontSize,
    invisible,
    textAlign,
}: Props) => {
    
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <Container height={height} width={width} color={color} focused={isFocused} invisible={invisible}>
            <Input
                height={height}
                type={type}
                value={value}
                placeholder={placeholder}
                width={width}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                color={color}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                fontSize={fontSize}
                invisible={invisible}
                textAlign={textAlign}
            />
            <span />
        </Container>
    );
};

InputBox.defaultProps = {
    height: 40,
    placeholder: undefined,
    type: 'text',
    fontSize: 16,
    invisible: false,
    textAlign: "left",
};

export {InputBox};

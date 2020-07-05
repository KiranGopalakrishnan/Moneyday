import * as React from 'react';
import ReactSelect from 'react-select';
import { colors } from '../../Colors';

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    onChange: (item:Option) => any;
    width: number;
}

const Select: React.FC<Props> = ({options, onChange, width}: Props) => {
    return (
        <ReactSelect
            options={options}
            onChange={onChange}
            styles={{
                container: (base) => ({
                    ...base,
                    width: `${width}px`,
                }),
                control: (base) => ({
                    ...base,
                    border:`solid 1px ${colors.GREY[700]}`,
                    outline:'none',
                })
            }}
        />
    );
};

export {Select,Option};
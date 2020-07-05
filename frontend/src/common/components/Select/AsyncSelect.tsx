import * as React from 'react';
import Async from 'react-select/async';
import {colors} from '../../Colors';

interface Option {
    value: string;
    label: string;
}

interface Props {
    onChange: (item: Option) => any;
    width: number;
    loadOptions: () => Option[],
}

const AsyncSelect: React.FC<Props> = ({onChange, width, loadOptions}: Props) => {
    return (
        <Async
            loadOptions={loadOptions}
            onChange={onChange}
            styles={{
                container: (base) => ({
                    ...base,
                    width: `${width}px`,
                }),
                control: (base) => ({
                    ...base,
                    border: `solid 1px ${colors.GREY[700]}`,
                    outline: 'none',
                }),
            }}
        />
    );
};

export {AsyncSelect, Option};

import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../../common/styles/Styles';
import {Button} from '../../../common/components/Button/Button';
import {Spinner} from '../../../common/components/Spinner/Spinner';
import { colors } from '../../../common/Colors';
import { InputBox } from '../../../common/components/InputBox/InputBox';
import Switch from 'react-switch';
import { Select } from '../../../common/components/Select/Select';
import { useBoards } from '../../../reducers/BoardsReducer';
import { getAllColumnsForBoard, getAllTimeRecords } from '../../../services/Boards';
import { Board } from '../../../types';

const Container = styled(FlexContainer)`
    padding: 32px;
`;

const Label = styled.label`
    font-size: 16px;
    color: ${colors.GREY[900]};
    font-weight: 500;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 8px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 58px;
    width: 300px;
`;

const Control = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 58px;
    justify-content: center;
    box-sizing: border-box;
    width: ${({width}:{width: number})=> width}px;
`;

const SettingRow = styled(Row)`
    padding: 12px 0;
`;


const General: React.FC = () => {

    const [{currentBoard}] = useBoards();
    const [timetracking,setTimetracking] =  React.useState(false);
    const [columns,setColumns] =  React.useState([]);

    React.useEffect(()=>{
        getAllTimeRecords(currentBoard.id).then(console.error);
        getAllColumnsForBoard(currentBoard.id).then(({boards}:{boards:Board[]})=>{
            setColumns(boards[0].columns);
        });
    },[]);

    return (
        <Container>
            <Section>
                <SettingRow>
                    <Label>Budget</Label>
                    <Control width={300}>
                        <InputBox
                            value={undefined}
                            onChange={console.error}
                            label="Budget"
                            color={colors.GREY[900]}
                            placeholder="Budget"
                        />
                    </Control>
                </SettingRow>
                <SettingRow>
                    <Label>Integrate with time tracking</Label>
                    <Control width={100}>
                        <Switch
                            onChange={() => setTimetracking(!timetracking)}
                            checked={timetracking}
                            height={24}
                        />
                    </Control>
                </SettingRow>
                <SettingRow>
                    <Label>Select column to track time from</Label>
                    <Control width={300}>
                        <Select options={columns.map(column => ({value:column.id,label: column.title}))} onChange={console.error} width={300} />
                    </Control>
                </SettingRow>
            </Section>
        </Container>
    );
};

export {General};

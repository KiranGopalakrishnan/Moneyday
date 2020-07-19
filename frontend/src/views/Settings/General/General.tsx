import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../../common/styles/Styles';
import {Button} from '../../../common/components/Button/Button';
import {Spinner} from '../../../common/components/Spinner/Spinner';
import { colors } from '../../../common/Colors';
import { InputBox } from '../../../common/components/InputBox/InputBox';
import Switch from 'react-switch';
import { Select } from '../../../common/components/Select/Select';
import { useCurrentBoard } from '../../../reducers/CurrentBoardReducer';
import { getAllColumnsForBoard } from '../../../services/Boards';
import { Board } from '../../../types';
import { DateRangePicker, DISPLAY_DATE_FORMAT } from '../../../common/components/DateRangePicker/DateRangePicker';

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

    const [{currentBoard}] = useCurrentBoard();
    const [timetracking,setTimetracking] =  React.useState(false);
    const [columns,setColumns] =  React.useState([]);
    const [budget,setBudget] = React.useState(currentBoard?.budget);

     const [{startDate,endDate},setTimeframe] = React.useState({
        startDate: new Date(currentBoard?.timeframe?.startDate)??new Date(),
        endDate:  new Date(currentBoard?.timeframe?.endDate)??new Date()
    });


    console.error({startDate,endDate});

    React.useEffect(()=>{
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
                            value={budget.toString()}
                            onChange={console.error}
                            label="Budget"
                            color={colors.GREY[900]}
                            placeholder="Budget"
                        />
                    </Control>
                </SettingRow>
                <SettingRow>
                    <Label>Timeframe</Label>
                    <Control width={320}>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={({startDate, endDate}) => {
                                setTimeframe({startDate, endDate});
                            }}
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
                        <Select
                            options={columns.map((column) => ({
                                value: column.id,
                                label: column.title,
                            }))}
                            onChange={console.error}
                            width={300}
                        />
                    </Control>
                </SettingRow>
            </Section>
        </Container>
    );
};

export {General};

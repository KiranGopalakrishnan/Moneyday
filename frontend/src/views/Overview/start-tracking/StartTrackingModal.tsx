import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, TextContainer, Row} from '../../../common/styles/Styles';
import {Button} from '../../../common/components/Button/Button';
import {colors} from '../../../common/Colors';
import { Modal } from '../../../common/components/Modal/Modal';
import {InputBox} from '../../../common/components/InputBox/InputBox';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, DISPLAY_DATE_FORMAT } from '../../../common/components/DateRangePicker/DateRangePicker';
import { format, subMonths } from 'date-fns';
import currency from 'currency.js';
import { startTracking } from '../../../services/Boards';
import { CurrentBoardActions, useCurrentBoard } from '../../../reducers/CurrentBoardReducer';
import { Board, BoardInfo, Timeframe } from '../../../types';

const Container = styled(FlexContainer)`
    padding: 32px;
    align-items: center;
    justify-content: center;
`;

const Text = styled(TextContainer)`
    margin: 16px;
    font-style: normal;
    font-weight: 100;
`;

const Label = styled.label`
    font-size: 16px;
    color: ${colors.GREY[900]};
    font-weight: 500;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 58px;
    width:120px;
`;

const Control = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 58px;
    justify-content: center;
    box-sizing: border-box;
    width: ${({width}: {width: number}) => width}px;
`;



interface Props {
    onClose: ()=> any;
    onConfirm: ({budget,defaultRate,timeframe}:{budget: string,defaultRate: string,timeframe:Timeframe })=> any;
}

const toCurrency = (value): string => currency(value).toString();

const StartTrackingModal: React.FC<Props> = ({onClose,onConfirm}: Props) => {

    const [{currentBoard},dispatchBoardAction] = useCurrentBoard();

    const [loading, setLoading] = React.useState(true);

    const [budget,setBudget] = React.useState('0.00');

    const [defaultUserRate,setDefaultUserRate] = React.useState('0.00');

    const [{startDate,endDate},setTimeframe] = React.useState({
        startDate: subMonths(new Date(),1),
        endDate: new Date()
    })


    return (
        <Modal width={520} onClose={onClose}>
            <Container>
                <Text fontSize={22} fontWeight={300}>
                    Why don't we start with some basic info ?
                </Text>
                <Row>
                    <Label>Budget</Label>
                    <Control width={320}>
                        <InputBox
                            value={budget}
                            onChange={(newValue: string) => {
                                setBudget(newValue);
                            }}
                            label="Budget"
                            color={colors.GREY[900]}
                            placeholder="0.00"
                            type="number"
                        />
                    </Control>
                </Row>
                <Row>
                    <Label>Default Rate</Label>
                    <Control width={320}>
                        <InputBox
                            value={defaultUserRate}
                            onChange={(newValue: string) => {
                                setDefaultUserRate(newValue);
                            }}
                            label="Default User Rate"
                            color={colors.GREY[900]}
                            placeholder="0.00"
                            type="number"
                        />
                    </Control>
                </Row>
                <Row>
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
                </Row>

                <Row justifyContent="space-evenly" padding="16px">
                    <Button
                        color={colors.BLACK[100]}
                        fillColor={colors.WHITE[500]}
                        textColor={colors.BLACK[100]}
                        onClick={onClose}
                        width={200}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={colors.ORANGE[800]}
                        fillColor={colors.ORANGE[800]}
                        width={200}
                        onClick={()=>{
                            onConfirm(
                                {
                                    budget,
                                    timeframe: {
                                        startDate: format(startDate, 'yyyy-MM-dd'),
                                        endDate: format(endDate, 'yyyy-MM-dd'),
                                    },
                                    defaultRate: defaultUserRate,
                                }
                            );
                        }}
                    >
                        Start tracking
                    </Button>
                </Row>
            </Container>
        </Modal>
    );
};

export {StartTrackingModal};

import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../../../common/Colors';
import { TextContainer,FlexContainer, Row, Section } from '../../../common/styles/Styles';
import { useCurrentBoard } from '../../../reducers/CurrentBoardReducer';
import { getCostSummary } from '../../../services/Boards';
import { toHHMMSS } from '../../../utils/time';
import { ActualCostChart } from '../actual-cost-chart/ActualCostChart';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const DataSection = styled(Section)`
    flex: 1;
    height: 500px;
`;
const ChartSection = styled(Section)`
    background: #f9f9f9;
    flex: 1;
`;

const Text = styled(TextContainer)`
    margin: 0 16px;
    font-style: normal;
    font-weight: 100;
`;

const ImportantNumbers = styled.div`
    border-radius: 5px;
    flex-direction: row;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    border-bottom: solid 5px #fff;
    padding: 8px 0;
`;

const NumberItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-right: solid 1px #DDD;
    margin: 0;
`;

interface Props {}

const BoardOverview: React.FC<Props> = ({}: Props) => {

    const [loading, setLoading] = React.useState(true);
    const [{currentBoard,costSummary}] = useCurrentBoard();
    
    const {hours,minutes} = toHHMMSS(costSummary?.totalTimeSpent);

    const [showStartTrackingModal, setShowStartTrackingModal] = React.useState(false);

    React.useEffect(() => {
        getCostSummary(currentBoard?.id).then(console.error);
    }, []);

    return (
        <Container>
            <DataSection>
                <ImportantNumbers>
                    <NumberItem>
                        <Text fontSize={18} fontWeight={100} color='#b8bedd'>
                            Actual Cost
                        </Text>
                        <Text fontSize={32} fontWeight={500}>
                            <Text fontSize={32} fontWeight={500}>{currentBoard.currencyCode}</Text>
                            <Text fontSize={32} fontWeight={500}>{costSummary.totalCost}</Text>
                        </Text>
                    </NumberItem>
                    <NumberItem>
                        <Text fontSize={18} fontWeight={100} color='#b8bedd'>
                            Time Spent
                        </Text>
                        <Text fontSize={32} fontWeight={500}>
                            {`${hours}h ${minutes}m`}
                        </Text>
                    </NumberItem>
                </ImportantNumbers>
                <ChartSection>
                    <ActualCostChart />
                </ChartSection>
            </DataSection>
        </Container>
    );
};

export {BoardOverview};

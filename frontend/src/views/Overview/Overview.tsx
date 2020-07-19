import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, TextContainer} from '../../common/styles/Styles';
import {Button} from '../../common/components/Button/Button';
import {colors} from '../../common/Colors';
import {useCurrentBoard, CurrentBoardActions} from '../../reducers/CurrentBoardReducer';
import {Monday} from '../../common/ecosystem/Monday';
import {getBoardInfo, getCostSummary, startTracking} from '../../services/Boards';
import {Board, BoardInfo, CostSummary, Expense, Timeframe} from '../../types';
import {Spinner} from '../../common/components/Spinner/Spinner';
import { Financials } from '../../resources/Fincancials';
import { StartTrackingModal } from './start-tracking/StartTrackingModal';
import { BoardOverview } from './board-overview/BoardOverview';

const Container = styled(FlexContainer)`
    padding: 32px;
    flex-direction: column;
    overflow: auto;
`;

const NotTracking = styled(FlexContainer)`
    padding: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
`;


const Text = styled(TextContainer)`
    margin: 16px;
    font-style: normal;
    font-weight: 100;
`;

const starTrackingBoard = () => {
    
}

const startTrackingBoard = (
    currentBoard: Board,
    {budget,defaultRate,timeframe}:{budget: string,defaultRate: string,timeframe:Timeframe },
    dispatchBoardAction,
    showModal
) => {
    startTracking(currentBoard?.id, {budget, timeframe, currencyCode: 'USD', defaultRate}).then(
        (board: BoardInfo) => {
            dispatchBoardAction({
                type: CurrentBoardActions.SET_CURRENT_BOARD,
                payload: {currentBoard: {...currentBoard, ...board,...{isTracking: true}}},
            });
            showModal(false)
        }
    );
};

interface Props {}

const Overview: React.FC<Props> = ({}: Props) => {

    const [{currentBoard},dispatchBoardAction] = useCurrentBoard();

    const [loading, setLoading] = React.useState(true);

    const [showStartTrackingModal , setShowStartTrackingModal] =  React.useState(false);

    return (
        <Container>
            {currentBoard?.isTracking ? (
                <BoardOverview />
            ) : (
                !loading && <NotTracking>
                    <Financials />
                    <Text fontSize={32} fontWeight={100}>
                        You are not tracking financials for this board
                    </Text>
                    <Button
                        color={colors.ORANGE[800]}
                        fillColor={colors.ORANGE[800]}
                        onClick={() => setShowStartTrackingModal(true)}
                    >
                        Start tracking
                    </Button>
                </NotTracking>
            )}

            {showStartTrackingModal && (
                <StartTrackingModal
                    onConfirm={({budget,defaultRate,timeframe}) => startTrackingBoard(currentBoard,{budget,defaultRate,timeframe},dispatchBoardAction,setShowStartTrackingModal)  }
                    onClose={() => setShowStartTrackingModal(false)}
                />
            )}
        </Container>
    );
};

export {Overview};

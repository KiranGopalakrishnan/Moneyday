import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../common/styles/Styles';
import { Monday } from '../common/ecosystem/Monday';
import {useHistory} from 'react-router-dom';
import { getBoardInfo, getCostPerDay, getCostSummary } from '../services/Boards';
import { CurrentBoardActions, useCurrentBoard } from '../reducers/CurrentBoardReducer';
import { BoardInfo, CostPerDay, CostSummary } from '../types';
import { Spinner } from '../common/components/Spinner/Spinner';
import { Overview } from './Overview/Overview';

const Container = styled(FlexContainer)`
    padding: 32px;
`;

interface Props {}

const IndexRoute: React.FC<Props> = ({}: Props) => {

    let history = useHistory();

    const [{currentBoard},dispatchBoardAction] = useCurrentBoard();

    const [loading,setLoading] = React.useState(false);


     React.useEffect(() => {
         setLoading(true);
        new Monday().get('context').then(context=>{
            getBoardInfo(context.boardId)
                .then((info: BoardInfo) => {
                    Promise.all([
                        getCostSummary(context.boardId),
                        getCostPerDay(context.boardId),
                    ]).then(([costSummary, costPerDay]: [CostSummary,CostPerDay[]]) =>
                        dispatchBoardAction({
                            type: CurrentBoardActions.SET_MULTIPLE,
                            payload: {
                                costSummary,
                                currentBoard: {
                                    ...{isTracking: true},
                                    ...info,
                                },
                                costPerDay,
                            },
                        })
                    );
                })
                .catch(() =>
                    dispatchBoardAction({
                        type: CurrentBoardActions.IS_TRACKING_BOARD,
                        payload: {currentBoard: {isTracking: false}},
                    })
                )
                .finally(() => setLoading(false));
        });
         
     }, []);


    return !currentBoard ? 
    <Spinner loading={loading} />
    :<Overview />;
};

export {IndexRoute};

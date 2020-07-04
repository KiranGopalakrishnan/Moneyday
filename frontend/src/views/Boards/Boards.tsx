import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../common/styles/Styles';
import {Button} from '../../common/components/Button/Button';
import {colors} from '../../common/Colors';
import {useBoards, BoardsActions} from '../../reducers/BoardsReducer';
import {BoardList} from './BoardList';  
import { Monday } from '../../common/ecosystem/Monday';
import { getAllBoards } from '../../services/Boards';
import { Board } from '../../types';

const Container = styled(FlexContainer)`
    padding: 32px;
`;

interface Props {}

const Boards: React.FC<Props> = ({}: Props) => {

    const [boardsData, dispatchBoards] = useBoards();

    const [loading,setLoading] = React.useState(false);


    React.useEffect(()=>{
        getAllBoards().then(({boards}: {boards:Board[]}) => {
            dispatchBoards({type: BoardsActions.SET_BOARDS,payload:{boards}});
        }).catch(console.error);
    },[]);

    return (
        <Container>
            <Section flex={9}>
                <BoardList boards={boardsData.boards} />
            </Section>
        </Container>
    );
};

export {Boards};

import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer} from '../../common/styles/Styles';
import {Board} from '../../types/Boards';
import {colors} from '../../common/Colors';
import {Link} from 'react-router-dom';
import { useBoards, BoardsActions } from '../../reducers/BoardsReducer';

const Container = styled(FlexContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    height: 54px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    border-bottom: solid 1px ${colors.GREY[700]};
`;

const Header = styled(Item)`
    border-bottom: solid 1px ${colors.GREY[800]};
    color: ${colors.GREY[800]};
`;

const Name = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    color: ${colors.BLACK[100]};
`;

interface Props {
    boards: Board[];
}

const BoardList: React.FC<Props> = ({boards}: Props) => {

    const [,dispatchCurrentBoard] =  useBoards();

    return (
        <Container>
            <Header>
                <Name>Boards</Name>
            </Header>
            <Container>
                {boards.map((board: Board) => {
                    return (
                        <Item key={board.id}>
                            <Name>
                                <Link
                                    to={`boards/${board.id}/overview`}
                                    onClick={() =>
                                        dispatchCurrentBoard({
                                            type: BoardsActions.SET_CURRENT_BOARD,
                                            payload: {currentBoard:board},
                                        })
                                    }
                                >
                                    {board.name}
                                </Link>
                            </Name>
                        </Item>
                    );
                })}
            </Container>
        </Container>
    );
};

export {BoardList};

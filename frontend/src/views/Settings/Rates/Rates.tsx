import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../../common/styles/Styles';
import {Button} from '../../../common/components/Button/Button';
import {Spinner} from '../../../common/components/Spinner/Spinner';
import {Link, useRouteMatch, Switch, Route} from 'react-router-dom';
import {colors} from '../../../common/Colors';
import {InputBox} from '../../../common/components/InputBox/InputBox';
import { getAllUsers } from '../../../services/Team';
import { useBoards } from '../../../reducers/BoardsReducer';
import { useTeam, TeamActions } from '../../../reducers/TeamReducer';
import Avatar from 'react-avatar';

const Container = styled(FlexContainer)`
    padding: 32px;
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
`;

const Control = styled.div`
    padding: 8px;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    width:${({width}:{width: number}) => width}px;
    padding: 0 8px;
`;

const Title = styled.h3`
    font-weight: 100;
    padding: 12px;
    border-bottom: solid 1px ${colors.GREY[900]};
`;

const UserItem = styled(Row)`
    border-bottom: solid 1px #ddd;
    padding: 8px;
    border-bottom: solid 1px ${colors.GREY[600]};
    width: 600px;
    align-items: center;
`;


const Header = styled(Row)`
    border-bottom: solid 1px #ddd;
    padding: 8px;
    background: #f7f7f7;
    width: 600px;
    color: #BBB;
`;


const Rates: React.FC = () => {

    const[{currentBoard}] = useBoards();

    const [team,dispatchTeam] =  useTeam();

    console.error({currentBoard});

    React.useEffect(()=>{
        getAllUsers(currentBoard.id).then(({boards})=>{
            dispatchTeam({type: TeamActions.SET_USERS,payload:{users:boards[0].subscribers}})
        });
    },[]);

    return (
        <Container>
            <Section>
                <Title>User Rates</Title>
                <Header>
                    <Item width={32}></Item>
                    <Item width={400}>Name</Item>
                </Header>
                {team.users.map((user) => {
                    return (
                        <UserItem key={user.id}>
                            <Item width={32}>
                                <Avatar
                                    size="32"
                                    name={user.name}
                                    src={user.photo_tiny}
                                    round="100%"
                                />
                            </Item>
                            <Item width={400}>{user.name}</Item>
                        </UserItem>
                    );
                })}
            </Section>
        </Container>
    );
};

export {Rates};

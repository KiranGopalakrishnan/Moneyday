
import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {WithGlobalStyles} from '../common/styles/GlobalStyles';
import {Header} from '../common/components/Header/Header';
import {Boards} from './Boards/Boards';
import {BoardsProvider} from '../reducers/BoardsReducer';
import { Expenses } from './Expenses/Expenses';
import { Settings } from './Settings/Settings';
import { TeamProvider } from '../reducers/TeamReducer';

const App: React.FC = () => {
    return (
        <Router>
            <WithGlobalStyles>
                <BoardsProvider>
                    <TeamProvider>
                        <Header>
                            <Switch>
                                <Route exact path="/" component={Boards} />
                                <Route path="/expenses" component={Expenses} />
                                <Route path="/settings" component={Settings} />
                            </Switch>
                        </Header>
                    </TeamProvider>
                </BoardsProvider>
            </WithGlobalStyles>
        </Router>
    );
};

const HotComponent = hot(App);

export {HotComponent as App};

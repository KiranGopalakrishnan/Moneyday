
import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {WithGlobalStyles} from '../common/styles/GlobalStyles';
import {Header} from '../common/components/Header/Header';
import {IndexRoute} from './IndexRoute';
import {BoardsProvider} from '../reducers/CurrentBoardReducer';
import { Expenses } from './Expenses/Expenses';
import { Settings } from './Settings/Settings';
import { TeamProvider } from '../reducers/TeamReducer';
import { Overview } from './Overview/Overview';

const App: React.FC = () => {
    return (
        <Router>
            <WithGlobalStyles>
                <BoardsProvider>
                    <TeamProvider>
                        <Header>
                            <Switch>
                                <Route exact path="/" component={IndexRoute} />
                                <Route path="/overview" component={Overview} />
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

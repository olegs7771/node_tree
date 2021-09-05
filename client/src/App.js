import './App.scss';
import react from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Main from '../src/components/main/Main';

const App = () => {
  return (
    <Router>
      <Switch>
        <Main />
      </Switch>
    </Router>
  );
};

export default App;

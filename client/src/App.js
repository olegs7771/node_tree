import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

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

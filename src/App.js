import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importing all components
import Transporter from './Views/Transporter';
import Receiver from './Views/Receiver';

function App() {

  return (
    <Router>
      <Route path="/" exact component={Transporter} />
      <Route path="/receiver" exact component={Receiver} />
    </Router>
  );
}

export default App;






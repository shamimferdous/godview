import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importing all components
import Transporter from './Views/Transporter';
import Receiver from './Views/Receiver';
import Admin from './Views/Admin';

function App() {

  return (
    <Router>
      <Route path="/" exact component={Transporter} />
      <Route path="/receiver" exact component={Receiver} />
      <Route path="/admin" exact component={Admin} />
    </Router>
  );
}

export default App;






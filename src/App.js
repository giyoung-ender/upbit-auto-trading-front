import {Route, BrowserRouter as Router} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import atoms from "./states/backend";

import Header from "./pages/Header";

import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Setting from "./pages/Setting";
import Footer from "./pages/Footer";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Header/>
                <main>
                    {/*<Route path={['/', '/Dashboard']} component={Dashboard}/>*/}
                    <Route path="/Dashboard" component={Dashboard}/>
                    <Route path="/Portfolio" component={Portfolio}/>
                    <Route path="/Setting" component={Setting}/>
                </main>
                <Footer/>
            </Router>
        </RecoilRoot>
    );
}

export default App;
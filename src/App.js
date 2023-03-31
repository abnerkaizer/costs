import {Route,Switch,BrowserRouter} from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import Projects from "./components/pages/Projects";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container customClass='min-height'>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/company'>
            <Company/>
          </Route>
          <Route exact path='/projects'>
            <Projects/>
          </Route>
          <Route exact path='/contact'>
            <Contact/>
          </Route>
          <Route exact path='/newproject'>
            <NewProject/>
          </Route>
        </Switch>
      </Container>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

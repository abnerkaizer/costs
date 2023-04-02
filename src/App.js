import {Route,Switch,BrowserRouter} from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
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
          <Route path='/company'>
            <Company/>
          </Route>
          <Route path='/projects'>
            <Projects/>
          </Route>
          <Route path='/contact'>
            <Contact/>
          </Route>
          <Route path='/newproject'>
            <NewProject/>
          </Route>
          <Route path='/project/:id'>
            <Project/>
          </Route>
        </Switch>
      </Container>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

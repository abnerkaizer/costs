import {Route,Switch,Link,BrowserRouter} from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layout/Container";
function App() {

  return (

    <BrowserRouter>

      <div>

        <Link to='/'>Home</Link>

        <Link to='/contact'>Contato</Link>

        <Link to='/company'>Empresa</Link>

        <Link to='/newproject'>Novo Projeto</Link>

      </div>

      <Container customClass='min-height'>

        <Switch>

          <Route exact path='/'>
            <Home/>
          </Route>

          <Route exact path='/company'>
            <Company/>
          </Route>

          <Route exact path='/contact'>
            <Contact/>
          </Route>

          <Route exact path='/newproject'>
            <NewProject/>
          </Route>

        </Switch>

      </Container>

      <p>Footer</p>

    </BrowserRouter>

  );

}

export default App;

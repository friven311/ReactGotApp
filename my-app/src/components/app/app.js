import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.css';


export default class App extends Component {
    gotService = new gotService();
    state = {
        showRandomChar: true,
        error: false,
        pathes: {
            main: '/',
            characters: '/characters/',
            houses: '/houses/',
            books: '/books/'
        }
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })

    }
    
    ToggleRandomChar= () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }
    

    render() {
        

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        
        return (
            <Router>
                <div className="app"> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button onClick={this.ToggleRandomChar}>ToggleRandomChar</button>
                        </Col>
                    </Row>
                    <Switch>
                        <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) =>{ 
                                const {id} = match.params;
                            return<BooksItem bookId={id} />
                            }
                        }
                        />
                        <Route component={() => (<h1 className="page404">404 Not found </h1>)} />
                    </Switch>
                </Container>
            </div>
        </Router>
    )}
    
};
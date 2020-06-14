import React, { Component } from 'react';
import '../css/App.css';
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";
import AddAppointments from "./AddAppointments";

class App extends Component {
    constructor() {
        super();
        this.state = {
            myName: 'Alican',
            myAppointments: []
        }
    }
    
    componentDidMount() {
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const appointments = result.map(item => {
                    return item;
                });
                this.setState({
                    myAppointments: appointments
                });
            });

    }
    
    render() {
        return (
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                {this.state.myName}
                                <AddAppointments />
                                <SearchAppointments />
                                <ListAppointments />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
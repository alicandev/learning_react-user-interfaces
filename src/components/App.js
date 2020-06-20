import React, { Component } from 'react';
import '../css/App.css';

import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import AddAppointments from './AddAppointments';

import { without } from 'lodash';

class App extends Component {
    constructor() {
        super();
        this.state = {
            myAppointments: [],
            formDisplay: false,
            orderBy: 'petName',
            orderDir: 'asc',
            lastIndex: 0
        }
        // we must do this binding in order for `this` keyword inside the deleteAppointments method to refer to the
        // component rather than the method itself.
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
    }
    
    addAppointment(apt) {
        let tempApts = this.state.myAppointments;
        apt.aptId = this.state.lastIndex;
        tempApts.unshift(apt);
        this.setState({
            myAppointments: tempApts,
            lastIndex: this.state.lastIndex + 1
        });
    }
    
    deleteAppointment(appointment) {
        this.setState({
            // without comes from the loadash library. it takes in a list of items and an item, then it substracts the 
            // item from the item list.
            myAppointments: without(this.state.myAppointments, appointment)
        });
    }
    
    toggleForm() {
        this.setState({formDisplay: !this.state.formDisplay})
    }
    
    componentDidMount() {
        fetch('./data.json')
            .then(response => response.json())
            .then(result => {
                const appointments = result.map(item => {
                    item.aptId = this.state.lastIndex;
                    this.setState({lastIndex: this.state.lastIndex + 1});
                    return item;
                });
                this.setState({myAppointments: appointments});
            });
    }
    
    render() {
        let order;
        let filteredAppointments = this.state.myAppointments;
        if (this.state.orderDir = 'asc') {
            order = 1;
        } else {
            order = -1;
        }
        filteredAppointments.sort((a,b) => {
            if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()) {
                return -1 * order;
            } else {
                return 1 * order;
            }
        });
        
        return(
            <main className="page bg-white" id="petratings">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 bg-white">
                            <div className="container">
                                <AddAppointments 
                                    formDisplay={this.state.formDisplay}
                                    toggleForm={this.toggleForm}
                                    addAppointment={this.addAppointment}
                                />
                                <SearchAppointments
                                    orderBy={this.state.orderBy}
                                    orderDir={this.state.orderDir}
                                />
                                <ListAppointments 
                                    appointments={this.state.myAppointments}
                                    deleteAppointment={this.deleteAppointment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default App;
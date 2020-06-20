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
            queryText: 'ba',
            lastIndex: 0
        }
        // we must do this binding in order for `this` keyword inside the deleteAppointments method to refer to the
        // component rather than the method itself.
        this.deleteAppointment = this.deleteAppointment.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.addAppointment = this.addAppointment.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }
    
    addAppointment(apt) {
        let appointments = this.state.myAppointments;
        apt.aptId = this.state.lastIndex;
        appointments.unshift(apt);
        this.setState({
            myAppointments: appointments,
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
    
    changeOrder(order, dir) {
        this.setState({
            orderBy: order,
            orderDir: dir
        })
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
        let appointments = this.state.myAppointments;
        this.state.orderDir === 'asc' ? order = 1 : order = -1;
        let filteredAppointments = 
            appointments.sort((a,b) =>
                a[this.state.orderBy].toLowerCase() > b[this.state.orderBy].toLowerCase() 
                    ? order 
                    : -1 * order
            ).filter(item => 
                item['petName'].toLowerCase().includes(this.state.queryText.toLowerCase())
                || item['ownerName'].toLowerCase().includes(this.state.queryText.toLowerCase())
                || item['aptNotes'].toLowerCase().includes(this.state.queryText.toLowerCase())
            );
        
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
                                    changeOrder={this.changeOrder}
                                />
                                <ListAppointments 
                                    appointments={filteredAppointments}
                                    deleteAppointment={this.deleteAppointment}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
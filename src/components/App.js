import React, { Component } from 'react';
import '../css/App.css';
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";
import AddAppointments from "./AddAppointments";

const App = () => (
    <main className="page bg-white" id="petratings">
        <div className="container">
            <div className="row">
                <div className="col-md-12 bg-white">
                    <div className="container">
                        <AddAppointments />
                        <SearchAppointments />
                        <ListAppointments />
                    </div>
                </div>
            </div>
        </div>
    </main>
);

export default App;
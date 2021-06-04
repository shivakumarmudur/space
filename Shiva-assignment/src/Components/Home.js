import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ImageGrid from './ImageGrid';
import { withRouter } from "react-router-dom";
import './home.css';
import LuanchSuccessData from './launchSucessFailure';
import FilterYearData from './yearData'
import { buttonData } from './buttonData';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LandSuccessData from './landingSuccess';

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceData: [],
            filterDataSucess: [],
            luanchSuccessTrue: false,
            filterYearData: [],
            yearButtonClickedTrue: false,
            yearArrayData: "",
            landSuccessTrue: false,
            luanchSuccessFalse: false,
        }
    }
    componentDidMount = () => {
        let url = 'https://api.spaceXdata.com/v3/launches?limit=100';
        fetch(url).then(response => response.json()).then((repos) => {
            this.setState({ spaceData: repos });
        });
        let url2 = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014';
        fetch(url2).then(response => response.json()).then((filteryearData) => {
            this.setState({ filterYearData: filteryearData });
        });
    }

    successLaunchTrue = (val) => {
        this.setState({ luanchSuccessTrue: true })
        this.setState({ luanchSuccessFalse: false })
        this.setState({ landSuccessTrue: false })
        this.setState({ yearButtonClickedTrue: false })
        this.setState({ luanchSuccessValue: val })
    }
    successLaunchFalse = (val) => {
        this.setState({ luanchSuccessFalse: true })
        this.setState({ luanchSuccessTrue: false })
        this.setState({ landSuccessTrue: false })
        this.setState({ yearButtonClickedTrue: false })
        this.setState({ luanchSuccessValue: val })
    }
    successLandTrue = (val) => {
        this.setState({ landSuccessTrue: true })
        this.setState({ luanchSuccessFalse: false })
        this.setState({ luanchSuccessTrue: false })
        this.setState({ yearButtonClickedTrue: false })
        this.setState({ landingSuccessValue: val })
    }
    successLandFalse = (val) => {
        this.setState({ landSuccessTrue: true })
        this.setState({ luanchSuccessFalse: false })
        this.setState({ luanchSuccessTrue: false })
        this.setState({ yearButtonClickedTrue: false })
        this.setState({ landingSuccessValue: val })
    }
    yearButtonClicked = (year) => {
        this.setState({ yearButtonClickedTrue: true })
        this.setState({ luanchSuccessFalse: false })
        this.setState({ landSuccessTrue: false })
        this.setState({ yearArrayData: year })
        this.setState({ luanchSuccessTrue: false })
    }


    render() {
        let { spaceData } = this.state;
        if (spaceData.length <= 0) {
            return <p>Loading...</p>
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <div className="main-container">
                    <div className="header-text">
                        <Typography variant="h6" noWrap>SpaceX Launch Programs </Typography>
                    </div>
                    <div className="wrapper" >
                        <div className="sidenavdiv">
                            <nav className="sidenavdrawer" aria-label="mailbox folders">
                                <Typography className="filter">Filters</Typography>
                                <Typography>Launch Year
                    <div className="divider-div">
                                        <Divider className="divider" />
                                    </div>
                                </Typography>

                                {buttonData.map((data, id) => (
                                    <Button key={data.id} variant="contained" className="year-button" onClick={() => { this.yearButtonClicked(data.year) }}>
                                        {data.year}
                                    </Button>
                                ))}
                                <Typography>Successful Launch
                    <div className="divider-div">
                                        <Divider className="divider" />
                                    </div>
                                </Typography>

                                <Button variant="contained" className={this.state.luanchSuccessTrue ? "year-button-clicked" : "year-button"} onClick={() => { this.successLaunchTrue(true) }}>true</Button>
                                <Button variant="contained" className={this.state.luanchSuccessFalse ? "year-button-clicked" : "year-button"} onClick={() => { this.successLaunchFalse(false) }}>false</Button>
                                <Typography>Successful Landing
                    <div className="divider-div">
                                        <Divider className="divider" />
                                    </div>
                                </Typography>

                                <Button variant="contained" className="year-button" onClick={() => { this.successLandTrue(true) }}>true</Button>
                                <Button variant="contained" className="year-button" onClick={() => { this.successLandFalse(false) }}>false</Button>
                            </nav>
                        </div>
                        {this.state.luanchSuccessTrue || this.state.yearButtonClickedTrue || 
                        this.state.landSuccessTrue || this.state.luanchSuccessFalse ? null :
                            <ImageGrid
                                luanchSuccessTrue={this.state.luanchSuccessTrue}
                                spaceData={this.state.spaceData}
                                currentPage={this.state.currentPage}
                                pageSize={this.state.pageSize}
                            />}
                        {this.state.luanchSuccessTrue || this.state.luanchSuccessFalse ?
                            <LuanchSuccessData
                                spaceData={this.state.spaceData}
                                luanchSuccessValue={this.state.luanchSuccessValue}
                                luanchSuccessTrue={this.state.luanchSuccessTrue}
                                currentPage={this.state.currentPage}
                                pageSize={this.state.pageSize}
                            /> : null}
                        {this.state.yearButtonClickedTrue ?
                            <FilterYearData
                                yearArrayData={this.state.yearArrayData}
                                luanchSuccessValue={this.state.luanchSuccessValue}
                                spaceData={this.state.spaceData}
                                filterYearData={this.state.filterYearData}
                                yearButtonClickedTrue={this.state.yearButtonClickedTrue}
                                pageSize={this.state.pageSize}
                            /> : null}
                        {this.state.landSuccessTrue ?
                            <LandSuccessData
                                spaceData={this.state.spaceData}
                                landingSuccessValue={this.state.landingSuccessValue}
                            /> : null}
                    </div>
                    <Typography color="textSecondary" gutterBottom className="black">
                        <b>Developed By:</b><span>Shivakumar S Mudur</span></Typography>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(HomeComponent);
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import CommonData from './commonImageData';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: 'white',
        height: '200px',
        border: 'none'
    },
    Cardcontent: {
        padding: '0'
    }
}));

export default function YearData(props) {
    const classes = useStyles();
    return (
        <div className="width-100">
            <div className={classes.root}>
                <GridList cellHeight={400} cellWidth={100} className={classes.gridList}>
                    {props.spaceData.filter(function (sucesslaunch) {
                        return sucesslaunch.launch_year === props.yearArrayData
                    }).map(function (sucessdata) {
                        return (props.yearButtonClickedTrue ? <GridListTile key={sucessdata.id} className="add-width">
        <CommonData data = {sucessdata}/>  
                        </GridListTile> : null)
                    })}
                </GridList>
            </div>
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: 'white',
        height: '200px',
        border: 'none'
    },
    Cardcontent:{
        padding : '0'
    }
}));

export default function CommonData(props) {
    const classes = useStyles();
    return (
                          <div>
                            <div className="image-style">
                                <img src={props.data.links.mission_patch_small} alt={props.data.links.mission_patch_small} />
                            </div>
                            <Card className={classes.card} variant="outlined">
                                <CardContent className={classes.Cardcontent}>
                                    <Typography className="image-name" color="textSecondary" gutterBottom>
                    {props.data.mission_name}<span className="flight-number">#{props.data.flight_number}</span></Typography>
                                </CardContent>
                                <p className = "mission-id">Mission Ids:</p>
                                {props.data.mission_id.map((ids, id) => (
                                <ul key = {id} className="display-list">
                                <li><span className="add-color">{ids}</span></li>
                                </ul>
                                ))}
                                <div>
                                <p className = "mission-id">Launch Year: <span className="add-color">{props.data.launch_year}</span></p>
                                </div>
                                <div>
                                <p className = "mission-id">Successful Launch: <span className="add-color">{props.data.launch_success === true ? 'true' : 'false'}</span></p>
                                </div>
                                <div>
                                <p className = "mission-id">Successful Landing:<span className="add-color">{props.data.upcoming === true ? 'true' : 'false'}</span></p>
                                </div>
                            </Card>
                            </div>
    );
}
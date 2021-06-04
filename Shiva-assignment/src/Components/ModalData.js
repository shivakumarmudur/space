import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '80%',
        height: '550px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 3, 3),
        top: '5%',
        left: '10%',
        bottom: '5%'
    },

}));

export default function ModalData(props) {
    const classes = useStyles();
    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <span className="close-popup-modal" onClick={() => props.handleClose()}>X</span>
                    <h2 id="simple-modal-title">{props.imageName}</h2>
                    <GridListTile className="popup-img-width">
                        <img src={props.imageUrl} alt={props.imageUrl} />
                    </GridListTile>
                </div>
            </Modal>
        </div>
    );
}
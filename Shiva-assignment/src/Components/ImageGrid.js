import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ModalData from "./ModalData";
import CommonData from './commonImageData';
import 'bootstrap/dist/css/bootstrap.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: 'lightgray',
    },
    gridList: {
        width: "100%",
        height: 'auto',
        overflow: 'hidden',
        ['@media (max-width:700px)']: {
            display: 'flex',
            flexDirection: 'column'
          },
    },
    gridListTile: {
        width: '30%',
    }
}));

export default function ImageGrid(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageName, imageName2] = React.useState(null);
    const [imageUrl, imageUrl2] = React.useState(null);
    const [pageSize] = React.useState(12);
    const [currentPage, currentPage1] = React.useState(0);
    const pagesCount = Math.ceil(props.spaceData.length / pageSize );

    const handleOpen = (data) => {
        setOpen(true);
        imageName2(data.mission_name)
        imageUrl2(data.links.mission_patch_small)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const scrollToTop = (top) => {
        window.scrollTo({
            top: top ? top : 0,
            behavior: "smooth"
        });
    }

    const handleClick = (e, index) => {
        currentPage1(index)
        scrollToTop();
    }
    return (
        <div>
            <div className={classes.root}>
                <GridList cellHeight={400} cellWidth={100} className={classes.gridList}>
                    {props.spaceData.slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    ).map((data) => (
                        props.luanchSuccessTrue ? null: <GridListTile key={data.id} className="add-width" onClick={() => handleOpen(data)}>
                         <CommonData
                         data ={data}/>
                        </GridListTile>
                    ))}
                </GridList>

            </div>
            <div className="pagination-wrapper">

                <Pagination aria-label="Page navigation example">

                    <PaginationItem disabled={currentPage <= 0}>

                        <PaginationLink
                            onClick={e => handleClick(e, currentPage - 1)}
                            previous
                        />

                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) =>
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => handleClick(e, i)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= pagesCount - 1}>

                        <PaginationLink
                            onClick={e => handleClick(e, currentPage + 1)}
                            next
                        />

                    </PaginationItem>

                </Pagination>
            </div>
            <div>
                         <ModalData
                         open={open}
                         handleClose={handleClose}
                         imageUrl={imageUrl}
                         imageName ={imageName}
                          />
                        </div>
        </div>
    );
}
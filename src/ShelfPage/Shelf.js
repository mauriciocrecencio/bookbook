import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import userApi from "../helpers/axios";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'

const useStyles = ((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  star: {
    color: 'yellow',
  },
}));



class Shelf extends React.Component {
  state = {
    shelf: []

  }

  getBook = () => {
    const userid = this.props.user.id;
    const token = this.props.currentToken;
    userApi(`/users/${userid}/books`, 'GET', null, token
    ).then(res => {
      console.log(res)
      this.setState({
        shelf: res.data
      })
    })
  }
  componentDidMount() {
    this.getBook()
  }

  render() {
    const { classes } = this.props;
    const { shelf } = this.state

    // shelf === 3 = Ja leu
    // shelf === 2 = lendo
    // shelf === 1 = wish
    return (
      <div>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Wish List</ListSubheader>
            </GridListTile>
            {shelf.filter(book => book.shelf === 1).map((book, key) => (
              <GridListTile key={key}>
                <img src={book.image_url} alt={book.title} />
                <GridListTileBar
                  title={book.title}
                  subtitle={<span>by: {book.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${book.title}`} className={classes.icon}>
                      <p className={classes.title}>{book.grade}</p>
                      <StarBorderIcon className={classes.star} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Reading</ListSubheader>
            </GridListTile>
            {shelf.filter(book => book.shelf === 1).map((book, key) => (
              <GridListTile key={key}>
                <img src={book.image_url} alt={book.title} />
                <GridListTileBar
                  title={book.title}
                  subtitle={<span>by: {book.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${book.title}`} className={classes.icon}>
                      <p className={classes.title}>{book.grade}</p>
                      <StarBorderIcon className={classes.star} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className={classes.root}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">Read</ListSubheader>
            </GridListTile>
            {shelf.filter(book => book.shelf === 3).map((book, key) => (
              <GridListTile key={key}>
                <img src={book.image_url} alt={book.title} />
                <GridListTileBar
                  title={book.title}
                  subtitle={<span>by: {book.author}</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${book.title}`} className={classes.icon}>
                      <p className={classes.title}>{book.grade}</p>
                      <StarBorderIcon className={classes.star} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>

    );
  }
}


const mapStateToProps = (state) => ({
  currentToken: state.currentToken,
  user: state.user,
});

export default connect(
  mapStateToProps
)(withRouter(withStyles(useStyles)(Shelf)));


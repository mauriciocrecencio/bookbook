import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  saveSearch,
  continuosSearch,
  backSearch,
} from "../_actions/actions.search";
import UsersBooks from "./timelineUsers";
import axios from "axios";

import Buttons from "./Buttons/buttons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        BookBook
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    justifyContent: "bottom",
  },
}));

function Timeline(props) {
  const classes = useStyles();
  const { sought, lastSearch, indexSought } = props;

  const handleSearch = () => {
    axios({
      method: "get",
      url: `https://www.googleapis.com/books/v1/volumes?q=${lastSearch}&maxResults=9&ilter=free-ebooks&startIndex=${indexSought}`,
    }).then((res) => {
      props.saveSearch(res.data.items, lastSearch);
      props.continuosSearch();
    });
  };

  const handleSearchBack = () => {
    if (indexSought <= 9) {
      return false;
    } else {
      axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes?q=${lastSearch}&maxResults=9&ilter=free-ebooks&startIndex=${indexSought}`,
      }).then((res) => {
        props.saveSearch(res.data.items, lastSearch);
        props.backSearch();
      });
    }
  };

  const searched = () => (lastSearch === "" ? true : false);

  const thumbnail = (thumb) =>
    thumb.hasOwnProperty("imageLinks")
      ? thumb.imageLinks.thumbnail
      : "https://source.unsplash.com/random";

  const description = (info) =>
    info.hasOwnProperty("description") ? info.description : "Sem descrição";

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {searched() && <UsersBooks />}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {sought &&
              sought.map((card, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={thumbnail(card.volumeInfo)}
                      title={card.volumeInfo.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.volumeInfo.title}
                      </Typography>
                      <Typography>
                        {description(card.volumeInfo).substr(0, 80)}...
                      </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: "center"}}>
                      <Button size="small" variant="outlined" color="primary">
                        Ver
                      </Button>
                      <Buttons
                        imageBook={
                          card.volumeInfo.imageLinks
                            ? card.volumeInfo.imageLinks.thumbnail
                            : null
                        }
                        titleBook={card.volumeInfo.title}
                        authorBook={card.volumeInfo.authors}
                        idBook={card.id}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {!searched() && (
        <Grid container justify="center">
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={() => handleSearchBack()}
          >
            Página Anterior
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            onClick={() => handleSearch()}
          >
            Proxima Página
          </Button>
        </Grid>
      )}
      <footer className={classes.footer}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Simplesmente aceite.
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentToken: state.currentToken,
  user: state.user,
  sought: state.sought,
  lastSearch: state.lastSearch,
  indexSought: state.indexSought,
});

const mapDispatchToProps = (dispatch) => ({
  saveSearch: (sought, lastSearch) => dispatch(saveSearch(sought, lastSearch)),
  continuosSearch: () => dispatch(continuosSearch()),
  backSearch: () => dispatch(backSearch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Timeline));

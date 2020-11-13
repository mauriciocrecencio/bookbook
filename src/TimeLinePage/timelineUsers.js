import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import userApi from "../helpers/axios";
import { booksTimeline } from "../_actions/actions.timeline";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 850,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const UsersBooks = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.currentToken);
  const bookstime = useSelector((state) => state.booksTimeline);
  const dispatch = useDispatch();

  useEffect(() => {
    userApi("/book_reviews", "GET", null, token).then((res) => {
      dispatch(booksTimeline(res.data));
    });
  }, [dispatch, token]);

  return (
    <div className={classes.root}>
      {bookstime.map((book, index) => (
        <Paper key={index} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image} disabled={true}>
                <img
                  className={classes.img}
                  alt="complex"
                  src={book.image_url}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Review: {book.review}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    By:{" "}
                    <Link
                      to={`/profile/${book.creator.id}`}
                      style={{ textDecoration: "none", color: "grey" }}
                    >
                      {book.creator.name}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Nota</Typography>
                  <Rating name="read-only" value={book.grade} readOnly />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default withRouter(UsersBooks);

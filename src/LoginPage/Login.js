import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import userApi from "../helpers/axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../_actions/actions.login";
import Background from '../images/img-login.jpeg';

const Copyright = () => {
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
};

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "blue",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  state = {
    input: {
      user: "",
      password: "",
    },
    errors: {
      value: false,
      input: ''
    },
    currentToken: "",
  };

  handleLogin = (event) => {
    if (event.key === "Enter" || "click") {
      userApi("/authenticate", "POST", {
        user: this.state.input.user,
        password: this.state.input.password,
      }).then(({ data }) => {

        if (data.user) {
          this.props.login(data.auth_token, data.user);
          this.props.history.push("/timeline");
        }
      }).catch((error) => {
        console.log(error.response.data.error) //Logs a string: Error: Request failed with status code 404
        if (error) {
          this.setState({
            errors: {
              value: true,
              input: error.response.data.error.user_authentication
            }
          })

        }
      })
    }
  };


  handleChange = (field, input) => {
    this.setState((state) => {
      return { ...state, input: { ...state.input, [field]: input } };
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <MenuBookIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuário"
                name="user"
                autoComplete="user"
                autoFocus
                onChange={(e) => this.handleChange("user", e.target.value)}
                value={this.state.input.user}
                error={this.state.errors.value}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => this.handleChange("password", e.target.value)}
                value={this.state.input.password}
                helperText={
                  this.state.errors.value ? "Senha/usuário inválidos, por favor verifique!" : ""
                }
                error={this.state.errors.value}

              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Você não tem uma conta? Registre-se!"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentToken: state.currentToken,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (currentToken, user) => dispatch(login(currentToken, user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(Login)));

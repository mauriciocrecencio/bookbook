import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { withRouter } from "react-router-dom";
import userApi from "../helpers/axios";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "blue",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const signUpSucess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [user, setUser] = useState({
    name: { value: "", isError: false },
    email: { value: "", isError: false },
    username: { value: "", isError: false },
    password: { value: "", isError: false },
    passwordConfirmation: { value: "", isError: false },
  });

  const [userAPI, setUserAPI] = useState('');
  const [valueAPI, setValue] = useState(false);
  const [valueAPIEmail, setValueEmail] = useState(false);
  const [emailAPI, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ValidateFields()) {
      const { name, username, password, passwordConfirmation, email } = user;
      userApi("/users", "POST", {
        user: {
          name: name.value,
          user: username.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value,
          email: email.value,
        },
      }).then((response) => {
        if (response.status === 201) {
          signUpSucess();
          setTimeout(() => {
            props.history.push("/");
          }, 2500);
        }
      }).catch(error => {
        console.log(error.response)
        if (error.response.status === 422 && error.response.data.user !== '') {
          setValue(true);

          setEmail(error.response.data.email)
        }

        if (error.response.status === 422 && error.response.data.email !== '') {
          setUserAPI(error.response.data.user)
          setValueEmail(true);
        }
      });
    }
  };


  const ValidateFields = () => {
    const { name, email, username, password, passwordConfirmation } = user;
    const letrasRegex = /(^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$)/g;
    const emailRegex = /\S+@\S+\.\S+/;
    let nameError = false;
    let usernameError = false;
    let passwordError = false;
    let passwordConfirmationError = false;
    let emailError = false;
    let isError = true;

    if (letrasRegex.test(name.value) === false || name.value.length <= 0) {
      nameError = true;
      isError = false;
    }
    if (emailRegex.test(email.value) === false || email.value.length <= 0) {
      emailError = true;
      isError = false;
    }
    if (username.value.length <= 0) {
      usernameError = true;
      isError = false;
    }
    if (password.value.length < 6) {
      passwordError = true;
      isError = false;
    }
    if (
      passwordConfirmation.value !== password.value ||
      password.value.length <= 0
    ) {
      passwordConfirmationError = true;
      isError = false;
    }
    setUser({
      ...user,
      name: { ...name.value, value: name.value, isError: nameError },
      username: {
        ...username.value,
        value: username.value,
        isError: usernameError,
      },
      password: {
        ...password.value,
        value: password.value,
        isError: passwordError,
      },
      passwordConfirmation: {
        ...passwordConfirmation.value,
        value: passwordConfirmation.value,
        isError: passwordConfirmationError,
      },
      email: { ...email.value, value: email.value, isError: emailError },
    });
    return isError;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro de novo usuário
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={user.name.value}
                error={user.name.isError}
                helperText={
                  user.name.isError ? "Escreva seu nome completo" : ''
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: {
                      ...user.name,
                      value: e.target.value,
                      isError: false,
                    },
                  })
                }
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome Completo"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={user.email.value}
                error={user.email.isError || valueAPIEmail}
                helperText={
                  emailAPI ? 'Email ja usado' : user.email.isError ? "Escreva um e-mail válido" : ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: {
                      ...user.email,
                      value: e.target.value,
                      isError: false,
                    },
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.username.value}
                error={user.username.isError || valueAPI}
                helperText={
                  user.username.isError
                    ? "Somente letras minúsculas, sem números ou pontos"
                    : userAPI ? 'Usuario ja criado' : ''
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: {
                      ...user.username,
                      value: e.target.value,
                      isError: false,
                    },
                  })
                }
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.password.value}
                error={user.password.isError}
                helperText={
                  user.password.isError
                    ? "A senha precisa ter no mínimo 6 números"
                    : ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: {
                      ...user.password,
                      value: e.target.value,
                      isError: false,
                    },
                  })
                }
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha (mínimo 6 digitos)"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.passwordConfirmation.value}
                error={user.passwordConfirmation.isError}
                helperText={
                  user.passwordConfirmation.isError
                    ? "As senhas precisam ser iguais"
                    : ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    passwordConfirmation: {
                      ...user.passwordConfirmation,
                      value: e.target.value,
                      isError: false,
                    },
                  })
                }
                variant="outlined"
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirme sua senha "
                type="password"
                id="passwordConfirmation"
                autoComplete="current-password-confirmation"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Você deseja receber inspiração para incentivar seu hábito de leitura?"
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar-se
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Cadastrado com Sucesso!
            </Alert>
          </Snackbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já tem uma conta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);

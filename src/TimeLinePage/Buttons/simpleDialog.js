import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import userApi from "../../helpers/axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SimpleDialog(props) {
  const [value, setValue] = React.useState("");
  const [snackOpen, setOpen] = React.useState(false);

  const addSucess = () => {
    setOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const shelfs = ["Quero ler", "Estou lendo", "Já li"];
  const [feedback, setFeedback] = useState("");
  const [inputToggle, setToggle] = useState(false);

  const {
    onClose,
    selectedValue,
    open,
    userID,
    imageBook,
    titleBook,
    authorBook,
    idBook,
    currentToken,
  } = props;

  const handleClose = () => {
    setTimeout(() => {
      onClose(selectedValue);
      setToggle(false);
    }, 2000);
  };

  const addReadBook = () => {
    userApi(
      `/users/${userID}/books/`,
      "POST",
      {
        book: {
          title: titleBook,
          author: authorBook[0],
          shelf: 3,
          image_url: imageBook,
          grade: value,
          review: feedback,
          google_book_id: idBook,
        },
      },
      currentToken
    ).then((response) => {
      if(response.status === 201){
        addSucess();
        handleClose();
      }
    });    
  };

  const handleListItemClick = (value) => {
    if (value === "Quero ler") {
      userApi(
        `/users/${userID}/books`,
        "post",
        {
          book: {
            title: titleBook,
            author: authorBook[0],
            shelf: 2,
            image_url: imageBook,
            grade: 1,
            review: "",
            google_book_id: idBook,
          },
        },
        currentToken
      ).then((response) => {
        if(response.status === 201){
          addSucess();
          handleClose();
        }
      });   
    }

    if (value === "Estou lendo") {
      userApi(
        `/users/${userID}/books/`,
        "POST",
        {
          book: {
            title: titleBook,
            author: authorBook[0],
            shelf: 1,
            image_url: imageBook,
            grade: 1,
            review: "",
            google_book_id: idBook,
          },
        },
        currentToken
      ).then((response) => {
        if(response.status === 201){
          addSucess();
          handleClose();
        }
      });
    }
    if (value === "Já li") {
      setToggle(true);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {inputToggle
          ? "Qual seu Feedback e nota para o livro?"
          : "Qual prateleira quer adicionar esse livro?"}
      </DialogTitle>
      <List>
        {inputToggle === false ? (
          <div>
            <ListItem
              button
              onClick={() => handleListItemClick(shelfs[0])}
              key={shelfs[0]}
            >
              <ListItemText primary={shelfs[0]} />
            </ListItem>

            <ListItem
              button
              onClick={() => handleListItemClick(shelfs[1])}
              key={shelfs[1]}
            >
              <ListItemText primary={shelfs[1]} />
            </ListItem>

            <ListItem
              button
              onClick={() => handleListItemClick(shelfs[2])}
              key={shelfs[2]}
            >
              <ListItemText primary={shelfs[2]} />
            </ListItem>
          </div>
        ) : (
          // Caso usuário clique em Já li
          <div style={{ padding: "0 30px 18px" }}>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                autoFocus
                margin="dense"
                id="feedback"
                label="Feedback"
                type="feedback"
                fullWidth
                margin="normal"
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <FormControl component="fieldset">
              <FormLabel component="legend">Nota</FormLabel>
              <RadioGroup
                aria-label="grade"
                name="grade"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => addReadBook()} color="primary">
                Enviar
              </Button>
            </DialogActions>
          </div>
        )}
      </List>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success">
              Adicionado a Prateleira!
            </Alert>
          </Snackbar>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

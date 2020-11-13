import React from "react";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import SimpleDialog from "./simpleDialog";

const shelfs = ["Quero ler", "Estou lendo", "Já li"];

export default function Buttons(props) {
  const currentToken = useSelector((state) => state.currentToken);
  const user = useSelector((state) => state.user);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(shelfs[1]);
  const { imageBook, titleBook, authorBook, idBook } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
        Salvar
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        userID={user.id}
        imageBook={imageBook}
        titleBook={titleBook}
        authorBook={authorBook}
        idBook={idBook}
        currentToken={currentToken}
      />
      {selectedValue === "Já li" ? "" : null}
    </div>
  );
}

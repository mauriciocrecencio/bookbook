import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useStyles } from "./style";
import { connect, useDispatch } from "react-redux";
import { login } from "../_actions/actions.login";
import { Link, withRouter } from "react-router-dom";
import { saveSearch, continuosSearch } from "../_actions/actions.search";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import axios from "axios";
import logo from "../images/logo_02.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TopBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const logado = props.currentToken;
  const [inputSearch, setInputSearch] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const searchError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.login("", "");
    handleMenuClose();
    dispatch(saveSearch([], ""));
    props.history.push("/");
  };

  const clearSearch = () =>dispatch(saveSearch([], ""));

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes?q=${inputSearch}&maxResults=9&ilter=free-ebooks&startIndex=${props.indexSought}`,
      }).then((res) => {
        if (res.data.totalItems > 0) {
          props.saveSearch(res.data.items, inputSearch);
          setInputSearch("");
          props.continuosSearch();
        } else {
          searchError();
          setInputSearch("");
        }
      });
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to={`/profile/${props.user.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          Perfil - {props.user.name}
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="BookBook" width="100" height="42" />
          {logado && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                onKeyPress={(e) => handleSearch(e)}
              />
            </div>
          )}
          {logado !== "" && (
            <>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Button color="inherit" onClick={() => clearSearch()}>
                  <Link
                    to={"/timeline"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    TIMELINE
                  </Link>
                </Button>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Sem Resultados!
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentToken: state.currentToken,
  user: state.user,
  indexSought: state.indexSought,
});

const mapDispatchToProps = (dispatch) => ({
  login: (currentToken, user) => dispatch(login(currentToken, user)),
  saveSearch: (sought, lastSearch) => dispatch(saveSearch(sought, lastSearch)),
  continuosSearch: () => dispatch(continuosSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopBar));

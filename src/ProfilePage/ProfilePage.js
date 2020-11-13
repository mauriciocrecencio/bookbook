import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import DoneIcon from "@material-ui/icons/Done";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import SetCarousel from "ProfilePage/Carousel";

import avatar from "assets/img/no-img.png";
import bookCape from "assets/img/book.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";
import userApi from "../helpers/axios";
import { addUserProfile } from "_actions/actions.addUserProfile";

const useStyles = makeStyles(styles);

function ProfilePage(props) {
  const classes = useStyles();
  const currentToken = useSelector((state) => state.currentToken);
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const [shelf, setShelf] = useState([]);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  useEffect(() => {
    userApi(
      `/users/${props.match.params.userId}`,
      "GET",
      null,
      currentToken
    ).then((res) => {
      dispatch(addUserProfile(res.data));
    });
    userApi(
      `/users/${props.match.params.userId}/books`,
      "GET",
      null,
      currentToken
    ).then((res) => {
      setShelf(res.data);
    });
  }, [dispatch, currentToken, props.match.params.userId]);

  return (
    <div>
      {console.log(shelf)}
      <SetCarousel small />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={
                        userProfile.image_url === null
                          ? avatar
                          : userProfile.image_url
                      }
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userProfile.name}</h3>
                    <h6>{userProfile.email}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>{userProfile.about} </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Quero Ler",
                      tabIcon: LibraryBooksIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {shelf
                            .filter((book) => book.shelf === 1)
                            .map((book, key) => (
                              <GridItem xs={12} sm={6} md={4}>
                                <img
                                  ket={key}
                                  alt={book.title}
                                  src={
                                    book.image_url === null
                                      ? bookCape
                                      : book.image_url
                                  }
                                  className={navImageClasses}
                                />
                              </GridItem>
                            ))}
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Estou Lendo",
                      tabIcon: LocalLibraryIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {shelf
                            .filter((book) => book.shelf === 2)
                            .map((book, key) => (
                              <GridItem xs={12} sm={6} md={4}>
                                <img
                                  ket={key}
                                  alt={book.title}
                                  src={
                                    book.image_url === null
                                      ? bookCape
                                      : book.image_url
                                  }
                                  className={navImageClasses}
                                />
                              </GridItem>
                            ))}
                        </GridContainer>
                      ),
                    },
                    {
                      tabButton: "Lidos",
                      tabIcon: DoneIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          {shelf
                            .filter((book) => book.shelf === 3)
                            .map((book, key) => (
                              <GridItem xs={12} sm={6} md={4}>
                                <img
                                  ket={key}
                                  alt={book.title}
                                  src={
                                    book.image_url === null
                                      ? bookCape
                                      : book.image_url
                                  }
                                  className={navImageClasses}
                                />
                              </GridItem>
                            ))}
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(ProfilePage);

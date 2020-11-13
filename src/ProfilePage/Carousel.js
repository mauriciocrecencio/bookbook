import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/cover-0.jpeg";
import image2 from "assets/img/cover-1.jpeg";
import image3 from "assets/img/cover-2.jpeg";
import image4 from "assets/img/cover-3.jpeg";
import image5 from "assets/img/cover-4.jpeg";
import image6 from "assets/img/cover-5.jpeg";
import image7 from "assets/img/cover-6.jpeg";


export default function SectionCarousel(){
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <Carousel {...settings}>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image1}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image2}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image3}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image4}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image5}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image6}
                alt=""
                className="slick-image"
              />
            </div>
            <div>
              <img style={{height: "350px", width: "100%"}}
                src={image7}
                alt=""
                className="slick-image"
              />
            </div>
          </Carousel>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
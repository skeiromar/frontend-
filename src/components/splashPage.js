import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import '../styles/splashPage.css';

export default class SplashPage extends Component {
  render() {
    return (
      <div>
        <div className="carouselContainer">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/B3zd9Hj/image.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/9cVtCSN/image.png"
              />
            </Carousel.Item>
            <Carousel.Item>
            {/* https://secure.img1-fg.wfcdn.com//media/video/41/411004.mp4 */}
              <img
                className="d-block w-100 splashCarouselImage"
                src="https://i.ibb.co/7CbyGWw/image.png"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ProductCard from './productCard';

import '../styles/splashPage.css';

export default class SplashPage extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/trendingProducts")
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      // let sortedData = data.filter();
      this.setState({
          products: data
      });
    });
  }

  handleRedirectPDP = (productId) => {
    this.props.history.push(`productDisplayPage/${productId}`);
  }

  render() {
    let products = this.state.products.map(product => (
      <ProductCard product={product} key={product.id} handleRedirectPDP={this.handleRedirectPDP}/>
    ));

    return (
      <div className="pageContainer">
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

        <div
          className="trendingItemsHeaderContainer"
        >
          <h1>Trending Items</h1>
        </div>
        <div
          className="browseProductsContainer"
        >
          {products}
        </div>



      </div>
    )
  }
}

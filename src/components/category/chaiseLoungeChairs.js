import React, { Component } from "react";
import ProductCard from "../productCard";

class ChaiseLoungeChairs extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        this.setState({
          products: data,
        });
      });
  }

  render() {
    //   console.log('iii', this.state.products)
    let sofaCategory = this.state.products.filter(
      (sofa) => sofa.category === "ChaiseLoungeChairs"
    );
    let sofa = sofaCategory.map((chaise) => (
      <ProductCard product={chaise} key={chaise.id} />
    ));
    return <div className="productCards">{sofa}</div>;
  }
}

export default ChaiseLoungeChairs;

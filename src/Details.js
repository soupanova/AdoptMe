import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";

// Details component: When I click on an animal, I want to get all the details of that specific animal.
class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    // this.setState(
    //   Object.assign(
    //     {
    //       loading: false,
    //     },
    //     json.pets[0]
    //   )
    // );
    const { name, breed, animal, city, state, description, images } =
      json.pets[0];
    this.setState({
      loading: false,
      name,
      breed,
      animal,
      city,
      state,
      description,
      images,
    });
  }
  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);

import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

// Details component: When I click on an animal, I want to get all the details of that specific animal.
class Details extends Component {
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "https://www.dogstrust.org.uk/");

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="my-0 mx-auto w-11/12">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([themeHook]) => (
              <button
                className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
                onClick={this.toggleModal}
                style={{ backgroundColor: themeHook }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adpot {name}?</h1>
                <div>
                  <button
                    className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
                    onClick={this.adopt}
                  >
                    Yes
                  </button>
                  <button
                    className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
                    onClick={this.toggleModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}

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
      <div className="m-8 rounded-lg flex flex-col justify-center items-center">
        <div>
          <div className="mx-0 my-5">
            <h1 className="text-5xl">{name}</h1>
            <h2 className="text-2xl">
              {animal} - {breed} - {city}, {state}
            </h2>
          </div>
          <Carousel images={images} />
          <ThemeContext.Consumer>
            {([themeHook]) => (
              <button
                className="my-5 rounded px-6 py-2 text-white hover:opacity-80 border-none"
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
                  <ThemeContext.Consumer>
                    {([themeHook]) => (
                      <button
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                        style={{ background: themeHook }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                    )}
                  </ThemeContext.Consumer>
                  <button
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

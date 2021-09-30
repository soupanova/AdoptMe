// searchParameter component
import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

// Array of animals, that we'll be able to choose from

const ANIMALS = ["bird", "dog", "cat", "reptile", "rabbit"];

/* Creating SearchParams component that has a input and sumbit button
 */
const SearchParams = () => {
  /* this can also look like this --> non destructed.
    const locationTuple = useState("Birmingham, UK");
    const location = locationTuple[0];
    const setLocation = locationTuple[1]; */

  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  /* 
  useEffect to grab an API, the [] is to stop the request from constantly re-rendering on request, we define when we want it to re-render again, so we can call the effect if specified.*/

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-dep

  // This useEffect can be used to cleanup your request if you're not specifying the target when required
  // useEffect(() => {
  //   const timer = setTimeout(() => alert("hi"), 3000);
  //   return () => clearTimeout(timer);
  // });

  /*
    Async functionn always await a promise.
    fetching the API and pulling it as json format.
    using setPets to change the state to json.pets pulled from the json object */
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          /* Using onClick is a handler we can use, but onSubmit allows the user to hit enter and click button to sumbit the form.
          e.preventDefault stops the form from reloading/refreshing the page */
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onCut={console.log}
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

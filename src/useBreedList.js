// custom Hook to get and store Breeds
import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  // if no animal is provided, then setBreedList to 'empty' else if I've already requested this previously and have it locally then use that, else fetch it from the API
  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("Loading");

      // fetching the breeds from the API and storing the json.breeds in localCache otherwise give empty array.
      // SetBreedList to localcache
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      console.log("json", json);
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      console.log(json.breeds);
      setStatus("loaded");
    }
    // everytime we get a new animal from the user we use this function
  }, [animal]);

  // return the breedList and status, always return a function
  return [breedList, status];
}

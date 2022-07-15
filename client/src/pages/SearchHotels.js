import React, { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { savePlaceIds, getSavedPlaceIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_PLACE } from '../utils/mutations';
import { QUERY_ME } from '../utils/query';

const SearchPlaces = () => {
    // create state for holding returned opentripmap api data
    const [SearchedPlaces, setSearchedPlaces] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    // create state to hold saved hotelsId values
    const [savedPlaces, setSavedPlaces] = useState(getSavedPlacesIds());
    // define saveHotel() from mutation
    const [savePlace] = useMutation(SAVE_PLACE);

    // set up useEffect hook to save `savedplaceIds` list to localstorage on component unmount

    useEffect(() => {
        return () => savePlaceIds(savedPlaceIds);
    })


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
        return false;
        }

        try {
        const response = await (searchInput);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        const { features } = await response.json();

        const placeData = features.map((place) => ({
            placeId: place.Id,
            placeName: place.properties.name,
            placeInfo: place.properties.wikidata,
            placeDescription: place.properties.highlighted_name,
            placeType: place.properties.kinds
        }));

        setSearchedPlaces(placeData);
        setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // create a function to handle saving a place to our database
    const handleSavePlace = async (placeId) => {
        // find the place in `searchedPlaces` state by the matching id
        const placeToSave = SearchedPlaces.find((place) => place.placeId === placeId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await savePlace({
                variables: {placeData: placeToSave},
                update: cache => {
                    console.log(me)
                    console.log(me.savedPlaces)
                    const {me} = cache.readQuery({query: QUERY_ME});
                    cache.writeQuery({ query: QUERY_ME, data: { me: {...me, savedPlaces: [...me.savedPlaces, placeToSave]}}});
                }
            })

            // if place successfully saves to user's account, save place id to state 
            setSavedPlaces([...savedPlaces, placeToSave.placeId]);
        } catch (err) {
            console.error(err);
        }
    };




const name = "";
const radius = '10000';

fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${name}&apikey=5ae2e3f221c38a28845f05b63f6a8d5eabe3e17858cf7c953b943189`)
  .then(res => res.json())
  .then(({ name, lat, lon }) => {

    console.log(name, lat, lon);

    fetch(`https://api.opentripmap.com/0.1/en/places/autosuggest?name=${name}&lat=${lat}&lon=${lon}&radius=${radius}&apikey=5ae2e3f221c38a28845f05b63f6a8d5eabe3e17858cf7c953b943189`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
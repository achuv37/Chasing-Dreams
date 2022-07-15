import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { Form, Col } from 'react-bootstrap';
import { savePlaceIds, getSavedPlaceIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_PLACE } from '../utils/mutations';
//import { QUERY_ME } from '../utils/query';

const SearchPlaces = () => {
    // create state for holding returned opentripmap api data
    const [searchedPlaces, setSearchedPlaces] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    // create state to hold saved placeId values
    const [savedPlaceIds, setSavedPlaceIds] = useState(getSavedPlaceIds());
    // define savePlace() from mutation
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
          const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${searchInput}&apikey=5ae2e3f221c38a28845f05b63f6a8d5eabe3e17858cf7c953b943189`);
          const parsedJson = await response.json();
      
          console.log(parsedJson.lat);
          console.log(parsedJson.lon);
          const lat = parsedJson.lat;
          const lon = parsedJson.lon;
          const radius = '10000';
          

          const responseNew = await fetch(`https://api.opentripmap.com/0.1/en/places/autosuggest?name=${searchInput}&lat=${lat}&lon=${lon}&radius=${radius}&apikey=5ae2e3f221c38a28845f05b63f6a8d5eabe3e17858cf7c953b943189`);

        if (!response.ok) {
            throw new Error('something went wrong!');
        }

        const { features } = await responseNew.json();

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
        const placeToSave = searchedPlaces.find((place) => place.placeId === placeId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
          const {data} = await savePlace({
            variables: { newPlace: {...placeToSave } },        
        })

    // if place successfully saves to user's account, save place id to state 
            setSavedPlaceIds([...savedPlaceIds, placeToSave.placeId]);
        } catch (err) {
            console.error(err);
        }
    };
  return (
    <>
      
        <Container className='text-light bg-dark'>
          <h1>Search for Locations!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a place'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>

        <Container>
        <h2>
          {searchedPlaces.length
            ? `Viewing ${searchedPlaces.length} results:`
            : 'Search for a location to begin'}
        </h2>
        <CardColumns>
          {searchedPlaces.map((place) => {
            return (
              <Card key={place.placeId} border='dark'>
                
                <Card.Body>
                  <Card.Title>{place.placeName}</Card.Title>
                  <p className='small'>Info: {place.placeInfo}</p>
                  <Card.Text>{place.placeDescription}</Card.Text>
                  <Card.Text> Kinds: {place.placeType}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.placeId)}
                      className='btn-block btn-info'
                      onClick={() => handleSavePlace(place.placeId)}>
                      {savedPlaceIds?.some((savedPlaceId) => savedPlaceId === place.placeId)
                        ? 'This location has already been saved!'
                        : 'Save this location!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );

}

export default SearchPlaces;
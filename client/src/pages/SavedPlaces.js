import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removePlaceId } from '../utils/localStorage';
//import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_PLACE } from '../utils/mutations';

const SavedPlaces = () => {
const { loading, data } = useQuery(QUERY_ME);
const [removePlace, { error }] = useMutation(REMOVE_PLACE);
const userData = data?.me || {};
console.log(userData);


// create function that accepts the place's mongo _id value as param and deletes the place from the database
const handleDeletePlace = async (placeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
      if (!token) {
        return false;
      }

    try {
      const { data } = await removePlace({
        variables: { placeId },
      });

      removePlaceId(placeId);
      } catch (err) {
        console.error(err);
      }
  };
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h4>Viewing your favorite locations!</h4>
        </Container>
      </Jumbotron>
      <Container>
        <h4>
          {userData.savedPlaces && userData.savedPlaces.length
            ? `Viewing ${userData.savedPlaces.length} saved ${userData.savedPlaces.length === 1 ? 'place' : 'places'}:`
            : 'You have no saved locations!'}
        </h4>
        <CardColumns>
          {userData.savedPlaces && userData.savedPlaces.map((place) => {
            return (
              <Card key={place.placeId} border='dark'>
                
                <Card.Body>
                  <Card.Img className='cardImage' src={place.placeImage} />
                  <Card.Title dangerouslySetInnerHTML={{__html:place.placeDescription}}></Card.Title>
                  <p className='small'>Info: {place.placeInfo?<a href= {`http://www.wikidata.org/entity/${place.placeInfo}`}target='_blank'rel='noreferrer'>Wikidata</a>:'Not Available!'}</p>
                  <Card.Text> Kinds: {place.placeType}</Card.Text>
                  
                  <Button className='btn-block btn-danger' onClick={() => handleDeletePlace(place.placeId)}>
                    Delete this Place!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );


};

export default SavedPlaces;

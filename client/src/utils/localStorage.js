export const getSavedPlacesIds = () => {
    const savedPlacesIds = localStorage.getItem('saved_places')
      ? JSON.parse(localStorage.getItem('saved_places'))
      : [];
  
    return savedPlacesIds;
  };
  
  export const savePlacesIds = (placeIdArr) => {
    if (placeIdArr.length) {
      localStorage.setItem('saved_places', JSON.stringify(placeIdArr));
    } else {
      localStorage.removeItem('save_places');
    }
  };
  
  export const removePlacesId = (placeId) => {
    const savedPlacesIds = localStorage.getItem('saved_places')
      ? JSON.parse(localStorage.getItem('saved_places'))
      : null;
  
    if (!savedPlacesIds) {
      return false;
    }
  
    const updatedSavedPlacesIds = savedPlacesIds?.filter((savedPlacesId) => savedPlacesId !== placeId);
    localStorage.setItem('saved_places', JSON.stringify(updatedSavedPlacesIds));
  
    return true;
  };
  
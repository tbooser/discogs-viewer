import { SET_ALBUM_IMAGE } from "../constants";

const albumImage = {
  image: []
};

function setAlbumImage(state = albumImage, action) {
  switch (action.type) {
    case SET_ALBUM_IMAGE:
      console.log("SET_ALBUM_IMAGE");
      return Object.assign({}, state, {
        albumImage: [
          ...state.image,
          {
            response: action.response
          }
        ]
      });

    default:
      return state;
  }
}

export default setAlbumImage;

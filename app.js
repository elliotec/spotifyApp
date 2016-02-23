$(".searchBtn").on('click', function(e) {
  e.preventDefault();
  getArtist();
});

function getArtist() {
  searchArtist($('#artistSearch').val());

  function searchArtist(query) {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'artist'
      },
      success: function(response) {

        getRelated(response);
      }
    });
  }

  function getRelated(response) {
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + response.artists.items[0].id + '/related-artists',
      success: function(data) {
        var artists = data.artists;

        getTracks(artists);
      }
    });
  }

  function getTracks(artists) {
    $.each(artists, function(i, artist) {
      $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US',
        success: function(result) {
          var trackName = result.tracks[0].name;

          $('.top-tracks').append("<h3>" + artist.name + "</h3> <h5>" + trackName + "</h5> <img src='" + artist.images[0].url + "'>");
        }

      });

    });

  }
}

var stateKey = 'spotify_auth_state';
var access_token = "";
var state= "";
var storedState = localStorage.getItem(stateKey);
if (access_token && (state === null || state !== storedState)) {
  alert('There was an error during the authentication');
} else {
  localStorage.removeItem(stateKey);
  if (access_token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
        success: function(response) {
          console.log("it worked!");

        }
    });
  } else {
      console.log("didnt work");
  }

  document.getElementById('logIn').addEventListener('click', function() {
    var client_id = '70fda190f10c4e95aaf77d9957e7ebed'; // Your client id
    var redirect_uri = 'http://localhost:8888/'; // Your redirect uri

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);


    window.location = url;
  }, false);
}

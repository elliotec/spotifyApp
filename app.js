$(".searchBtn").on('click', function (e) {
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

          // $.each(artist, function(i, track) {
            $('.top-tracks').append("<h3>" + artist.name + " - " + trackName + "</h3>");
          // });
        }

      });

    });

  }
}

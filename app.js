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
        $('.title').append("<h2> artists related to " + query + "</h2>");

        getRelated(response);
      }
    });
  }

  function getRelated(response) {
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + response.artists.items[0].id + '/related-artists',
      success: function(data) {
        var artists = data.artists;

        $.each(artists, function(i, item) {
          $('.related-artists').append("<h3>" + item.name + "</h3>");
          $('.album-cover').append("<img src='" + item.images[0].url + "'>");
        });

        getTracks(artists);
      }
    });
  }

  function getTracks(artists) {

    $.each(artists, function(i, artist) {

      $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US',
        success: function(result) {
          var tracks = result.tracks;

          $('.top-tracks').append("<h2>" + artist.name + "'s Top Tracks in the US</h2>");

          $.each(tracks, function(i, track) {
            $('.top-tracks').append("<h3>" + track.name + "</h3>");
          });
        }

      });

    });

  }
}

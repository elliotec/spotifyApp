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
        console.log(response);

        $('.results').append("<h2> artists related to " + query + "</h2>");

        getRelated(response);
      }
    });
  }

  function getRelated(response) {
    $.ajax({
      url: 'https://api.spotify.com/v1/artists/' + response.artists.items[0].id + '/related-artists',
      success: function(data) {
        console.log(data);
        var artists = data.artists;

        $.each(artists, function(i, item) {
          $('.results').append("<h3>" + item.name + "</h3>");
          $('.results').append("<img class='album-cover' src='" + item.images[0].url + "'>");
        });

        getTracks(artists);
      }
    });
  }

  function getTracks(artists) {
    //var artist = artists[0];

    for (var artist in artists) {
      $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + artists[0].id + '/top-tracks?country=US',
        success: function(result) {
          console.log(result);
          var track = result.tracks;

          $.each(track, function(i, item) {
            $('.album-cover').append("<h3>" + item.name + "</h3>");
          });

        }
      });
    }
  }

}

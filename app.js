$(".searchBtn").on('click', function (e) {
    e.preventDefault();
    getArtist();
});

function getArtist() {

  function searchAlbums(query) {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'artist'
      },
      success: function(response) {
        console.log(response);

        $.ajax({
          url: 'https://api.spotify.com/v1/artists/' + response.artists.items[0].id + '/related-artists',
          success: function(data) {
            console.log(data);
            var artists = data.artists;
            $('.results').append("<h2> artists related to " + query + "</h2>");
            $.each(artists, function(i, item) {
              $('.results').append("<h3>" + item.name + "</h3>");
              $('.results').append("<img src='" + item.images[0].url + "'>");
            });

            for each (var artist in artists) {
              $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + artist.id + '/top-tracks?country=US',
                success: function(result) {
                  console.log(result);
                  var track = result.tracks;
                  $.each(track, function(i, item) {
                    $('.results').append("<h3>" + item.name + "</h3>");
                  });
                }
              });
            }

          }
        });

      }
    });
  }

  searchAlbums($('#artistSearch').val());

}

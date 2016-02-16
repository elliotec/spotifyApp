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
            var artist = data.artists;
            $('.results').append("<h2> artists related to " + query + "</h2>");
            $.each(artist, function(i, item) {
              $('.results').append("<h3>" + item.name + "</h3>");
              $('.results').append("<img src='" + item.images[0].url + "'>");
            });

            $.ajax({
              url: 'https://api.spotify.com/v1/artists/' + data.artists[0].id + '/top-tracks?country=US',
              success: function(result) {
                console.log(result);
                var track = result.tracks;
                $.each(track, function(i, item) {
                  $('.results').append("<h3>" + item.name + "</h3>");
                });

              }
            });

          }
        });

      }
    });
  }

  searchAlbums($('#artistSearch').val());

}

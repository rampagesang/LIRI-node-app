//Load the NPM Package inquirer
var inquirer = require("inquirer");
// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["my-tweet", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "options"
    },
  
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.options === "my-tweet"){
      getTweets();
    }
    else if (inquirerResponse.options === "spotify-this-song") {
      getSpotify();
    }
    else if (inquirerResponse.options === "movie-this") {
      getIMDB();
    }
    else if (inquirerResponse.options === "do-what-it-says") {
      doWhatItSays();
    }

  });


var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "b0727231dd124421b34d83f0d7bf1298",
  secret: "f79c8b229f5840a3acb95418c965c5d8"
});
var userSongInput = "";

function getSpotify (song) {
    inquirer.prompt([
      {
        name: "song",
        message: "What song would you like to search?"
      }
    ])
    .then(function (song) {
        userSongInput = song.song;
        spotify
        .search({ 
          type: 'track', 
          query: userSongInput, 
          limit: 3,
        })
        .then(function(response) {
          var response = response.tracks.items;
          for (var i=0; i<response.length; i++){
            console.log("Artist Name: " + response[i].album.artists[0].name)
            console.log("Song Name: " + response[i].name)
            console.log("Spotify Preview: " + response[i].external_urls.spotify);
            console.log("Album Name: " + response[i].album.name)
            console.log("---------------------")
          };
        })
        .catch(function(err) {
          console.log(err);
        });
  });
};//end of getSpotify function
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

var request = require('request');
var userMovieInput = "";
function getIMDB(movie) {
    inquirer.prompt([
      {
        name: "movie",
        message: "What movie are you interested in?"
      }
    ])
    .then(function(movie) {
      userMovieInput = movie.movie;
      request('http://www.omdbapi.com/?t='+userMovieInput+'&apikey=1d2c3240', function(error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
          }
      });
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var fs = require("fs");

function doWhatItSays (){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    else {
    var dataArr = data.split(",");
      if (dataArr[0] === "my-tweet"){
        getTweets()
      }
      else if (dataArr[0] === "spotify-this-song"){
        userSongInput = dataArr[1];
        spotify
          .search({ 
            type: 'track', 
            query: userSongInput, 
            limit: 3,
          })
          .then(function(response) {
            var response = response.tracks.items;
            for (var i=0; i<response.length; i++){
              console.log("Artist Name: " + response[i].album.artists[0].name)
              console.log("Song Name: " + response[i].name)
              console.log("Spotify Preview: " + response[i].external_urls.spotify);
              console.log("Album Name: " + response[i].album.name)
              console.log("---------------------")
            };
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      else if (dataArr[0] === "movie-this"){
        userMovieInput = dataArr[1];
        request('http://www.omdbapi.com/?t='+userMovieInput+'&apikey=40e9cece', function(error, response, body) {
            if (!error && response.statusCode === 200) {
              console.log("Title: " + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
              console.log("Country: " + JSON.parse(body).Country);
              console.log("Language: " + JSON.parse(body).Language);
              console.log("Plot: " + JSON.parse(body).Plot);
              console.log("Actors: " + JSON.parse(body).Actors);
            };
        });
      };
    }; //end of else statement of the function
  });//end of fs.readFile
};// end of do what it says function

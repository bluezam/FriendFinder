var path = require('path');

var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {

		var userInput = req.body;

        var userResponses = userInput.scores;
        
		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison


		for (var i = 0; i < friends.length; i++) {



			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}


			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}


		friends.push(userInput);


		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};

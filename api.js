
// const { default: axios } = require('axios');
const express = require('express');
// const xml2json = require('xml2json');

const router = express.Router();

// function arr(item) {
//     return item instanceof Array ? item : [item];
// }

// router.get('/bggdata', async (req, res) => {
//     let username = req.query.username;
//     let gameIds = [];
//     let userRatings = {};

//     try {
//         if (username) {
//             let res = await axios.get('https://boardgamegeek.com/xmlapi2/collection', {
//                 params: {
//                     username: username,
//                     stats: '1',
//                     own: '1'
//                 }
//             });
//             let data = JSON.parse(xml2json.toJson(res.data));
//             for (let game of arr(data.items.item)) {
//                 gameIds.push(game.objectid);
//                 if (!isNaN(parseInt(game.stats.rating.value))) {
//                     userRatings[game.objectid] = parseInt(game.stats.rating.value);
//                 }
//             }
//         } else {
//             let res1 = await axios.get('https://boardgamegeek.com/browse/boardgame');
//             let res2 = await axios.get('https://boardgamegeek.com/browse/boardgame/page/2');
//             let text = res1.data + res2.data;
//             let re = /boardgame\/(\d+)\//g;
//             let match;
//             do {
//                 match = re.exec(text);
//                 if (match) {
//                     if (gameIds[gameIds.length-1] !== match[1]) {
//                         gameIds.push(match[1]);
//                     }
//                 }
//             } while (match);
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).send('There was an issue with the BGG API. Wait a few moments and try again.');
//         return;
//     }

//     let gameStats = [];

//     try {
//         let res = await axios.get('https://boardgamegeek.com/xmlapi2/thing', {
//             params: {
//                 type: 'boardgame',
//                 stats: '1',
//                 id: gameIds.join(',')
//             }
//         });
//         let data = JSON.parse(xml2json.toJson(res.data));

//         for (let game of arr(data.items.item)) {
//             let gameData = {
//                 playerCounts: [
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false },
//                     { supported: false, recommended: false, best: false }
//                 ],
//                 supportedMin: parseInt(game.minplayers.value),
//                 supportedMax: parseInt(game.maxplayers.value),
//                 rating: parseFloat(game.statistics.ratings.average.value),
//                 id: game.id,
//                 thumbnail: game.thumbnail
//             };

//             for (let name of arr(game.name)) {
//                 if (name.type === 'primary') gameData.name = name.value;
//             }

//             for (let poll of arr(game.poll)) {
//                 if (poll.name === 'suggested_numplayers') {
//                     for (let count of arr(poll.results)) {
//                         if (/\+$/.test(count.numplayers)) continue;

//                         let bestVotes = 0;
//                         let recVotes = 0;
//                         let notRecVotes = 0;

//                         for (let pollResult of arr(count.result)) {
//                             if (pollResult.value === 'Best')
//                                 bestVotes = parseInt(pollResult.numvotes);
//                             if (pollResult.value === 'Recommended')
//                                 recVotes = parseInt(pollResult.numvotes);
//                             if (pollResult.value === 'Not Recommended')
//                                 notRecVotes = parseInt(pollResult.numvotes);
//                         }

//                         let countData = gameData.playerCounts[parseInt(count.numplayers) - 1];
//                         if (countData) {
//                             countData.recommended = recVotes + bestVotes >= notRecVotes;
//                             countData.best = bestVotes >= recVotes && recVotes + bestVotes > notRecVotes;
//                         }
//                     }
//                 }
//             }

//             for (let i = gameData.supportedMin; i < gameData.supportedMax+1 && i < 11; i++) {
//                 gameData.playerCounts[i-1].supported = true;
//             }

//             if (userRatings[gameData.id]) {
//                 gameData.rating /= 100;
//                 gameData.rating += userRatings[gameData.id];
//             }

//             gameStats.push(gameData);
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).send('The imported data could not be loaded correctly. ');
//         return;
//     }

//     res.send(gameStats)
// });

module.exports = router;

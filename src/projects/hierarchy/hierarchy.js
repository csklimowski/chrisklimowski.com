const CARDS = [
    {
        name: 'Imposter (?)',
        value: null,
        canPlay: function(gs, player) {
            if (gs.line.length < 3) return false;
            let tc = gs.line[gs.line.length-1];
            if (tc.value === 8) return false;
            let playableCards = gs.line.filter(cs => cs.owner !== player && cs.id !== tc.id && CARDS[cs.id].canPlay(gs, player));
            if (playableCards.length === 0) return false;
            else {
                return playableCards.map(cs => cs.id);
            } 
        }
    },
    {
        name: 'Assassin (1)',
        value: 1,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv !== 4 && tcv !== 2 && tcv !== 8
        }
    },
    {
        name: 'Leper (2)',
        value: 2,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv !== 2 && tcv !== 4 && tcv !== 6 && tcv !== 8 && tcv !== 10 && tcv !== 12;
        }
    },
    {
        name: 'Serf (3)',
        value: 3,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv < 3 || tcv === 7;
        }
    },
    {
        name: 'Tower (4)',
        value: 4,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return false;
            let tcv = gs.line[gs.line.length-1].value;
            if (tcv === 2 || tcv === 8) return false;
            if (tcv === 1 || tcv === 7) return [-1];
            let hand = player === 1 ? 'hand1' : 'hand2';
            if (gs[hand].length === 1) return false;
            else return gs[hand].filter(cs => cs.id !== 4).map(cs => cs.id);
        }
    },
    {
        name: 'Surgeon (5)',
        value: 5,
        canPlay: function(gs, player) {
            if (gs.line.length < 2) return false;
            let tcv = gs.line[gs.line.length-1].value;
            if (tcv === 1 || tcv === 2 || tcv === 4 || tcv === 7) {
                return gs.line.filter(cs => cs.owner !== player).map(cs => cs.id);
            } else {
                return false;
            }
        }
    },
    {
        name: 'Knight (6)',
        value: 6,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv === 1 || tcv === 2 || tcv === 4 || tcv === 5 || tcv === 7 || tcv === 9;
        }
    },
    {
        name: 'Usurper (7)',
        value: 7,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return false;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv > 8;
        }
    },
    {
        name: 'Sorcerer (8)',
        value: 8,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv < 7;
        }
    },
    {
        name: 'Dragon (9)',
        value: 9,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv !== 7 && tcv !== 11 && tcv !== 12 && tcv !== 13;
        }
    },
    {
        name: 'Baroness (10)',
        value: 10,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return true;
            let tcv = gs.line[gs.line.length-1].value;
            let towerInLine = gs.line.filter(cs => cs.id === 4).length > 0;
            if (gs.line.length + (towerInLine ? 1 : 0) > 7 && tcv !== 8) return false;
            return tcv !== 2 && tcv !== 7 && tcv !== 11 && tcv !== 12 && tcv !== 13;
        }
    },
    {
        name: 'High Priest (11)',
        value: 11,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return false;
            let tcv = gs.line[gs.line.length-1].value;
            return tcv === 3 || tcv === 4 || tcv === 6 || tcv === 8 || tcv === 10 || tcv === 12 || tcv === 13;
        }
    },
    {
        name: 'Queen (12)',
        value: 12,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return false;
            let tcv = gs.line[gs.line.length-1].value;
            let baronessInLine = gs.line.filter(cs => cs.id === 10).length > 0;
            if (!baronessInLine && tcv !== 8) return false;
            return tcv !== 2 && tcv !== 7 && tcv !== 12 && tcv !== 13;
        }
    },
    {
        name: 'King (13)',
        value: 13,
        canPlay: function(gs, player) {
            if (gs.line.length === 0) return false;
            let tcv = gs.line[gs.line.length-1].value;
            let towerInLine = gs.line.filter(cs => cs.id === 4).length > 0;
            if (gs.line.length + (towerInLine ? 1 : 0) < 7 && tcv !== 8) return false;
            return tcv !== 2 && tcv !== 7;
        }
    },
]

const INITIAL_CARDS = 0;
const PLAYER_TURN = 1;
const SURGEON_CHOICE_1 = 2;
const SURGEON_CHOICE_2 = 3;
const IMPOSTER_CHOICE = 4;
const TOWER_CHOICE = 5;
const VICTORY = 6;
const DEFEAT = 7;

function copyState(baseState) {
    return {
        hand1: baseState.hand1.map(cs => ({...cs})),
        hand2: baseState.hand2.map(cs => ({...cs})),
        line: baseState.line.map(cs => ({...cs})),
        discard: baseState.line.map(cs => ({...cs}))
    };
}

function moveCard(from, to, id, sort) {
    let index = -1;
    for (let i = 0; i < from.length; i++) {
        if (from[i].id === id) {
            index = i;
            break;
        }
    }
    let [ cs ] = from.splice(index, 1);
    to.push(cs);
    if (sort) to.sort((a, b) => a.id - b.id);
}


function findPossibleMoves(gameState, player, preSurgeon) {
    let hand = player === 1 ? 'hand1' : 'hand2';

    let preSurgeonOptions;
    if (preSurgeon) {
        preSurgeonOptions = gameState.line.filter((cs, i) => cs.owner !== player && i < gameState.line.length - 1).map(cs => cs.id);
    } else {
        preSurgeonOptions = [-1];
    }

    let possibleMoves = [];
    for (let pso of preSurgeonOptions) {
        for (let cs of gameState[hand]) {
            let playable = CARDS[cs.id].canPlay(gameState, player);
            if (playable) {
                if (cs.id === 0 || cs.id === 4 || cs.id === 5) {
                    for (let submove of playable) {
                        if (cs.id === 0 && (submove === 5 || submove === 4)) {
                            for (let subsubmove of CARDS[submove].canPlay(gameState, player)) {
                                if (subsubmove !== 0) {
                                    possibleMoves.push({
                                        id: cs.id,
                                        submove: submove,
                                        subsubmove: subsubmove,
                                        score: 0,
                                        preSurgeon: pso
                                    });
                                }
                            }
                        } else {
                            possibleMoves.push({
                                id: cs.id,
                                submove: submove,
                                score: 0,
                                preSurgeon: pso
                            });
                        }
                    }
                } else {
                    possibleMoves.push({
                        id: cs.id,
                        score: 0,
                        preSurgeon: pso
                    });
                }
            }
        }
    }
    return possibleMoves;
}

function applyMove(gameState, move, player) {
    let hand = player === 1 ? 'hand1' : 'hand2';
    let otherHand = player === 1 ? 'hand2' : 'hand1';

    moveCard(gameState[hand], gameState.line, move.id);

    if (move.preSurgeon > -1) {
        moveCard(gameState.line, gameState[otherHand], move.preSurgeon, true);
    }

    if (move.id === 4) {
        if (move.submove !== -1) {
            moveCard(gameState[hand], gameState.discard, move.submove);
        }
    }

    if (move.id === 5) {
        moveCard(gameState.line, gameState[otherHand], move.submove, true);
    }

    if (move.id === 0) {
        gameState.line[gameState.line.length-1].value = move.submove;
        if (move.submove === 4) {
            if (move.subsubmove !== -1) {
                moveCard(gameState[hand], gameState.discard, move.subsubmove);
            }
        }

        if (move.submove === 5) {
            moveCard(gameState.line, gameState[otherHand], move.subsubmove, true);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    new Vue({
        el: '#app',
        data: {
            log: '',
            decision: INITIAL_CARDS,
            gameState: {
                hand2: [
                    {id: 0, value: null, owner: 2},
                    {id: 1, value: 1, owner: 2},
                    {id: 2, value: 2, owner: 2},
                    {id: 3, value: 3, owner: 2},
                    {id: 4, value: 4, owner: 2},
                    {id: 5, value: 5, owner: 2},
                    {id: 6, value: 6, owner: 2},
                    {id: 7, value: 7, owner: 2},
                    {id: 8, value: 8, owner: 2},
                    {id: 9, value: 9, owner: 2},
                    {id: 10, value: 10, owner: 2},
                    {id: 11, value: 11, owner: 2},
                    {id: 12, value: 12, owner: 2},
                    {id: 13, value: 13, owner: 2}
                ],
                hand1: [],
                line: [],
                discard: []
            }
        },
        created: function() {
            this.INITIAL_CARDS = INITIAL_CARDS;
            this.PLAYER_TURN = PLAYER_TURN;
            this.SURGEON_CHOICE_1 = SURGEON_CHOICE_1;
            this.SURGEON_CHOICE_2 = SURGEON_CHOICE_2;
            this.IMPOSTER_CHOICE = IMPOSTER_CHOICE;
            this.TOWER_CHOICE = TOWER_CHOICE;
            this.VICTORY = VICTORY;
            this.DEFEAT = DEFEAT;
            this.CARDS = CARDS;
        },
        methods: {
            toHand2: function(cs) {
                cs.owner = 2;
                moveCard(this.gameState.hand1, this.gameState.hand2, cs.id, true);
            },
            toHand1: function(cs) {
                cs.owner = 1;
                moveCard(this.gameState.hand2, this.gameState.hand1, cs.id, true);
            },
            proceed: function() {
                this.log += '\nGAME START';
                let aiHasImposter = false;
                for (let card of this.gameState.hand2) {
                    if (card.id === 0) {
                        aiHasImposter = true;
                        break;
                    }
                }
                this.decision = PLAYER_TURN;
                if (aiHasImposter) {
                    this.aiMove();
                } else {
                    if (findPossibleMoves(this.gameState, 1).length > 0) {
                        this.log += '\nYou play...';
                    } else {
                        this.decision = DEFEAT;
                    }
                }
            },
            restart: function() {
                this.gameState = {
                    hand2: [
                        {id: 0, value: null, owner: 2},
                        {id: 1, value: 1, owner: 2},
                        {id: 2, value: 2, owner: 2},
                        {id: 3, value: 3, owner: 2},
                        {id: 4, value: 4, owner: 2},
                        {id: 5, value: 5, owner: 2},
                        {id: 6, value: 6, owner: 2},
                        {id: 7, value: 7, owner: 2},
                        {id: 8, value: 8, owner: 2},
                        {id: 9, value: 9, owner: 2},
                        {id: 10, value: 10, owner: 2},
                        {id: 11, value: 11, owner: 2},
                        {id: 12, value: 12, owner: 2},
                        {id: 13, value: 13, owner: 2}
                    ],
                    hand1: [],
                    line: [],
                    discard: []
                };
                this.log = '';
                this.decision = INITIAL_CARDS;
            },
            playCard: function(cs) {
                this.log = this.log.replace('...', ' ' + CARDS[cs.id].name);
        
                if (cs.id === 0) {
                    this.log += ' as...';
                    this.decision = IMPOSTER_CHOICE;
                } else if (cs.id === 5) {
                    moveCard(this.gameState.hand1, this.gameState.line, cs.id);
                    this.log += '\nYou return...';
                    this.decision = SURGEON_CHOICE_1;
                } else if (cs.id === 4 && CARDS[4].canPlay(this.gameState, 1)[0] !== -1) {
                    moveCard(this.gameState.hand1, this.gameState.line, cs.id);
                    this.log += ', discarding...';
                    this.decision = TOWER_CHOICE;
                } else {
                    moveCard(this.gameState.hand1, this.gameState.line, cs.id);
                    this.aiMove();
                }
            },
            chooseImposter: function(cs) {
                this.log = this.log.replace('...', ' ' + CARDS[cs.id].name);
                moveCard(this.gameState.hand1, this.gameState.line, 0);
                this.gameState.line[this.gameState.line.length-1].value = cs.value;
                if (cs.id === 4) {
                    this.log += ', discarding...';
                    this.decision = TOWER_CHOICE;
                } else if (cs.id === 5) {
                    this.log += '\nYou return...';
                    this.decision = SURGEON_CHOICE_1;
                } else {
                    this.decision = PLAYER_TURN;
                    this.aiMove();
                }
            },
            chooseSurgeon1: function(cs) {
                moveCard(this.gameState.line, this.gameState.hand2, cs.id, true);
                this.log = this.log.replace('...', ' ' + CARDS[cs.id].name);
                this.decision = PLAYER_TURN;
                this.aiMove(true);
            },
            chooseSurgeon2: function(cs) {
                moveCard(this.gameState.line, this.gameState.hand2, cs.id, true);
                this.log = this.log.replace('...', ' ' + CARDS[cs.id].name + '\nYou play...');
                this.decision = PLAYER_TURN;
            },
            chooseTower: function(cs) {
                moveCard(this.gameState.hand1, this.gameState.discard, cs.id);
                this.log = this.log.replace('...', ' ' + CARDS[cs.id].name);
                this.decision = PLAYER_TURN;
                this.aiMove();
            },
            aiMove: function(preSurgeon) {
        
                let possibleMoves = findPossibleMoves(this.gameState, 2, preSurgeon);
        
                if (possibleMoves.length === 0) {
                    this.decision = VICTORY;
                    return;
                }
        
                let bestChoices = [{score: -1}];
                let playerLoses = false;
        
                for (let move of possibleMoves) {
                    let scenario = copyState(this.gameState);
        
                    applyMove(scenario, move, 2);
                    
                    let playerOptions = findPossibleMoves(scenario, 1, move.id === 5);
        
                    if (playerOptions.length === 0) {
                        bestChoices = [move];
                        this.decision = DEFEAT;
                        playerLoses = true;
                        break;
                    } else {
                        move.score = 99;
                        for (let option of playerOptions) {
                            let subscenario = copyState(scenario);
                            applyMove(subscenario, option, 1);
                            let furtherOptions = findPossibleMoves(subscenario, 2, option.id === 5);
                            move.score = Math.min(move.score, furtherOptions.length);
                        }
        
                        if (move.score > bestChoices[0].score) {
                            bestChoices = [move];
                        } else if (move.score === bestChoices[0].score) {
                            bestChoices.push(move);
                        }
                    }
        
                }
        
                let chosenMove = bestChoices[Math.floor(Math.random()*bestChoices.length)];
                applyMove(this.gameState, chosenMove, 2);
        
                if (chosenMove.preSurgeon > -1) {
                    this.log += '\nAI returns ' + CARDS[chosenMove.preSurgeon].name;
                }
                this.log += '\nAI plays ' + CARDS[chosenMove.id].name;
                if (chosenMove.id === 4 && chosenMove.submove !== -1) {
                    this.log += ', discarding ' + CARDS[chosenMove.submove].name;
                }
                if (chosenMove.id === 5) {
                    this.log += '\nAI returns ' + CARDS[chosenMove.submove].name + '\nYou return...';
                    this.decision = SURGEON_CHOICE_2;
                }
                if (chosenMove.id === 0) {
                    this.log += ' as ' + CARDS[chosenMove.submove].name;
                    if (chosenMove.submove === 4 && chosenMove.subsubmove !== -1) {
                        this.log += ', discarding ' + CARDS[chosenMove.subsubmove].name;
                    }
            
                    if (chosenMove.submove === 5) {
                        this.log += '\nAI returns ' + CARDS[chosenMove.subsubmove].name + '\nYou return...';
                        this.decision = SURGEON_CHOICE_2;
                    }
                }
                if (!playerLoses && chosenMove.id !== 5 && !(chosenMove.id === 0 && chosenMove.submove === 5)) {
                    this.log += '\nYou play...';
                }
            }
        }
    });
});
  


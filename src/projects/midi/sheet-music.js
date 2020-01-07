const notes = {
    36: { name: 'C2',  y: 170, els: [], semi: 1,  lines: [170, 160] },
    37: { name: 'C#2', y: 170, els: [], semi: 2,  lines: [170, 160] },
    38: { name: 'D2',  y: 165, els: [], semi: 3,  lines: [160] },
    39: { name: 'D#2', y: 165, els: [], semi: 4,  lines: [160] },
    40: { name: 'E2',  y: 160, els: [], semi: 5,  lines: [160] },
    41: { name: 'F2',  y: 155, els: [], semi: 6,  lines: [] },
    42: { name: 'F#2', y: 155, els: [], semi: 7,  lines: [] },
    43: { name: 'G2',  y: 150, els: [], semi: 8,  lines: [] },
    44: { name: 'G#2', y: 150, els: [], semi: 9,  lines: [] },
    45: { name: 'A2',  y: 145, els: [], semi: 10, lines: [] },
    46: { name: 'A#2', y: 145, els: [], semi: 11, lines: [] },
    47: { name: 'B2',  y: 140, els: [], semi: 12, lines: [] },
    48: { name: 'C3',  y: 135, els: [], semi: 1,  lines: [] },
    49: { name: 'C#3', y: 135, els: [], semi: 2,  lines: [] },
    50: { name: 'D3',  y: 130, els: [], semi: 3,  lines: [] },
    51: { name: 'D#3', y: 130, els: [], semi: 4,  lines: [] },
    52: { name: 'E3',  y: 125, els: [], semi: 5,  lines: [] },
    53: { name: 'F3',  y: 120, els: [], semi: 6,  lines: [] },
    54: { name: 'F#3', y: 120, els: [], semi: 7,  lines: [] },
    55: { name: 'G3',  y: 115, els: [], semi: 8,  lines: [] },
    56: { name: 'G#3', y: 115, els: [], semi: 9,  lines: [] },
    57: { name: 'A3',  y: 110, els: [], semi: 10, lines: [] },
    58: { name: 'A#3', y: 110, els: [], semi: 11, lines: [] },
    59: { name: 'B3',  y: 105, els: [], semi: 12, lines: [] },
    60: { name: 'C4',  y: 100, els: [], semi: 1,  lines: [100] },
    61: { name: 'C#4', y: 100, els: [], semi: 2,  lines: [100] },
    62: { name: 'D4',  y: 95,  els: [], semi: 3,  lines: [] },
    63: { name: 'D#4', y: 95,  els: [], semi: 4,  lines: [] },
    64: { name: 'E4',  y: 90,  els: [], semi: 5,  lines: [] },
    65: { name: 'F4',  y: 85,  els: [], semi: 6,  lines: [] },
    66: { name: 'F#4', y: 85,  els: [], semi: 7,  lines: [] },
    67: { name: 'G4',  y: 80,  els: [], semi: 8,  lines: [] },
    68: { name: 'G#4', y: 80,  els: [], semi: 9,  lines: [] },
    69: { name: 'A4',  y: 75,  els: [], semi: 10, lines: [] },
    70: { name: 'A#4', y: 75,  els: [], semi: 11, lines: [] },
    71: { name: 'B4',  y: 70,  els: [], semi: 12, lines: [] },
    72: { name: 'C5',  y: 65,  els: [], semi: 1,  lines: [] },
    73: { name: 'C#5', y: 65,  els: [], semi: 2,  lines: [] },
    74: { name: 'D5',  y: 60,  els: [], semi: 3,  lines: [] },
    75: { name: 'D#5', y: 60,  els: [], semi: 4,  lines: [] },
    76: { name: 'E5',  y: 55,  els: [], semi: 5,  lines: [] },
    77: { name: 'F5',  y: 50,  els: [], semi: 6,  lines: [] },
    78: { name: 'F#5', y: 50,  els: [], semi: 7,  lines: [] },
    79: { name: 'G5',  y: 45,  els: [], semi: 8,  lines: [] },
    80: { name: 'G#5', y: 45,  els: [], semi: 9,  lines: [] },
    81: { name: 'A5',  y: 40,  els: [], semi: 10, lines: [40] },
    82: { name: 'A#5', y: 40,  els: [], semi: 11, lines: [40] },
    83: { name: 'B5',  y: 35,  els: [], semi: 12, lines: [40] },
    84: { name: 'C6',  y: 30,  els: [], semi: 1,  lines: [30, 40] }
};

const keys = {
    c: {
        marks: {
            2: ['sharp', 'flat'],
            4: ['sharp', 'flat'],
            7: ['sharp', 'flat'],
            9: ['sharp', 'flat'],
            11: ['sharp', 'flat']
        },
        shifts: {
            2: [0, -5],
            4: [0, -5],
            7: [0, -5],
            9: [0, -5],
            11: [0, -5]
        }
    },
    d: {
        marks: {
            1: 'natural',
            4: ['sharp', 'flat'],
            6: 'natural',
            9: ['sharp', 'flat'],
            11: ['sharp', 'flat']
        },
        shifts: {
            4: [0, -5],
            9: [0, -5],
            11: [0, -5]
        }
    },
    e: {
        marks: {
            1: 'natural',
            3: 'natural',
            6: 'natural',
            8: 'natural',
            11: ['sharp', 'flat']
        },
        shifts: {
            11: [0, -5]
        }
    },
    f: {
        marks: {
            2: ['sharp', 'flat'],
            4: ['sharp', 'flat'],
            7: ['sharp', 'flat'],
            9: ['sharp', 'flat'],
            12: 'natural'
        },
        shifts: {
            2: [0, -5],
            4: [0, -5],
            7: [0, -5],
            9: [0, -5],
            11: -5
        }
    },
    g: {
        marks: {
            2: ['sharp', 'flat'],
            4: ['sharp', 'flat'],
            6: 'natural',
            9: ['sharp', 'flat'],
            11: ['sharp', 'flat'],
        },
        shifts: {
            2: [0, -5],
            4: [0, -5],
            9: [0, -5],
            11: [0, -5]
        }
    },
    a: {
        marks: {
            1: 'natural',
            4: ['sharp', 'flat'],
            6: 'natural',
            8: 'natural',
            11: ['sharp', 'flat']
        },
        shifts: {
            4: [0, -5],
            11: [0, -5]
        }
    },
    b: {
        marks: {
            1: 'natural',
            3: 'natural',
            6: 'natural',
            8: 'natural',
            11: ['sharp', 'flat']
        },
        shifts: {
            11: [0, -5]
        }
    },
    db: {
        marks: {
            3: 'natural',
            5: 'natural',
            8: 'natural',
            10: 'natural',
            12: 'natural',
        },
        shifts: {
            2: -5,
            4: -5,
            7: -5,
            9: -5,
            11: -5
        }
    },
    eb: {
        marks: {
            2: ['sharp', 'flat'],
            5: 'natural',
            7: ['sharp', 'flat'],
            10: 'natural',
            12: 'natural',
        },
        shifts: {
            2: [0, -5],
            4: -5,
            7: [0, -5],
            9: -5,
            11: -5
        }
    },
    gb: {
        marks: {
            1: 'natural',
            3: 'natural',
            5: 'natural',
            8: 'natural',
            10: 'natural'
        },
        shifts: {
            2: -5,
            4: -5,
            7: -5,
            9: -5,
            11: -5,
            12: -5
        }
    },
    ab: {
        marks: {
            3: 'natural',
            5: 'natural',
            7: ['sharp', 'flat'],
            10: 'natural',
            12: 'natural'
        },
        shifts: {
            2: -5,
            4: -5,
            7: [0, -5],
            9: -5,
            11: -5
        }
    },
    bb: {
        marks: {
            2: ['sharp', 'flat'],
            5: 'natural',
            7: ['sharp', 'flat'],
            9: ['sharp', 'flat'],
            12: 'natural',
        },
        shifts: {
            2: [0, -5],
            4: -5,
            7: [0, -5],
            9: [0, -5],
            11: -5
        }
    }
};

const synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.1,
        release: 0.1
    }
}).toMaster();

document.addEventListener('DOMContentLoaded', function() {

    let currentKey = 'c';
    let currentAcc = 0;
    let playSound = false;
    
    document.getElementById('key-toggle').addEventListener('change', function(event) {
        currentKey = event.target.value;
        document.getElementById('key-img').setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/' + event.target.value + '.png');
    });
    
    document.getElementById('acc-toggle').addEventListener('change', function(event) {
        currentAcc = Number.parseInt(event.target.value);
    });
    
    document.getElementById('sound-box').addEventListener('change', function(event) {
        playSound = event.target.checked;
    });
    
    if (navigator.requestMIDIAccess) {
        connectMIDI();
    } else {
        document.getElementById('midi-status').innerText = "This browser doesn't support MIDI input!\nTry a Chromium-based browser, such as Chrome or Opera.";
    }
    
    function connectMIDI() {
        navigator.requestMIDIAccess().then(function(midiAccess) {
            let inputs = Array.from(midiAccess.inputs.values());
            for (let input of inputs) {
                input.onmidimessage = onMIDIMessage;
            }
            if (inputs.length) {
                document.getElementById('midi-status').innerText = "Connected to MIDI input device.";
                document.getElementById('svg-container').style.opacity = "100%";
            } else {
                document.getElementById('midi-status').innerText = "No MIDI input devices found. ";
    
                let button = document.createElement('button');
    
                button.innerText = "Try again";
                button.addEventListener('click', connectMIDI);
                document.getElementById('midi-status').appendChild(button);
            }
        }, function() {
            document.getElementById('midi-status').innerText = "Could not gain MIDI access.";
        });
    }
    
    
    function onMIDIMessage(midiMessage) {
        let type = midiMessage.data[0];
        let note = midiMessage.data[1];
    
        if (notes[note]) {
            if (type === 144) {
                if (playSound) {
                    synth.triggerAttack(notes[note].name);
                }
    
                let ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                let semi = notes[note].semi;
                
                let shift = keys[currentKey].shifts[semi];
                if (shift) {
                    if (Array.isArray(shift)) {
                        ellipse.setAttribute('cy', String(notes[note].y + shift[currentAcc]));
                    } else {
                        ellipse.setAttribute('cy', String(notes[note].y + shift));
                    }
                } else {
                    ellipse.setAttribute('cy', String(notes[note].y));
                }
    
                ellipse.setAttribute('cx', '160');
                ellipse.setAttribute('rx', '7');
                ellipse.setAttribute('ry', '5');
    
                notes[note].els.push(ellipse);
    
                let mark = keys[currentKey].marks[semi];
    
                if (mark) {
                    let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    
                    let imgName;
                    if (Array.isArray(mark)) {
                        imgName = mark[currentAcc];
                    } else {
                        imgName = mark;
                    }
    
                    image.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/' + imgName + '.png');
                    image.setAttribute('x', '136');
                    if (imgName === 'flat') {
                        image.setAttribute('y', String(notes[note].y - 23));
                    } else {
                        image.setAttribute('y', String(notes[note].y - 13));
                    }
                    image.setAttribute('width', '20');
                    image.setAttribute('height', '25');
    
                    notes[note].els.push(image);
    
                    document.getElementById('staff-svg').appendChild(image);
                }
    
                for (let y of notes[note].lines) {
                    // <line x1="0" y1="50" x2="400" y2="50" style="stroke:#000;stroke-width:2" />
                    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
                    line.setAttribute('x1', '145');
                    line.setAttribute('x2', '175');
                    line.setAttribute('y1', String(y));
                    line.setAttribute('y2', String(y));
                    line.setAttribute('style', 'stroke:#000;stroke-width:2');
    
                    document.getElementById('staff-svg').appendChild(line);
                    notes[note].els.push(line);
                }
    
                document.getElementById('staff-svg').appendChild(ellipse);
            } else if (type === 128) {
                synth.triggerRelease(notes[note].name);
                for (let el of notes[note].els) {
                    el.remove();
                }
            }
        }
    }
});


midi = new Array();
sound = new Array();
notes = {};
midi.noteNames = new Array("C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B");

midi.load = function() {

 midi.updateDevices = function(event) {
  //       console.log(event.port);
	 console.log(event);
	 midi.event = event;
         if(event.type == 'statechange')
           {
            if(midi.event.port.connection == 'closed')
                 footer.innerHTML = "";             

            if(midi.event.port.connection == 'open')
              {
       	      footer.innerHTML = event.port.manufacturer + "<br>" + event.port.name;
              };
           }

     //    console.log(`${event.port.name}`);
     }

 midi.messageHandler = function(message) { 

      cmd = message.data[0];
      note = message.data[1];
      velocity = message.data[2];

      switch(cmd) { 
	case 128: midi.noteOff(note); break;
        case 144: midi.noteOn(note,velocity); break;
        case 176: sustainButton(message.data); break;
        case 192: programButton(message.data); break;
        case 224: moveJoystick(message.data[2]); break; 
        default: console.log(message.data);  
        }

 }
 // Octave no send
 // Transpose no send
 // Sustain
 // Program

 function sustainButton(data) {
 console.log("sustain" , data);

 // turn on 64,127
 // turn off 64,0
 }

 function programButton(data) {
 console.log("program", data);
 }

 function midiToFreq(number) {
 const a = 440;
 return (a / 32) * (2 ** ((number -9) / 12));
}

midi.getNoteName = function getNoteName(number) { 
return Math.floor(number/12) + midi.noteNames[number % 12];

}

midi.noteOn = function noteOn(note,velocity) {

    const osc = ctx.createOscillator();
    oscillators[note.toString()] = osc;
    notes[note.toString()] = velocity;
    middle.innerHTML = midi.getNoteName(note);
    
    const oscGain = ctx.createGain();
    oscGains[note.toString()] = oscGain;
    oscGain.gain.value = 0.33;

    const velocityGain = ctx.createGain();
    velocityGain.gain.value = ( 1 / 127 ) * velocity; 
 
    osc.type = 'sine';  
    osc.frequency.value = midiToFreq(note);

    osc.connect(oscGain);
    oscGain.connect(velocityGain);
    velocityGain.connect(ctx.destination);
    osc.start();
 }

midi.noteOff = function noteOff(note) {

  noteStr = note.toString();
  middle.innerHTML = "<br>";

  const osc = oscillators[noteStr];
  const oscGain = oscGains[noteStr];
  // console.log(oscGain);
  ogv = oscGain.gain.value;


/* 
 * Linear gain reduced to deal with 'pop' noise */

for(x = 0; x < midi.decayReps; x = x + midi.decayTime)
   setTimeout(() => {
     oscGain.gain.setValueAtTime(oscGain.gain.value * midi.decay, ctx.currentTime);
   }, x)

/*
setTimeout(() => {

oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
console.log(oscGain);

}, 600)
*/

setTimeout(() => {
   osc.stop();
   osc.disconnect();
   oscGain.disconnect();
}, 500)

delete oscillators[noteStr];
delete oscGains[noteStr];
delete notes[noteStr];

}

function moveJoystick(position) {
 console.log(position);
 }

midi.stopAll = function stopAll() {
  ctx.close();
  }


/*     function failure() {
         console.log("Could not connect MIDI");
     }
*/
   navigator.requestMIDIAccess().then( x =>
      { 
      midi.access = x; 
      midi.access.addEventListener('statechange', midi.updateDevices);
      midi.inputMap = midi.access.inputs;
      midi.input = midi.inputMap.values().next().value;
      midi.input.onmidimessage = midi.messageHandler;
      })
 
 ///  Add oscillator (default sine 440)
const ctx = new AudioContext();
oscillators = {};
oscGains = {};

midi.decay = .9;
midi.decayTime = 5;
midi.decayReps = 200;

}

midi.drawMidi = function drawMidi( t ) {

console.log("drawMidi");

let b = document.createElement("button");

 b.setAttribute("name","scanner");
 b.setAttribute("onclick","midi.load()");
 b.innerHTML = "<h1>Midi</h1>";

 eval(t).appendChild(b);
}


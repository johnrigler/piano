midi = new Array();
midi.load = function() {

    midi.updateDevices = function(event) {
         console.log(event.port);
         console.log(`${event.port.name}`);
     }

    midi.messageHandler = function(message) { 

      cmd = message.data[0];
      note = message.data[1];
      velocity = message.data[2];
  //    console.log(cmd + " " + note + " " + velocity);
      switch(cmd) { 
	case 128: stopNote(note); break;
        case 144: midi.playNote(note,velocity); break;
        case 176: sustainButton(message.data); break;
        case 192: programButton(message.data); break;
        case 224: moveJoystick(message.data[2]); break; 
        default: console.log(message.data);  
        }

 //     console.log(action);

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

 midi.playNote = function playNote(note,velocity) {
   midi.osc.frequency.value = note * 20; 
   midi.osc.frequency.value = midiToFreq(note);
   console.log(note);
   midi.osc.connect(midi.ctx.destination);
 }

 function stopNote(note) {
 midi.osc.disconnect(midi.ctx.destination);
 }

 function moveJoystick(position) {
 console.log(position);
 }

   navigator.requestMIDIAccess().then( x =>
      { 
      midi.access = x; 
      // Code to display connect status in footer
      midi.access.addEventListener('statechange', midi.updateDevices);
      // Connect Keyboard
      midi.inputMap = midi.access.inputs;
      midi.input = midi.inputMap.values().next().value;
      midi.input.onmidimessage = midi.messageHandler;
      })
 
 ///  Add oscillator (default sine 440)
   midi.ctx = new AudioContext();
   midi.osc = midi.ctx.createOscillator();
   midi.osc.start();
//   midi.osc.connect(midi.ctx.destination);

}

midi.drawMidi = function drawMidi( t ) {

console.log("drawMidi");

let b = document.createElement("button"); 

 b.setAttribute("name","scanner"); 
 b.setAttribute("onclick","midi.load()");
 b.innerHTML = "<h1>Midi</h1>"; 

 eval(t).appendChild(b); 
}


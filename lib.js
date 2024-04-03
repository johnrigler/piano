f = new Array();
f.abi = new Array();
polygon = new Array();
polygon.jethro = new Array();

// metis = new Array();
// metis.jethro = new Array();

f.abi.jethro = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"cashout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"map","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"artifact","type":"string"},{"internalType":"string","name":"body","type":"string"}],"name":"mapArtifact","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"message1","type":"string"},{"internalType":"string","name":"message2","type":"string"},{"internalType":"address[]","name":"index","type":"address[]"}],"name":"tell","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

polygon.jethro.address = "0x0076416C84c7151CaEfA74C3e09d6eBF2f296BA0";
polygon.provider = ethers.getDefaultProvider(137);
polygon.jethro.contract = new ethers.Contract(polygon.jethro.address,f.abi.jethro,polygon.provider);

f.utils = new Array();


// This uses a number of objects. magicHydrator is hard-coded to "f", even though it
// is stored in Jethro. If I update it, then I will likely move it from "f". 

// Load magicHydrator (will need to eval later)
//

var stage = "a";

function stageA() {
if(typeof(f.note) == 'object') 
  {
  f.noteAPI="https://rigler.org/note/";
//  console.log(f.note);
  return "b";
  }  
  else return "a";
}


function stageB() {

// console.log(f.note)

if(typeof(f.note.read) == "function")
          {
     //     console.log(f.noteAPI);
          f.note.read("GUI.magic").then( x => f.GUI = (f.utils.magicHydrator("GUI",x) ));
          return "c";
          }

if(typeof(GUI) == "object") return "c";

return "b";

}

function stageC() {
if(typeof(f.GUI) === "string") return "d"; 

return "c";
}

function stageE() {

midi.drawMidi("header");

return "f";

}

async function myLoop() {

for(x = 0; x < 100; x++)
   {
   await f.utils.sleep(500);
   if(typeof(middle) == "object")
        {
        if(typeof(polygon.jethro.contract.map) == 'function')
	  if(typeof(f.utils.magicHydrator) == 'function')
            {
            if(typeof(f.note) == 'object')
                 { 
		    if(stage === "a") stage = stageA(); 
		    if(stage === "b") stage = stageB();
                    if(stage === "c") { stage = stageC(); };
		    if(stage === "d") 
                          { 
		          eval(f.GUI); 
                           stage = "e";
	                  }
                    if(stage === "e")
                        {
                        stage = stageE();
		        x = 100;
		        middle.innerHTML = "";
	                break;
	                }
                  }
	     else
		polygon.jethro.contract.map("f.note").then( x => eval(x) )

	    middle.innerHTML += ".";
	    if(x % 10 == 0)middle.innerHTML += "<br>";
	    continue;
            }
            else
            {
            polygon.jethro.contract.map("magicHydrator").then( x =>
               { 
               eval(x)
               f.utils.magicHydrator = magicHydrator;
               f.note.read("GUI.magic").then( x => { magicHydrator("GUI",x); });
               })

	    middle.innerHTML += "."; 
            }
        }
   }
}

f.utils.sleep = function sleep(time) { 
return new Promise((resolve) => setTimeout(resolve, time)); 
 } 

myLoop();


//-------------------PARAMETRIC EQ CONSISTING OF 6 FILTERS RUNNING IN SERIES-----------------------------------

// grab the web audio API webkit
window.AudioContext = window.AudioContext || window.webkitAudioContext;

//create the audio context
var context = new AudioContext();

//creates a user gesture when the overlay <div> is clicked, allows for the AudioContext to start in chrome
//this was sourced from Boris Smus' filter example found here: https://webaudioapi.com/samples/filter/
if (context.state === 'suspended') {
  const overlay = document.getElementById('overlay');
  overlay.className = 'visible';
  document.addEventListener('click', () => {
    context.resume().then(() => {
      overlay.className = 'hidden';
    });
  }, {once: true});
}

//selects the trap song
function myTrapSelect() {
document.getElementById("sample1").src="Laced.mp3";
document.getElementById("player").load();
}



//connect our <audio> element in the HTML to this audiocontext
var source = context.createMediaElementSource(document.getElementsByTagName('audio')[0]);

//create the filters
var filter1 = context.createBiquadFilter();
var filter2 = context.createBiquadFilter();
var filter3 = context.createBiquadFilter();
var filter4 = context.createBiquadFilter();
var filter5 = context.createBiquadFilter();
var filter6 = context.createBiquadFilter();

//connect the source to the first filter
source.connect(filter1);

//connect filter1 to filter2 etc. to the destination
filter1.connect(filter2);
filter2.connect(filter3);
filter3.connect(filter4);
filter4.connect(filter5);
filter5.connect(filter6);
filter6.connect(context.destination);
//note: the filters are not connected in parallel as phase issues can arise

//define the filters  parameters, useful info in the notes below on how each filter works
// first filter is the low pass filter, frequencies below the cutoff pass through; frequencies above it are attenuated.  Q is peak, gain not used
filter1.type = "lowpass";
filter1.frequency.value = 20000;
filter1.Q.value = 0.0;

// second is the lowshelf, frequencies lower than the frequency get a boost, or an attenuation; frequencies over it are unchanged, Q value not used. negative gain value = attenuation
filter2.type = "lowshelf";
filter2.frequency.value = 20;
filter2.gain.value = 0;

// third we have a peaking filter, frequencies inside the range get a boost or an attenuation; frequencies outside it are unchanged. Q changes the width of the frequency band. IMPORTANT: the greater the Q value the smaller the frequency band. negative gain value = attenuation
filter3.type = "peaking";
filter3.frequency.value = 1000;
filter3.Q.value = 0;
filter3.gain.value = 0;

// fourth another peaking filter
filter4.type = "peaking";
filter4.frequency.value = 0;
filter4.Q.value = 0;
filter4.gain.value = 0;

// fifth is the highshelf, frequencies higher than the frequency get a boost or an attenuation; frequencies lower than it are unchanged. Q value not used. negative gain value = attenuation
filter5.type = "highshelf";
filter5.frequency.value = 20000;
filter5.gain.value = 0;

// sixth is a highpass filter, frequencies below the cutoff are attenuated; frequencies above it pass through.   Q is peak, gain not used
filter6.type = "highpass";
filter6.frequency.value = 20;
filter6.Q.value = 0;


//allow the sliders to change the filter parameters
//this was sourced from Greg Hovanesyan's parametric EQ found here: https://codepen.io/gregh/pen/jyXMYY
var ranges = document.querySelectorAll('input[type=range]');
ranges.forEach(function(range){
  range.addEventListener('input', function() {
    window[this.dataset.filter][this.dataset.param].value = this.value;
  });
});

//create the preset functions
//each function changes the default parameters of the 6 filters. the slider values are changed here too
function myWarmPreset() {
	document.getElementById("filter1FrequencySlider").value = 15000;
	filter1.frequency.value = 15000;
	document.getElementById("filter1QSlider").value = 0.71;
	filter1.Q.value = 0.71;
	
    document.getElementById("filter2FrequencySlider").value = 200;
	filter2.frequency.value = 200;
	document.getElementById("filter2GainSlider").value = 6;
	filter2.gain.value = 6;
    
    document.getElementById("filter3FrequencySlider").value = 1000;
	filter3.frequency.value = 1000;
	document.getElementById("filter3GainSlider").value = 0;
	filter3.gain.value = 0;
    document.getElementById("filter3QSlider").value = 0;
	filter3.Q.value = 0;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 2000;
	filter5.frequency.value = 2000;
	document.getElementById("filter5GainSlider").value = -10;
	filter5.gain.value = -10;
    
    document.getElementById("filter6FrequencySlider").value = 20;
	filter6.frequency.value = 20;
	document.getElementById("filter6QSlider").value = 0;
	filter6.Q.value = 0;
}



function myBrightPreset() {
	document.getElementById("filter1FrequencySlider").value = 20000;
	filter1.frequency.value = 20000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0;
	
    document.getElementById("filter2FrequencySlider").value = 200;
	filter2.frequency.value = 200;
	document.getElementById("filter2GainSlider").value = -10;
	filter2.gain.value = -10;
    
    document.getElementById("filter3FrequencySlider").value = 1000;
	filter3.frequency.value = 1000;
	document.getElementById("filter3GainSlider").value = 0;
	filter3.gain.value = 0;
    document.getElementById("filter3QSlider").value = 0;
	filter3.Q.value = 0;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 2000;
	filter5.frequency.value = 2000;
	document.getElementById("filter5GainSlider").value = 10;
	filter5.gain.value = 10;
    
    document.getElementById("filter6FrequencySlider").value = 100;
	filter6.frequency.value = 100;
	document.getElementById("filter6QSlider").value = 0.71;
	filter6.Q.value = 0.71;
}


    

function myTelephonePreset() {
	document.getElementById("filter1FrequencySlider").value = 3000;
	filter1.frequency.value = 3000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0.71;
	
    document.getElementById("filter2FrequencySlider").value = 20;
	filter2.frequency.value = 20;
	document.getElementById("filter2GainSlider").value = 0;
	filter2.gain.value = 0;
    
    document.getElementById("filter3FrequencySlider").value = 1500;
	filter3.frequency.value = 1500;
	document.getElementById("filter3GainSlider").value = 3.5;
	filter3.gain.value = 3.5;
    document.getElementById("filter3QSlider").value = 0.6;
	filter3.Q.value = 0.6;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 20000;
	filter5.frequency.value = 20000;
	document.getElementById("filter5GainSlider").value = 0;
	filter5.gain.value = 0;
    
    document.getElementById("filter6FrequencySlider").value = 300;
	filter6.frequency.value = 300;
	document.getElementById("filter6QSlider").value = 0.71;
	filter6.Q.value = 0.71;
    
}

function myHiFiScoopPreset() {
	document.getElementById("filter1FrequencySlider").value = 20000;
	filter1.frequency.value = 20000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0;
	
    document.getElementById("filter2FrequencySlider").value = 100;
	filter2.frequency.value = 100;
	document.getElementById("filter2GainSlider").value = 3;
	filter2.gain.value = 3;
    
    document.getElementById("filter3FrequencySlider").value = 350;
	filter3.frequency.value = 350;
	document.getElementById("filter3GainSlider").value = -2.5;
	filter3.gain.value = -2.5;
    document.getElementById("filter3QSlider").value = 0.2;
	filter3.Q.value = 0.2;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 5000;
	filter5.frequency.value = 5000;
	document.getElementById("filter5GainSlider").value = 2.5;
	filter5.gain.value = 2.5;
    
    document.getElementById("filter6FrequencySlider").value = 20;
	filter6.frequency.value = 20;
	document.getElementById("filter6QSlider").value = 0;
	filter6.Q.value = 0;
    
}
function myPresencePreset() {
	document.getElementById("filter1FrequencySlider").value = 20000;
	filter1.frequency.value = 20000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0;
	
    document.getElementById("filter2FrequencySlider").value = 20;
	filter2.frequency.value = 20;
	document.getElementById("filter2GainSlider").value = 0;
	filter2.gain.value = 0;
    
    document.getElementById("filter3FrequencySlider").value = 4000;
	filter3.frequency.value = 4000;
	document.getElementById("filter3GainSlider").value = 3;
	filter3.gain.value = 3;
    document.getElementById("filter3QSlider").value = 0.4;
	filter3.Q.value = 0.4;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 8000;
	filter5.frequency.value = 8000;
	document.getElementById("filter5GainSlider").value = 2;
	filter5.gain.value = 2;
    
    document.getElementById("filter6FrequencySlider").value = 20;
	filter6.frequency.value = 20;
	document.getElementById("filter6QSlider").value = 0;
	filter6.Q.value = 0;
    
}
function myReduceSharpnessPreset() {
	document.getElementById("filter1FrequencySlider").value = 20000;
	filter1.frequency.value = 20000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0;
	
    document.getElementById("filter2FrequencySlider").value = 20;
	filter2.frequency.value = 20;
	document.getElementById("filter2GainSlider").value = 0;
	filter2.gain.value = 0;
    
    document.getElementById("filter3FrequencySlider").value = 8500;
	filter3.frequency.value = 8500;
	document.getElementById("filter3GainSlider").value = -7;
	filter3.gain.value = -7;
    document.getElementById("filter3QSlider").value = 2.8;
	filter3.Q.value = 2.8;
	
    document.getElementById("filter4GainSlider").value = -4;
	filter4.gain.value = -4;
    document.getElementById("filter4FrequencySlider").value = 11000;
	filter4.frequency.value = 11000;
	document.getElementById("filter4QSlider").value = 2.1;
	filter4.Q.value = 2.1;
    
    document.getElementById("filter5FrequencySlider").value = 12000;
	filter5.frequency.value = 12000;
	document.getElementById("filter5GainSlider").value = -3;
	filter5.gain.value = -3;
    
    document.getElementById("filter6FrequencySlider").value = 20;
	filter6.frequency.value = 20;
	document.getElementById("filter6QSlider").value = 0;
	filter6.Q.value = 0;
    
}


function myDefaultPreset() {
	document.getElementById("filter1FrequencySlider").value = 20000;
	filter1.frequency.value = 20000;
	document.getElementById("filter1QSlider").value = 0;
	filter1.Q.value = 0;
	
    document.getElementById("filter2FrequencySlider").value = 20;
	filter2.frequency.value = 20;
	document.getElementById("filter2GainSlider").value = 0;
	filter2.gain.value = 0;
    
    document.getElementById("filter3FrequencySlider").value = 1000;
	filter3.frequency.value = 1000;
	document.getElementById("filter3GainSlider").value = 0;
	filter3.gain.value = 0;
    document.getElementById("filter3QSlider").value = 0;
	filter3.Q.value = 0;
	
    document.getElementById("filter4GainSlider").value = 0;
	filter4.gain.value = 0;
    document.getElementById("filter4FrequencySlider").value = 5000;
	filter4.frequency.value = 5000;
	document.getElementById("filter4QSlider").value = 0;
	filter4.Q.value = 0;
    
    document.getElementById("filter5FrequencySlider").value = 20000;
	filter5.frequency.value = 20000;
	document.getElementById("filter5GainSlider").value = 0;
	filter5.gain.value = 0;
    
    document.getElementById("filter6FrequencySlider").value = 20;
	filter6.frequency.value = 20;
	document.getElementById("filter6QSlider").value = 0;
	filter6.Q.value = 0;
    
}
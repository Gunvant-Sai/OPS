function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded()
{
  console.log("Model Loaded!");
}

function draw()
{
  image(video,0,0,300,300);
  classifier.classify(video,gotready);
}

var previous_result="";

function gotready(error,result)
{
  if (error)
  {
    console.log("Error");
  }

  else 
  {
    if ((result[0].confidence > 0.5) && (previous_result != result[0].label)){
    console.log(result);
    previous_result=result[0].label;
    var synth = window.speechSynthesis;
    var speak_data = "Object Recognized -"+result[0].label;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

    document.getElementById("THISISALSOID").innerHTML = result[0].label;
    document.getElementById("THISISID").innerHTML = result[0].confidence.Tofix(4);
    }
  
  }
  
}





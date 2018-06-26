var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const skillData = [
	  {
		door:"LOCK",
	    category:"alldoors",
	    recomendation:"Sure, locking your Mercedes-Benz."
	  },
	  {
	    door:"LOCK",
	    category:"frontleftdoor",
	    recomendation:"Sure, locking your Mercedes-Benz front left door."
	  },
	  {
		door:"LOCK",
		category:"frontrightdoor",
		recomendation:"Sure, locking your Mercedes-Benz front right door."
	  },
	  {
		door:"LOCK",
		category:"rearleftdoor",
		recomendation:"Sure, locking your Mercedes-Benz rear left door."
	  },
	  {
		door:"LOCK",
		category:"rearrightdoor",
		recomendation:"Sure, locking your Mercedes-Benz rear right door."
	  },
	  {
		door:"LOCK",
		category:"trunkdoor",
		recomendation:"Sure, locking your Mercedes-Benz trunk door."
	  }
	]

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'welcome to Mercedes-Benz. what doors would you like to lock ?', 'Which door would you like a lock?');

  },
  'MakeRecommendation': function () {
    // set constants
    const undefinedPrompt = "Sorry, I dont have recommendation for that. Try again by saying the name of a door.";
    const undefinedRePrompt = "Can you say a door name?";

    // get the value of the category slot
    var categorySlot = this.event.request.intent.slots.category.value;

    // make sure we have a recommendation
    if (getRecommendation(skillData, 'category', categorySlot) === undefined)
    {
      this.emit(':ask', undefinedPrompt, undefinedRePrompt);
    }

    // return the recommendation
    this.emit(':tell', getRecommendation(skillData, 'category', categorySlot).recomendation);
  },
  'LocalSuggestion': function () {
    // set constants
    const undefinedPrompt = "Sorry, I dont have recommendation for that. I can recommend a: alldoors, a: frontleftdoor, or a: frontrightdoor, or a:rearleftdoor, or a:rearrightdoor, or a: trunkdoor. Which door would you prefer to lock?";
    const undefinedRePrompt = "Can I recommend a: alldoors,a: frontleftdoor, or a: frontrightdoor, or a:rearleftdoor, or a:rearrightdoor, or a: trunkdoor?";

    // get the value of the category slot
    var doorSlot = this.event.request.intent.slots.state.value;

    // make sure we have a recommendation
    if (getRecommendation(skillData, 'door', doorSlot.toUpperCase()) === undefined)
    {
      this.emit(':ask', undefinedPrompt, undefinedRePrompt);
    }

    // return the recommendation
    this.emit(':tell', getRecommendation(skillData, 'door', doorSlot.toUpperCase()).recomendation);
  },
  'Unhandled': function(){
    this.emit(':ask', undefinedPrompt, undefinedRePrompt);
  }
};

function getRecommendation(abt, propName, propValue) {
  for (var i=0; i < abt.length; i++) {
    if (abt[i][propName] == propValue) {
      return abt[i];
    }
  }
}

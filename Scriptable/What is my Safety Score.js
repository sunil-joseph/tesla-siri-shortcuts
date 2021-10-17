// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: car-crash;
// Created by Sunil Joseph
// @unplgd3
// github.com/sunil-joseph/tesla-siri-shortcuts

const vin = 'Enter your VIN here';
const refreshToken = importModule('Refresh Tesla Access Token').refreshToken;

// extending Number to handle rounding to a certain decimal place
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

// Calculate the miles needed to get to a target score
const milesNeeded = (score, weightedScore, totalMiles) => {
  // Though Tesla displays a whole number, it's actually a rounded figure  
  // So if you need a score of 99, you need to aim for 98.5
  const target = score - 0.5;
  return ((target * totalMiles - weightedScore) / (100 - target)).round(1)
}

// Message for score & miles
const scoreMilesMessage = (targetScore, weightedScore, totalMiles) => {
  milesToTarget = milesNeeded(targetScore, weightedScore, totalMiles);
 
  return `\n\nIf you drive with a perfect score for another ${milesToTarget} miles, you'll have a score of ${targetScore}!`;
  
}

let accessToken = Keychain.get('access_token');

// Endpoint requires a timezone, the Tesla app localizes the response based on your timezone
// We'll use your current timezone
const timezone = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone);

const url = `https://akamai-apigateway-vfx.tesla.com/safety-rating/daily-metrics?vin=${vin}&timezone=${timezone}&deviceLanguage=en&deviceCountry=US&appVersion=4.1.0-663&hasInsurance=false`;

// Make the call to Tesla
const req = new Request(url);
req.headers = {
  'Authorization': `Bearer ${accessToken}`
};
let resp = await req.loadJSON();

// if the access token is expired, we'll get a new one
if (req.response.statusCode !== 200) {
  console.log('Access Token expired, attempting to get a new one');
  accessToken = await refreshToken();
  
  req.headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  resp = await req.loadJSON();
}

// Grab the daily metrics
const dailyAggregation = resp.dailyAggregation.metrics;

let weightedScore = 0;
let totalMiles = 0;
let todaysStats = '';

// Loop through all the miles and scores
for (const day of dailyAggregation) {
  const today = new Date().toLocaleDateString('en-CA');

  const {safetyScore, milesDriven} = day;
  
  if (today === day.date) {
    if (milesDriven === 0) {
      todaysStats = `You have not driven today.`;
    }
    else {
	  todaysStats = `You have driven ${milesDriven} miles today with a score of ${safetyScore}.`;
	}
  }
  
  // Weighted score is the score * miles
  weightedScore += safetyScore * milesDriven;
  totalMiles += milesDriven;
}

// Calculate the aggregate score
const safetyScore = weightedScore/totalMiles;

let message = `Your safety score is ${safetyScore.round(0)} (${safetyScore.round(2)}).\n\n${todaysStats}`;

if (safetyScore >= 99.5) {
  // Rockstar status, score of 99.5 is treated as 100
  message += `\n\nLook at you!! You are at 100!!`;
}
else if (safetyScore >= 98.5) {
  // Right now, score of 99 is needed to get beta
  message += `\n\nYou sir, are on track to get FSD beta! Keep it up!!`;

  message += scoreMilesMessage(100, weightedScore, totalMiles);
}
else {
  // Anything else, well show the score needed to get to the next digit

  targetScore = Math.round(safetyScore) + 1;
  message += scoreMilesMessage(targetScore, weightedScore, totalMiles);
  
  message += scoreMilesMessage(100, weightedScore, totalMiles);
}

console.log(message);

return {
  message
}

Script.complete()

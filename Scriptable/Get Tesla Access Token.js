// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: blue;
// icon-glyph: shield-alt;
// Created by Sunil Joseph
// @unplgd3
// github.com/sunil-joseph/tesla-siri-shortcuts

// Use Google's Crypto JS library
const CryptoJS = importModule('CryptoJS')

const generateString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  let result = '';

  for (let i=0; i < length; i++) {
    const randomNumber = Math.random() * characters.length;

    const index = Math.floor(randomNumber);

    result += characters.charAt(index)
  }

  return result;
}

// Generate a Code Verifier so Tesla knows the subsequent calls are made by us
const codeVerifier = generateString(86);
const codeChallenger = btoa(CryptoJS.SHA256(codeVerifier).toString());

// state can be anything
const state = generateString(26);
  
const baseUrl = 'https://auth.tesla.com/oauth2/v3/authorize';
  
const params = `client_id=ownerapi&code_challenge=${codeChallenger}&code_challenge_method=S256&redirect_uri=https://auth.tesla.com/void/callback&response_type=code&scope=openid%20email%20offline_access&state=${state}`;
  
const url = `${baseUrl}?${params}`;

// Prompt user with instructions
let alert = new Alert();
alert.message = "Safari will open up where you'll be directed to Tesla's site. Go ahead and log in. After logging in, you'll be presented with an error page. Press and hold the url to copy it. We'll use this on the next script.";
alert.addAction('OK');
await alert.presentAlert();

// load url
await Safari.openInApp(url, false);

// prompt user to enter the final url
alert = new Alert();
alert.addAction("Enter");
alert.addCancelAction("Cancel");
alert.addTextField("url", "");
alert.title = "Enter the URL";
alert.message = "Paste the final url below.";
const results = await alert.presentAlert();

// if the user hits cancel at this point, we want to just exit completely
if (results == -1) {
  return;
}

const location = alert.textFieldValue(0);

let codeSplit = location.split('code=');
codeSplit = codeSplit[1].split('&');

const code = codeSplit[0];
  
// Next we'll send this code, along with our code verifier in the beginning back to Tesla
req = new Request('https://auth.tesla.com/oauth2/v3/token');
req.method = 'POST';
req.headers = {
  'Content-Type': 'application/json'
};
  
body = {
  'grant_type': 'authorization_code',
  'client_id': 'ownerapi',
  'code': code,
  'code_verifier': codeVerifier,
  'redirect_uri': 'https://auth.tesla.com/void/callback'
};
  
req.body = JSON.stringify(body);
const tokens = await req.loadJSON();
  
// If successfully, we'll have the access tokens from Tesla
Keychain.set('access_token', tokens.access_token);
Keychain.set('refresh_token', tokens.refresh_token);
  
console.log('Successfully saved the tokens to the Keychain!');
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: blue;
// icon-glyph: shield-alt;
// Created by Sunil Joseph
// @unplgd3
// github.com/sunil-joseph/tesla-siri-shortcuts

// Enter your email and password below
const email = Keychain.get('email');
const password = Keychain.get('password');

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

// We are going to download Tesla's login page
console.log('Get Tesla Login Page');

// Generate a Code Verifier so Tesla knows the subsequent calls are made by us
const codeVerifier = generateString(86);
const codeChallenger = btoa(CryptoJS.SHA256(codeVerifier).toString());

// state can be anything
const state = generateString(26);
  
const baseUrl = 'https://auth.tesla.com/oauth2/v3/authorize';
  
const params = `client_id=ownerapi&code_challenge=${codeChallenger}&code_challenge_method=S256&redirect_uri=https://auth.tesla.com/void/callback&response_type=code&scope=openid%20email%20offline_access&state=${state}`;
  
const url = `${baseUrl}?${params}&login_hint=${email}`;
  
let req = new Request(url);
req.method = 'GET';
req.headers = {
  'Cookie': ''
};
  
// get the entire web page 
let html = await req.loadString();
let resp = req.response;

// We capture the cookies so that Tesla knows all the calls are part of the same requests
const cookie = resp.headers['Set-Cookie'];

// On the Tesla Login page, there are a few parameters that we need
// We need to simulate us logging onto the webpage, so need all the form data that exist on this page
// Particularly we need the csrf & the transaction id
const csrfIndex = html.search(/name="_csrf".+value="([^"]+)"/);
const csrfStart = html.substring(csrfIndex).indexOf('value=\"') + csrfIndex + 7;
const csrfEnd = html.substring(csrfStart).indexOf('\"') + csrfStart;
const csrf = html.substring(csrfStart, csrfEnd);

const transactionIndex = html.search(/name="transaction_id".+value="([^"]+)"/);
const transactionStart = html.substring(transactionIndex).indexOf('value=\"') + transactionIndex + 7
const transactionEnd = html.substring(transactionStart).indexOf('\"') + transactionStart;
const transactionId = html.substring(transactionStart, transactionEnd);

// The Tesla login page actually has a captcha image when we try to download it
// We are goign to save this in our Files folder so that we can read it and enter
// the works on the next step
console.log('Download Captcha');

// We are going to use the same cookies to get the captcha for the page
req = new Request('https://auth.tesla.com/captcha');
req.method = 'GET';
req.headers = {
  'Cookie': cookie
};

// Request doesn't recognize SVG as image, but as a string
const img = await req.loadString();

// Save this to our Scriptable folder so we can view it
const fm = FileManager.iCloud();
fm.writeString(fm.documentsDirectory() + '/captcha.svg', img);

// Once we download the captcha, we'll prompt the user to enter the words from
// the captcha. If the user has MFA enabled, we'll ask the user for the passcode
// at this point as well to save time.
console.log('Prompt user for Captcha and MFA passcode');

const alert = new Alert();
alert.addAction("Enter");
alert.addCancelAction("Cancel");
alert.addTextField("Captcha", "");
alert.addTextField("MFA Passcode", "");
alert.title = "Enter captcha";
alert.message = "Go to the Scriptable folder in Files and enter your captcha below. If you have MFA enabled, go to your authenticator app and enter the passcode as well!";
const results = await alert.presentAlert();

let captcha = null;
let passcode = null;

// if the user hits cancel at this point, we want to just exit completely
if (results == -1) {
  return;
}

captcha = alert.textFieldValue(0);
passcode = alert.textFieldValue(1);

// Now that we have the captcha text and MFA passcode, let's send this to Tesla
console.log('Send credentials and captcha to Tesla')

// We'll use the csrf & transaction id from before so Tesla knows
// that it's part of the same transaction
let body = {
  '_csrf': csrf,
  '_phase': 'authenticate',
  '_process': '1',
  'transaction_id': transactionId,
  'cancel': '',
  'identity': email,
  'credential': password,
  'recaptcha': captcha
};

req = new Request(`${baseUrl}?${params}`);
req.method = 'POST';
req.headers = {
  'Content-Type': 'application/json',
  'Cookie': cookie
};
req.body = JSON.stringify(body);

// If you have MFA enabled, this will redirect. We want need this to ensure that it does not
req.onRedirect = {};

html = await req.loadString();
resp = req.response;

// So we captured the html to inspect it. If you have MFA enabled, there'll be url with /mfa/verify
const isMFA = html.includes('/mfa/verify');

// If MFA is enabled, you'll get a 200 status code, the page that display will be verifying your MFA
if (resp.statusCode === 200 && isMFA) {
  // Redirect for MFA (Only if MFA is enabled)
  console.log('Entering MFA Flow')

  // If you have MFA enabled, we'll now send the passcode to Tesla
  // We first need to get the factor id that was associated with our transaction id
  req = new Request(`${baseUrl}/mfa/factors?transaction_id=${transactionId}`);
  req.method = 'GET'
  req.headers = {'Cookie': cookie};
  resp = await req.loadJSON();

  const factorId = resp.data[0].id;

  console.log('Send Passcode to Tesla')
  
  // We'll send the transaction id, factor id & passcode to Tesla
  body = {'transaction_id': transactionId, 'factor_id': factorId, 'passcode': passcode}
  
  req = new Request(`${baseUrl}/mfa/verify`);
  req.headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie
  };
  req.body = JSON.stringify(body);
  req.method = 'POST';

  resp = await req.loadJSON();
  
  // Make sure there's no errors, otherwise exit out
  if ('error' in resp || !resp.data.approved || !resp.data.valid) {
    console.log('an error has occured!');
    console.log(resp);
    return;
  }

  // If successful, we'll go ahead and make the call back to Tesla with
  // our transaction id to get the authorization code
  console.log('Obtain an authorization code after MFA verification')

  data = {'transaction_id': transactionId}
  req = new Request(`${baseUrl}?${params}`)  
  req.headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie
  };
  req.body = JSON.stringify(data);
  req.method = 'POST';
  // We don't want to page to redirect here
  req.onRedirect = {};

  await req.load();
  resp = req.response;  
}

// Back to non-MFA flow, 302 is a redirect code, which means we successfully stopped it
if (resp.statusCode === 302) {
  console.log(`Exchange authorization code for bearer token`);
  
  // First we'll grabe the location of the redirect from the headers
  const location = resp.headers['Location'];
  
  // Then we'll parse out the location to get the authorization code
  let codeSplit = location.split('code=');
  codeSplit = codeSplit[1].split('&');

  const code = codeSplit[0];

  // Next we'll send this code, along with our code verifier in the beginning back to Tesla
  req = new Request('https://auth.tesla.com/oauth2/v3/token')
  req.method = 'POST'
  req.headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie
  };

  body = {
    'grant_type': 'authorization_code',
    'client_id': 'ownerapi',
    'code': code,
    'code_verifier': codeVerifier,
    'redirect_uri': 'https://auth.tesla.com/void/callback'
  }

  req.body = JSON.stringify(body);
  const tokens = await req.loadJSON();
  
  // If successfully, we'll have the access tokens from Tesla
  Keychain.set('access_token', tokens.access_token);
  Keychain.set('refresh_token', tokens.refresh_token);
  
  console.log('Successfully saved the tokens to the Keychain!');
}
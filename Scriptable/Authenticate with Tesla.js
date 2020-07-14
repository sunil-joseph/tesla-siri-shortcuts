// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const keychainManager = importModule("Keychain Manager");

const keys = ["email", "password", "client_id", "client_secret", "access_token", "refresh_token", "created_at"];

// Retreive the values for our keys and assign them to variables
const {
  "access_token": accessToken,
  "refresh_token": refreshToken,
  "client_id": clientId,
  "client_secret": clientSecret,
  "created_at": createdAt,
  email,
  password
} = keychainManager.read(keys);

if (!accessToken) {
  // access token doesn't exist
  const body = { email, password, clientId, clientSecret, grantType: "password" };
  requestToken(body);
}
else {
  // access token exists
  
  // create a date using the create at multiple by 1000 to convert to milliseconds
  let expires = new Date(createdAt * 1000);

  // set expiration date 40 days after it was created
  expires.setDate(expires.getDate() + 40);
  
  let currentDate = new Date();
  if (currentDate > expires) {
    // Current Date is after our expires date, access token is expired
    const body = { refreshToken, clientId, clientSecret, grantType: "refresh_token" };
    requestToken(body);
  }
  else {
    console.log("Access token is not expired.");
  }
}

// Request new access token
function requestToken(body) {
  const url = "https://owner-api.teslamotors.com/oauth/token";
  
  const request = new Request(url);
  request.method = "POST";
  
  const { grantType, clientId, clientSecret, email, password, refreshToken } = body;
  
  if (grantType === "password") {
    // requesting access token through password grant
    request.addParameterToMultipart("email", email);
    request.addParameterToMultipart("password", password);
  }
  else if (grantType === "refresh_token") {
    request.addParameterToMultipart("refresh_token", refreshToken);
  }
  
  request.addParameterToMultipart("grant_type", grantType);
  request.addParameterToMultipart("client_id", clientId);
  request.addParameterToMultipart("client_secret", clientSecret);
  
  // Send request to Tesla
  request.loadJSON().then(response => {
    // Request successful, response has our access token
    console.log(response);
    keychainManager.save(response);
  }).catch(err => {
    // Request failed, something bad happened
    console.error(err);
  });
}
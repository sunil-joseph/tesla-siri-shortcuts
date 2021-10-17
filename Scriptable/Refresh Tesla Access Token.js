// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: database;
async function refreshToken() {
  const refreshToken = Keychain.get('refresh_token');

  const req = new Request('https://auth.tesla.com/oauth2/v3/token');
  
  req.headers = {
    'Content-Type': 'application/json'
  };
  
  req.method = 'POST';

  const body = {
    'grant_type': 'refresh_token',
    'client_id': 'ownerapi',
    'refresh_token': refreshToken,
    'scope': 'openid email offline_access'
  };
  
  req.body = JSON.stringify(body);
  
  const resp = await req.loadJSON();

  console.log(req.response.statusCode);
  
  Keychain.set('access_token', resp.access_token);
  
  return resp.access_token;
}

module.exports = {
  refreshToken
}
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
// Created by Sunil Joseph
// @sunjo31 @tesla_unplugged
// github.com/sunil-joseph/tesla-siri-shortcuts

// Save JSON Object to Keychain
const saveToKeychain = (data) => {
  // Loop through all the key-value pairs
  for(const [key, value] of Object.entries(data)) {
    // Cast the value to a string
    const strVal = String(value);
    // Set the value to the key in Keychain
    Keychain.set(key, strVal);
  }
  
  // return the original data
  return data;
}

// Read list of keys and return their values from Keychain
const readFromKeychain = (keys) => {
  let data = {};

  // loop through all the keys
  for (const key of keys) {
    // default the value to null
    let value = null;
    
    // check if the key exist in Keychain
    if (Keychain.contains(key)) {
      // get the value if it exists
      value = Keychain.get(key);
    }
    // set the value to the key in the object
    data[key] = value;
  }
  
  // return the object
  return data;
}

// Check if this is being called by Siri
if (config.runsWithSiri) {
  // get thr mode and params from args
  const mode = args.plainTexts[0];
  const param = args.shortcutParameter;
  
  if (mode === "save") {
    return saveToKeychain(param);
  }
  else if (mode === "read") {
    return readFromKeychain(param);
  }

  // tell Siri we are done
  Script.complete();
}

// export for other Scriptable files
module.exports = {
  save: saveToKeychain,
  read: readFromKeychain
}

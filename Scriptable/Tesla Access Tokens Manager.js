// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Created by Sunil Joseph
// @unplgd3
// github.com/sunil-joseph/tesla-siri-shortcuts

const fm = FileManager.iCloud();
const dir = fm.libraryDirectory();

// This is used to save the tokens to the Library directory
const saveTokens = (data) => {
  fm.writeString(dir + '/tokens.json', JSON.stringify(data));
}

const readTokens = () => {
  const jsonString = fm.readString(dir + '/tokens.json');

  return JSON.parse(jsonString);
}

// Check if this is being called by Siri
if (config.runsWithSiri) {
  // get the mode and tokens from args
  const mode = args.plainTexts[0];
  const tokens = args.plainTexts[1];
  
  if (mode === "save") {
    saveTokens(tokens);
  }
  else if (mode === "read") {
    return readTokens();
  }

  // tell Siri we are done
  Script.complete();
}

// If we want Scriptable to use it, we export it out
module.exports = {
  saveTokens,
  readTokens
}



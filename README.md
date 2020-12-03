# Tesla Siri Shortcuts

This is a list of shortcuts I've created that I'm sharing with everyone. I may refactor these from time to time.

## YouTube Links

Creating Custom Siri Shortcuts for you Tesla - [Watch](https://youtu.be/I8koTRZGmIw)  
Using Siri to Initiate a Software Update on my Tesla - [Watch](https://youtu.be/PLJmQWN9qY8)  
Shortcuts | Saving Tesla data to your iOS device - Part 1 - [Watch](https://youtu.be/gLXSNbGiz0w)  
Shortcuts | Saving Tesla data to your iOS device - Part 2 - [Watch](https://youtu.be/3NFJYktEmvQ)  
Shortcuts | Saving Tesla data to your iOS device - Part 3 - [Watch](https://youtu.be/N3f0XRcMDlc)  
Automate Homelink with Siri & NFC tags - [Watch](https://youtu.be/M7ipJ98m9Uc)  

## Core Shortcuts
| Name & Source | iCloud | Showcuts | Description | Requires | Speakable |
| ------------- | :----: | :------: | ----------- | -------- | :-------: |
| Tesla files In shortcut folder | [Get](https://www.icloud.com/shortcuts/42d64145c01a457fb3f7cfe9fba44fcf) | [Get](https://showcuts.app/share/view/42d64145c01a457fb3f7cfe9fba44fcf) |Creates your credentials file and an empty access file 
| Save Tesla Credentials In Keychain | [Get](https://www.icloud.com/shortcuts/a037fa30b04f40918aed3300460e3634) | [Get](https://showcuts.app/share/view/a037fa30b04f40918aed3300460e3634) | Saves to credentials to KeyChase | Scriptable & Kechain Manager script | No |
| Authenticate with Tesla | [Get](https://www.icloud.com/shortcuts/97989d8d4c5a46ee8266226c2c7ce594) | [Get](https://showcuts.app/share/view/97989d8d4c5a46ee8266226c2c7ce594) | Authenticate with Tesla using your email & password | None | No |
| Get All Tesla Vehicles | [Get](https://www.icloud.com/shortcuts/62d4823087c0447a9978a695559ea7adhttps://www.icloud.com/shortcuts/62d4823087c0447a9978a695559ea7ad) | [Get](https://showcuts.app/share/view/1ebe29240bb740d99d353d7a202eb015) | Get all Tesla Vehicles and saves it to Files | Access token | No |
| Get Vehicle ID | [Get](https://www.icloud.com/shortcuts/4b2022789b494143965d6e5a5eda7caa) | [Get](https://showcuts.app/share/view/4b2022789b494143965d6e5a5eda7caa) | Gets your Vehicle ID based on the name | Access token & name of the vehicle. Passed in Share Sheet | No |
| Wake Up Tesla | [Get](https://www.icloud.com/shortcuts/55a8ff2b5c9944d58d3473c47e51300f) | [Get](https://showcuts.app/share/view/55a8ff2b5c9944d58d3473c47e51300f) | Attempts to wake up your Tesla | Access token & Vehicle ID. Passed in Share Sheet, values on new lines | No |
| Tesla Core | [Get](https://www.icloud.com/shortcuts/1bea300074e1409fa19753acdab440fb) | [Get](https://showcuts.app/share/view/1bea300074e1409fa19753acdab440fb) | Performs all the core functions before any command | Access token & Vehicle ID | No |


## Speakable Shortcuts
| Name & Source | iCloud | Showcuts | Description | Requires | Speakable |
| ------------- | :----: | :------: | ----------- | -------- | :-------: |
| Let's FrunkPuppy | [Get](https://www.icloud.com/shortcuts/5f5eaa60e86d43a98c29b1486a954286) | [Get](https://showcuts.app/share/view/5f5eaa60e86d43a98c29b1486a954286) | A FrunkPuppy themed version of opening your Frunk | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla, Open Frunk | Yes |
| Initiate Software Update | [Get](https://www.icloud.com/shortcuts/0d18e84ba8784ba3a3a660089782f8e0) | [Get](https://showcuts.app/share/view/0d18e84ba8784ba3a3a660089782f8e0) | Using Siri to start the software update | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla | Yes |
| Open Frunk | [Get](https://www.icloud.com/shortcuts/ef995f7b4a0d46e8b20bc713eca3e543) | [Get](https://showcuts.app/share/view/ef995f7b4a0d46e8b20bc713eca3e543) | Opens the frunk of your Tesla | Requires shortcuts: Tesla Core | Yes |
| Activate HomeLink | [Get](https://www.icloud.com/shortcuts/6cc4583cf3ba4ed3937022871b9758f4) | [Get](https://showcuts.app/share/view/6cc4583cf3ba4ed3937022871b9758f4) | Using Siri to activate HomeLink | Requires shortcuts: Tesla Core | Yes |

# Tesla Siri Shortcuts

This is a list of shortcuts I've created that I'm sharing with everyone. I may refactor these from time to time.

## YouTube Links

Creating Custom Siri Shortcuts for you Tesla - [Watch](https://youtu.be/I8koTRZGmIw)  
Using Siri to Initiate a Software Update on my Tesla - [Watch](https://youtu.be/PLJmQWN9qY8)  
Shortcuts | Saving Tesla data to your iOS device - Part 1 - [Watch](https://youtu.be/gLXSNbGiz0w)  
Shortcuts | Saving Tesla data to your iOS device - Part 2 - [Watch](https://youtu.be/3NFJYktEmvQ)  
Shortcuts | Saving Tesla data to your iOS device - Part 3 - [Watch](https://youtu.be/N3f0XRcMDlc)  

## Core Shortcuts
| Name & Source | iCloud | Description | Requires | Speakable |
| ------------- | :----: | ----------- | :-------------: | :-------: |
| Tesla files In shortcut folder | [Get](https://www.icloud.com/shortcuts/62309c5754a84516a04f0a93cd22174a) | Creates your credentials file and an empty access file 
| Save Tesla Credentials In Keychain | [Get](https://www.icloud.com/shortcuts/add3364aa33e4d07bac8ed87d7561ddf) | Saves to credentials to KeyChase | Scriptable & Kechain Manager script | No |
| Authenticate with Tesla | [Get](https://www.icloud.com/shortcuts/cbb40ad31e9646faa280c06fa8ce4d73) | Authenticate with Tesla using your email & password | None | No |
| Get Vehicle ID | [Get](https://www.icloud.com/shortcuts/1c8beaf82cd045188531824b52830fd2) | Gets your Vehicle ID based on the name | Access token & name of the vehicle. Passed in Share Sheet, values on new lines | No |
| Open Frunk | [Get](https://www.icloud.com/shortcuts/3af21c1fe8c44e99adc6fa2110e96f48) | Opens the frunk of your Tesla | Access token & Vehicle ID. Passed in Share Sheet, values on new lines | No |
| Wake Up Tesla | [Get](https://www.icloud.com/shortcuts/5b19450f575b4a12b9ab1699157d31e3) | Attempts to wake up your Tesla | Access token & Vehicle ID. Passed in Share Sheet, values on new lines | No |

https://www.icloud.com/shortcuts/e65126aeb998426a9fd1db947b4bf641

## Speakable Shortcuts
| Name & Source | iCloud | Description | Requires | Speakable |
| ------------- | :----: | ----------- | :-------------: | :-------: |
| Let's FrunkPuppy | [Get](https://www.icloud.com/shortcuts/5f5eaa60e86d43a98c29b1486a954286) | A FrunkPuppy themed version of opening your Frunk | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla, Open Frunk | Yes |
| Initiate Software Update | [Get](https://www.icloud.com/shortcuts/8754a99b8c61417da17f6613eeb537e8) | Using Siri to start the software update | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla | Yes |

# Tesla Siri Shortcuts

This is a list of shortcuts I've created that I'm sharing with everyone. I may refactor these from time to time.

## Core Shortcuts
| Name & Source | iCloud | Description | Requires | Speakable |
| ------------- | :----: | ----------- | :-------------: | :-------: |
| Authenticate with Tesla | [Get](https://www.icloud.com/shortcuts/62a6397ab810415b83fe484d902f0347) | Authenticate with Tesla using your email & password | Tesla account email & password; Tesla Client ID & Client Secret | No |
| Get Vehicle ID | [Get](https://www.icloud.com/shortcuts/1c8beaf82cd045188531824b52830fd2) | Gets your Vehicle ID based on the name | Access token & name of the vehicle. Passed in Share Sheet, values on new lines | No |
| Open Frunk | [Get](https://www.icloud.com/shortcuts/3af21c1fe8c44e99adc6fa2110e96f48) | Opens the frunk of your Tesla | Access token & Vehicle ID. Passed in Share Sheet, values on new lines | No |
| Wake Up Tesla | [Get](https://www.icloud.com/shortcuts/5b19450f575b4a12b9ab1699157d31e3) | Attempts to wake up your Tesla | Access token & Vehicle ID. Passed in Share Sheet, values on new lines | No |

## Speakable Shortcuts
| Name & Source | iCloud | Description | Requires | Speakable |
| ------------- | :----: | ----------- | :-------------: | :-------: |
| Let's FrunkPuppy | [Get](https://www.icloud.com/shortcuts/a9e22b3fea344b27a0779edc56489c30) | A FrunkPuppy themed version of opening your Frunk | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla, Open Frunk | Yes |
| Initiate Software Update | [Get](https://www.icloud.com/shortcuts/c8d89f5181bd47beae0088c367c1e862) | Using Siri to start the software update | Requires shortcuts: Authenticate with Tesla, Get Vehicle ID, Wake Up Tesla | Yes |

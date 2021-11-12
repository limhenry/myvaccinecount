# Malaysia Vaccine Progress Twitter Bot 🇲🇾 ([@MYVaccineCount](https://twitter.com/MYVaccineCount))


![img](https://limhenry.xyz/images/projects/vaccine-dark.png)


## Techs
 - 🚀  Node.js
 - 🚀  Firebase Cloud Functions, Firebase Realtime Database
 - 🚀  Twitter API (Send Tweet, Update Profile Image, Update Header Image)
 - 🚀  Canvas (Generate Vaccination Progress Profile Image)
 - 🚀  Chart.js (Generate Vaccination Rate Chart)
 - 🚀  Telegram Bot Platform (Send success/error message to Telegram)
 
## Build Setup
```
$ cd functions

# install dependencies
$ npm install

# serve cloud functions locally
$ npm run serve
```

- Setup Telegram Bot: https://core.telegram.org/bots
- Setup Twitter API: https://developer.twitter.com/en/docs
- Setup environment config: Use `firebase functions:config:set` to set the environment configuration. See [.runtimeconfig.sample.json](https://github.com/limhenry/MYVaccineCount/blob/master/.runtimeconfig.sample.json) for all the required environment configs.

## Data Source
 - [CITF GitHub](https://github.com/CITF-Malaysia/citf-public/)

## License
The project is published under the [MIT license](https://github.com/limhenry/MYVaccineCount/blob/master/LICENSE.md).
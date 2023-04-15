# Malaysia Vaccine Tracker Mastodon + Twitter Bot 🇲🇾


![img](https://limhenry.xyz/images/projects/vaccine-dark.png)

## Links

- Mastodon: [@MYVaccineCount@mastodon.social](https://mastodon.social/@MYVaccineCount)
- Twitter: [@MYVaccineCount](https://twitter.com/MYVaccineCount)


## Techs
 - 🚀  Node.js
 - 🚀  Firebase Cloud Functions, Firebase Realtime Database
 - 🚀  Mastodon + Twitter API (Send Tweet, Update Profile Image, Update Header Image)
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
- Setup Mastodon API: https://docs.joinmastodon.org/client/intro
- Setup environment config: Use `firebase functions:config:set` to set the environment configuration. See [.runtimeconfig.sample.json](https://github.com/limhenry/MYVaccineCount/blob/master/.runtimeconfig.sample.json) for all the required environment configs.

## Data Source
 - [Ministry of Health Malaysia GitHub](https://github.com/MoH-Malaysia/covid19-public/blob/main/vaccination/vax_malaysia.csv)

## License
The project is published under the [MIT license](https://github.com/limhenry/MYVaccineCount/blob/master/LICENSE.md).
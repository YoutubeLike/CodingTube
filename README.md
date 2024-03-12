
# Coditube

The goal of this project is to replicate 6 youtube's features in 3 weeks \
These features are : \
- Profil
- Timeline
- Channel
- Shorts
- Search bar
- Live

## Installation

Clone this repo on your computer

```bash
  git clone https://github.com/YoutubeLike/CodingTube.git
  cd CodingTube
```

Install the node requirement in each file

```bash
    cd client
    npm install
    cd ../server
    npm install
```

And run it in app folder
```bash
    docker compose up 
``` 
### ⚠️Warning the first launch can take a few minutes⚠️
If you encouter any issue with 5000 port and you are on a mac you need to change your mac settings

This issue is due to Apple protocol who use port 5000 and port 7000

Open your settings go to general -> Airdrop and Handoff -> uncheck Airplay receiver

## How to access
You can access to the homepage with 
```bash
  http://localhost:3000/
``` 

You can access to the bdd with a mysql client
```
  mysql -u admin -p coditube
```
The password is the same as username

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MariaDB

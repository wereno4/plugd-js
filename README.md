# Plugd.js

Your home plug.dj alternative built with JavaScript.

## What is it?

I made this because I want to get some low cost plug.dj alternative to use in my house or party places. I think it almost work just as plug.dj did. But there are some little differences.

Unlike plug.dj, Plugd.js is made for offline party to play the music with friends all together. You run server on your home computer, and through the wireless router, your friends can add some songs to the playlist by their mobile devices! The music will be played in one computer, and you can plug in monitor and speakers to the computer and enjoy it together.

Also, it is run in private so no one except whom you invite can join the server and do anything.

So, enjoy the party with your friends!

I didn't consider the online version before I pushed to GitHub repo, but I'll try it if you want.

## How can I use it?

### Installation

First of all, you need your computer with Node.js installed. (Size doesn't matter as long as you can run your server stably) And internet router is required so that your friends can connect to server and play the song with their own devices. Also, you have to get the key for YouTube Data API. It has free quota and you should pay the cost if you exceed the quota. But you don't have to worry unless you're doing it so much that you can't even imagine. [Click here](https://developers.google.com/youtube/v3/getting-started "YouTube Data API Overview") to learn how to get the API key. You don't have to get client ID, just API Key. And most of all, you should bring your friends to the party.

You have to use CLI console to follow this instruction, such as Command Prompt or Terminal or whatever.

1. Install [Node.js](https://nodejs.org "Node.js") and download Plugd.js from GitHub. Using Git is the best, but you don't have to if you don't have Git on your computer because you can download the ZIP file on this repository page.

```sh
git clone https://github.com/wereno4/plugd-js.git
```

2. Go to plugd.js folder, and install every required package using npm or yarn.

```sh
cd /Your/plugd/js/folder/address
npm install #If you want to use npm
yarn add #or if you want to use yarn
```

3. Copy _example.env_ file and rename it to _.env_ (env with dot in front). This file is essential since it has important data to run this app. Set _.env_ file as you need in the form of "name = value".

```sh
PORT = #If you don't write a value here, server will use port 3000. There is a posibillity that the port is already used, or closed by your computer system.
YOUTUBE_API_KEY = #Type YouTube API key that you got before. It is needed to load YouTube video information on queue page.
SESSION_KEY = #This is used to encrypt saved login data. you can type anything whatever you want. But be careful. This is used for encryption.
```

### Usage

1. Once you finish the installation, go to Plugd.js folder and start the server by one of commands below on console.

```sh
npm start #Using npm
yarn start #Using yarn
```

2. Your console will show you a message "Listening on 'Port'". For example, if you set the port to 3000 the message will be like "Listening on 3000".

3. Find your IP. If you use cloud services they will let you know your instance's IP address. If you run this server in your house or private place with small router and want participants connected through your router, find the computer's **private** IP address. Mostly it starts with _192.168_. You can join your Plugd.js server by address _http://'Your IP Address':'Port'_. For example, _http://192.168.0.45:3000_.

4. Go to _http://'Your IP Address':'Port'/init_. Type the name of the party and the number of participants, and hit the _Start_ button. The console will show you the keycodes. Give each keycode and the link _http://'Your IP Address':'Port'/login_ to the participants. Each participant can login to the server with their own keycode and set their username. If you run the server with the router, make sure that all of your participants are connected to the router.

5. If they logged in, participants can add video in their own queue on _http://'Your IP Address':'Port'/queue_ page. When if they added enough videos in queue, go to _http://'Your IP Address':'Port'/party_ on the main computer and press _Play_ button to play the videos in queue. And enjoy!

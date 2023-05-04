# Engagespot Netlify Microsoft Teams Bot

[![Netlify Status](https://api.netlify.com/api/v1/badges/ed50f56e-4fc2-4c98-8b66-1e5074c6f3d3/deploy-status)](https://app.netlify.com/sites/engagespot-netlify-msteams)

This is an Microsoft Teams Bot that can be deployed to a [Netlify](https://netlify.com/) Function. It contains commands for adding [Engagespot](www.google.com) recipient profiles for [Microsoft Teams channels and users](www.google.com). This was created as a quick way to get started sending Microsoft Teams notifications using Engagespot.

## Installation Options

First, sign up for a Engagespot Developer Account, it’s [free to sign up](https://app.Engagespot.com/register/) and includes 10,000 notifications per month. Next, create a Microsoft Teams application using App Studio inside your Team. Then, choose an option below.

This starter focuses on building profiles using commands. Each command requires a recipient id and will update that profile stored in Engagespot. You can extend this bot to better fit your use case.

### Option one: One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jobin-logidots/engagespot-msteams-started-kit)

Clicking this button will create a new repo for you that looks like this one, and sets that repo up immediately for deployment on Netlify. You will be prompted for a repo name and to provide the values for the following environment variables to use with Engagespot and the Microsoft Teams Bot.

- Engagespot Auth Token (`ENGAGESPOT_AUTH_TOKEN`), **required** - You can find this value in your [Engagespot API Keys Settings](www.google.com).
- MS Teams App ID (`MSTEAMS_APP_ID`), **required** - App ID generated in App Studio.
- MS Teams App Password (`MSTEAMS_APP_PASSWORD`), **required** - App Password generated from the Bot Capabilities section of App Studio.

### Option two: Manual clone

You will need to [install the Netlify CLI](https://docs.netlify.com/cli/get-started/) and connect it to your Netlify site to run locally. You will need to use [ngrok](https://ngrok.com/) to test it locally.

1. Clone this repo: `git clone https://github.com/jobin-logidots/engagespot-msteams-started-kit`
2. Connect to Netlify using `ntl init`
3. Add the above environment variables using `ntl env:set [env var] [value]`
4. Run the app locally using `ntl dev`
5. Make any changes and push to your repo to deploy.

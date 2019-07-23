# Thy Dungeonman in Alexa v2 TS

Experience the classic text adventure [Thy Dungeonman](http://homestarrunner.com/dungeonman.html) as it was meant to be played: on the Amazon Alexa!

## Run Locally

To run this app locally, fork this repo and follow these instructions:

* Install the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
    * Don't forget to log in
* Create an [Alexa developer account](https://developer.amazon.com)
* Create a (new custom skill)[https://developer.amazon.com/alexa/console/ask/create-new-skill] under your account
* Copy the new Skill ID and it in:
    * `.ask/config`
    * `manifests/local.skill.json`
* run `npm install`
* run `npm run build`
* run `npm start`

## Commands

### `npm start`

This command runs a Gulp task that will:

* Opens an Ngrok on port 3000
* Append your `local.skill.json` with your generated Ngrok url
* Push the updated manifest to your skill, connecting Alexa to your local endpoint
* Starts a local express server that will serve the contents of the `build` folder.

### `npm run build`

Convert TypeScript to Node-friendly JavaScript and save them to the `build` folder. If you make changes to the codebase, you must run this command before your local endpoint can use them.


### `npm run update-model`

Push model language changes to your dev Alexa skill. If you have changed any user utterances, you must run this command before your skill will begin using them.

### `npm run test-features`

Runs feature tests using [Testflow](https://developer.amazon.com/blogs/alexa/post/35eb8ae8-2cd8-4de7-86c5-97a1abc239b9/testflow-simulate-conversations-with-your-alexa-skill-code-to-ease-debugging). Claiming that these scripts are tests is a bit of a stretch, but you do get automated interactions with your Alexa bot so you can easily watch typical flows from a user's perspective, with friendly printouts in your console.

## Audio assets

Alexa has [several specifications](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) if you are to use custom audio.

This repo has a Gulp task for converting your audio to these specifications. You will need ffmpeg installed on your machine. If you have [homebrew](https://brew.sh/) available, you can run `brew install ffmpeg`.

Place your custom audio files in `assets/src` and then run `npm process-audio`. They will be converted and placed in the `dist` folder, ready to be placed on an S3 bucket of your choosing.


##### Legalese

I do not own the rights to Thy Dungeonman and am not affiliated with the Brothers Chaps or Homestar Runner in any way. If the owners come after me, I will cease and desist so fast you would not believe. This was just a spot of fun for learning purposes.

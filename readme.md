# Thy Dungeonman in Alexa v2 TS

Experience the classic text adventure [Thy Dungeonman](http://homestarrunner.com/dungeonman.html) as it was meant to be played: on the Amazon Alexa!

## Run Locally

To run this app locally, fork this repo and follow these instructions:

* Create an [Alexa developer account](https://developer.amazon.com)
* Create a [new custom skill](https://developer.amazon.com/alexa/console/ask/create-new-skill) under your account
* Copy the new Skill ID and add it to:
    * `.ask/config`
    * `manifests/local.skill.json`
    * `.env`
* Install and login to the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html)
* Install and login to the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
* `npm install` & `npm start`

Credentialed by the AWS CLI, the skill should auto-create a new DynamoDB table when being run for the first time. If credentials weren't set up properly, you may run into issues here.

## Commands

### `npm start`

This command runs a Gulp task that allows you to easily dev on your bot via your local machine. It will:

* Open an ngrok tunnel to port `3000`.
* Update the endpoint in your `local.skill.json` and push it to your Alexa dev skill.
* Run the `build` command.
* Start a local Express server that will feed requests to your built code.
* Rebuild and restart the server in response to changes in `./src` TypeScript files, ignoring `*.test.ts` files.

### `npm run build`

Convert your `./src` TypeScript files to Node-friendly JavaScript and save them to the `./build` folder.

### `npm run update-model`

Push model language changes to your Alexa dev skill. If you have changed or added any slots or intents, you must run this command before your skill can use them. Build time for a new model is usually around twenty seconds.

### `npm test`

Performs `npm run lint-check`, `npm run test-units` and `npm run test-features` in that order.

### `npm run lint-check`

Confirms that all files match Prettier style.

### `npm run test-units`

Runs all unit tests using [Jest](https://jestjs.io/).

### `npm run test-features`

Runs feature tests using [Testflow](https://developer.amazon.com/blogs/alexa/post/35eb8ae8-2cd8-4de7-86c5-97a1abc239b9/testflow-simulate-conversations-with-your-alexa-skill-code-to-ease-debugging). Claiming that these scripts are tests is a bit of a stretch, but you do get automated interactions with your Alexa bot so you can easily watch typical flows from a user's perspective, with friendly printouts in your console.

## Audio assets

Alexa has [several specifications](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html#audio) if you are to use custom audio.

This repo has a Gulp task for converting your audio to these specifications using [FFmpeg](https://ffmpeg.org/). If you have [homebrew](https://brew.sh/) available, you can run `brew install ffmpeg`.

Place your custom audio files in `assets/src` and then run `npm process-audio`. They will be converted and placed in the `dist` folder, ready to be uploaded to an S3 bucket.

## Legalese

I do not own the rights to Thy Dungeonman and am not affiliated with the Brothers Chaps or Homestar Runner in any way.

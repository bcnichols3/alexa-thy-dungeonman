// GULP FILE
const gulp = require("gulp");
const _ = require("lodash");
const util = require("util");
const Plugins = require("gulp-load-plugins");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const ask = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/.ask/config"), "utf8")
);
const Promise = require("bluebird");

const plugins = Plugins({
  DEBUG: false,
  camelize: true,
  pattern: ["*"],
  scope: ["devDependencies"],
  replaceString: /^gulp(-|\.)/,
  lazy: false,
  through2: require("through2"),
});

/////////////////
// RUN LOCALLY //
/////////////////

Promise.promisifyAll(plugins.ngrok);

gulp.task("start-ngrok", () => {
  return gulp
    .src("./manifests/local.skill.json")
    .pipe(
      plugins.through2.obj(function(file, enc, cb) {
        const skill = JSON.parse(file.contents.toString());
        plugins.ngrok
          .connectAsync({ proto: "http", addr: 3000 })
          .then(tunnel => {
            console.log("YOUR NGROK ENDPOINT", tunnel);
            return {
              uri: tunnel,
              sslCertificateType: "Wildcard",
            };
          })
          .then(endpoint => {
            skill.manifest.apis.custom.endpoint = endpoint;
            skill.manifest.events.endpoint.uri = endpoint.uri;
            file.contents = new Buffer(JSON.stringify(skill));
            this.push(file);
            cb();
          });
      })
    )
    .pipe(plugins.beautify({ indent_size: 2, wrap_line_length: 1 }))
    .pipe(gulp.dest("./manifests"));
});

gulp.task("update-skill-local", done => {
  const { skill_id } = ask.deploy_settings.default;
  const command = `ask api update-skill -s ${skill_id} -f manifests/local.skill.json -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("get-skill-status", done => {
  const { skill_id } = ask.deploy_settings.default;
  // const locale = 'en-US';
  const command = `ask api get-skill-status -s ${skill_id} -p personal`;

  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("start-skill", done => {
  const nodemon = plugins.nodemon({ script: "local/app.js" });

  nodemon
    .on("readable", function() {
      // free memory
      bunyan && bunyan.kill();

      bunyan = spawn("./node_modules/bunyan/bin/bunyan", [
        "--output",
        "short",
        "--color",
      ]);

      stdout.pipe(process.stdout);
      stderr.pipe(process.stderr);

      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    })
    .on("restart", function() {
      console.log("restarted!");
    })
    .on("crash", () => {
      nodemon.emit("restart", 10);
    })
    .on("quit", () => {
      done();
      process.exit();
    });
});

gulp.task("update-model-local", done => {
  const { skill_id } = ask.deploy_settings.default;
  const command = `ask api update-model -s ${skill_id} -f models/en-US.json -l en-US -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task(
  "start-local",
  gulp.series("start-ngrok", "update-skill-local", "start-skill")
);

/////////////
// STAGING //
/////////////

gulp.task("upload-lambda-staging", done => {
  const { functionName } = ask.deploy_settings.staging.resources.lambda[0];

  const command = `ask lambda upload -f ${functionName} -s ./lambda/custom/ -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("update-skill-staging", done => {
  const { skill_id } = ask.deploy_settings.staging;

  const command = `ask api update-skill -s ${skill_id} -f manifests/staging.skill.json`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("update-model-staging", done => {
  const { skill_id } = ask.deploy_settings.staging;

  const command = `ask api update-model -s ${skill_id} -f models/en-US.json -l en-US -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("get-skill-staging", done => {
  const { skill_id } = ask.deploy_settings.staging;

  const command = `ask api get-skill -s ${skill_id} > manifests/staging.skill.json -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task(
  "deploy-staging",
  gulp.series(
    "upload-lambda-staging",
    "update-skill-staging",
    "update-model-staging"
  )
);

////////////////
// PRODUCTION //
////////////////

gulp.task("upload-lambda-production", done => {
  const { functionName } = ask.deploy_settings.production.resources.lambda[0];

  const command = `ask lambda upload -f ${functionName} -s ./lambda/custom/ -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("update-skill-production", done => {
  const { skill_id } = ask.deploy_settings.production;

  const command = `ask api update-skill -s ${skill_id} -f manifests/production.skill.json -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("update-model-production", done => {
  const { skill_id } = ask.deploy_settings.production;

  const command = `ask api update-model -s ${skill_id} -f models/en-US.json -l en-US -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task("get-skill-production", done => {
  const { skill_id } = ask.deploy_settings.production;

  const command = `ask api get-skill -s ${skill_id} > manifests/production.skill.json -p personal`;
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    done(err);
  });
});

gulp.task(
  "deploy-production",
  gulp.series(
    "upload-lambda-production",
    "update-skill-production",
    "update-model-production"
  )
);

///////////
// AUDIO //
///////////

gulp.task("process-audio", done => {
  // transcode WAV files to mp3
  return gulp
    .src("./assets/audio/src/**/*.@(WAV|wav|ogg|mp3)")
    .pipe(plugins.changed("./assets/audio/dist"))
    .pipe(
      plugins.fluentFfmpeg("mp3", function(cmd) {
        return cmd
          .audioBitrate("48k")
          .audioFrequency(16000)
          .audioChannels(2)
          .audioCodec("libmp3lame");
      })
    )
    .pipe(gulp.dest("./assets/audio/dist"));
});

const s3 = plugins.s3Upload({ useIAM: true });

gulp.task("upload-audio", done => {
  return gulp.src("./assets/audio/dist/**/*.mp3").pipe(
    s3(
      {
        Bucket: "wait-wait",
        ACL: "public-read",
        keyTransform: function(filename) {
          return "audio/" + filename;
        },
      },
      {
        maxRetries: 5,
      }
    )
  );
});

gulp.task("audio", done => {
  plugins.runSequence("process-audio", "upload-audio", done);
});

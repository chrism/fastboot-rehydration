# fastboot-rehydration

This is a repo to work through the process needed to get a basic EmberJS application running on Heroku which uses Fastboot with Rehydration.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Step 1 — A Basic Ember Application

Started by generating an Ember application with latest version (3.1)

Created a simple route, model and template which pulls some json from the repo and displays it using `#each`.

Pushed this simple Ember application to Heroku, using their buildpack as [explained here](https://www.heroku.com/emberjs).

```
heroku create fastboot-rehydration --buildpack https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/emberjs.tgz
git push heroku master
```

Run a quick test to see how fast it is

[https://tools.pingdom.com/#!/cnCm7t/https://fastboot-rehydration.herokuapp.com/](https://tools.pingdom.com/#!/cnCm7t/https://fastboot-rehydration.herokuapp.com/)

Suprisingly quick initial load (~1.5s) but as there is little to no application code/addons/styling yet maybe to be expected.

## Step 2 - Running with Fastboot

Installing Fastboot.

The first available version [supporting rehydration is v1.1.4-beta.1](https://github.com/ember-fastboot/ember-cli-fastboot/commit/d896108efd4dc8222f04a39713a8785e4af18125) so install that.

```
ember install ember-cli-fastboot@v1.1.4-beta.1
```

Then adding the hosts to the Fastboot host whitelist is also necessary.

[`app/config/environment.js`](app/config/environment.js)

```json
let ENV = {
  ...

  APP: {
    // Here you can pass flags/options to your application instance
    // when it is created
  },

  fastboot: {
    hostWhitelist: ['fastboot-rehydration.herokuapp.com', /^localhost:\d+$/]
  }
};
```
After that running `ember s` should run the application with Fastboot.

An easy way to check this is to CURL the URL like this

```
curl 'http://localhost:4200/' -H 'Accept: text/html'
```

The response should include the HTML in the output like this, which shows Fastboot is working...

```
<!-- EMBER_CLI_FASTBOOT_TITLE -->

    <link integrity="" rel="stylesheet" href="/assets/vendor.css">
    <link integrity="" rel="stylesheet" href="/assets/fastboot-rehydration.css">


  </head>
  <body>
    <script type="x/boundary" id="fastboot-body-start"></script><div class="ember-view" id="ember275"><h1>Fastboot Rehydration</h1>

<ul>
    <li>Project 0</li>
    <li>Project 1</li>
</ul>

<!---->
</div><script type="x/boundary" id="fastboot-body-end"></script>
```

### Step 3 — Fastboot with Heroku

Deploying Fastboot to Heroku is as simple as...

```
git push heroku master
```

Checking with CURL shows that the response is also correctly including the HTML.

```
curl 'http://fastboot-rehydration.herokuapp.com/' -H 'Accept: text/html'
```

```
<!-- EMBER_CLI_FASTBOOT_TITLE -->

    <link integrity="" rel="stylesheet" href="/assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css">
    <link integrity="" rel="stylesheet" href="/assets/fastboot-rehydration-d41d8cd98f00b204e9800998ecf8427e.css">


  </head>
  <body>
    <script type="x/boundary" id="fastboot-body-start"></script><div class="ember-view" id="ember264"><h1>Fastboot Rehydration</h1>

<ul>
    <li>Project 0</li>
    <li>Project 1</li>
</ul>

<!---->
</div><script type="x/boundary" id="fastboot-body-end"></script>
```

### Step 4 — Rehydration!

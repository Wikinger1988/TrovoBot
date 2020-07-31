require('dotenv').config()

var clear = require('clear');
clear();

const colors = require('colors'); // eslint-disable-line
const path = require('path');
const fs = require('fs');
const util = require('util'); // eslint-disable-line
const open = require('open');
const figlet = require('figlet');
const vorpal = require('vorpal')();

const fonts = ['ANSI Shadow', 'Elite', 'Georgia11', 'ANSI Regular', 'Bloody', 'Delta Corps Priest 1', 'Electronic'];
vorpal.log(`\r\n${figlet.textSync('Trovobot', {
    font: fonts[Math.floor(Math.random() * fonts.length)],
    horizontalLayout: 'default',
    verticalLayout: 'default',
    whitespaceBreak: true
})}`);

var settings = null;

vorpal.log('Looking for your Settings File....'.blue);

try {
    fs.accessSync(path.join(__dirname, 'settings.json'), fs.constants.F_OK);

    vorpal.log('Settings File Found!'.green);
    settings = require(path.join(__dirname, 'settings.json'));

} catch (err) {
    vorpal.log("Settings File not Found!".red);
}


const http = require('http');
const socket = require("socket.io");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const exphbs  = require('express-handlebars');

const Bot = require(path.join(__dirname, 'modules', 'Bot.js'));


const hbs = exphbs.create();
const app = express();

app.set('views', path.join(__dirname, 'app', 'templates'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/overlay', require(path.join(__dirname, 'app', 'routes', 'overlay.js')));

app.use('/api', require(path.join(__dirname, 'app', 'routes', 'api.js')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'index.html'))
})

const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
  socket.on('??', (incoming_data) => {

  });
});

server.listen(process.env.PORTAL_PORT, () => {
  vorpal.log('Trovobot Control Panel is now Live!'.green)
  if (settings) {
    if (settings.autolaunch) {
      vorpal.log('Launching Browser Window....');
      open(`http://localhost:${process.env.PORTAL_PORT}/`);
    }
    if (settings.autoconnect) {
      vorpal.log('Auto-Connect is enabled, Trovobot is now Connecting....');
      Bot.connect(settings);
    }
  } else {
    vorpal.log('settings.json not Found, loading Setup~'.red);
    open(`http://localhost:${process.env.PORTAL_PORT}/setup`);
  }
});

vorpal
  .command('open', 'Opens a Browser Window to the Trovobot Control Panel.')
  .action(function(args, callback) {
    this.log('\r\nOpening Control Panel in the Browser now....'.brightGreen);
    open(`http://localhost:${process.env.PORTAL_PORT}/`);
    callback();
  });

vorpal
  .command('settings', 'Opens a Browser Window to the Trovobot Settings Page in the Control Panel.')
  .action(function(args, callback) {
    this.log('\r\nOpening Control Panel to Settings Page in the Browser now....'.brightGreen);
    open(`http://localhost:${process.env.PORTAL_PORT}/settings`);
    callback();
  });

vorpal
  .delimiter('\r\nTrovobot$'.underline.italic.grey)
  .show();

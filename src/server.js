require('dotenv').config();

const express = require('express');
const server = express();

const port = process.env.NODE_DOCKER_PORT || 3000;

const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

const session = require('express-session');

const redisClient = require('./db/redis');
const redisStore = require('connect-redis').default;

const authRouter = require('./routes/authRoutes');

const sessionConfig = {
  store: new redisStore({
    client: redisClient,
  }),
  secret: process.env.SESS_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: Number(process.env.SESS_MAX_AGE || 1296000000),
  },
};

if (server.get('env') === 'production') {
  server.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(
  cors({
    origin: '*',
  }),
);

server.use(helmet());

server.use(hpp());

server.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

server.use(session(sessionConfig));

server.use('/v1/auth', authRouter);

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

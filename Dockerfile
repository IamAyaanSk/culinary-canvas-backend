FROM node:18.16-alpine

WORKDIR /server
EXPOSE 3000

RUN npm i -g pnpm
COPY . /server/

RUN pnpm install

CMD [ "pnpm", "run", "dev" ]


FROM strapi/base

WORKDIR /strapi

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

ENV PORT 1337

RUN npm run build

CMD ["npm", "start"]
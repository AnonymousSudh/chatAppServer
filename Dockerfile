FROM node:18-alpine

# set working directory 

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["nodemon", "index.js"]
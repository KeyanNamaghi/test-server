FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn
# Should do production build but don't have any dev deps yet

# Bundle app source
COPY . .

RUN echo "dockerfile"

EXPOSE 8080
CMD [ "node", "./api/index.js" ]
# Download the image
FROM node:20.15-alpine3.19 AS build
ENV APP_HOME=/srv/app
ENV PORT=4270
ENV USR_DOCKER=dev
WORKDIR $APP_HOME

# COPY package*.json $APP_HOME
COPY ./package.json $APP_HOME
# For Apple M1 only!
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Install yarn package manager
RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Install the depenendencies
RUN yarn install
RUN chmod 777 -R $APP_HOME

# Create the user
RUN adduser --disabled-password --gecos '' $USR_DOCKER
USER $USR_DOCKER

EXPOSE $PORT

CMD ["yarn", "start:ssr:docker"]
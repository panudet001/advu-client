# Download the image
FROM node:20.15-alpine3.19 AS build
ENV APP_HOME=/srv/app/
ENV PORT=4260
WORKDIR $APP_HOME

# Set the timezone
RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok

# Install the dependencies
COPY ./package.json $APP_HOME
RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN yarn install --no-lockfile

# Copy everything else and build
COPY ./ $APP_HOME
RUN yarn lint && yarn build

EXPOSE $PORT
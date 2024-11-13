# Download the image
FROM node:20.15-alpine3.19 AS build
ENV APP_HOME_BUILD=/srv/app
ENV APP_PORT=80
ENV SSH_PORT=2222
WORKDIR $APP_HOME_BUILD

# Set the timezone
RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok

# Install the dependencies
COPY ./package.json $APP_HOME_BUILD/
RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community
RUN yarn global add @angular/cli@v17-lts && \
    yarn install --production --no-lockfile

# Copy everything else and build
COPY ./ $APP_HOME_BUILD/
RUN yarn add @angular-devkit/build-angular@v17-lts --dev && \
    yarn build:stg

FROM node:20.15-alpine3.19 AS publish
ENV STATE=staging
ENV APP_HOME_BUILD=/srv/app
ENV APP_HOME_PUBLISH=/srv/app
ENV APP_PORT=80
ENV SSH_PORT=2222
WORKDIR $APP_HOME_PUBLISH

# Project components
COPY --from=build $APP_HOME_BUILD/package.json $APP_HOME_PUBLISH/
COPY --from=build $APP_HOME_BUILD/dist $APP_HOME_PUBLISH/dist

# Docker-entrypoint process & SSH service
COPY --from=build $APP_HOME_BUILD/docker/$STATE/docker-entrypoint.sh /docker-entrypoint.sh
RUN apk add openssh \
    && echo "root:Docker!" | chpasswd \
    && cd /etc/ssh/ \
    && ssh-keygen -A
COPY --from=build $APP_HOME_BUILD/docker/$STATE/sshd_config /etc/ssh/sshd_config
RUN chmod u+x /docker-entrypoint.sh

# Exposing internal port
EXPOSE $APP_PORT $SSH_PORT

ENTRYPOINT [ "/docker-entrypoint.sh" ]
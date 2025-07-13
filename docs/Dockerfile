FROM node:20.9-alpine AS prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files
COPY ./ ./

# ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN yarn build

# Build App document
RUN yarn docs:init

##############################################


FROM node:20.9-alpine
COPY --from=prebuild /var/www/app/docs /var/www/app

COPY --from=prebuild /var/www/app/node_modules /var/www/app/node_modules

WORKDIR /var/www/app

# RUN yarn install

ENV DOC_PORT=3000

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "server.js"]
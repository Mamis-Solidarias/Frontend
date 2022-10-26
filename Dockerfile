##  SET MODE "standalone"
##  More infor: "https://nextjs.org/docs/advanced-features/output-file-tracing"


# Build BASE
FROM node:16 as BASE

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile
RUN yarn cache clean



# Build Image
FROM node:16 AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .

RUN yarn build
RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin
RUN cd .next/standalone
RUN node-prune


# Build production
FROM node:16-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/yarn.lock ./
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./

# Set mode "standalone" in file "next.config.js"
COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]

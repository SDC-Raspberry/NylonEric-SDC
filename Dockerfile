FROM node:14
ENV NODE_ENV=production

# RUN wget http://download.redis.io/redis-stable.tar.gz && \
#     tar xvzf redis-stable.tar.gz && \
#     cd redis-stable && \
#     make && \
#     mv src/redis-server /usr/bin/ && \
#     cd .. && \
#     rm -r redis-stable && \
#     npm install -g concurrently
# EXPOSE 6379
# RUN mkdir -p /usr/src/app
WORKDIR /app
# RUN adduser --system user

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

# RUN chown -R user /usr/src/app
# USER user
EXPOSE 3000
# EXPOSE 6379
# CMD concurrently "/usr/bin/redis-server --bind '0.0.0.0'" "sleep 5s; node ./server/index.js"
CMD ["node", "./server/index.js"]
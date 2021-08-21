FROM node:14
ENV NODE_ENV=production

# RUN mkdir -p /usr/src/app
WORKDIR /app
# RUN adduser --system user

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

# RUN chown -R user /usr/src/app
# USER user
EXPOSE 3000
CMD ["node", "./server/index.js"]
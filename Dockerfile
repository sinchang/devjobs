FROM node:boron

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

ENV DB_URL mongodb://127.0.0.1:27017/devjobs
ENV GMAIL_ADDRESS sinchangwen@gmail.com
ENV GMAIL_PASSWORD rldgasnxidokhfuk
ENV SECRET_KEY 37LvDSm4XvjYOh9Y
ENV WEB_URL http://devloperjobs.cn
ENV PORT 3000
ENV QINIU_AK WTBp1uEvp0cbu0LPxkMFg5yrcI4zZ10a5qV4CPFu
ENV QINIU_SK MT1mSJrBlqPMxKcJ3W-F_BMb-5JuwPgTEg5QDNGm
ENV GITHUB_CI 6bd46946ef7f21e2a540
ENV GITHUB_CS e19b3a65aec92b0358e2531342589b3a62bb11f0

COPY . /app

EXPOSE 3000

RUN ["npm", "build"]
CMD ["npm", "start"]




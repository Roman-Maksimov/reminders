FROM node

ADD . /reminders
RUN cd reminders && npm install

EXPOSE 8080
CMD cd /reminders && npm start

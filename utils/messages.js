const moment = require('moment');

function chatBox(username, text, timeStamp) {
  return {
    username,
    text,
    time: moment(timeStamp).format('dddd HH:mm')
  };
}

module.exports = chatBox;
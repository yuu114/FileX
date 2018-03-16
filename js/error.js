const errorMessages = new Vue({
  el: '#errorMessages',
  data: {
    newMessage: ''
  }
});

function newErrorMessage(message) {
  errorMessages.newMessage = message;
  setTimeout(() => {
    errorMessages.newMessage = '';
  }, 2000);
}

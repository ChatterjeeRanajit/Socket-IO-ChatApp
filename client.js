

const socket=io('http://localhost:7000');
const form= document.getElementById('send-container');
const messageInput= document.getElementById('msg-inp');
const messageContainer = document.querySelector(".container");
var audio= new Audio('ting.mp3');

var append = (message, position)=>{
    var messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    
 
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    else if(position=='mid'){
        audio.play();
    }
}
    




form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
});
const name=prompt("enter your name to join");
socket.emit('new-user-joined', name );

socket.on('user-joined', name=>{
    
    append(`${name} joined the chat`, 'mid');
    
    
});
socket.on('receive', data=>{
    append(`${data.name} : ${data.message}`,'left');


});
socket.on('leave', name=>{
    
    append(`${name} left the chat`,'mid');

});
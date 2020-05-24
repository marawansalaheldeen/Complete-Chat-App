const socket = io();


//Elements
const $messageForm = document.querySelector('#message-form');
const $formInput = $messageForm.querySelector('input');
const $formButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
//Templates
const messageTemplate = document.querySelector('#message-temp').innerHTML
socket.on('message',(message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate,{
        message
    });
    $messages.insertAdjacentHTML('beforeend',html);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $formButton.setAttribute('disabled','disabled');
    //disable
    const message = e.target.elements.msge.value;

    socket.emit('sendMessage', message,(callback)=>{
        //enable
        $formButton.removeAttribute('disabled');
        $formInput.value='';
        $formInput.focus();
        console.log('message delviered',callback);

    })
})

$locationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("geolocation doesn't supported by your browser");
    }
    $locationButton.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((postion)=>{
        const latitude = postion.coords.latitude;
        const longitude = postion.coords.longitude;
        socket.emit('sendloc',{latitude,longitude},(callbackt)=>{
            $locationButton.removeAttribute('disabled');
            console.log(callbackt);
        })
    })
})
const socket = io();


//Elements
const $messageForm = document.querySelector('#message-form');
const $formInput = $messageForm.querySelector('input');
const $formButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
//Templates
const messageTemplate = document.querySelector('#message-temp').innerHTML;
const locmsge = document.querySelector('#loc-temp').innerHTML;

//Options
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true});

socket.on('message',(message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate,{
        message:message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        username
    });
    $messages.insertAdjacentHTML('beforeend',html);
})

socket.on('locmessage',(locmsg)=>{
    console.log(locmsg);
    const html = Mustache.render(locmsge,{
        locmsg: locmsg.location,
        createdAt: moment(locmsg.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $formButton.setAttribute('disabled','disabled');
    //disable
    const message = e.target.elements.message.value;
 
    socket.emit('sendMessage',message,(callback)=>{
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

socket.emit('join',{username,room});
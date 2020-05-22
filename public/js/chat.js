const socket = io()

socket.on('message',(message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.msge.value

    socket.emit('sendMessage', message,(callback)=>{
        console.log('message delviered',callback)

    })
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert("geolocation doesn't supported by your browser")
    }

    navigator.geolocation.getCurrentPosition((postion)=>{
        const latitude = postion.coords.latitude;
        const longitude = postion.coords.longitude;
        socket.emit('sendloc',{latitude,longitude},(callbackt)=>{
            console.log(callbackt)
        })
    })
})
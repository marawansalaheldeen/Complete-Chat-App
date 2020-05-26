const generateMessages = (text)=>{
    return {
        text,
        createdAt: new Date().getTime()
    }
}

const locationMessages = (location)=>{
    return {
        location,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessages,
    locationMessages
}
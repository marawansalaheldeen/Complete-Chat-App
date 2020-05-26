const users = [];

//Add User
const addUser = ({id,username,room})=>{

    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!username || !room){
        return {
            'error':"Username and Room are required"
        }
    }

    const existingData = users.find((user)=>{
        return user.room === room && user.username == username;
    })

    if(existingData){
        return {
            'error':"Username is Taken"
        }
    }

    const user = {id,username,room};
    users.push(user);
    return {user};
}

//Remove User
const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id;
    })
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

//Get User
const getUser = (id)=>{
    const user = users.find((user)=>{
        return user.id === id;
    })

    if(!user){
        return {
            'error':"No user found!"
        }
    }else{
        return "user found"
    }

}

//Get All Users
const getUsersInRoom = (room)=>{
    room = room.trim().toLowerCase();
    return users.filter((user)=> user.room === room);
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
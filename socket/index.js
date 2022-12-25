const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

//buscar usuario que recibe mensaje
const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
}

io.on("connection", (socket) => {
    //cuando se conecta
    console.log("a user conected");
    //tomar userId y socketId del usuario
    socket.on('addUser', userId => {    
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //enviar y obtener mensajes
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", { senderId, text });
    });

    //cuando se desconecta
    socket.on('disconnect', () => {
        console.log('A user disconnected!');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
    
});
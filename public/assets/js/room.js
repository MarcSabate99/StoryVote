const createRoomBtn = document.querySelector('#create_room');
const joinRoomBtn = document.querySelector('#join_room');
const notificationsPanel = document.querySelector('.notifications-panel');

const params = new URLSearchParams(window.location.search);

if (createRoomBtn) {
    createRoomBtn.addEventListener('click', function () {
        socket.emit('create room', createdRoom);
    });
}

if (joinRoomBtn) {
    joinRoomBtn.addEventListener('click', function () {
        let roomNumberInput = document.querySelector('#room_number');
        roomNumberInput.reportValidity();
        socket.emit('join room', roomNumberInput.value, getCookie('userName'));
    });
}

function createdRoom(roomNumber) {
    createCookie("creator",1, 1)
    socket.emit('join room', roomNumber, getCookie('userName'));
}

function joinedRoom(roomData, socketId) {
    createCookie('socketId', socketId, 1);
    window.location.replace('/room/' + roomData.roomNumber.value);
}

function checkErrorParams() {
    let room = params.get('room');
    if (room === 'not_found') {
        const node = document.createElement('div');
        node.className = 'alert alert-danger mt-4';
        node.textContent = 'Room not found';
        node.id = 'notfound';
        notificationsPanel.append(node);
    }
}

socket.on('joined room', function(roomData, socketId) {
    joinedRoom(roomData, socketId);
});

checkErrorParams();

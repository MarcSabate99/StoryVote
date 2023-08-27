const controlButtons = document.querySelector('#control-buttons');
const miniCards = document.querySelector('#mini-cards');
const votesText = document.querySelector('.js-votes-text');
const mediumText = document.querySelector('.js-medium');
const imVoterInput = document.querySelector('.js-im-voter');

function imVoter() {
    if (imVoterInput) {
        const roomNumber = parseInt(window.location.pathname.split("/").pop(), 10);
        if (getCookie("voter") !== "") {
            imVoterInput.checked = getCookie('voter') === "true";
        }
        imVoterInput.addEventListener('click', function () {
            socket.emit('im voter', imVoterInput.checked, roomNumber, getCookie('socketId'));
            createCookie('voter', imVoterInput.checked, 1);
        });
    }
}

function join() {
    const creator = getCookie("creator");
    const joinedFromHome = getCookie("joinedFromHome");
    const roomNumber = parseInt(window.location.pathname.split("/").pop(), 10);
    if(parseInt(joinedFromHome, 10) === 1){
        deleteCookie("joinedFromHome")
        return;
    }
    socket.emit('join room', roomNumber, getCookie('userName'), creator);
}

socket.on('joined room', function (roomData, socketId) {
    joined(roomData, socketId);
});

function joined(roomData, socketId) {
    createCookie('socketId', socketId, 1);
    imVoterInput.checked = true;
    createCookie('voter', true, 1);
}

function getRoomInfo() {
    const roomNumber = parseInt(window.location.pathname.split("/").pop(), 10);
    socket.emit('room info', roomNumber, handleRoomInfo);
    if (getCookie("voter") === "") {
        createCookie('voter', true, 1);
        imVoterInput.checked = true;
    }
}

function handleRoomInfo(data) {
    let currentSocketId = getCookie('socketId');
    const room = data.room;
    let creator = room.creator.value;
    if (creator === currentSocketId || getCookie("creator") === "1") {
        let buttonReset = document.createElement('button');
        buttonReset.textContent = 'Reset';
        buttonReset.className = 'btn btn-info';
        buttonReset.id = 'reset_votes';
        buttonReset.addEventListener('click', function () {
            socket.emit('reset points', room.roomNumber.value);
        });
        let buttonShow = document.createElement('button');
        buttonShow.textContent = 'Show';
        buttonShow.className = 'btn btn-success';
        buttonShow.id = 'show_votes';
        buttonShow.addEventListener('click', function () {
            socket.emit('show points', room.roomNumber.value);
        });
        controlButtons.append(buttonShow, buttonReset);
    }

    socket.emit('refresh', room.roomNumber.value, room.cards, currentSocketId);
}

join();
imVoter();
getRoomInfo();
addClickListenerToCards();

socket.on('show points', (points) => {
    showPoints(points);
});
socket.on('room no exists', function() {
    window.location.replace("/home?room=not_found");
})
socket.on('update points', (votes) => {
    createVotesText(votes);
});

socket.on('refresh room', (miniCards, votes) => {
    createMinicards(miniCards, true);
    createVotesText(votes);
    mediumText.textContent = '';
});

function createVotesText(votes) {
    let totalVotes = votes[0];
    let totalValidVotes = votes[1];
    if (totalVotes === 0) {
        totalValidVotes = 0;
    }

    votesText.textContent = "Votes: (" + totalValidVotes.value + "/" + totalVotes.value + ")";
    if (imVoterInput.disabled) {
        imVoterInput.disabled = false;
    }
}

function showPoints(points) {
    while (miniCards.firstChild) {
        miniCards.removeChild(miniCards.firstChild);
    }

    let indexToAddZero = [];
    for (let i = 0; i < points.length; i++) {
        let divMiniCard = document.createElement('div');
        divMiniCard.className = 'mini-card';
        let spanElement = document.createElement('span');
        let point = points[i];
        let finalPoint = point.value
        if (point.value === "0") {
            finalPoint = "☕";
        }
        if (point.value === null || point.value === "?") {
            finalPoint = "?";
            indexToAddZero.push(i);
        }
        spanElement.textContent = finalPoint;
        divMiniCard.append(spanElement);
        miniCards.append(divMiniCard);
    }

    for (let i = 0; i < indexToAddZero.length; i++) {
        let index = indexToAddZero[i];
        points[index].value = 0;
    }

    let pointsLength = points.filter(p => p.value !== 0);
    if (pointsLength.length > 0) {
        let median = sumValuesOfArray(points) / pointsLength.length;
        mediumText.textContent = "Mean: " + Math.ceil(median);
        imVoterInput.disabled = true;
    }
}

function sumValuesOfArray(values) {
    let total = 0;
    for (let i = 0; i < values.length; i++) {
        let value = values[i].value;
        total += parseInt(value, 10);
    }
    return total;
}

function addClickListenerToCards() {
    const roomNumber = parseInt(window.location.pathname.split("/").pop(), 10);
    const cardButtons = document.getElementsByClassName('card');
    for (let i = 0; i < cardButtons.length; i++) {
        let cardButton = cardButtons[i];
        cardButton.addEventListener('click', function () {
            let socketId = getCookie('socketId');
            for (let i = miniCards.childNodes.length - 1; i >= 0; --i) {
                let card = miniCards.childNodes[i];
                let userCard = document.querySelector('[data-user="' + socketId + '"]');
                if (userCard && imVoterInput.checked) {
                    userCard.firstChild.textContent = cardButton.dataset.value === "0" ? "☕" : cardButton.dataset.value;
                    userCard.style.backgroundColor = "#d6e9de";
                    if (cardButton.dataset.value === "☕") {
                        cardButton.dataset.value = 0;
                    }
                    socket.emit('selected point', socketId, cardButton.dataset.value, roomNumber);
                    break;
                }

                if (card.firstChild && card.firstChild.textContent === "?" && imVoterInput.checked) {
                    card.dataset.user = socketId;
                    card.firstChild.textContent = cardButton.dataset.value === "0" ? "☕" : cardButton.dataset.value;
                    card.style.backgroundColor = "#d6e9de";
                    socket.emit('selected point', socketId, cardButton.dataset.value, roomNumber);
                    break;
                }
            }
        });
    }
}
window.addEventListener("beforeunload", function (e) {
    const roomNumber = parseInt(window.location.pathname.split("/").pop(), 10);
    let currentSocketId = getCookie('socketId');
    socket.emit('leave room', currentSocketId, roomNumber)
});
function createMinicards(cards, refresh = false) {
    if (refresh) {
        while (miniCards.firstChild) {
            miniCards.removeChild(miniCards.firstChild);
        }
    }
    let currentSocket = getCookie('socketId');
    for (let i = 0; i < Object.keys(cards).length; i++) {
        const userId = Object.keys(cards)[i];
        let miniCard = cards[userId];
        if (miniCard.voter) {
            let divMiniCard = document.createElement('div');
            divMiniCard.className = 'mini-card';
            let spanElement = document.createElement('span');
            if (userId === currentSocket) {
                divMiniCard.style.backgroundColor = "#d6e9de";
                spanElement.textContent = miniCard.points === null ? "?" : miniCard.points;
                divMiniCard.dataset.user = currentSocket;
            } else {
                spanElement.textContent = "?";
            }
            divMiniCard.append(spanElement);
            miniCards.append(divMiniCard);
        }
    }
}

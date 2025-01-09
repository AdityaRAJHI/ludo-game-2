import './style.css';

    const rollDiceButton = document.getElementById('roll-dice');
    const players = document.querySelectorAll('.player');
    const trackCells = document.querySelectorAll('.track .cell');
    let currentPlayerIndex = 0;
    const playerPositions = {};
    const homePositions = {
      'blue': [[20, 20], [110, 20], [20, 110], [110, 110]],
      'yellow': [[20, 20], [110, 20], [20, 110], [110, 110]],
      'red': [[20, 20], [110, 20], [20, 110], [110, 110]],
      'green': [[20, 20], [110, 20], [20, 110], [110, 110]],
    };
    const diceResultDisplay = document.getElementById('dice-result');

    players.forEach(player => {
      playerPositions[player.id] = -1;
      const home = player.dataset.home;
      const index = parseInt(player.dataset.index);
      const homePos = homePositions[home][index];
      const homeElement = player.closest('.home');
      player.style.left = `${homePos[0]}px`;
      player.style.top = `${homePos[1]}px`;
    });

    rollDiceButton.addEventListener('click', () => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      diceResultDisplay.textContent = `Dice Roll: ${diceRoll}`;
      console.log(`Player ${currentPlayerIndex + 1} rolled a ${diceRoll}`);

      const currentPlayer = Array.from(players).filter(player => player.id.startsWith(`player${currentPlayerIndex + 1}`)).find(player => playerPositions[player.id] === -1 || playerPositions[player.id] < 52);

      if (!currentPlayer) {
        currentPlayerIndex = (currentPlayerIndex + 1) % 4;
        return;
      }

      const currentPosition = playerPositions[currentPlayer.id];
      let newPosition = currentPosition + diceRoll;

      if (newPosition > 51) {
        newPosition = 51;
      }

      playerPositions[currentPlayer.id] = newPosition;

      if (newPosition >= 0) {
        const cell = trackCells[newPosition];
        currentPlayer.style.left = `${cell.offsetLeft}px`;
        currentPlayer.style.top = `${cell.offsetTop}px`;
      } else {
        const home = currentPlayer.dataset.home;
        const index = parseInt(currentPlayer.dataset.index);
        const homePos = homePositions[home][index];
        const homeElement = currentPlayer.closest('.home');
         currentPlayer.style.left = `${homePos[0]}px`;
        currentPlayer.style.top = `${homePos[1]}px`;
      }

      currentPlayerIndex = (currentPlayerIndex + 1) % 4;
    });

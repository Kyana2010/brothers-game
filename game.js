// Game config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#0a0a23',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

// Global vars
let player;
let cursors;
let upPressed = false;
let downPressed = false;
let gameStarted = false;
let startButton;

// Create game instance
const game = new Phaser.Game(config);

function preload() {
    this.load.image('drone', 'assets/drone.png'); // Make sure this exists
    // You can preload other assets (stars, obstacles) here later
}

function create() {
    // Center drone on screen
    player = this.physics.add.sprite(400, 300, 'drone');
    player.setCollideWorldBounds(true);

    // Arrow key input
    cursors = this.input.keyboard.createCursorKeys();

    // Mobile controls
    setupMobileControls();

    // Start screen toggle
    startButton = document.getElementById('startButton');
    const startContainer = document.getElementById('startContainer');

    startButton.addEventListener('click', () => {
        startContainer.style.display = 'none';
        gameStarted = true;
    });
}

function update() {
    if (!gameStarted) return;

    // Reset velocity
    player.setVelocityY(0);

    // Keyboard input
    if (cursors.up.isDown || upPressed) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown || downPressed) {
        player.setVelocityY(200);
    }

    // Future logic: obstacles, stars, collisions, scoring
}

// Handle touch controls
function setupMobileControls() {
    const upBtn = document.querySelector('[data-key="up"]');
    const downBtn = document.querySelector('[data-key="down"]');

    // Up button
    upBtn.addEventListener('touchstart', () => (upPressed = true));
    upBtn.addEventListener('touchend', () => (upPressed = false));
    upBtn.addEventListener('mousedown', () => (upPressed = true));
    upBtn.addEventListener('mouseup', () => (upPressed = false));

    // Down button
    downBtn.addEventListener('touchstart', () => (downPressed = true));
    downBtn.addEventListener('touchend', () => (downPressed = false));
    downBtn.addEventListener('mousedown', () => (downPressed = true));
    downBtn.addEventListener('mouseup', () => (downPressed = false));
}

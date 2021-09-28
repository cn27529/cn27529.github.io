// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = '//cdn.jsdelivr.net/npm/phaser@3.51.0/dist/phaser.min.js';

var ww = window.innerWidth; //視寛
var wh = window.innerHeight; //視高
var pw = ww / 2; //頁中
var ph = wh / 2; //頁中

var platforms;
var config = {
  type: Phaser.AUTO,
  width: ww,
  height: wh,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 50
      },
      debug: false // debug 提供給我們更多畫面訊息，更有幫助開發

    }
  },
  parent: 'app',
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config)

function preload() {

  //this.load.setBaseURL('https://labs.phaser.io');
  this.load.image('sky', 'assets/marry-bg3.png');
  this.load.image('logo', 'assets/heart2.png');
  this.load.image('red', 'assets/red.png');
  this.load.image('ground', 'assets/platform.png');

}

function create() {

  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  var particles = this.add.particles('red');
  var emitter = particles.createEmitter({
    speed: 150,
    scale: {
      start: 1,
      end: 0
    },
    blendMode: 'ADD'
  });
  var logo = this.physics.add.image(pw, ph, 'logo');
  logo.setVelocity(0, 50); //速度
  logo.setBounce(1, 0.3); //物理反彈的力道
  logo.setCollideWorldBounds(true);
  emitter.startFollow(logo);

  // 創造平台物件
  var platforms = this.physics.add.staticGroup();
  // 利用 create 一一加入所需要的平台 （x,y,圖片key,frame,visible,active）
  // setScale 用來放大物件
  // refreshBody 是用來與你的物理世界告知，因為我們放大了靜態物件，要通知物件的改變，通常只有在靜態物件上改變
  //platforms.create(0, wh, 'ground').setScale(2).refreshBody();

}

function update() {}

var bg_img, bg_img_play, bg_img_cut;
var playbutton, aboutbutton;
var health = 200, max_health = 200;
var gameState = 'wait';
var jet, jet_img, jet_img_left, jet_position;
var bullet, bullet_img;
var bulletGroup;
var enemy, enemyGroup, enemy1img, enemy2img, level2bg;
var score = 0, stars = 0;
var bg;
var platform1image, platform1, platform2image, platform2, platform3, platform4;
var invplatform1, invplatform2image, invplatform2, invplatform3, invplatform4;
var astronaut, astronaut_img;
var star, star_img, starGroup;
var keys, keys_img;
var rock, rock_img, rockGroup;
var heart, heart_img;


function preload() {

    bg_img = loadImage("assets/sky_rivals.gif");
    bg_img_play = loadImage("assets/sky_bg.jpg");
    //bg_img_play = loadImage("assets/daytime-miving.gif");
    jet_img = loadImage("assets/jet.png");
    enemy1img = loadImage("assets/asteroid.png");
    enemy2img = loadImage("assets/ufo.png");
    bullet_img = loadImage("assets/bullet.png");
    level2bg = loadImage("assets/bg3.jpg");
    //level2bg = loadImage("assets/daytime-miving.gif");
    platform1image = loadImage("assets/platform.png");
    astronaut_img = loadImage("assets/astronaut.png");
    astronaut_img_left = loadImage("assets/astronaut_flip.png",);
    star_img = loadImage("assets/star.png");
    jet_img_left = loadImage("assets/jet_flip.png",);
    keys_img = loadImage("assets/key.png");
    rock_img = loadImage("assets/rock.png");
    heart_img = loadImage("assets/heart.png");
}

function setup() {

    createCanvas(900, 700);
    //createCanvas(windowWidth, windowHeight);  
    playbutton = createImg("assets/play_button.png");
    playbutton.position(440, 500);
    playbutton.size(250, 250);
    playbutton.hide();

    aboutbutton = createImg("assets/about_button.png");
    aboutbutton.position(300, 500);
    aboutbutton.size(250, 250);
    aboutbutton.hide();

    jet = createSprite(100, 200);
    jet.addImage("main", jet_img);
    jet.addImage("leftjet", jet_img_left);
    

    jet.scale = 0.5;
    jet.visible = false;

    jet.addImage("rightastro", astronaut_img);
    jet.addImage("leftastro", astronaut_img_left);
    jet.changeImage("main",jet_img);
    
    astronaut = createSprite(100, 200);
    astronaut.scale = 0.5;
    astronaut.visible = false;


    platform1 = createSprite(-900, 300, 200, 20)
    platform1.addImage(platform1image);
    platform1.setCollider("rectangle", 0, 0, 210, 2)
    platform1.scale = 0.3;

    invplatform1 = createSprite(-900, 335, 160, 5)


    platform2 = createSprite(-300, 450, 200, 20);
    platform2.addImage(platform1image);
    platform2.setCollider("rectangle", 0, 0, 210, 2)
    platform2.scale = 0.3;

    invplatform2 = createSprite(-300, 485, 160, 5);

    platform3 = createSprite(650, 150, 200, 20);
    platform3.addImage(platform1image);
    platform3.setCollider("rectangle", 0, 0, 210, 2)
    platform3.scale = 0.3;

    invplatform3 = createSprite(650, 185, 160, 5);

    platform4 = createSprite(150, 350, 200, 20);
    platform4.addImage(platform1image);
    platform4.setCollider("rectangle", 0, 0, 210, 2)
    platform4.scale = 0.3;

    invplatform4 = createSprite(150, 385, 160, 5);

    platform1.visible = false
    platform2.visible = false
    platform3.visible = false
    platform4.visible = false

    invplatform1.visible = false
    invplatform2.visible = false
    invplatform3.visible = false
    invplatform4.visible = false

    bulletGroup = new Group();
    enemyGroup = new Group();
    starGroup = new Group();
    rockGroup = new Group();

    keys = createSprite(jet.x + 100, jet.y + 50, 200, 20);
    keys.addImage(keys_img);
    keys.scale = 0.2;
    keys.visible = false;

    heart = createSprite(590, 58);
    heart.addImage(heart_img);
    heart.scale = 0.2;
    heart.visible = false;

    platform1.depth = jet.depth;
    platform2.depth = jet.depth;
    platform3.depth = jet.depth;
    platform4.depth = jet.depth;

    jet.depth = jet.depth + 1;



}

function draw() {

    if (gameState == "wait") {
        background(bg_img);
        playbutton.show()
        aboutbutton.show()
        platform1.visible = false
        platform2.visible = false
        platform3.visible = false
        platform4.visible = false

        invplatform1.visible = false
        invplatform2.visible = false
        invplatform3.visible = false
        invplatform4.visible = false

    }

    // arrow function =>
    // ()=>{write the entire task here}
    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";

    })

    if (gameState == "about") {
        aboutgame();
    }

    if (gameState == "play") {

       

        background(bg_img_play);

        jet.visible = true;
        healthlevel1();
        movement();
        spawnEnemies();



        for (var i = 0; i < enemyGroup.length; i++) {
            if (bulletGroup.isTouching(enemyGroup.get(i))) {
                score += 5;
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }


        for (var i = 0; i < enemyGroup.length; i++) {
            if (jet.isTouching(enemyGroup.get(i))) {
                health -= 10
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        if (health > 0 && score >= 20) {
            gameState = "nextlevelinfo"
            bulletGroup.destroyEach()
            jet.visible = false
            enemyGroup.destroyEach()



        }


        if (health <= 0) {

            enemyGroup.destroyEach()
            bulletGroup.destroyEach()
rockGroup.destroyEach();
starGroup.destroyEach();
jet.visible=false;

            lost()
        }
        if (gameState == "nextlevelinfo") {



            nextlevelpopup();
            //gameState="level2";
            jet.x=200;
            jet.y=200;
            jet.changeImage("rightastro", astronaut_img)

        }

    }


    if (gameState == "level2") {


        image(level2bg, -36000, 0, 45000, 1700);
        jet.scale = 0.2;
        jet.visible = true;
        //jet.changeImage("rightastro", astronaut_img)
       
        camera.position.x = jet.position.x;
        platform1.visible = true
        platform2.visible = true
        platform3.visible = true
        platform4.visible = true

        // invplatform1.visible = true
        // invplatform2.visible = true
        // invplatform3.visible = true
        // invplatform4.visible = true

        //keys.visible = true

        healthlevel2()
        movementl2();
        //spawnEnemies();
        spawnRocks();
        spawnStars();

        if (jet.collide(platform1) || jet.collide(platform2) || jet.collide(platform3) || jet.collide(platform4)) {
            jet.velocityY = 0;
        }

        // if (jet.isTouching(invplatform1) || jet.isTouching(invplatform2) || jet.isTouching(invplatform3) || jet.isTouching(invplatform4)) {
        //     health -= 100
        // }


        for (var i = 0; i < starGroup.length; i++) {
            if (jet.isTouching(starGroup.get(i))) {
                stars += 1
                starGroup.get(i).remove()

            }

        }

        for (var i = 0; i < rockGroup.length; i++) {
            if (jet.isTouching(rockGroup.get(i))) {
                health -= 10
                rockGroup.get(i).remove()
                bulletGroup.destroyEach()

            }
        }

        for (var i = 0; i < rockGroup.length; i++) {
            if (bulletGroup.isTouching(rockGroup.get(i))) {
                //score += 5;
                rockGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        // to make the key visible when stars collected is 5
        if (stars >= 5 && health >= 10) {

            keys.visible = true;
            jet.velocityY = 0;
            //rockGroup.setVelocityEach(0);    
            rockGroup.destroyEach();
            keypopup();

        }
    }


    // to make it touchable only when stars collected is 5
    if (gameState == "keycollected") {
        image(level2bg, -36000, 0, 45000, 1700);
        jet.scale = 0.2;
        jet.visible = true;
        //jet.changeImage("rightastro", astronaut_img)
        camera.position.x = jet.position.x;
        platform1.visible = true
        platform2.visible = true
        platform3.visible = true
        platform4.visible = true

        // invplatform1.visible = true
        // invplatform2.visible = true
        // invplatform3.visible = true
        // invplatform4.visible = true


        healthlevel2()
        movementl2();
        spawnRocks();
        //spawnStars();
        starGroup.destroyEach();
        //enemyGroup.destroyEach();
        //bulletGroup.destroyEach();

        if (jet.collide(platform1) || jet.collide(platform2) || jet.collide(platform3) || jet.collide(platform4)) {
            jet.velocityY = 0;
        }


        // for (var i = 0; i < starGroup.length; i++) {
        //     if (jet.isTouching(starGroup.get(i))) {
        //         stars += 1
        //         starGroup.get(i).remove()

        //     }

        // }

        // for (var i = 0; i < enemyGroup.length; i++) {
        //     if (jet.isTouching(enemyGroup.get(i))) {
        //         health -= 100
        //         enemyGroup.get(i).remove()
        //         bulletGroup.destroyEach()
        //     }
        // }



        for (var i = 0; i < rockGroup.length; i++) {
            if (jet.isTouching(rockGroup.get(i))) {
                health -= 100
                rockGroup.get(i).remove()

            }
        }

        for (var i = 0; i < rockGroup.length; i++) {
            if (bulletGroup.isTouching(rockGroup.get(i))) {
                //score += 5;
                rockGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        if (stars >= 5 && health >= 10) {
            if (jet.isTouching(keys)) {
                jet.velocityY = 0;
                keys.visible = false;
                gameState = "win"
            }
        }
    }


    if (gameState == "win") {
        starGroup.destroyEach()
        enemyGroup.destroyEach()
        bulletGroup.destroyEach()
        rockGroup.destroyEach();
        win()
    }


    if (health <= 0) {
        //enemyGroup.destroyEach()
        bulletGroup.destroyEach()
        starGroup.destroyEach()
        rockGroup.destroyEach();
        jet.visible = false;
        lost()
    }

    //}


    drawSprites();
    if (gameState == "play") {
        fill(255);
        textSize(25);
        text("SCORE: " + score, 50, 50);

    }



    if (gameState == "level2") {
        fill(255);
        textSize(25);
        text("STARS: " + stars, jet.x - 215, jet.y - 116);

    }

    if (gameState == "keycollected") {
        fill(255);
        textSize(20);
        text("STARS: " + stars, jet.x - 215, jet.y - 116);

    }


}


function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Fly powerful fighter jet, battle in the sky and win by shooting your enemies! \n Use Arrow keys to move and Space Bar to jump!",
        //text: "Use Arrow keys to move the fighter jet, space bar to shoot the enemies",
        textAlign: "center",
        imageUrl: "assets/sky_rivals.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Kill the Enemy!",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}


function healthlevel1() {
    // if(gameState != "lost"){
    // heart = createSprite(590, 58);
    // heart.addImage(heart_img);
    // heart.scale = 0.2;
    heart.visible = true;

    stroke("black")
    strokeWeight(2)
    noFill()
    rect(600, 50, max_health, 20)

    noStroke()
    fill("red")
    rect(600, 50, health, 20)
    // }

}


function healthlevel2() {
    heart.visible = true;

    heart.x = jet.x - 190;
    heart.y = jet.y - 90;
    stroke("black")
    strokeWeight(2)
    noFill()
    //rect(600, 50, max_health, 20)
    rect(jet.x - 200, jet.y - 100, max_health, 20);

    noStroke()
    fill("red")
    //rect(600, 50, health, 20);
    rect(jet.x - 200, jet.y - 100, health, 20);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function movementl2() {

    if (jet.x >= 1000) {
        jet.x = 1000
    }

    if (jet.x <= -1000) {
        jet.x = -1000
    }

    if (jet.y <= 80) {
        jet.y = 80
    }


    if (jet.y >= 700) {

        jet.visible = false;
        rockGroup.destroyEach();
        starGroup.destroyEach();
        lost();

    }

    if (keyDown("UP_ARROW")) {
        jet.velocityY = -10;
        //jet_position=jet_position;
        //console.log(jet_position)
    }
    jet.velocityY += 0.8

    // if (keyDown("DOWN_ARROW")) {
    //     jet.y = jet.y + 5;
    // }

    if (keyDown("LEFT_ARROW")) {
        jet.x = jet.x - 5;
        //jet.addImage("leftastro", astronaut_img_left);
        jet.changeImage("leftastro", astronaut_img_left);
        jet_position = "left";
       // console.log("left")

    }

    if (keyDown("RIGHT_ARROW")) {
        jet.x = jet.x + 5;
        jet.changeImage("rightastro", astronaut_img);
        jet_position = "right";
       // console.log("right")


    }

    if (keyDown("space")) {
        spawnBullets();
    }



}



function movement() {

    if (jet.y <= 10) {
        jet.y = 10
    }

    if (jet.y >= 525) {
        jet.y = 525
    }

    if (jet.x >= 800) {
        jet.x = 800
    }

    if (jet.x <= 30) {
        jet.x = 30
    }

    if (keyDown("UP_ARROW")) {
        jet.y = jet.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        jet.y = jet.y + 5;
    }

    if (keyDown("LEFT_ARROW")) {
        jet.x = jet.x - 5;
        jet.changeImage("leftjet", jet_img_left);
        jet_position = "left";

    }

    if (keyDown("RIGHT_ARROW")) {
        jet.x = jet.x + 5;
        jet.changeImage("main", jet_img);
        jet_position = "right";
    }

    if (keyDown("space")) {
        spawnBullets();
    }



}



function spawnBullets() {
   // if (frameCount % 10 == 0) {
        bullet = createSprite(jet.x + 3, jet.y + 10, 20, 20);
        bullet.addImage(bullet_img);
        bullet.scale = 0.1;

        //console.log(jet_position)

        if (jet_position == "right") {
            bullet.velocityX = 10;

        }

        if (jet_position == "left") {
            bullet.velocityX = -10;
        }

        bullet.depth = jet.depth;
        jet.depth = jet.depth + 1;

        bulletGroup.add(bullet);
   // }

}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.25
        enemy.velocityX = -4;
        //enemy.debug = true;

        var randy1 = Math.round(random(0, 30))
        var randx1 = Math.round(random(400, width))

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                enemy.x = randx1;
                enemy.y = randy1;
                enemy.addImage(enemy1img)
                //enemy.debug=true;
                enemy.velocityY = 4;
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                //enemy.setCollider("rectangle", 0, 0, 100, 100)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}



function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "You defeated them:\n Now collect the stars and unlock the key to win!! \n Use UP arrow key to jump!",
        imageUrl: "assets/level_up.png",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "brown",
    },
        function () {

            gameState = "level2"
        }

    )

}


function spawnStars() {

    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530));
        var randx = Math.round(random(-1000, width));
        star = createSprite(randx, randy);
        star.addImage(star_img);
        star.scale = 0.3;
        star.lifetime = 300;


        //bullet.depth = jet.depth;
        //jet.depth = jet.depth + 1;

        starGroup.add(star);

    }

}


function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/win_trophy.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}


function lost() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/game_over.png",
        imageSize: "200x200",
        confirmButtonText: "Try Again",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}


function keypopup() {

    swal({
        title: "KEY UNLOCKED",
        text: "Congratulations! You unlocked the key!! \n ",
        imageUrl: "assets/key.png",
        imageSize: "200x200",
        confirmButtonText: "OK",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "keycollected"
        }

    )

}


function spawnRocks() {

    if (frameCount % 100 == 0) {
        var randy = Math.round(random(0, 50));
        var randx = Math.round(random(-800, width));
        rock = createSprite(randx, randy);
        rock.addImage(rock_img);
        //rock.debug = true;
        rock.setCollider("rectangle", 0, 0, 200, 200);
        rock.scale = 0.3;
        rock.velocityX = -4;
        rock.velocityY = 4;


        //bullet.depth = jet.depth;
        //jet.depth = jet.depth + 1;

        rockGroup.add(rock);

    }

}
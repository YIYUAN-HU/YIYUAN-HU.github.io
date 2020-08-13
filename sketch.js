/*My extension:
1. Add advanced graphics:
    I improve my character outlooking and draw the image of Chibi Maruko Chan，a famous Japanese chartoon character.
    I use the constructor function and random values to set and draw all the background items, 
    so each time the player refresh or setup agin, the environment will change automatically so as  to increase the fun of playing.
    And I arrange the canyons to not be overlapping with the trees and mountains to make it looking better.
    I found it difficult drawing my new character's hairs and dress as there're lots curves. 
    I learnt to use bezierVertex and arc function to solve this problem.
2. Add sound
    I add a background music : the theme song of Chibi Maruko's animation, "let's dance together". 
    I also add sounds when the character jump，lose one life and collect the collectitems.
    I fell hard when adding my background sound as it always return error when I just write backSound.loop() in the setup function.
    I learnt to place the background music in the keyPressed function. And when key pressed and the music is not loopinp, then the music begin to loop.
    However, I found I cannot open the game directly through the html file after adding the sounds. Even though it work well through Brackets.  
    So I prepare 2 files, one with music and one without. If you cannot run the first file "gameproject_add_music" well, try the second one without music ! ! !
3. Create platforms && 4. Create enemies
    I set the platforms and enemise both. In order  to refresh the background randomly each time , I put all these in a constructory function.




Below are how to play the game:
1. press "↑" or Space to jump.
    "←" to left. "→" to right. 
    "↑" or Space and "←" to jump left. "↑"  or Space and "→" to jump right.

2. I use the constructor function to set and draw all the background items
    so each time you refresh or setup agin, the environment will change automatically so as  to increase the fun of playing.

3. After adding the sound,  it work well openning with Brackets, but cannot be opened directly through the 'index. html' file.
   So if you cannot run the first file "gameproject_add_music" well, try the second one without music ! ! !

4. YOU have 3 lives in the begining. The moving red balls are enemies and when you touch the red balls or fall of the cayon, you will lose on live.  3 lives over,  dead.

5. Either trun left or right, you will find a flagpore. Reach the flagpore and you level will increase 1.  
   The game will be harder when your level up as you need to go further to find the flagpore.

6.  if dead or level completed, you cannot move then,  press Space to refresh your lives or level.

H O P E    Y O U    E N J O Y     T H E      G A M E    ! */



var gameChar;
var backgroundDrawing;
var scrollpos;
var floor_pos;
var lives = 3;
var level = 1;


function setup()
{
	createCanvas(1024, 576);
    backgroundDrawing = new backgroundDrawing();
    backgroundDrawing.setup();
}

function draw()
{
    backgroundDrawing.drawFirst();
    push();
    translate(scrollpos, 0);
    backgroundDrawing.drawSecond();
    pop();
    gameChar.drawCharacter();
    gameChar.moveChar();
    backgroundDrawing.drawThird();
}


function keyPressed()
{
    if (keyCode == 37) 
    {
        gameChar.walkingLeft = true;
    }
    else if (keyCode == 39)
    {
        gameChar.walkingRight = true;
    }
    else if (keyCode == 32 || keyCode == 38)
    {
        gameChar.frontJumpStatement = true;
    }
    if (keyCode == 32 && lives <= 0)
    {
        lives = 3;
        backgroundDrawing.setup();
    }
    if (keyCode == 32 && backgroundDrawing.flagpole.reached == true)
    {
        lives = 3;
        level ++;
        backgroundDrawing.setup();
    }
}

function keyReleased()
{
    if (keyCode==37) 
    {
        gameChar.walkingLeft=false;
    }
    else if (keyCode == 39)
    {
        gameChar.walkingRight = false;
    }
    else if (keyCode == 32 || keyCode == 38)
    {
        gameChar.frontJumpStatement = false;
    }
}

function backgroundDrawing()
{
   
    this.setup = function()
    {
        floor_pos = height * 3/4;
        scrollpos = 0;
        gamescore = 0;
        this.mountain = [];
        this.clouds = [];
        this.trees = [];
        this.canyons = [];
        this.collectableItems = [];
        this.enemies = [];
        this.platforms = [];
        
        //mountain setting
        for (var i =0 ; i < 100; i++)
        {
            var mx1 = createVector(random(-width-20000, width+20000), floor_pos);
            var mWidth = random(100,200);
            var mHeight = mWidth*random(1.5,2);
            var mx2 = createVector(mx1.x+mWidth,floor_pos);
            var mx3 = createVector(random(mx1.x*1.1, mx2.x*0.9), floor_pos-mHeight);
            var colour = color(95,158,160,random(150,240));
            this.mountain.push({x1:mx1, 
                                x2: mx2,
                                x3: mx3, 
                                colour:colour,
                                draw: function()
                                   {
                                       fill(this.colour);
                                        noStroke();
                                        
                                        triangle(this.x1.x,this.x1.y, this.x3.x,this.x3.y, this.x2.x, this.x2.y);
                                   }
                               });
        }
           
        //clouds setting
        for (var i =0; i < 100; i++)
        {
            var pos = createVector(random(-width-20000, width+20000), random(0, height/8));
            var size = random(10,20);
            var colour= color(255,255,255,random(255,255));
            var width1= size*random(1.1,1.5);
            var size2= size*random(1.2,1.5);
            var width2= size2*random(1.1,1.5);
            var dis1= random((width2-width1)/2, (width1+width2)/2)*0.9;
            var size3= size*random(0.8,1.2);
            var width3= size2*random(1.1,1.5);
            var dis3= random(dis1+abs(width2-width3)/2, dis1+(width2+width3)/2)*0.9;
            var cloud = {pos: pos,
                        size: size,
                        colour: colour,
                        width1:  width1,
                        size2: size2,
                        width2: width2,
                        dis1: dis1,
                        size3: size3,
                        width3: width3,
                        dis3: dis3,
                        drawCloud: function()
                            {
                                 fill(this.colour);
                                 noStroke();
                                 ellipse(this.pos.x, this.pos.y, this.width1, this.size);
                                 ellipse(this.pos.x+this.dis1, this.pos.y, this.width2, this.size2);
                                 ellipse(this.pos.x+this.dis3, this.pos.y, this.width3, this.size3);
                             }  
                       };
              this.clouds.push(cloud);
        }
        
        //trees setting
        for (var i =0; i < 100; i++)
        {
            var tree_size = random(0.4,0.8);
            var tree_height = 132 * tree_size;
            var tree_width = 40*tree_size;
            var treePos_x = random(-width-20000, width+20000);
	        var treePos_y = floor_pos - tree_height; 
            var trunkColour = color(102,51,0,random(200,255));
            var leaveColour = color(50,205,50)
            this.trees.push({tree_height: tree_height,
                             tree_width: tree_width,
                             treePos_x: treePos_x,
                             treePos_y: treePos_y,
                             tree_size: tree_size,
                             trunkColour:trunkColour,
                             leaveColour:leaveColour,
                             draw: function()
                             {
                                fill(this.trunkColour);
                                rect(this.treePos_x,this.treePos_y,this.tree_width,this.tree_height);
                                fill(this.leaveColour);
                                ellipse(this.treePos_x-20 * this.tree_size, this.treePos_y, 80  * this.tree_size, 80  * this.tree_size);
                                ellipse(this.treePos_x+20 * this.tree_size, this.treePos_y, 80 * this.tree_size, 80 * this.tree_size);
                                ellipse(this.treePos_x+50 * this.tree_size, this.treePos_y, 80 * this.tree_size, 80 * this.tree_size);
                                ellipse(this.treePos_x, this.treePos_y-30 * this.tree_size, 80 * this.tree_size, 80 * this.tree_size);
                                ellipse(this.treePos_x+40 * this.tree_size, this.treePos_y-35 * this.tree_size, 70* this. tree_size, 70 * this.tree_size);
                             }
                            });
        };
        
        //canyon setting
        for (var i =0; i < 400; i++)
        {
            var canyonPos = width-20000+i*100;
            if (canyonPos  > width/2-100 && canyonPos < width/2 + 100)
                {
                    continue;
                };
            var canyonSize = random(50,60);
            this.canyons.push(
                            {posx: canyonPos,
                            size: canyonSize,
                            draw: function()
                                {
                                noStroke();
                                fill(135,206,250);
                                rect(this.posx, floor_pos, this.size, floor_pos);
                                fill(0, 0, 200, 100);
                                rect(this.posx, height-20, this.size, 20);
                                fill(0, 0, 255,100);
                                rect(this.posx, height-5, this.size, 5); 
                                },
                             check: function(obj)
                                {
                                  if (obj.newx+3 > this.posx && obj.newx-3 < this.posx + this.size && obj.y == floor_pos)
                                      {
                                          obj.dieFalling = true;
                                      };
                                }
                            }
                            );
        };
        
        //collectable items setting
        for (var i=0; i < 200; i++)
        {
            var x = random(-width-20000, width+20000);
            var y = floor_pos;
            this.collectableItems.push({x:x,
                                        y:y,
                                        found: false,
                                        draw: function(a, obj)
                                        {   
                                            if (this.found == false)
                                            {
                                            fill(255,255,0,150);
                                            noStroke();
                                            strokeWeight(2);
                                            ellipse(this.x,this.y-a,20);
                                            fill(240,230,140,100)
                                            stroke(225, 215, 0);
                                            rect(this.x-20/5, this.y-a-20/5, 20/3, 20/3); 
                                            if (dist(obj.newx, obj.y, this.x, this.y-a) <= 70)
                                                {
                                                    gamescore ++;
                                                    this.found = true;
                                                };
                                            };
                                        }
                                       });
        }
        
       //flagpole setting
        if (level < 10)
        {
            var x1 = random(-1000*level, -1000*(level-1));
            var x2 = random(1000*(level-1), 1000*level);
        }
        else
        {
            var x1 = random(-10000, 0);
            var x2 = random(0, 10000);
        }
        this.flagpole = {
                        x1: x1,
                        x2: x2,
                        reached: false,
                        draw: function()
                            {
                                stroke(220);
                                strokeWeight(10);
                                line(this.x1, floor_pos, this.x1, floor_pos-250);
                                line(this.x2, floor_pos, this.x2, floor_pos-250);

                                if (this.reached)
                                    {
                                        fill(255,0,0);
                                        noStroke();
                                        rect(this.x1, floor_pos-250, 60, 50); 
                                        rect(this.x2, floor_pos-250, 60, 50);          
                                    }
                                else
                                    {
                                       fill(0,255,0);
                                       noStroke();
                                       rect(this.x1, floor_pos-50, 60, 50);
                                       rect(this.x2, floor_pos-50, 60, 50);
                                    }
                            },
                          check: function()
                            {
                                if (dist(gameChar.newx, floor_pos, this.x1, floor_pos) < 10 || dist(gameChar.newx, floor_pos, this.x2, floor_pos) < 10)
                                {
                                    this.reached = true;
                                };
                                if (this.reached)
                                {
                                    textSize(38);
                                    stroke(0,255,0);
                                    strokeWeight(2);
                                    fill(0,255,0);
                                    text("Level Complete! Press Space to Continue!", width/2-300-scrollpos, height/2-50); 
                                };
                            }
                    };
        
        // enemies setting
        for (var i = 0; i < 70; i++)
        {
            var x = random(-width-20000, width+20000);
             if (x  > width/2-100 && x < width/2 + 100)
                {
                    continue;
                };
            var range = random(20,60);
            var xspeed = random(-2,2);
            this.enemies.push({x: x,
                              y: floor_pos,
                              r1: x+range,
                              r2: x-range,
                              xspeed: xspeed,
                              touched:false,
                              draw: function()
                              {
                                  fill(255,0,0);
                                  noStroke();
                                  ellipse(this.x, this.y-3, 6);
                                  this.x += this.xspeed;
                                  if (this.x >= this.r1 || this.x <= this.r2)
                                      {
                                          this.xspeed = -this.xspeed;
                                      }
                              },
                              check: function()
                              {
                                  if (this.touched == false)
                                      {
                                          if (dist(this.x, floor_pos, gameChar.newx, gameChar.y) <= 3)
                                              {
                                                  lives --;
                                                  if (lives > 0)
                                                       {
                                                           backgroundDrawing.setup();
                                                       }
                                                  this.touched = true;
                                              };
                                          
                                      };
                              },
                              });
        }
        
        //platforms setting
        for (var i = 0; i < 100; i++)
        {
            var x = random(-width-20000, width+20000);
            if (x  > width/2-100 && x < width/2 + 100)
            {
                continue;
            };
            var y = [50,60,80];
            var length = random(80,100);
            this.platforms.push({x: x,
                                y: floor_pos-y[i%3],
                                length: length,
                                draw: function()
                                {
                                    fill(34,139,34,200);
                                    noStroke();
                                    rect(this.x, this.y, this.length, 4);
                                },
                                check: function()
                                {
                                    if (gameChar.newx >= this.x 
                                        && gameChar.newx <= this.x+this.length 
                                        && gameChar.y >= this.y - 20 
                                       && gameChar.y <= this.y + 20)
                                    {
                                        gameChar.y = this.y;
                                        gameChar.onPlatform = true;
                                        
                                    }
                                }                                
                                })
            
        }
            
            
        //character setting
        gameChar = new GameCharacter(width/2, floor_pos);
       
    };
    
    
    //draw skys and ground
    this.drawFirst = function()
    {
        //draw sky and ground
        background(135,206,250);
        fill(34,139,34);
        noStroke();
        rect(0, floor_pos, width, height-floor_pos);
    };
    
    //draw things sticks
    this.drawSecond = function()
    {
         //draw mountains
        for (var i = 0; i < this.mountain.length; i++)
        {
            this.mountain[i].draw();
        };
        
        //draw clouds
        for (var i = 0; i  < this.clouds.length; i++)
        {
            this.clouds[i].drawCloud(); 
        };
        
        //draw trees
        for (var i = 0; i  < this.trees.length; i++)
        {
            this.trees[i].draw(); 
        };
        
        //draw canyons
        for (var i = this.canyons.length-1; i  > 0; i--)
        {
            for (var j = 0; j  < this.trees.length; j++)
                {
                    if (this.canyons[i].posx <= this.trees[j].treePos_x + this.trees[j].tree_width && 
                    this.canyons[i].posx + this.canyons[i].size >= this.trees[j].treePos_x)
                        {
                            this.canyons.splice(i,1);
                            break;
                        }
                };
        };
        for (var i = this.canyons.length-1; i  > 0; i--)
        { 
                for (var k = 0; k  < this.mountain.length; k++)
                {
                    if (this.canyons[i].posx <= this.mountain[k].x2.x && 
                    this.canyons[i].posx + this.canyons[i].size >= this.mountain[k].x1.x)
                        {
                            this.canyons.splice(i,1);
                            break;
                        }
                };
        
        };
        for (var i = 0; i < this.canyons.length; i++)
        {
               this.canyons[i].draw();
               this.canyons[i].check(gameChar);
           };
        
        //draw collectable items
        for (var i = 0; i < this.collectableItems.length; i++)
        {
            if (i%3 == 0)
               {
                    this.collectableItems[i].draw(50,gameChar); 
               }
            else if (i%3 == 1)
                {
                    this.collectableItems[i].draw(80,gameChar); 
                }
            else
                {
                    this.collectableItems[i].draw(100,gameChar); 
                };
        }
        
        //draw flagpole
      
        this.flagpole.draw();
        this.flagpole.check();
        
        //draw enemies
        for (var i = 0; i < this.enemies.length; i++)
        {
              this.enemies[i].draw();  
              this.enemies[i].check();
        };
        
        //draw platforms
        for (var i = 0 ; i < this.platforms.length; i++)
        {
            this.platforms[i].draw();
            this.platforms[i].check();
        }
        
    }; 
    
    this.drawThird = function()
    {
        //draw gamescore
        textSize(16);
        stroke(0);
        fill(255);
        text("game score is: " + gamescore, 20, 30);
        
        //draw lives
        this.drawLives();
        
        //draw levels
        textSize(16);
        stroke(0);
        fill(255);
        text("Level is: " + level, 20, 90);
     };
    
    //draw lives
    this.drawLives = function()
    {
        //draw lives
        if (lives > 0)
        {
            textSize(16);
            stroke(0);
            fill(255);
            text("Lives: " + lives, 20, 60); 
            noStroke();
            rect(80,43,90,20);
            for (var i=0; i<lives; i++)
                {
                    noStroke();
                    fill(0,0,255);
                    rect(80+i*30,46,30,15);
                }
        }
        else
        {
            textSize(18);
            stroke(255,0,0);
            fill(255,0,0);
            text("Died", 20, 60); 
            
            textSize(38);
            stroke(255,0,0);
            fill(255,0,0);
            text("Game over. Press Space to continue",width/2-300,height/2-120);   
        };
    };
    
    //check lives
    this.checkLives = function()
    {
       //check to setup or die
       if (lives > 0)
           {
               backgroundDrawing.setup();
           }
    };
}



function GameCharacter(x, y)
{
    this.x = x;
    this.y = y;
    this.size = createVector(50,80);
    this.dressColour = color(255,0,0);
    this.frontJumpStatement = false;
    this.walkingRight = false;
    this.walkingLeft = false;
    this.jumpRight = false;
    this.jumpLeft = false;
    this.fall = false;
    this.dieFalling = false;
    this.onPlatform = false;
    
    //function to move the character
    this.moveChar = function()
    {
      if (lives > 0 && backgroundDrawing.flagpole.reached == false)
      {
          if (this.frontJumpStatement && (this.y == floor_pos || this.onPlatform == true))
            {
                this.y -= 150;
                if (this.walkingLeft)
                    {
                        this.jumpLeft = true;
                    };
                if (this.walkingRight)
                    {
                        this.jumpRight = true;
                    };

                this.fall = true;
            };
       if (this.walkingLeft && this.y <= floor_pos)
            {
                if (this.x >= width * 0.2)
                {
                    this.x -= 2;
                }
                else
                {
                    scrollpos += 2;
                };
            };
        if (this.walkingRight && this.y <= floor_pos)
            {
                if (this.x <= width * 0.8)
                {
                    this.x += 2;
                }
                else
                {
                    scrollpos -= 2;
                }
            };
        if (this.fall)
            {
                this.y += 3;
                this.onPlatform = false;
                if (this.y >= floor_pos)
                {
                    this.y = floor_pos;
                    this.jumpLeft = false;
                    this.jumpRight = false;
                    this.fall = false;
                };
            };
        if (this.dieFalling)
            {
                this.y += 5;
                if (this.y >= height+200)
                    {
                        lives -= 1;
                        backgroundDrawing.checkLives();
                        this.dieFalling = false;
                    }
            };
      }
        this.newx = this.x - scrollpos;
        
    };
        
    //function to draw the character
    this.drawCharacter = function()
    {
       if (this.walkingRight && this.frontJumpStatement || this.jumpRight)
        {   
            var adjustY = this.y+15;
            //head
            fill(0);
            
            noStroke();
            arc(this.x, adjustY-this.size.y*0.55, this.size.x/1.7, this.size.x/1.1, PI, PI*1.79, PIE)
            fill(this.dressColour);
            stroke(0);
            
            //left hand
            fill(this.dressColour);
            beginShape();
            vertex(this.x+this.size.x/10, adjustY-this.size.y*0.4875);
            bezierVertex(this.x+this.size.x/10, adjustY-this.size.y*0.4875,
                        this.x-this.size.x/1.5, adjustY-this.size.y*0.6,
                        this.x+this.size.x/5.8, adjustY-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x-this.size.x/5, adjustY-this.size.y*0.5,4*this.size.x/50);

            
            //neck
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            ellipse(this.x+this.size.x/20, adjustY-this.size.y*0.51, 4*this.size.x/50, 8*this.size.x/50)

            //Hair and  face
            var yPos = adjustY+5
            fill(250, 235, 215);
            stroke(0);
            arc(this.x+this.size.x/25, yPos-this.size.y*0.725, this.size.x/2.5, this.size.x/1.9, 0, PI, CHORD);
            noStroke();
            beginShape();
            for (var i = 0; i < 11; i++)
                {
                    if (i%2 == 0)
                        {
                            vertex(this.x-this.size.x/10+i*this.size.x/30, yPos-this.size.y*0.72);
                        }
                   else
                        {
                            vertex(this.x-this.size.x/10+i*this.size.x/30, yPos-this.size.y*0.75);
                        }
                }
            endShape(CLOSE);            
            fill(240,128,128);
            ellipse(this.x+this.size.x/15, adjustY-this.size.y*0.57, 2*this.size.x/50);

            //eyes
            fill(0);
            ellipse(this.x+this.size.x/6, adjustY-this.size.y*0.6175, 2*this.size.x/50, 2.5*this.size.x/50 );
            fill(255);
            noStroke();
            ellipse(this.x+this.size.x/5.9, adjustY+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            
            //mouth
            fill(0)
            stroke(0);
            line(this.x+this.size.x/6.5, adjustY-this.size.y*0.556, this.x+this.size.x/5.5, adjustY-this.size.y*0.55)
            //dress
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            curveVertex(this.x, adjustY-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/10, adjustY-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/5, adjustY-this.size.y*0.1875);
            curveVertex(this.x-this.size.x/5, adjustY-this.size.y*0.1875);
            endShape(CLOSE);
                
            fill(255);
            beginShape();
            vertex(this.x, adjustY-this.size.y*0.4875);
            bezierVertex(this.x, adjustY-this.size.y*0.4875,
                        this.x+this.size.x/30, adjustY-this.size.y*0.3875,
                        this.x+this.size.x/10, adjustY-this.size.y*0.4875);
            endShape(CLOSE);
            ellipse(this.x+this.size.x/7, adjustY-this.size.y*0.3875,1.5*this.size.x/50);
            ellipse(this.x+this.size.x/8.2, adjustY-this.size.y*0.4375,1.5*this.size.x/50);
            
            //hands
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            vertex(this.x, adjustY-this.size.y*0.4875);
            bezierVertex(this.x+this.size.x/10, adjustY-this.size.y*0.4875,
                        this.x-this.size.x/1.5, adjustY-this.size.y*0.5,
                        this.x-this.size.x/20, adjustY-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x-this.size.x/3.6, adjustY-this.size.y*0.45,4*this.size.x/50);}
        else if (this.walkingLeft &&  this.frontJumpStatement || this.jumpLeft)
        {
            var adjustY = this.y+15;
            //head
            fill(0);
            noStroke();
            
            arc(this.x, adjustY-this.size.y*0.55, this.size.x/1.7, this.size.x/1.1,  -PI*0.8, 0, PIE)
            fill(this.dressColour);
            stroke(0);
            //headflower
            ellipse(this.x+this.size.x/8, adjustY-this.size.y*0.78,2*this.size.x/50);
            ellipse(this.x+this.size.x/7, adjustY-this.size.y*0.77,1.5*this.size.x/50);
            ellipse(this.x+this.size.x/6, adjustY-this.size.y*0.76,2*this.size.x/50);
            
            //right hand
            fill(this.dressColour);
            beginShape();
            vertex(this.x-this.size.x/10, adjustY-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, adjustY-this.size.y*0.4875,
                        this.x+this.size.x/1.5, adjustY-this.size.y*0.6,
                        this.x-this.size.x/5.8, adjustY-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x+this.size.x/5, adjustY-this.size.y*0.5,4*this.size.x/50);

            //neck
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            ellipse(this.x-this.size.x/20, adjustY-this.size.y*0.51, 4*this.size.x/50, 8*this.size.x/50)

            //Hair and  face
            var yPos = adjustY+5
            fill(250, 235, 215);
            stroke(0);
            arc(this.x-this.size.x/25, yPos-this.size.y*0.725, this.size.x/2.5, this.size.x/1.9, 0, PI, CHORD);
            noStroke();
            beginShape();
            for (var i = 0; i < 11; i++)
                {
                    if (i%2 == 0)
                        {
                            vertex(this.x-this.size.x/4.3+i*this.size.x/30, yPos-this.size.y*0.72);
                        }
                   else
                        {
                            vertex(this.x-this.size.x/4.3+i*this.size.x/30, yPos-this.size.y*0.75);
                        }
                }
            endShape(CLOSE);            
            fill(240,128,128);
            ellipse(this.x-this.size.x/15, adjustY-this.size.y*0.57, 2*this.size.x/50);

            //eyes
            fill(0);
            ellipse(this.x-this.size.x/6, adjustY-this.size.y*0.6175, 2*this.size.x/50, 2.5*this.size.x/50 );
            fill(255);
            noStroke();
            ellipse(this.x-this.size.x/5.9, adjustY+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            
            //mouth
            fill(0)
            stroke(0);
            line(this.x-this.size.x/6.5, adjustY-this.size.y*0.556, this.x-this.size.x/5.5, adjustY-this.size.y*0.55)
            
            
            //dress
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            curveVertex(this.x, adjustY-this.size.y*0.4875);
            curveVertex(this.x-this.size.x/10, adjustY-this.size.y*0.4875);
            curveVertex(this.x-this.size.x/5, adjustY-this.size.y*0.1875);
            curveVertex(this.x+this.size.x/5, adjustY-this.size.y*0.1875);
            endShape(CLOSE);
                
            fill(255);
            beginShape();
            vertex(this.x, adjustY-this.size.y*0.4875);
            bezierVertex(this.x, adjustY-this.size.y*0.4875,
                        this.x-this.size.x/30, adjustY-this.size.y*0.3875,
                        this.x-this.size.x/10, adjustY-this.size.y*0.4875);
            endShape(CLOSE);
            ellipse(this.x-this.size.x/7, adjustY-this.size.y*0.3875,1.5*this.size.x/50);
            ellipse(this.x-this.size.x/8.2, adjustY-this.size.y*0.4375,1.5*this.size.x/50);
            
            //hands
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            vertex(this.x, adjustY-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, adjustY-this.size.y*0.4875,
                        this.x+this.size.x/1.5, adjustY-this.size.y*0.5,
                        this.x+this.size.x/20, adjustY-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x+this.size.x/3.6, adjustY-this.size.y*0.45,4*this.size.x/50);    
        }
        else if (this.frontJumpStatement == true || this.fall)
        {
                
                this.drawFrontHead(4);
                var y_pos = this.y + 4;
                
               //dress
                fill(this.dressColour);
                stroke(0);
                strokeWeight(0.5);
                beginShape();
                curveVertex(this.x-this.size.x/10, y_pos-this.size.y*0.4875);
                curveVertex(this.x+this.size.x/10, y_pos-this.size.y*0.4875);
                curveVertex(this.x+this.size.x/5, y_pos-this.size.y*0.1875);
                curveVertex(this.x-this.size.x/5, y_pos-this.size.y*0.1875);
                endShape(CLOSE);
                
                fill(255);
                beginShape();
                vertex(this.x-this.size.x/10, y_pos-this.size.y*0.4875);
                bezierVertex(this.x-this.size.x/10, y_pos-this.size.y*0.4875,
                            this.x-this.size.x/12, y_pos-this.size.y*0.3875,
                            this.x, y_pos-this.size.y*0.4875);
                bezierVertex(this.x, y_pos-this.size.y*0.4875,
                            this.x+this.size.x/12, y_pos-this.size.y*0.3875,
                            this.x+this.size.x/10, y_pos-this.size.y*0.4875);
                endShape(CLOSE);
                ellipse(this.x, y_pos-this.size.y*0.3875,2*this.size.x/50);
                ellipse(this.x, y_pos-this.size.y*0.4375,2*this.size.x/50);
                
                // legs
                fill(255);
                stroke(0);
                strokeWeight(0.5);
                beginShape();
                vertex(this.x-this.size.x/7, y_pos-this.size.y*0.1875);
                bezierVertex(this.x-this.size.x/10, y_pos-this.size.y*0.1875,
                           this.x-this.size.x/2, y_pos+this.size.y*0.2,
                           this.x, y_pos-this.size.y*0.1875)
                
                endShape();
                beginShape();
                vertex(this.x+this.size.x/7, y_pos-this.size.y*0.1875);
                bezierVertex(this.x+this.size.x/10, y_pos-this.size.y*0.1875,
                           this.x+this.size.x/2, y_pos+this.size.y*0.2,
                           this.x, y_pos-this.size.y*0.1875)
                
                endShape();
                fill(250, 235, 215);
                beginShape();
                vertex(this.x-this.size.x/7, y_pos-this.size.y*0.1875);
                vertex(this.x-this.size.x/5, y_pos-this.size.y*0.1);
                vertex(this.x-this.size.x/9, y_pos-this.size.y*0.1);
                vertex(this.x, y_pos-this.size.y*0.1875)
                endShape();
                beginShape();
                vertex(this.x+this.size.x/7, y_pos-this.size.y*0.1875);
                vertex(this.x+this.size.x/5, y_pos-this.size.y*0.1);
                vertex(this.x+this.size.x/9, y_pos-this.size.y*0.1);
                vertex(this.x, y_pos-this.size.y*0.1875)
                endShape();
                //shoes
                fill(0);
                ellipse(this.x-this.size.x/3.9, y_pos-this.size.y*0.04, 5*this.size.x/50, 4*this.size.x/50);
                ellipse(this.x+this.size.x/3.9, y_pos-this.size.y*0.04, 5*this.size.x/50, 4*this.size.x/50);

                //hands
                fill(this.dressColour);
                stroke(0);
                strokeWeight(0.5);
                beginShape();
                vertex(this.x-this.size.x/10, y_pos-this.size.y*0.4875);
                bezierVertex(this.x-this.size.x/10, y_pos-this.size.y*0.4875,
                            this.x-this.size.x/1.5, y_pos-this.size.y*0.75,
                            this.x-this.size.x/5.6, y_pos-this.size.y*0.3475);
                endShape();
                beginShape();
                vertex(this.x+this.size.x/10, y_pos-this.size.y*0.4875);
                bezierVertex(this.x+this.size.x/10, y_pos-this.size.y*0.4875,
                            this.x+this.size.x/1.5, y_pos-this.size.y*0.75,
                            this.x+this.size.x/5.1, y_pos-this.size.y*0.3475);
                endShape();
                fill(250, 235, 215);
                ellipse(this.x-this.size.x/2.75, y_pos-this.size.y*0.55,4*this.size.x/50);
                ellipse(this.x+this.size.x/2.75, y_pos-this.size.y*0.55,4*this.size.x/50);    
            }
        else if (this.walkingRight == true)
        {
            //head
            fill(0);
            noStroke();
            
            arc(this.x, this.y-this.size.y*0.55, this.size.x/1.7, this.size.x/1.1, PI, PI*1.79, PIE)
            fill(this.dressColour);
            stroke(0);
            
            
            //neck
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            ellipse(this.x+this.size.x/20, this.y-this.size.y*0.51, 4*this.size.x/50, 8*this.size.x/50)

            //Hair and  face
            var yPos = this.y+5
            fill(250, 235, 215);
            stroke(0);
            arc(this.x+this.size.x/25, yPos-this.size.y*0.725, this.size.x/2.5, this.size.x/1.9, 0, PI, CHORD);
            noStroke();
            beginShape();
            for (var i = 0; i < 11; i++)
                {
                    if (i%2 == 0)
                        {
                            vertex(this.x-this.size.x/10+i*this.size.x/30, yPos-this.size.y*0.72);
                        }
                   else
                        {
                            vertex(this.x-this.size.x/10+i*this.size.x/30, yPos-this.size.y*0.75);
                        }
                }
            endShape(CLOSE);            
            fill(240,128,128);
            ellipse(this.x+this.size.x/15, this.y-this.size.y*0.57, 2*this.size.x/50);

            //eyes
            fill(0);
            ellipse(this.x+this.size.x/6, this.y-this.size.y*0.6175, 2*this.size.x/50, 2.5*this.size.x/50 );
            fill(255);
            noStroke();
            ellipse(this.x+this.size.x/5.9, this.y+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            
            //mouth
            fill(0)
            stroke(0);
            line(this.x+this.size.x/6.5, this.y-this.size.y*0.556, this.x+this.size.x/5.5, this.y-this.size.y*0.55)
            
            // legs
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            rect(this.x+this.size.x*0.04, this.y-this.size.y*0.1875, 3*this.size.x/50, this.size.y/5);
            fill(255);
            rect(this.x+this.size.x*0.04, this.y-this.size.y*0.1875+this.size.y/10, 3*this.size.x/50, this.size.y/10);
            
            //left leg
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            rect(this.x+this.size.x*0.01, this.y-this.size.y*0.1875, 3*this.size.x/50, this.size.y/5);
            fill(255);
            rect(this.x+this.size.x*0.01, this.y-this.size.y*0.1875+this.size.y/10, 3*this.size.x/50, this.size.y/10);
            fill(0);
            ellipse(this.x+this.size.x*0.08, this.y-this.size.y*0.1875+this.size.y/5, 7*this.size.x/50, 4*this.size.x/50);

            //dress
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            curveVertex(this.x, this.y-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/10, this.y-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/5, this.y-this.size.y*0.1875);
            curveVertex(this.x-this.size.x/5, this.y-this.size.y*0.1875);
            endShape(CLOSE);
                
            fill(255);
            beginShape();
            vertex(this.x, this.y-this.size.y*0.4875);
            bezierVertex(this.x, this.y-this.size.y*0.4875,
                        this.x+this.size.x/30, this.y-this.size.y*0.3875,
                        this.x+this.size.x/10, this.y-this.size.y*0.4875);
            endShape(CLOSE);
            ellipse(this.x+this.size.x/7, this.y-this.size.y*0.3875,1.5*this.size.x/50);
            ellipse(this.x+this.size.x/8.2, this.y-this.size.y*0.4375,1.5*this.size.x/50);
            
            //hands
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            vertex(this.x, this.y-this.size.y*0.4875);
            bezierVertex(this.x+this.size.x/10, this.y-this.size.y*0.4875,
                        this.x-this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x-this.size.x/20, this.y-this.size.y*0.3475);
            endShape();
            beginShape();
            vertex(this.x+this.size.x/10, this.y-this.size.y*0.4875);
            bezierVertex(this.x+this.size.x/10, this.y-this.size.y*0.4875,
                        this.x+this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x+this.size.x/5.1, this.y-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x-this.size.x/3.5, this.y-this.size.y*0.3475,4*this.size.x/50);
            ellipse(this.x+this.size.x/2.75, this.y-this.size.y*0.3475,4*this.size.x/50);
        }
        else if (this.walkingLeft == true)
        {
            //head
            fill(0);
            noStroke();
            
            arc(this.x, this.y-this.size.y*0.55, this.size.x/1.7, this.size.x/1.1,  -PI*0.8, 0, PIE)
            fill(this.dressColour);
            stroke(0);
            //arc(this.x, this.y-this.size.y*0.55, this.size.x/1.7, this.size.x/1.1, PI, PI*1.79, PIE)
            //headflower
            ellipse(this.x+this.size.x/8, this.y-this.size.y*0.78,2*this.size.x/50);
            ellipse(this.x+this.size.x/7, this.y-this.size.y*0.77,1.5*this.size.x/50);
            ellipse(this.x+this.size.x/6, this.y-this.size.y*0.76,2*this.size.x/50);
            
            //neck
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            ellipse(this.x-this.size.x/20, this.y-this.size.y*0.51, 4*this.size.x/50, 8*this.size.x/50)

            //Hair and  face
            var yPos = this.y+5
            fill(250, 235, 215);
            stroke(0);
            arc(this.x-this.size.x/25, yPos-this.size.y*0.725, this.size.x/2.5, this.size.x/1.9, 0, PI, CHORD);
            noStroke();
            beginShape();
            for (var i = 0; i < 11; i++)
                {
                    if (i%2 == 0)
                        {
                            vertex(this.x-this.size.x/4.3+i*this.size.x/30, yPos-this.size.y*0.72);
                        }
                   else
                        {
                            vertex(this.x-this.size.x/4.3+i*this.size.x/30, yPos-this.size.y*0.75);
                        }
                }
            endShape(CLOSE);            
            fill(240,128,128);
            ellipse(this.x-this.size.x/15, this.y-this.size.y*0.57, 2*this.size.x/50);

            //eyes
            fill(0);
            ellipse(this.x-this.size.x/6, this.y-this.size.y*0.6175, 2*this.size.x/50, 2.5*this.size.x/50 );
            fill(255);
            noStroke();
            ellipse(this.x-this.size.x/5.9, this.y+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            
            //mouth
            fill(0)
            stroke(0);
            line(this.x-this.size.x/6.5, this.y-this.size.y*0.556, this.x-this.size.x/5.5, this.y-this.size.y*0.55)
            
            // legs
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            rect(this.x-this.size.x*0.04, this.y-this.size.y*0.1875, 3*this.size.x/50, this.size.y/5);
            fill(255);
            rect(this.x-this.size.x*0.04, this.y-this.size.y*0.1875+this.size.y/10, 3*this.size.x/50, this.size.y/10); 
            //left leg
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            rect(this.x-this.size.x*0.01, this.y-this.size.y*0.1875, 3*this.size.x/50, this.size.y/5);
            fill(255);
            rect(this.x-this.size.x*0.01, this.y-this.size.y*0.1875+this.size.y/10, 3*this.size.x/50, this.size.y/10);
            fill(0);
            ellipse(this.x-this.size.x*0.01, this.y-this.size.y*0.1875+this.size.y/5, 7*this.size.x/50, 4*this.size.x/50);

            //dress
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            curveVertex(this.x, this.y-this.size.y*0.4875);
            curveVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875);
            curveVertex(this.x-this.size.x/5, this.y-this.size.y*0.1875);
            curveVertex(this.x+this.size.x/5, this.y-this.size.y*0.1875);
            endShape(CLOSE);
                
            fill(255);
            beginShape();
            vertex(this.x, this.y-this.size.y*0.4875);
            bezierVertex(this.x, this.y-this.size.y*0.4875,
                        this.x-this.size.x/30, this.y-this.size.y*0.3875,
                        this.x-this.size.x/10, this.y-this.size.y*0.4875);
            endShape(CLOSE);
            ellipse(this.x-this.size.x/7, this.y-this.size.y*0.3875,1.5*this.size.x/50);
            ellipse(this.x-this.size.x/8.2, this.y-this.size.y*0.4375,1.5*this.size.x/50);
            
            //hands
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            vertex(this.x, this.y-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875,
                        this.x+this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x+this.size.x/20, this.y-this.size.y*0.3475);
            endShape();
            beginShape();
            vertex(this.x-this.size.x/10, this.y-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875,
                        this.x-this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x-this.size.x/5.1, this.y-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x+this.size.x/3.5, this.y-this.size.y*0.3475,4*this.size.x/50);
            ellipse(this.x-this.size.x/2.75, this.y-this.size.y*0.3475,4*this.size.x/50);
        }
        else 
        {
            // legs
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            rect(this.x-this.size.x/10, this.y-this.size.y*0.1875, 4*this.size.x/50, this.size.y/5);
            rect(this.x+this.size.x/10-4*this.size.x/50, this.y-this.size.y*0.1875, 4*this.size.x/50, this.size.y/5);
            fill(255);
            rect(this.x-this.size.x/10, this.y-this.size.y*0.1875+this.size.y/10, 4*this.size.x/50, this.size.y/10);
            rect(this.x+this.size.x/10-4*this.size.x/50, this.y-this.size.y*0.1875+this.size.y/10, 4*this.size.x/50, this.size.y/10);
            fill(0);
            ellipse(this.x-this.size.x/10+2*this.size.x/50, this.y-this.size.y*0.1875+this.size.y/5, 5*this.size.x/50, 4*this.size.x/50);
            ellipse(this.x+this.size.x/10-2*this.size.x/50, this.y-this.size.y*0.1875+this.size.y/5, 5*this.size.x/50, 4*this.size.x/50);
            
            //hands
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            vertex(this.x-this.size.x/10, this.y-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875,
                        this.x-this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x-this.size.x/5.6, this.y-this.size.y*0.3475);
            endShape();
            beginShape();
            vertex(this.x+this.size.x/10, this.y-this.size.y*0.4875);
            bezierVertex(this.x+this.size.x/10, this.y-this.size.y*0.4875,
                        this.x+this.size.x/1.5, this.y-this.size.y*0.2875,
                        this.x+this.size.x/5.1, this.y-this.size.y*0.3475);
            endShape();
            fill(250, 235, 215);
            ellipse(this.x-this.size.x/2.75, this.y-this.size.y*0.3475,4*this.size.x/50);
            ellipse(this.x+this.size.x/2.75, this.y-this.size.y*0.3475,4*this.size.x/50);
            
            //draw stading infront face
            this.drawFrontHead(0);
            //dress
            fill(this.dressColour);
            stroke(0);
            strokeWeight(0.5);
            beginShape();
            curveVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/10, this.y-this.size.y*0.4875);
            curveVertex(this.x+this.size.x/5, this.y-this.size.y*0.1875);
            curveVertex(this.x-this.size.x/5, this.y-this.size.y*0.1875);
            endShape(CLOSE);
                
            fill(255);
            beginShape();
            vertex(this.x-this.size.x/10, this.y-this.size.y*0.4875);
            bezierVertex(this.x-this.size.x/10, this.y-this.size.y*0.4875,
                        this.x-this.size.x/12, this.y-this.size.y*0.3875,
                        this.x, this.y-this.size.y*0.4875);
            bezierVertex(this.x, this.y-this.size.y*0.4875,
                        this.x+this.size.x/12, this.y-this.size.y*0.3875,
                        this.x+this.size.x/10, this.y-this.size.y*0.4875);
            endShape(CLOSE);
            ellipse(this.x, this.y-this.size.y*0.3875,2*this.size.x/50);
            ellipse(this.x, this.y-this.size.y*0.4375,2*this.size.x/50);
        }; 
    };
    
    //function to draw from head to neck in front perspective
    this.drawFrontHead = function(adjusty)
    {
            //head
            fill(0);
            noStroke();
            
            arc(this.x, this.y+adjusty-this.size.y*0.554, this.size.x/1.5, this.size.x/1.1, PI, PI*2, CHORD)
            fill(this.dressColour);
            stroke(0);
            //headflower
            ellipse(this.x+this.size.x/8, this.y+adjusty-this.size.y*0.78,2*this.size.x/50);
            ellipse(this.x+this.size.x/7, this.y+adjusty-this.size.y*0.77,1.5*this.size.x/50);
            ellipse(this.x+this.size.x/6, this.y+adjusty-this.size.y*0.76,2*this.size.x/50);
            
            //neck
            fill(250, 235, 215);
            stroke(0);
            strokeWeight(0.5);
            ellipse(this.x, this.y+adjusty-this.size.y*0.51, 4*this.size.x/50, 8*this.size.x/50)

            //Hair and  face
            fill(250, 235, 215);
            noStroke();
            beginShape();
            for (var i = 0; i < 15; i++)
                {
                    if (i%2 == 0)
                        {
                            vertex(this.x-this.size.x/4+i*this.size.x/30, this.y+adjusty-this.size.y*0.6375);
                        }
                   else
                        {
                            vertex(this.x-this.size.x/4+i*this.size.x/30, this.y+adjusty-this.size.y*0.6875);
                        }
                }
            endShape(CLOSE);   
            stroke(0);
            arc(this.x, this.y+adjusty-this.size.y*0.6375, this.size.x/2, this.size.x/2.5, 0, PI, OPEN);
            noStroke();
            fill(240,128,128);
            ellipse(this.x-this.size.x/7, this.y+adjusty-this.size.y*0.5875, 2*this.size.x/50);
            ellipse(this.x+this.size.x/7, this.y+adjusty-this.size.y*0.5875, 2*this.size.x/50);

            //eyes
            fill(0);
            ellipse(this.x-this.size.x/12, this.y+adjusty-this.size.y*0.6175, 2*this.size.x/50);
            ellipse(this.x+this.size.x/12, this.y+adjusty-this.size.y*0.6175, 2*this.size.x/50);
            fill(255);
            noStroke();
            ellipse(this.x-this.size.x/13, this.y+adjusty+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            ellipse(this.x+this.size.x/11, this.y+adjusty+this.size.y*9/80-this.size.y*0.732, 1*this.size.x/50);
            
            //mouth
            stroke(0);
            strokeWeight(0.5);
            fill(240,128,128);
            beginShape();
            vertex(this.x-this.size.x/14, this.y+adjusty-this.size.y*0.5725);
            bezierVertex(this.x-this.size.x/14, this.y+adjusty-this.size.y*0.5775,
                       this.x, this.y+adjusty-this.size.y*0.4875,
                       this.x+this.size.x/14, this.y+adjusty-this.size.y*0.5775);
            endShape(CLOSE);
    };
    
}

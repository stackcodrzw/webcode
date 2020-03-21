const http = require('http')
const Bot = require('messenger-bot')
var cn = require('chuck-norris-api');
const worldfootball = "worldfootball";
const fifa_news_back = "fifanewsback";
const cricinfo = "cricinfo";
const chat = "lets_chat";
const other = "other_stuff";
const rugby = "rugby";
var cn = require('chuck-norris-api');
const start = "start_button";
const sportNews= "football_news";
const jokes = "jokes";
const more = "more";
var stream;
var zimstream;
var cricstream
var rugbystream;
var gagScraper = require('9gag-scraper')
var gagcounter = 0;
const AIMLInterpreter = require('aimlinterpreter');

var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed 
var req = request('http://feeds.feedburner.com/soccernewsfeed?format=xml')
var zimreq = request('http://www.soccer24.co.zw/feed/');
var cricreq = request('http://feeds.sport24.co.za/articles/Sport/Cricket/rss');
var rugbyreq = request('http://feeds.sport24.co.za/articles/Sport/Rugby/rss');
var feedparser = new FeedParser();
var zimparser = new FeedParser();
var cricparser = new FeedParser();
var rugbyparser = new FeedParser();
const express = require('express');

var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['aiml/salutation.aiml']);
aimlInterpreter.loadAIMLFilesIntoArray(['aiml/insult.aiml']);

 
let app = express();
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var HTML_FILE_URL = 'cv/index.html';

$(document).ready(function() {
    $.get(HTML_FILE_URL, function(data) {
        var fileDom = $(data);
        res.write(fileDom)
    });
});
  
  
  res.end();
});


req.on('error', function (error) {
  // handle any request errors 
});
 
req.on('response', function (res) {
  var stream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    stream.pipe(feedparser);
  }
});
zimreq.on('error', function (error) {
  // handle any request errors 
});
 
zimreq.on('response', function (res) {
  var zimstream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    zimstream.pipe(zimparser);
  }
});

cricreq.on('error', function (error) {
  // handle any request errors 
});
 
cricreq.on('response', function (res) {
  var cricstream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    cricstream.pipe(cricparser);
  }
});
 cricparser.on('error', function (error) {
  // always handle errors 
});
 
cricparser.on('readable', function () {
  // This is where the action is! 
  cricstream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
 
});

rugbyreq.on('error', function (error) {
  // handle any request errors 
});
 
rugbyreq.on('response', function (res) {
  var rugbystream = this; // `this` is `req`, which is a stream 
 
  if (res.statusCode !== 200) {
    this.emit('error', new Error('Bad status code'));
  }
  else {
    rugbystream.pipe(rugbyparser);
  }
});
 rugbyparser.on('error', function (error) {
  // always handle errors 
});
 
rugbyparser.on('readable', function () {
  // This is where the action is! 
  rugbystream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
 
});
feedparser.on('error', function (error) {
  // always handle errors 
});
 
feedparser.on('readable', function () {
  // This is where the action is! 
  stream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
  var item;
 
});

let bot = new Bot({
  token: process.env.PAGE_ACCESS_TOKEN ,
  verify: process.env.VERIFY_TOKEN,
  app_secret: 'b61ed7342a88cd58b4eed771b0fa09ea'
})

bot.setGetStartedButton({"get_started":{
    "payload":"start"
  }});


bot.setPersistentMenu({ persistent_menu:[
    {
      locale:"default",
      composer_input_disabled:true,
      call_to_actions:[
        {
          title:"Sports News",
          type:"nested",
          call_to_actions:[
            {
              title:"Football news",
              type:"postback",
              payload:"nextArticle"
            },
            {
              title:"Cricket news",
              type:"postback",
              payload:"cricinfo"
            },
            {
              title:"Rugby news",
              type:"postback",
              payload:"rugby"
            }
          ]
        }
      ]
    }
  ]});


bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('postback', (payload, reply, actions) => {
  let data = payload.postback.payload
  if(data){
    switch(data)
        {
      case sportNews:
      reply({attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Soccer",
            subtitle: "All Football News",               
            image_url: "https://cdn.glitch.com/6ff163e0-712c-4cde-82af-4158ee0b6fa2%2Fthumbnails%2Ff86909db04a026f32a22c30bdca3bd3b_girl20soccer20player-soccer-player-silhouette-clipart_1296-1296.jpeg?1493294799289",
            
          buttons: [{
              type: "postback",
              title: "World Football",
              payload: "nextArticle"
            },
                      {
              type: "postback",
              title: "Zimbabwe Football",
              payload: "zim_news"
            }],}, {
            title: "Cricket",
            subtitle: "All Cricket News",               
            image_url: "https://cdn.glitch.com/6ff163e0-712c-4cde-82af-4158ee0b6fa2%2Fthumbnails%2Fbat.png?1493294800547",
            
          buttons: [{
              type: "postback",
              title: "World Cricket",
              payload: "cricinfo"
            },
                      {
              type: "postback",
              title: "Zimbabwe Cricket",
              payload: "zimbo"
            }],},{
            title: "Rugby",
            subtitle: "All Rugby News",               
            image_url: "https://cdn.glitch.com/6ff163e0-712c-4cde-82af-4158ee0b6fa2%2Fthumbnails%2Fae8fb41a30c5df4f967f70c481224218.jpg?1493294797977",
            
          buttons: [{
              type: "postback",
              title: "World Rugby",
              payload: "rugby"
            },
                      {
              type: "postback",
              title: "Zimbabwe Rugby",
              payload: "zimbo"
            }]}
             
           ]
        }
      }})
      
        break;

	case "zimbo":
	reply({text:"Sorry I failed to get the data you requested,I will tell my botmaster about it so that he can fix it."});
	break;

      case jokes:
       cn.getRandom().then(function (data) {
    //console.log();
    var joke = data.value.joke;
reply({
attachment: {
        type: "template",
        payload: {
          "template_type":"button",
        "text":joke,
        "buttons":[
          {
            "type":"postback",
            "title":"Next Joke",
            "payload":jokes
          }
          ]
        }
      }
    });
       }); 
        break;
      case more:
        new gagScraper("trending").getGags(function (error, data) {
     
    console.log(data.count); // Total posts returned 
    console.log(data.gags); // posts object ( array of posts ) 
    
    console.log(data.gags[0].id); // 9GAG post ID 
    console.log(data.gags[0].url); // 9GAG post URL 
    console.log(data.gags[0].title); // 9GAG post title 
    console.log(data.gags[0].image); // 9GAG post image link 
	
	if(data.count>gagcounter)
	{

reply({ attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: data.gags[gagcounter].title,
            item_url: data.gags[gagcounter].link,
            image_url:data.gags[gagcounter].image,
           buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next 9gag",
              payload: "more"
            }]
          }
          ]
        }
      }});
	gagcounter = gagcounter + 1;
	}	
          });
        break;
      case "nextArticle":
        feedparser.on('readable', function () {
  // This is where the action is! 
  stream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
});    
      
        reply({
attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: stream.read().title,
            subtitle: stream.read().summary,
            item_url: stream.read().link,               
           buttons: [{
              "type":"element_share"
            }
            ],
          },{
            title: stream.read().title,
            subtitle: stream.read().summary,
            item_url: stream.read().link,               
           buttons: [{
              "type":"element_share"
            },
              ],
          },{
            title: stream.read().title,
            subtitle: stream.read().summary,
            item_url: stream.read().link,               
           buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "nextArticle"
            }],
          }
          ]
        }
      }
    });
        break;
      case fifa_news_back :
        //sendFifaList(senderID);
        break;
      case "soccer":
        //sendFifaList(senderID);
        break;
      case "zim_news":     
zimparser.on('readable', function () {
  // This is where the action is! 
  zimstream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
  console.log(zimstream);
});
console.log(zimstream);
reply({attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: zimstream.read().title,
            subtitle: zimstream.read().title,
            item_url: zimstream.read().link,               
            image_url: "https://pbs.twimg.com/profile_images/448144133761146880/3pyUJ-SW_400x400.png",
            buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "nextArticleZim"
            }]
          },
           {
            title: zimstream.read().title,
            subtitle: zimstream.read().title,
            item_url: zimstream.read().link,               
            image_url: "https://pbs.twimg.com/profile_images/448144133761146880/3pyUJ-SW_400x400.png",
            buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "nextArticleZim"
            }],
          },
                     {
            title: zimstream.read().title,
            subtitle: zimstream.read().title,
            item_url: zimstream.read().link,               
            image_url: "https://pbs.twimg.com/profile_images/448144133761146880/3pyUJ-SW_400x400.png",
            buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "nextArticleZim"
            }],
          }
          ]
        }
      }
    })

        break;
      case "cricinfo":
        cricparser.on('readable', function () {
  // This is where the action is! 
  cricstream = this; // `this` is `feedparser`, which is a stream 
  var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
});

   console.log(cricstream.read());
 reply({
attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: cricstream.read().title,
            subtitle: cricstream.read().summary,
            item_url: cricstream.read().link,               
           buttons: [{
              "type":"element_share"
            }
            ],
          },{
            title: cricstream.read().title,
            subtitle: cricstream.read().summary,
            item_url: cricstream.read().link,               
           buttons: [{
              "type":"element_share"
            },
              ],
          },{
            title: cricstream.read().title,
            subtitle: cricstream.read().summary,
            item_url: cricstream.read().link,               
           buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "cricinfo"
            }],
          }
          ]
        }
      }
    });
        break;
      case "back":
         //sendSportList(senderID);
        break;
      case "nextArticleZim":
        //sendTextMessage(senderID, "Soccer24.co.zw News");
        //zimParseRss(senderID);
        break;
      case "rugby":
	rugbyparser.on('readable', function () {
  	// This is where the action is! 
 	 rugbystream = this; // `this` is `feedparser`, which is a stream 
  	var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance 
	});
	console.log(rugbystream.read());
        reply({
attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: rugbystream.read().title,
            subtitle: rugbystream.read().summary,
            item_url: rugbystream.read().link,               
           buttons: [{
              "type":"element_share"
            }
            ],
          },{
            title: rugbystream.read().title,
            subtitle: rugbystream.read().summary,
            item_url: rugbystream.read().link,               
           buttons: [{
              "type":"element_share"
            },
              ],
          },{
            title: rugbystream.read().title,
            subtitle: rugbystream.read().summary,
            item_url: rugbystream.read().link,               
           buttons: [{
              "type":"element_share"
            },
                      {
              type: "postback",
              title: "Next Article",
              payload: "rugby"
            }],
          }
          ]
        }
      }
    });
	break;
      case "nextCricketArticle":
        //sendTextMessage(senderID, "Oopsy!!! Something went wrong, I will notify the botmaster.");
        //errorImage(senderID);
        break;
      
      default:
        //sendTextMessage(senderID, payload);
        break;
    }
  }
})


bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

     if(text) {
    // f we receive a text message, check to see if it matches a keyword
    // and send back the template example. Otherwise, just echo the text we received.
       
       

    switch (text) {
      case 'generic':
        
        break;
      case 'hi':
        var greeting = `Hello ${profile.first_name}. What can I do for you.`;
        reply({
      attachment:{
      type:"template",
      payload:{
        template_type:"button",
        text:greeting,
        buttons:[
          {
            type:"postback",
            payload:sportNews,
            title:"Sports News"
          },
          {
            type:"postback",
            title:"Jokes",
            payload:jokes
          },
          {
            type:"postback",
            title:"More",
            payload:more
          }
        ]
        }
      }
    }, (err) => {
      if (err) throw err
    })
      break;
  
      default:
        
        var callback = function(answer, wildCardArray, input){
console.log(answer + ' | ' + wildCardArray + ' | ' + input);
          
          if(answer==null)
            {
               var greeting = "Main Menu";
       reply({
      attachment:{
      type:"template",
      payload:{
        template_type:"button",
        text:greeting,
        buttons:[
          {
            type:"postback",
            payload:sportNews,
            title:"Sports News"
          },
          {
            type:"postback",
            title:"Jokes",
            payload:jokes
          },
          {
            type:"postback",
            title:"More",
            payload:more
          }
        ]
        }
      }
    }, (err) => {
      if (err) throw err
    })
            }
          else
            {
              var greeting = `Hello ${profile.first_name}. What can I do for you.`;
        reply({
      attachment:{
      type:"template",
      payload:{
        template_type:"button",
        text:greeting,
        buttons:[
          {
            type:"postback",
            payload:sportNews,
            title:"Sports News"
          },
          {
            type:"postback",
            title:"Jokes",
            payload:jokes
          },
          {
            type:"postback",
            title:"More",
            payload:more
          }
        ]
        }
      }
    }, (err) => {
      if (err) throw err
    })
            }
          
};

aimlInterpreter.findAnswerInLoadedAIMLFiles(text, callback);
        
       
    }
  } 
    
  })
})

http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
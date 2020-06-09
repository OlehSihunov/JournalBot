const TelegramBot  =require ('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const kb = require('./keyboard-buttons')
const keyboard = require("./keyboard")
const voc = require("./voc")
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL,{
    useNewUrlParser: true,
   
}).then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))

var database = mongoose.connection
helper.logStart()

const ACTION_TYPE  = {
    DEFAULT: "DF",
    ADD_NEW_ITEM_TO_MONTHLY_LIST: "AM",
    ADD_NEW_ITEM_TO_WEEKLY_LIST: "AW",
    ADD_NEW_ITEM_TO_USER_LIST: "AU",
    ADD_NEW_ITEM_TO_TRACK_LIST: "AT",
    IN_TRACK:"IT"
}

const INNER_ACTION_TYPE = {
    CHECK_COMPLETE:"cc",
    MAKE_IMPORTANT:"mi",
    DELETE_COMPLETED:"dc",
    TRACK_CHANGE:"tc",
    DELETE_TRACK:"dt"
}

const LIST_TYPE ={
    MONTH:"ml",
    WEEK:"wl",
    USER: 'ul'
}

const bot = new TelegramBot(config.TOKEN,{
    polling: true
})

const WeeklySchema = new mongoose.Schema({
    userID: {
        type:String,
        required: true,
    },
    list:{
        type: String
    },
    complete:{
        type: Boolean,
        default:false
    },
    important:{
        type: Boolean,
        default:false
    }
})
const userlist = mongoose.model('userlist',WeeklySchema)

const weeklist= mongoose.model('weeklist', WeeklySchema)

const monthlist = mongoose.model('monthlist',WeeklySchema)


const TrackListSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    list:{
        type:[Boolean],
        default:[]
    }

})

const tracks = mongoose.model('track',TrackListSchema)

const UserSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    lang:{
        type:String,
        default:"ua"
    },
    action:{
        type:String,
        default: ACTION_TYPE.DEFAULT
    },
    stats:{
        type:Number,
        default:0
    },
})

const users = mongoose.model('user',UserSchema);


function splitforme(str){
    res= str.split(' ')
    console.log(res[0])
    console.log(res[1])
    return {
        type: res[0],
        listType:res[1]
    }
}
var lan;
async function getLang(chatId){
   let user =  await users.findOne({userID:chatId})
   if(user == null)
    user =  new users({userID:chatId})
   await user.save()
   return user.lang;
}
async function changeLang(chatId,ln){
    let user =  await users.findOne({userID:chatId})
    user.lang = ln
    await user.save()
   
    return user.lang;
}

async function getAction(chatId){
    let user =  await users.findOne({userID:chatId})
    if(user == null)
     user =  new users({userID:chatId})
    await user.save()
    return user.action;
 }

 async function getProfile(chatId,name){
    let user =  await users.findOne({userID:chatId})

    var str = `${voc.pname(user.lang)}${name}\n\n${voc.plang(user.lang)}${getFlag(user.lang)}\n\n${voc.pcount(user.lang)}${user.stats}`
    return str;
 }
 function getFlag(lang)
 {
     switch(lang){
         case "en":
            return "🇬🇧"
         case "ru":
            return "🇷🇺"
         case "ua": 
            return "🇺🇦"
     }  
 }

 async function changeAction(chatId,act){
     let user =  await users.findOne({userID:chatId})
     user.action = act
     await user.save()
     return user.action;
 }
 async function addCount(chatId){
    let user =  await users.findOne({userID:chatId})
    user.stats  = user.stats+1
    await user.save()
    return user.stats;
}
 var action;
var a;
bot.on('message', async msg =>{
    
    const chatId = helper.getChatId(msg)
    lan =await getLang(chatId);
    action = await getAction(chatId);
    console.log(action)
    switch(action){
        case ACTION_TYPE.DEFAULT:
            switch(msg.text){
                case kb.userList.stop(lan):{
                    bot.sendMessage(chatId,voc.backtolists(lan),{
                        reply_markup:{
                            keyboard: keyboard.lists(lan),
                            resize_keyboard:true
                        }
                    })
                    break;
                }
                
                case kb.home.lists(lan):
                    bot.sendMessage(chatId,voc.chlist(lan),
                    {reply_markup:
                        {keyboard:keyboard.lists(lan),
                            resize_keyboard:true}
                    })
                    break;
                case kb.home.profile(lan):
                    let str =await getProfile(chatId,msg.from.first_name)
                    bot.sendMessage(chatId,str,
                    {reply_markup:
                        {keyboard:keyboard.profile(lan),
                            resize_keyboard:true}
                    })
                    break;
                case kb.home.language(lan):
                     bot.sendMessage(chatId,voc.clang(lan),
                    {reply_markup:
                          {keyboard:keyboard.languages(lan),
                             resize_keyboard:true}
                     })
                    break;
                case kb.languages.en:
                    lan =  await changeLang(chatId,'en')
                   
                    bot.sendMessage(chatId,"Great!You chose English language!",
                    {reply_markup:
                          {keyboard:keyboard.home(lan),
                             resize_keyboard:true}
                     })
                    break;
                 case kb.languages.ru:
                     lan =  await changeLang(chatId,'ru')
                    
                    bot.sendMessage(chatId,"Отлично!Ты выбрал русский язык!",
                    {reply_markup:
                          {keyboard:keyboard.home(lan),
                             resize_keyboard:true}
                     })
                    break;
                 case kb.languages.ua:
                    lan =  await changeLang(chatId,'ua')
                   
                    bot.sendMessage(chatId,"Чудово!Ви обрали українську мову!",
                    {reply_markup:
                          {keyboard:keyboard.home(lan),
                             resize_keyboard:true}
                     })
                    break;
                case kb.home.track(lan):
                    await changeAction(chatId,ACTION_TYPE.IN_TRACK);
                    sendTracks(chatId);
                    break;
                
                case kb.lists.monthlyList(lan):
                   bot.sendMessage(chatId,voc.lfm(lan),
                   {reply_markup:{keyboard: keyboard.monthlyList(lan),
                    resize_keyboard:true}})
                   getMonthListByQuery(chatId);
                    break;
                
                case kb.lists.weeklyList(lan):
                    bot.sendMessage(chatId,voc.lfw(lan),
                    {reply_markup:
                        {
                            keyboard:keyboard.weeklyList(lan),
                            resize_keyboard:true}
                    })
                    getWeekListByQuery(chatId)
                    break;
                case kb.lists.userList(lan):
                        bot.sendMessage(chatId,voc.lwt(lan),
                        {reply_markup:
                            {
                                keyboard:keyboard.userList(lan),
                                resize_keyboard:true}
                        })
                        getUserListByQuery(chatId)
                        break;
                case kb.home.instruction(lan):
                    bot.sendMessage(chatId,voc.instr(lan))
                    break;
                case kb.lists.back(lan):
                    bot.sendMessage(chatId,voc.back(lan),
                    {reply_markup:
                        {keyboard:keyboard.home(lan),
                            resize_keyboard:true}
                    })
                    break;
                case kb.monthlyList.addNewItem(lan):
                    console.log("month+list")
                    await changeAction(chatId,ACTION_TYPE.ADD_NEW_ITEM_TO_MONTHLY_LIST)
                     bot.sendMessage(chatId,voc.newItemToList(lan),
                      {reply_markup: 
                        
                        {keyboard: keyboard.getBack(lan),
                            resize_keyboard:true}})
                     break;
                
                  
                 case kb.weeklyList.addNewItem(lan):
                    console.log("week+list")
                    await changeAction(chatId,ACTION_TYPE.ADD_NEW_ITEM_TO_WEEKLY_LIST)
                        bot.sendMessage(chatId,voc.newItemToList(lan),
                         {reply_markup: 
                            {keyboard: keyboard.getBack(lan),
                                resize_keyboard:true}})
                        break;
                 case kb.userList.addNewItem(lan):
                    console.log("user+list")
                    await changeAction(chatId, ACTION_TYPE.ADD_NEW_ITEM_TO_USER_LIST)
                        bot.sendMessage(chatId,voc.newItemToList(lan),
                         {reply_markup: 
                            {keyboard: keyboard.getBack(lan),
                                resize_keyboard:true}})
                         break;
                   
                       }
                 
                 default:
             break;  
               
        case ACTION_TYPE.ADD_NEW_ITEM_TO_MONTHLY_LIST:
            
            switch(msg.text){
                case kb.lists.back(lan):{
                    await changeAction(chatId,ACTION_TYPE.DEFAULT)
                    
                    bot.sendMessage(chatId,voc.back(lan),
                    {reply_markup:
                        {
                            keyboard:keyboard.lists(lan),
                            resize_keyboard:true}
                    })
                    break;
                }
                default:{
                    console.log("month")
                    new monthlist({userID:chatId, list:msg.text}).save().then(async ()=>{
                        await getMonthListByQuery(chatId)
                    });
                }
            }
            break;
            case ACTION_TYPE.ADD_NEW_ITEM_TO_USER_LIST:
            
                switch(msg.text){
                    case kb.lists.back(lan):{
                        await changeAction(chatId,ACTION_TYPE.DEFAULT)
                        
                        bot.sendMessage(chatId,voc.back(lan),
                        {reply_markup:
                            {
                                keyboard:keyboard.lists(lan),
                                resize_keyboard:true}
                        })
                        break;
                    }
                    default:{
                        console.log("user")
                        new userlist({userID:chatId, list:msg.text}).save().then(async ()=>{
                            await getUserListByQuery(chatId)
                        });
                    }
                }
                break;
         case ACTION_TYPE.ADD_NEW_ITEM_TO_WEEKLY_LIST:
            
             switch(msg.text){
                    case kb.lists.back(lan):{
                        await changeAction(chatId,ACTION_TYPE.DEFAULT)
                        
                        bot.sendMessage(chatId,voc.back(lan),
                        {reply_markup:
                            {
                                keyboard:keyboard.lists(lan),
                                resize_keyboard:true}
                        })
                        break;
                    }
                    default:{
                        console.log("week")
                       new weeklist({userID:chatId, list:msg.text}).save().then(async ()=>{
                            await getWeekListByQuery(chatId)
                        });
                    }
             }
             break;
             case ACTION_TYPE.ADD_NEW_ITEM_TO_TRACK_LIST:
            
                switch(msg.text){
                       case kb.lists.back(lan):{
                           
                           bot.sendMessage(chatId,voc.back(lan))
                           sendTracks(chatId)
                           await changeAction(chatId,ACTION_TYPE.IN_TRACK)
                           break;
                       }
                       default:{
                        console.log(124)
                            addNewTrackToBase(chatId ,msg.text)
                            console.log(124)
                       }
                }
                break;
            case ACTION_TYPE.IN_TRACK:{
                switch(msg.text){
                case kb.track.addNewTrack(lan):
                    await changeAction(chatId,ACTION_TYPE.ADD_NEW_ITEM_TO_TRACK_LIST)
                         bot.sendMessage(chatId,voc.fornewTrack(lan),
                          {reply_markup: 
                             {keyboard: keyboard.getBack(lan),
                                resize_keyboard:true}})
                        break;
                case kb.track.back(lan):
                    await changeAction(chatId,ACTION_TYPE.DEFAULT);
                     bot.sendMessage(chatId,voc.back(lan),
                            {reply_markup:
                                {keyboard:keyboard.home(lan),
                                    resize_keyboard:true}
                            })
                            break;
                default:{
                    getTrack(chatId,msg.text)
                    break;
                }
            }
            }
        
        

    }


    
})

 bot.on('callback_query',query =>{
    let data;
    let type;
    let listType;
    try{
        data = JSON.parse(query.data)
        if(data.data !=undefined)
        {
            type = splitforme(data.data).type
            listType = splitforme(data.data).listType
        }
        else{
            type = data.type
        }
    }catch(e){
        throw new Error("Data is not an object")
    }
    
    
    if(type === INNER_ACTION_TYPE.CHECK_COMPLETE){
        addCount(helper.getChatId(query.message))
        if(listType ==LIST_TYPE.WEEK)
            weeklist.findById(data.taskId).then(async (task)=>{
            task.complete = task.complete?false:true;
            task.save()
            await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
            
            await getWeekListByQuery(helper.getChatId(query.message))
         })
         else if(listType ==LIST_TYPE.MONTH)
         {
            monthlist.findById(data.taskId).then(async (task)=>{
                task.complete = task.complete?false:true;
                task.save()
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
                
                await getMonthListByQuery(helper.getChatId(query.message))})
        }
        else if(listType ==LIST_TYPE.USER)
         {
            userlist.findById(data.taskId).then(async (task)=>{
                task.complete = task.complete?false:true;
                task.save()
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
                
                await getUserListByQuery(helper.getChatId(query.message))})
        }

    }
    else if(type == INNER_ACTION_TYPE.MAKE_IMPORTANT)
    {
        if(listType ==LIST_TYPE.WEEK){
            weeklist.findById(data.taskId).then(async(task)=>{
                task.important =task.important?false:true;
                task.save()
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
            
                await getWeekListByQuery(helper.getChatId(query.message))
             })
            }
             else if(listType ==LIST_TYPE.MONTH)
             {
                monthlist.findById(data.taskId).then(async(task)=>{
                    task.important =task.important?false:true;
                    task.save()
                    await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
                
                    await getMonthListByQuery(helper.getChatId(query.message))
                 })
             }
             else if(listType ==LIST_TYPE.USER)
             {
                userlist.findById(data.taskId).then(async(task)=>{
                    task.important =task.important?false:true;
                    task.save()
                    await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
                
                    await getUserListByQuery(helper.getChatId(query.message))
                 })
             }
    }else if(type == INNER_ACTION_TYPE.DELETE_COMPLETED)
    {
        if(listType ==LIST_TYPE.WEEK)
            weeklist.deleteMany({userID:helper.getChatId(query.message),complete:true}).then( async()=>{
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
            
                await getWeekListByQuery(helper.getChatId(query.message))
            })
        else if(listType ==LIST_TYPE.MONTH)
        {
           monthlist.deleteMany({userID:helper.getChatId(query.message),complete:true}).then( async()=>{
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
            
                await getMonthListByQuery(helper.getChatId(query.message))
            })
        }else if(listType ==LIST_TYPE.USER)
        {
           userlist.deleteMany({userID:helper.getChatId(query.message),complete:true}).then( async()=>{
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
            
                await getUserListByQuery(helper.getChatId(query.message))
            })
        }
      
    }else if(data.type == INNER_ACTION_TYPE.TRACK_CHANGE)
    {
        index = data.ind;
        id = data._id;
        chatId  = helper.getChatId(query.message);
        tracks.findById(id).then(async (task)=>{
            var arr =  task.list
           arr[index]=arr[index]?false:true;
           task.list  = arr
            task.markModified('list');
            task.save()
            await  bot.deleteMessage(chatId,query.message.message_id);
            await  getTrack(chatId,task.name);
        })
    }
    else if(type == INNER_ACTION_TYPE.DELETE_TRACK)
    {
        console.log(data._id)
            tracks.deleteOne({_id:data._id}).then( async()=>{
                await bot.deleteMessage(helper.getChatId(query.message),query.message.message_id);
                await sendTracks(helper.getChatId(query.message))
            })
       
      
    }
})


bot.onText(/\/start/, msg=>{
    lan = "en";
    const text = 'Hello , '+msg.from.first_name+voc.hello(lan);
    bot.sendMessage(helper.getChatId(msg), text,{
        reply_markup:{
            keyboard: keyboard.languages(lan),
            resize_keyboard:true
        }
    })
})


/******************************************************* */
function sendTracks(chatId){
    tracks.find({userID:chatId}).limit(3).then(s=>{
        var res =[]
        s.forEach(element=>{
            res.push([element.name])
          
        })
        if (res.length<3)
           res.push([kb.track.addNewTrack(lan)])
        res.push([kb.track.back(lan)])
        bot.sendMessage(chatId,voc.fornn(lan),{reply_markup:{
            keyboard: res,
            resize_keyboard:true
        }})
    })
   
}
function addNewTrackToBase(chatId,Name){
    var arr = new Array(30).fill(false);
    var tr = new tracks({userID:chatId,name:Name,list:arr})
   
    tr.save().then(async () =>{
        getTrack(chatId,Name)
    })
    
}
function getTrack(chatId,Name){
   tracks.findOne({userID:chatId,name:Name}).then(track=>{
    var keyboard=[]
    
    for (let index = 0; index < track.list.length; index++) {
        let first = Math.floor(index/5)
        if(keyboard[first]==undefined)
            keyboard.push([])

     
        keyboard[first].push({
            text: track.list[index]?`✅\n${index+1}`:`⬜\n${index+1}`,
            callback_data: JSON.stringify( {
            type:INNER_ACTION_TYPE.TRACK_CHANGE,
            ind:index,
            _id:track._id
        })
        })
    }
    keyboard.push([{
        text: voc.deleteTrack(lan),
        callback_data: JSON.stringify( {
        type:INNER_ACTION_TYPE.DELETE_TRACK,
        
        _id:track._id
    })
    }])
     bot.sendMessage(chatId,track.name,{
       reply_markup:{
           inline_keyboard:keyboard
       }
     } )
   })
}
function getWeekListByQuery(chatId){
    weeklist.find({userID:chatId}).then(wl=>{ 
        var result = []
        const html = wl.map((l,i)=>{
            var emod = l.complete?"✅":"⬜"
            var emod2 = l.important?"⚡":""
            result.push([{text:`${emod} ${l.list} ${emod2}`,callback_data:i}])
            result.push([{
                text: l.complete?kb.edittask.uncheck(lan):kb.edittask.check(lan), 
                callback_data:JSON.stringify({
                data: INNER_ACTION_TYPE.CHECK_COMPLETE +" "+LIST_TYPE.WEEK,
                taskId:l._id,

            })
            },
            {
                text:l.important?kb.edittask.unimportant(lan):kb.edittask.important(lan), 
                callback_data:JSON.stringify({
                data:INNER_ACTION_TYPE.MAKE_IMPORTANT +" "+LIST_TYPE.WEEK,
                taskId:l._id
                
            })}])
            return 0;
        })
        if(result.length!=0){
            result.push([{
                text:voc.deleteC(lan),
                callback_data:JSON.stringify({
                    data:INNER_ACTION_TYPE.DELETE_COMPLETED +" "+LIST_TYPE.WEEK,
                   
                })
            }])
            bot.sendMessage(chatId,voc.sep(lan),{
                reply_markup:{
                     inline_keyboard: result
                }
             })
           
        }else{
            bot.sendMessage(chatId,voc.listisempty(lan))
        }
        
        
    })
}

function getUserListByQuery(chatId){
    userlist.find({userID:chatId}).then(wl=>{ 
        var result = []
        const html = wl.map((l,i)=>{
            var emod = l.complete?"✅":"⬜"
            var emod2 = l.important?"⚡":""
            result.push([{text:`${emod} ${l.list} ${emod2}`,callback_data:i}])
            result.push([{
                text: l.complete?kb.edittask.uncheck(lan):kb.edittask.check(lan), 
                callback_data:JSON.stringify({
                data: INNER_ACTION_TYPE.CHECK_COMPLETE +" "+LIST_TYPE.USER,
                taskId:l._id,

            })
            },
            {
                text:l.important?kb.edittask.unimportant(lan):kb.edittask.important(lan), 
                callback_data:JSON.stringify({
                data:INNER_ACTION_TYPE.MAKE_IMPORTANT +" "+LIST_TYPE.USER,
                taskId:l._id
                
            })}])
            return 0;
        })
        if(result.length!=0){
            result.push([{
                text:voc.deleteC(lan),
                callback_data:JSON.stringify({
                    data:INNER_ACTION_TYPE.DELETE_COMPLETED +" "+LIST_TYPE.USER,
                   
                })
            }])
            bot.sendMessage(chatId,voc.sep(lan),{
                reply_markup:{
                     inline_keyboard: result
                }
             })
           
        }else{
            bot.sendMessage(chatId,voc.listisempty(lan))
        }
        
        
    })
}



function getMonthListByQuery(chatId){
    monthlist.find({userID:chatId}).then(wl=>{ 
        var result = []
        const html = wl.map((l,i)=>{
            var emod = l.complete?"✅":"⬜"
            var emod2 = l.important?"⚡":""
            result.push([{text:`${emod} ${l.list} ${emod2}`,callback_data:i}])
            result.push([{
                text: l.complete?kb.edittask.uncheck(lan):kb.edittask.check(lan), 
                callback_data:JSON.stringify({
                data: INNER_ACTION_TYPE.CHECK_COMPLETE +" "+LIST_TYPE.MONTH,
                taskId:l._id,
            })
            },
            {
                text:l.important?kb.edittask.unimportant(lan):kb.edittask.important(lan), 
                callback_data:JSON.stringify({
                data:INNER_ACTION_TYPE.MAKE_IMPORTANT+" "+LIST_TYPE.MONTH,
                taskId:l._id,
            })}])
            return 0;
        })
        if(result.length!=0){
            result.push([{
                text:voc.deleteC(lan),
                callback_data:JSON.stringify({
                    data:INNER_ACTION_TYPE.DELETE_COMPLETED+" "+LIST_TYPE.MONTH,
                   
                })
            }])
            bot.sendMessage(chatId,voc.sep(lan),{
                reply_markup:{
                     inline_keyboard: result
                }
             })
           
        }else{
            bot.sendMessage(chatId,voc.listisempty(lan))
        }
        
        
    })
}
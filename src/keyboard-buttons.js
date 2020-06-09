const vocab = require("./vocab")
module.exports = {

    home:{
        lists(lang){
            switch(lang){
                case "en":
                    return vocab.lissts.en
                case "ru":
                    return vocab.lissts.ru
                case "ua":
                    return vocab.lissts.ua
            }
        },
        instruction(lang){
            switch(lang){
                case "en":
                    return vocab.instruction.en
                case "ru":
                    return vocab.instruction.ru
                case "ua":
                    return vocab.instruction.ua
            }
        },
        track(lang){
            switch(lang){
                case "en":
                    return vocab.track.en
                case "ru":
                    return vocab.track.ru
                case "ua":
                    return vocab.track.ua
            }
        },
        language(lang){
            switch(lang){
                case "en":
                    return vocab.lang.en
                case "ru":
                    return vocab.lang.ru
                case "ua":
                    return vocab.lang.ua
            }
        },
        profile(lang){
            switch(lang){
                case "en":
                    return vocab.profile.en
                case "ru":
                    return vocab.profile.ru
                case "ua":
                    return vocab.profile.ua
            }
        },
    },
    track:{
        addNewTrack(lang){
            switch(lang){
                case "en":
                    return vocab.addNewTrack.en
                case "ru":
                    return vocab.addNewTrack.ru
                case "ua":
                    return vocab.addNewTrack.ua
            }
        },
        back(lang){
            switch(lang){
                case "en":
                    return vocab.back1.en
                case "ru":
                    return vocab.back1.ru
                case "ua":
                    return vocab.back1.ua
            }
        },
        deleteOne(lang){
            switch(lang){
                case "en":
                    return vocab.deleteOne.en
                case "ru":
                    return vocab.deleteOne.ru
                case "ua":
                    return vocab.deleteOne.ua
            }
        },
        
    },
    lists:{
        monthlyList(lang){
            switch(lang){
                case "en":
                    return vocab.monthlyList.en
                case "ru":
                    return vocab.monthlyList.ru
                case "ua":
                    return vocab.monthlyList.ua
            }
        },
        weeklyList(lang){
            switch(lang){
                case "en":
                    return vocab.weeklyList.en
                case "ru":
                    return vocab.weeklyList.ru
                case "ua":
                    return vocab.weeklyList.ua
            }
        },
        userList(lang){
            switch(lang){
                case "en":
                    return vocab.userList.en
                case "ru":
                    return vocab.userList.ru
                case "ua":
                    return vocab.userList.ua
            }
        },
        back(lang){
            switch(lang){
                case "en":
                    return vocab.back1.en
                case "ru":
                    return vocab.back1.ru
                case "ua":
                    return vocab.back1.ua
            }
        },
    
    },
    monthlyList:{
        addNewItem(lang){
            switch(lang){
                case "en":
                    return vocab.addNewItemM.en
                case "ru":
                    return vocab.addNewItemM.ru
                case "ua":
                    return vocab.addNewItemM.ua
            }
        },
        stop(lang){
            switch(lang){
                case "en":
                    return vocab.liststop.en
                case "ru":
                    return vocab.liststop.ru
                case "ua":
                    return vocab.liststop.ua
            }
        },
    },

    weeklyList:{
        addNewItem(lang){
            switch(lang){
                case "en":
                    return vocab.addNewItemW.en
                case "ru":
                    return vocab.addNewItemW.ru
                case "ua":
                    return vocab.addNewItemW.ua
            }
        },
        stop(lang){
            switch(lang){
                case "en":
                    return vocab.liststop.en
                case "ru":
                    return vocab.liststop.ru
                case "ua":
                    return vocab.liststop.ua
            }
        },

    },
    userList:{
            addNewItem(lang){
                switch(lang){
                    case "en":
                        return vocab.addNewItemU.en
                    case "ru":
                        return vocab.addNewItemU.ru
                    case "ua":
                        return vocab.addNewItemU.ua
                }
            },
            stop(lang){
                switch(lang){
                    case "en":
                        return vocab.liststop.en
                    case "ru":
                        return vocab.liststop.ru
                    case "ua":
                        return vocab.liststop.ua
                }
            },
    },
    getBack:{
        stop(lang){
            switch(lang){
                case "en":
                    return vocab.back1.en
                case "ru":
                    return vocab.back1.ru
                case "ua":
                    return vocab.back1.ua
            }
        },

    },

    edittask:{
        check(lang){
            switch(lang){
                case "en":
                    return vocab.check.en
                case "ru":
                    return vocab.check.ru
                case "ua":
                    return vocab.check.ua
            }
        },
        important(lang){
            switch(lang){
                case "en":
                    return vocab.important.en
                case "ru":
                    return vocab.important.ru
                case "ua":
                    return vocab.important.ua
            }
        },
        uncheck(lang){
            switch(lang){
                case "en":
                    return vocab.uncheck.en
                case "ru":
                    return vocab.uncheck.ru
                case "ua":
                    return vocab.uncheck.ua
            }
        },
        unimportant(lang){
            switch(lang){
                case "en":
                    return vocab.unimportant.en
                case "ru":
                    return vocab.unimportant.ru
                case "ua":
                    return vocab.unimportant.ua
            }
        },
    },
    languages:{
        en:vocab.langs.en,
        ru:vocab.langs.ru,
        ua:vocab.langs.ua,
    },
   
}
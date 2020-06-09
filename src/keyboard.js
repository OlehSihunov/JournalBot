const kb = require("./keyboard-buttons")
module.exports={
    home(lan){
        console.log("lan: "+lan)
        return [
            [kb.home.lists(lan)],
            [kb.home.track(lan)],
            [kb.home.instruction(lan),kb.home.profile(lan)]
        ]
    },
    profile(lan){
        return[
            [kb.home.language(lan),kb.lists.back(lan)],
            
        ]
    },
    languages(lan){
        return[
            [kb.languages.en],
            [kb.languages.ru],
            [kb.languages.ua],
        ]
    },
    lists(lan){
        return [
            [kb.lists.monthlyList(lan)],
            [kb.lists.weeklyList(lan)],
            [kb.lists.userList(lan)],
            [kb.lists.back(lan)]
        ]
    },
    weeklyList(lan){
        return[
            [kb.weeklyList.addNewItem(lan)],
            [kb.weeklyList.stop(lan)]
        ]
    },
    monthlyList(lan){
        return[
            [kb.monthlyList.addNewItem(lan)],
            [kb.monthlyList.stop(lan)]
        ]
    },
    userList(lan){
        return[
            [kb.userList.addNewItem(lan)],
            [kb.userList.stop(lan)]
        ]
    },
    getBack(lan){
        return[
            [kb.getBack.stop(lan)]
        ]
    },
        
        
    

}
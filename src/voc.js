const vocab = require("./vocab");
module.exports = {
    /*hello:'👋🏻\nЯ тепер допомагатиму тобі пам\'ятати про всі справи та встигати їх виконувати.  \n \nА щоб дізнатись як зі мною працювати - тисни кнопку "Інструкція"',
    newItemToList:"Розкажи про своє завдання в повідомленні та відправ мені 😉",
    slow:" У мене ще повно часу",
    deleteC:"🗑️ Видалити всі виконані завдання 🗑️",
    fornewTrack:"Розкажи мені про цю звичку 😉",
    fornn:"Пригадай усі звички, які ти хотів би виховати в собі. А тепер розкажи про них мені та почнемо працювати над ними разом!",
    instr:"Привіт, друже 👋🏻  \n\nСучасний світ рухається з такою швидкістю, що легко про щось забути.   \n\nА щоб такого не трапилось, ти завжди можеш розповісти про це завдання мені, натиснувши в головному меню кнопку «Мій список завдань».  \n\nТакож, ти можеш ділитись зі мною звичками, які прагнеш виховати в собі, за допомогою кнопки «Трекер звичок». І кожного разу, як коли працюєш над цією звичкою, відзначати це. Так ми разом зможемо побачити, коли мине той час, який потрібен, щоб ця звичка стала частиною твого життя 😉 \n \nОсь і все. Далі розібратись в меню тобі допоможуть кнопки управління, які ти будеш бачити внизу 👀",
    deleteTrack:"Ураа! Я впорався з цією звичкою 🎉",
    backtolists:"Повертаємо вас назад до списків!",
    chlist:"Обери потрібний список 👇🏻",
    lfm:"Ваш список завдань на місяць",
    lfw:"Ваш список завдань на тиждень",
    lwt:"Список завдань необмежених в часі⏰",
    back:"Повертаємо вас назад👈",
    listisempty:"Ваш список завдань порожній",
    sep:"🎉🎉🎉🎉🎉"*/

    hello(lang){
        switch(lang){
            case "en":
                return vocab.hello.en
            case "ru":
                return vocab.hello.ru
            case "ua":
                return vocab.hello.ua
        }
    },
    newItemToList(lang){
        switch(lang){
            case "en":
                return vocab.newItemToList.en
            case "ru":
                return vocab.newItemToList.ru
            case "ua":
                return vocab.newItemToList.ua
        }
    },
    slow(lang){
        switch(lang){
            case "en":
                return vocab.slow.en
            case "ru":
                return vocab.slow.ru
            case "ua":
                return vocab.slow.ua
        }
    },
    deleteC(lang){
        switch(lang){
            case "en":
                return vocab.deleteC.en
            case "ru":
                return vocab.deleteC.ru
            case "ua":
                return vocab.deleteC.ua
        }
    },
    fornewTrack(lang){
        switch(lang){
            case "en":
                return vocab.fornewTrack.en
            case "ru":
                return vocab.fornewTrack.ru
            case "ua":
                return vocab.fornewTrack.ua
        }
    },
    fornn(lang){
        switch(lang){
            case "en":
                return vocab.fornn.en
            case "ru":
                return vocab.fornn.ru
            case "ua":
                return vocab.fornn.ua
        }
    },
    instr(lang){
        switch(lang){
            case "en":
                return vocab.instr.en
            case "ru":
                return vocab.instr.ru
            case "ua":
                return vocab.instr.ua
        }
    },
    deleteTrack(lang){
        switch(lang){
            case "en":
                return vocab.deleteTrack.en
            case "ru":
                return vocab.deleteTrack.ru
            case "ua":
                return vocab.deleteTrack.ua
        }
    },
    backtolists(lang){
        switch(lang){
            case "en":
                return vocab.backtolists.en
            case "ru":
                return vocab.backtolists.ru
            case "ua":
                return vocab.backtolists.ua
        }
    },
    chlist(lang){
        switch(lang){
            case "en":
                return vocab.chlist.en
            case "ru":
                return vocab.chlist.ru
            case "ua":
                return vocab.chlist.ua
        }
    },
    lfw(lang){
        switch(lang){
            case "en":
                return vocab.lfw.en
            case "ru":
                return vocab.lfw.ru
            case "ua":
                return vocab.lfw.ua
        }
    },
    lfm(lang){
        switch(lang){
            case "en":
                return vocab.lfm.en
            case "ru":
                return vocab.lfm.ru
            case "ua":
                return vocab.lfm.ua
        }
    },
    lwt(lang){
        switch(lang){
            case "en":
                return vocab.lwt.en
            case "ru":
                return vocab.lwt.ru
            case "ua":
                return vocab.lwt.ua
        }
    },
    back(lang){
        switch(lang){
            case "en":
                return vocab.back.en
            case "ru":
                return vocab.back.ru
            case "ua":
                return vocab.back.ua
        }
    },
    listisempty(lang){
        switch(lang){
            case "en":
                return vocab.listisempty.en
            case "ru":
                return vocab.listisempty.ru
            case "ua":
                return vocab.listisempty.ua
        }
    },
    sep(lang){
        switch(lang){
            case "en":
                return vocab.sep.en
            case "ru":
                return vocab.sep.ru
            case "ua":
                return vocab.sep.ua
        }
    },
    clang(lang){
        switch(lang){
            case "en":
                return vocab.clang.en
            case "ru":
                return vocab.clang.ru
            case "ua":
                return vocab.clang.ua
        }
    },
    pname(lang){
        switch(lang){
            case "en":
                return vocab.pname.en
            case "ru":
                return vocab.pname.ru
            case "ua":
                return vocab.pname.ua
        }
    },
    plang(lang){
        switch(lang){
            case "en":
                return vocab.plang.en
            case "ru":
                return vocab.plang.ru
            case "ua":
                return vocab.plang.ua
        }
    },
    pcount(lang){
        switch(lang){
            case "en":
                return vocab.pcount.en
            case "ru":
                return vocab.pcount.ru
            case "ua":
                return vocab.pcount.ua
        }
    },
}
/**
 * @description 把字符串分割成数组
 * @param {Array} str 需要分割的字符串
 * @param {String} split 以什么方式分割，默认英文逗号','
 */
const stringSplitArray = (str, split = ',') => {
    return str.split(split);
};

/**
 * @description 把数组拼接为字符串
 * @param {Array} arr 需要拼接的数组
 */
const arrJoinString = (arr) => {
    return arr.join(',');
};

/**
 * @description 深拷贝引用类型数据
 * @param {Object | Array} obj 需要深拷贝的数据
 * @return{Any} 返回全新的数据
 */
const deepCopy = (obj) => {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                objClone[key] = deepCopy(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    return objClone;
};

/**
 * @description 获取当前日期到n天之后的日期
 * @param {Number} n  获取的天数 默认为30天
 * @return {Array} 
 * 例如：  [ { week: '今天', date: '11-25' },  
            { week: '明天', date: '11-26' },  
            { week: '后天', date: '11-27' },  
            { week: '星期六', date: '11-28' },
            { week: '星期日', date: '11-29' },
            { week: '星期一', date: '11-30' }]
 */
const getNowDateToNTime = (n = 30) => {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + n);//获取当前日期到n天之后的日期
    let dataArr = [];
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    while (endDate.getTime() - startDate.getTime() >= 0) {
        let month = (startDate.getMonth() + 1).toString().length == 1 ? '0' + (startDate.getMonth() + 1).toString() : startDate.getMonth() + 1;
        let day = startDate.getDate().toString().length == 1 ? '0' + startDate.getDate() : startDate.getDate();
        let week = weeks[startDate.getDay()];
        dataArr.push({ week: `星期${week}`, date: `${month}-${day}` });
        startDate.setDate(startDate.getDate() + 1);
    }
    dataArr[0].week = '今天';
    dataArr[1].week = '明天';
    dataArr[2].week = '后天';
    return dataArr;
}
/**
 * 获取当前时间到(dateTimeStamp时间戳)的时间距离
 * @param {String|Number} dateTimeStamp 时间戳（毫秒数）
 * @return {String} 例如：1天前   1分钟前  刚刚   2020-11-25
 */
const timeAgo = (dateTimeStamp) => {
    let result = '';
    let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime();   //获取当前时间毫秒

    let diffValue = now - dateTimeStamp;//时间差

    if (diffValue < 0) {
        return;
    }
    let minC = diffValue / minute;  //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
        result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
        result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
        result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
        result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
        result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = "刚刚"
    } else {
        let datetime = new Date();
        datetime.setTime(dateTimeStamp);
        let Nyear = datetime.getFullYear();
        let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}
/**
 * 日期格式化/获取当前时间
 * @param {String} fmt 日期格式 如：YYYY-mm-dd HH:MM:SS
 * @return 当前的时间如：2020-09-20 14:18:05
 */
const getNowTimes = (fmt='YYYY-mm-dd') => {
    let ret;
    const date = new Date();
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


module.exports={
    deepCopy, // 深拷贝
    stringSplitArray, // 把字符串分割为数组
    arrJoinString, // 把数组拼接为字符串
    getNowDateToNTime,//获取当前日期到n天之后的日期
    timeAgo,// 获取当前时间到(dateTimeStamp时间戳)的时间距离
    getNowTimes,//获取当前时间信息
};
export default class Utils {
	/**
	 * 
	deepCopy, // 深拷贝
	stringSplitArray, // 把字符串分割为数组
	arrJoinString, // 把数组拼接为字符串
	getNowDateToNTime, //获取当前日期到n天之后的日期
	timeAgo, // 获取当前时间到(dateTimeStamp时间戳)的时间距离
	getNowTimes, //获取当前时间信息
	timeCompare//两个时间比较
	 */
	constructor() { };

	/**
	 * @description 把字符串分割成数组
	 * @param {Array} str 需要分割的字符串
	 * @param {String} split 以什么方式分割，默认英文逗号','
	 */
	stringSplitArray = (str, split = ',') => {
		return str.split(split);
	};

	/**
	 * @description 把数组拼接为字符串
	 * @param {Array} arr 需要拼接的数组
	 */
	arrJoinString = (arr) => {
		return arr.join(',');
	};

	/**
	 * @description 深拷贝引用类型数据
	 * @param {Object | Array} obj 需要深拷贝的数据
	 * @return{Any} 返回全新的数据
	 */
	deepCopy = (obj) => {
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
	getNowDateToNTime = (n = 30) => {
		let startDate = new Date();
		let endDate = new Date();
		endDate.setDate(startDate.getDate() + n); //获取当前日期到n天之后的日期
		let dataArr = [];
		let weeks = ['日', '一', '二', '三', '四', '五', '六'];
		while (endDate.getTime() - startDate.getTime() >= 0) {
			let month = (startDate.getMonth() + 1).toString().length == 1 ? '0' + (startDate.getMonth() + 1).toString() :
				startDate.getMonth() + 1;
			let day = startDate.getDate().toString().length == 1 ? '0' + startDate.getDate() : startDate.getDate();
			let week = weeks[startDate.getDay()];
			dataArr.push({
				week: `星期${week}`,
				date: `${month}-${day}`
			});
			startDate.setDate(startDate.getDate() + 1);
		}
		dataArr[0].week = '今天';
		dataArr[1].week = '明天';
		dataArr[2].week = '后天';
		return dataArr;
	}
	/**
	 * 获取当前时间到(dateTime)的时间距离
	 * @param {String|Number} dateTime 时间 年月日时分秒
	 * @return {String} 例如：1天前   1分钟前  刚刚   2020-11-25
	 */
	timeAgo = (dateTime) => {
		//debugger;
		const now = new Date();
		const date = new Date(dateTime);
		//计算时间间隔，单位为分钟
		const inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
		if (inter == 0) {
			return "刚刚";
		}

		//多少分钟前
		else if (inter < 60) {
			return inter.toString() + "分钟前";
		}

		//多少小时前
		else if (inter < 60 * 24) {
			return parseInt(inter / 60).toString() + "小时前";
		}

		//本年度内，日期不同，取日期+时间  格式如  06-13 22:11
		else if (now.getFullYear() == date.getFullYear()) {
			return (date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();

		} else {
			return date.getFullYear().toString().substring(2, 3) + "-" +
				(date.getMonth() + 1).toString() + "-" +
				date.getDate().toString() + " " +
				date.getHours() + ":" +
				date.getMinutes();
		}
	}
	/**
	 * 日期格式化/获取当前时间
	 * @param {String} fmt 日期格式 如：YYYY-mm-dd HH:MM:SS
	 * @return 当前的时间如：2020-09-20 14:18:05
	 */
	getNowTimes = (fmt = 'YYYY-mm-dd') => {
		let ret;
		const date = new Date();
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
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



	/**日期比较
	 * @param {Object} date1：2020-09-20 14:18:05
	 * @param {Object} date2：2020-09-20 14:18:05
	 * @param {Boolean} isUseNowDate：使用之后第二个数据将使用当前日期来比较
	 *  @param {} use24Or00：使用转换为24小时/00小时制比较
	 */
	timeCompare = (date1, date2, isUseNowDate, use24Or00) => {
		if (use24Or00 == '24') {
			date1 = date1 + ' 23:59:59';
		} else if (use24Or00 == '00') {
			date1 = date1 + ' 00:00:00';
		}
		console.log(date1);
		let oDate1 = new Date(date1);
		let oDate2;
		try {
			oDate2 = new Date(date2);
		} catch (e) { };
		if (isUseNowDate) {
			oDate2 = new Date(getNowTimes('YYYY-mm-dd HH:MM:SS'));
		}

		if (oDate1.getTime() > oDate2.getTime()) {
			// console.log('第一个大');
			return 1;
		} else {
			// console.log('第二个大');
			return 2;
		}
	}
}


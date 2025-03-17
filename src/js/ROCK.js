const
second = 1000,
minute = (second*60),
hour = (minute*60),
day = (hour*24),
year = (day*365),
toNewDate = function(date) {

	var
	_date = new Date();

	_date.setTime(date.getTime());

	return _date;

};

export class ROCK_Collection extends Array {
	constructor() {
		super();
	};
	getItemByKeyValue(key, value) {

		return this.filter(function(item) {
			
			return item[key]===value;
			
		})[0];
		
	};
	getItemsByKeyValue(key, value) {

		return this.filter(function(item) {
			
			return item[key]===value;
			
		});
		
	};
	append(item) {
	
		this.push(item);
		return item;
		
	};
	prepend(item) {
	
		this.unshift(item);
		return item;
		
	};
	exists(value) {

		return (this.indexOf(value)>-1);
		
	};
	random(min, max) {
	
		max = (max||(this.length-1));
		return this[ROCK.MATH.random(min, max)];
		
	};
	remove(item) {
		
		return this.removeAt(this.getIndexOf(item));
		
	};
	removeAt(index) {
	
		this.splice(index, 1);
		return this;
	
	};
	addAt(item, index) {
		
		this.splice(index, 0, item);
		return item;
		
	};
	first() {
		
		return this[0];
		
	};
	last() {
		
		return this[this.length-1];
		
	};
	swap(aIndex, bIndex) {
	
		var 
		aProp = this[aIndex],
		bProp = this[bIndex];
		
		this[aIndex] = bProp;
		this[bIndex] = aProp;
		
		return this;
		
	};
	pushift() {

		this.push(this.shift());
		return this;

	};
	shuffle(cards) {

    for(let i = 0; i < this.length; i++) {
      let shuffle = Math.floor(Math.random() * (this.length));
      [cards[i], cards[shuffle]] = [cards[shuffle], cards[i]];
    };
		return this;

  };
};

export const ROCK_ARRAY = {
	getItemByKeyValue: function(collection, key, value) {

		return this.filter(collection, function(item) {

			return item[key]===value;

		})[0];

	},
	getItemsByKeyValue: function(collection, key, value) {

		return this.filter(collection, function(item) {

			return item[key]===value;

		});

	},
	filter: function(collection, callback) {

		var
		_return = new collection.constructor(),
		value;

		this.each(collection, function(item) {

			value = callback(item, _return);

			if(value===true) {
				_return.push(item);
			};

			return value;

		});

		return _return;

	},
	each: function(collection, callback) {

		var
		value;

		for(var i=0;i<collection.length;i++) {
			value = callback.call(collection[i], collection[i], i);
			if(value==="break") {
				break;
			};
		};

		return collection;

	},
	random: function(collection, min, max) {

		min = (min||0);
		max = (max||(collection.length-1));

		return collection[ROCK_MATH.random(min, collection.length-1)];

	},
	pushift: function(collection) {

		collection.push(collection.shift());
		return collection;

	},
	first: function(collection) {

		return collection[0];

	},
	last: function(collection) {

		return collection[collection.length-1];

	},
	sort: function(collection, method) {

		return collection.sort(ROCK.SORT[method]);

	},
	shuffle: function(collection) {

		return this.sort(collection, 'SHUFFLE');

	}
};

export const ROCK_DATE = {
	create: function(year, month, date, hours, minutes, seconds, milliseconds) {

		return new Date(year, (month-1), date, hours, minutes, seconds, milliseconds);

	},
	get: function() {

		return new Date();

	},
	check: function(date, min, max) {

		var
		dateTime = date.getTime(),
		minTime = min.getTime(),
		maxTime = max.getTime();

		return (dateTime>=minTime&&dateTime<=maxTime);

	},
	expired: function(max) {

		var
		dateTime = this.getTime(),
		maxTime = max.getTime();

		return (dateTime>maxTime);

	},
	reverse: function(dateString) {

		return dateString.split("/").reverse().join("");

	},
	getFirstOfDateMonth: function(date) {

		var
		_date = toNewDate(date);

		_date.setDate(1);

		return _date;

	},
	toString: function(date, format) {

		var
		day = date.getDate(),
		month = (date.getMonth()+1),
		year = date.getFullYear();

		day = ROCK_NUMBER.toDouble(day);
		month = ROCK_NUMBER.toDouble(month);

		return [day, format[month], year].join(format["joiner"]);

	},
	parseDateString: function(dateString) {

		return new Date(dateString.split("/").reverse().join("/"));

	},
	addXDaysToDate: function(x, date) {

		var
		_date = toNewDate(date),
		time = _date.getTime();

		time = (time + (day*x));

		_date.setTime(time);

		return _date;

	},
	toNumber: function(dateString) {

		return Number(dateString.split("/").reverse().join(""));

	},
	FORMAT: {
		SHORT: {
			"01": "Jan",
			"02": "Feb",
			"03": "Mar",
			"04": "Apr",
			"05": "May",
			"06": "Jun",
			"07": "Jul",
			"08": "Aug",
			"09": "Sep",
			"10": "Oct",
			"11": "Nov",
			"12": "Dec",
			"joiner": " "
		},
		LONG: {
			"01": "January",
			"02": "February",
			"03": "March",
			"04": "April",
			"05": "May",
			"06": "June",
			"07": "July",
			"08": "August",
			"09": "September",
			"10": "October",
			"11": "November",
			"12": "December",
			"joiner": " "
		},
		NUMERIC: {
			"01": "01",
			"02": "02",
			"03": "03",
			"04": "04",
			"05": "05",
			"06": "06",
			"07": "07",
			"08": "08",
			"09": "09",
			"10": "10",
			"11": "11",
			"12": "12",
			"joiner": "/"
		}
	}
};

export const ROCK_DOM = {
	createNode: function(type) {

		return document.createElement(type);

	},
	getNode: function(id) {

		return document.getElementById(id);

	},
	addClass: function(node, className) {

		node.classList.add(className);
		return node;

	},
	removeClass: function(node, className) {

		node.classList.remove(className);
		return node;

	},
	toggleClass: function(node, className) {

		node.classList.toggle(className);
		return node;

	},
	setAttribute: function(node, key, value) {

		node.setAttribute(key, value);
		return node;

	},
	append: function(child, parent) {

		parent.appendChild(child);

	},
	html: function(node, html) {

		node.innerHTML = html;
		return node;

	}
};

export const ROCK_GUID = {
	chars: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	get: function() {
		
		var
		_return = ROCK_ARRAY.random(this.chars, 0, 50),
		lengthOf = (this.length-1);
		
		while(lengthOf--) {
			_return += ROCK_ARRAY.random(this.chars);
		};
		
		return _return;
		
	},
	length: 10
};

export const ROCK_MATH = {
	random: function(min, max) {

		return (Math.floor(Math.random()*((max-min)+1))+min);
	
	},
	floorTo: function(number, to) {
	
		return (Math.floor(number*to)/to);
	
	},
	roundTo: function(number, to) {
		
		return (Math.round(number*to)/to);
	
	},
	ceilTo: function(number, to) {
		
		return (Math.ceil(number*to)/to);
	
	},
	getXPercentOfY: function(x, y) {
		
		return (y*(x/100));
	
	},
	getXAsPercentOfY: function(x, y) {
		
		return ((x/y)*100);
	
	},
	truncate: function(number) {
		
		return number<0?this.ceilTo(number, 1):this.floorTo(number, 1);

	},
	factorial: function(i) {

		var 
		o = i;

		while(i>1&&i--) {
			o = (o*i);
		};

		return o;

	},
	oddsToMultiplier: function(a, b) {
	
		var
		c = (a+b),
		d = (c/b);
		
		return d;
		
	}
};

export const ROCK_NUMBER = {
	format: function(n) {

		// amend to handle digits after decimal place

		n = n.toString();

		var
		length = n.length,
		_split = n.split("").reverse();

		while(length--) {

			if(length%3===0&&length>0) {
				_split.splice(length, 0, ",");
			};

		};

		return _split.reverse().join("");

	},
	expoToLong: function(n) {

		n = n.toString();
		
		var 
		_split = n.split("e+"),
		first = _split[0].replace(".", ""),
		second = _split[1],
		zeroes = Number(second);

		zeroes = (zeroes - (first.length-1));

		while(zeroes--) {
			first += "0";
		};

		return first;

	},
	toDouble: function(n) {

		n = n.toString();

		if(n<10) {
			n = ("0"+n);
		};

		return n;

	}
};

export const ROCK_SORT = {
	NUMBER_ASCENDING: function(prop) {
		return function(a, b) {
			return prop.call(a)-prop.call(b);
		};
	},
	NUMBER_DESCENDING: function(prop) {
		return function(a, b) {
			return prop.call(b)-prop.call(a);
		};
	},
	STRING_ASCENDING: function(prop) {
		return function(a, b) {
			a = prop.call(a);
			b = prop.call(b);
			if(a<b) {
				return -1;
			}
			else if(a>b) {
				return 1;
			}
			else {
				return 0;
			};
		};
	},
	STRING_DESCENDING: function(prop) {
		return function(a, b) {
			a = prop.call(a);
			b = prop.call(b);
			if(b<a) {
				return -1;
			}
			else if(b>a) {
				return 1;
			}
			else {
				return 0;
			};
		};
	},
	SHUFFLE: function(prop) {
		return function() {
			return ROCK.MATH.random(-1, 1);
		};
	}
};

export const ROCK_TIME = {
	getSecond: function() {
		return second;
	},
	getMinute: function() {
		return minute;
	},
	getHour: function() {
		return hour;
	},
	getDay: function() {
		return day;
	},
	getYear: function() {
		return year;
	},
	getMilliseconds: function(time) {
		return time;
	},
	getSeconds: function(time) {
		return ROCK.MATH.truncate(time/second);
	},
	getMinutes: function(time) {
		return ROCK.MATH.truncate(time/minute);
	},
	getHours: function(time) {
		return ROCK.MATH.truncate(time/hour);
	},
	getDays: function(time) {
		return ROCK.MATH.truncate(time/day);
	},
	getYears: function(time) {
		return ROCK.MATH.truncate(time/year);
	},
	getMillisecondsInDay: function(time) {
		return (this.getMilliseconds(time)%day);
	},
	getMillisecondsInMinute: function(time) {
		return (this.getMilliseconds(time)%minute);
	},
	getSecondsInDay: function(time) {
		return (this.getSeconds(time)%day);
	},
	getSecondsInMinute: function(time) {
		return (this.getSeconds(time)%minute);
	},
	getMinutesInDay: function(time) {
		return (this.getMinutes(time)%day);
	},
	getHoursInDay: function(time) {
		return (this.getHours(time)%day);
	},
	getDaysInYear: function(time) {
		return (this.getDays(time)%year);
	}
};

class HTTPRequest {
	constructor(url, callback) {

		this.url = url;
		this.request = new XMLHttpRequest();

		this.request.onreadystatechange = function() {
			if(this.readyState===4) {
				callback(JSON.parse(this.responseText));
			};
		};

	};
	paramsToJSON() {

		return JSON.stringify(this.params);

	};
	paramCheck() {

		for(var param in this.params) {
			return true;
		};
		return false;

	};
	setParam(key, value) {

		this.params[key] = value;
		return this;

	};
	getParam(key) {

		return this.params[key];

	};
	removeParam(key, value) {

		delete this.params[key];
		return this;

	};
	setHeader(key, value) {

		this.headers[key] = value;
		return this;

	};
	addHeaders() {

		for(var header in this.headers) {
			this.request.setRequestHeader(header, this.headers[header]);
		};
		return this;

	};
	abort() {

		this.request.abort();

	};
	headers = {
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Accept": "*/*"
	};
	params = {};
	dataType = "json";
};

class HTTPGetRequest extends HTTPRequest {
	constructor() {
		super();
	};
	send() {

		var
		url = this.url;

		if(this.paramCheck()) {
			url += ("?" + this.paramsToJSON());
		};

		this.request.open(this.type, url, true);
		this.addHeaders();
		this.request.send();

	};
	type = "GET";
};

class HTTPPostRequest extends HTTPRequest {
	constructor() {
		super();
	};
	send() {

		this.request.open(this.type, this.url, true);
		this.addHeaders();
		this.request.send(this.paramCheck()?this.paramsToJSON():null);

	};
	type = "POST";
};

export const ROCK_HTTP = {
	GET: HTTPGetRequest,
	POST: HTTPPostRequest
};

export const ROCK_STRING = {
	replacer: function(string, replacers) {
		var out = string;
		for(var replacer in replacers) {
			out = out.replace(new RegExp('{' + replacer + '}', 'g'), replacers[replacer], 'g');
		};
		return out;
	}
};

class HTMLNode {
	constructor(node) {
		this.node = node;
	};
	attr(name, value) {
		this.each((node) => {
			node.setAttribute(name, value);
		});
		return this;
	};
	appendTo(target) {
		target.node[0].appendChild(this.node[0]);
		return this;
	};
	prependTo(target) {
		target.node[0].insertBefore(this.node[0], target.node[0].firstChild);
		return this;
	};
	append(toAppend) {
		this.node[0].appendChild(toAppend.node[0]);
		return this;
	};
	text(string) {
		this.each((node) => {
			node.innerHTML = string;
		});
		return this;
	};
	html(string) {
		this.each((node) => {
			node.innerHTML = string;
		});
		return this;
	};
	val(value) {
		if(value) {
			this.node[0].value = value;
			return this;
		}
		else {
			return this.node[0].value;
		};
	};
	on(event, handler) {
		this.each((node) => {
			node.addEventListener(event, handler);
		});
		return this;
	};
	change() {
		this.each((node) => {
			node.dispatchEvent(new Event('change'));
		});
		return this;
	};
	addClass(string) {
		this.each((node) => {
			node.classList.add(string);
		});
		return this;
	};
	empty() {
		this.each((node) => {
			node.innerHTML = '';
		});
		return this;
	};
	each(callback) {
		this.node.forEach(callback);
		return this;
	};
};

export const ROCK_JQUERY = {
	create: function(nodeName) {
		return new HTMLNode([document.createElement(nodeName)]);
	},
	wrap: function(node) {
		return new HTMLNode([node]);
	},
	query: function(q) {
		return new HTMLNode([...document.querySelectorAll(q)]);
	}
};

export class ROCK_LocalStorage {
	constructor(namespace) {

		this.namespace = namespace;

	};
	get(key) {

		var
		existing = this.fetch();

		return existing[key];

	};
	set(key, value) {

		var
		existing = this.fetch();

		existing[key] = value;

		this.commit(existing);

		return this;

	};
	remove(key) {

		var
		existing = this.fetch();

		delete existing[key];

		this.commit(existing);

		return this;

	};
	fetch() {

		return JSON.parse(localStorage.getItem(this.namespace)||"{}");

	};
	clear() {

		this.commit({});

	};
	commit(obj) {

		localStorage.setItem(this.namespace, JSON.stringify(obj));

	};
};

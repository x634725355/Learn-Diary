/**
 * 绑定账号、新建档案共用方法
 */
var PubAct = Class.create();
PubAct.prototype = Object.extend(new TBase(), {
	/**
	 * 获取验证码
	 * @param CSJH:手机号码
	 * @param CBRID:病人id
	 * @param TYPE:类型（BDKH：绑定就诊卡，ADDDA：新建档案）
	 */
	GetDXYZM : function(CSJH, CBRID, TYPE) {
		var yzm = "";
		this.PostXML({"mobile":CSJH, "CBRID":CBRID, "TYPE":TYPE}, "FWH1039", "Query", function (ajax) {
			var node = ajax.responseXML.documentElement;
			var RES = node.selectSingleNode("RES");
			if (RES != null && RES.selectSingleNode("ERR") != null) {
				$.alert($(RES).find("ERR").text());
				return;
			} 
			if (RES != null && RES.selectSingleNode("RES.2") != null) {
				var errorTag = $(RES.selectSingleNode("RES.2")).text();
				if (errorTag == "1") {
					$.alert("输入手机号码与医院基础档案手机号码不一致！请修改手机号码或带上身份证到医院窗口处理！");
				} else if(errorTag!=""){
					$.alert(errorTag);
				}else{
					$.alert("获取短信验证码失败！");
				}
				return;
			}
			
			yzm = $(RES).find("DAT").text();
		}, false);
		
		return yzm;
	},
	
	/**
	 * 设置获取验证码按钮样式
	 * @param btnId:获取验证码按钮id
	 * @param actStr:获取验证码按钮事件字符串
	 */
	SetYZMBtn : function (btnId, actStr) {
		var time = 120;
		$("#" + btnId).addClass("yzm_action");
		$("#" + btnId).attr("onclick", "return false;");
		var timers = setInterval(function() {
			time--;
			if (time == 0) {
				$("#" + btnId).attr("onclick", actStr);
				$("#" + btnId).text(pubAct.GetWarnText("WARN001"));	// 获取手机验证码
				$("#" + btnId).removeClass("yzm_action");
				clearInterval(timers);
			} else {
				$("#" + btnId).text(time + pubAct.GetWarnText("WARN002"));	// 秒后重新获取
			}
		}, 1000);
	},
	
	/**
	 * 初始化地区选择控件
	 * @param JDMRDZ:默认选中地址
	 */
	InitLArea : function(JDMRDZ, id) {
		var area = new LArea();
		area.init({
			'trigger' : '#' + id, // 触发选择控件的文本框，同时选择完毕后name属性输出到该位置
			'valueTo' : '#value1', // 选择完毕后id属性输出到该位置
			'keys' : {
				id : 'id',
				name : 'name'
			}, // 绑定数据源相关字段 id对应valueTo的value属性输出 ，name对应trigger的value属性输出
			'type' : 1, // 数据源类型
			'data' : CitysJson // 数据源
		});
		// 根据配置获取默认 
		if(JDMRDZ != undefined && "" != JDMRDZ){
			var provinceName = "";
			var cityName = "";
			var areaName = "";
			var addressArr = JDMRDZ.split("|");
			if (addressArr.length != 3){
				return; 
			} else {
				provinceName = addressArr[0];
				cityName = addressArr[1];
				areaName = addressArr[2];
			}
			var x, y, z = 0;
			for (var i in CitysJson) {
				if (CitysJson[i].name == provinceName) {
					x = i;
					var city = CitysJson[i].child;
					for (var j in city) {
						if (city[j].name == cityName) {
							y = j;
							var district = city[j].child;
							for (var k in district) {
								if (district[k].name == areaName) {
									z = k;
								}
							}
						}
					}
				}
			}
			area.value = [ x, y, z ];
		}
	},
	
	/**
	 * 判断是否为空
	 * @param id：当前操作控件id
	 * @param txt：提示信息
	 */
	ISNull : function (id, txt) {
		if ($("#" + id).val() == "" || $("#" + id).val() == null) {
			$.alert(txt, function() {
				$("#" + id).focus();
			});
			return false;
		}
		return true;
	},
	
	/**
	 * 验证手机号码是否合法
	 * @param SJH:手机号码
	 * @param txt:提示信息
	 * @param id:当前操作控件id
	 */
	CheckSJH : function (SJH, txt, id) {
		if (SJH == "" || (SJH.length != 11 || isNaN(SJH)) || !(/^[1]([358][0-9]|7[01235678]|4[5|7|9]|66|9[89])\d{8}$/.test(SJH))) {	// 手机号为空或输入不正确
			$.alert(txt, function () {
				$("#" + id).focus();
			});
			return false;
		}
		return true;
	},
	
	/**
	 * 验证身份证信息是否合法
	 * @param CSFZH：身份证号
	 * @param inputId：当前操作控件id
	 */
	CheckSFZ : function (CSFZH, inputId) {
		var sfzh = new clsIDCard(CSFZH);
		if (!sfzh.IsValid()) {
			var errMsg = "";
			if (Language == "TibetanCon") {
				errMsg = "ཐོབ་ཐང་ལག་ཁྱེར་སྟོང་འཇོག་གམ་ནོར་འདུག";
			} else {
				var mayid = sfzh.GetMayID();
				if (mayid == "") {
					if (CSFZH.length != 18 || (sfzh.IsDate(CSFZH.substr(6, 8)) && sfzh.IsArea(CSFZH.substr(0, 2)))) {
						errMsg = "身份证为空或输入不合法！";
					} else if (!sfzh.IsDate(CSFZH.substr(6, 8)) && !sfzh.IsArea(CSFZH.substr(0, 2))) {
						errMsg = "身份证不合法:</br><span style='color:red'>" + CSFZH.substr(0, 14) + "</span>" + CSFZH.substr(14, 3) + "<span style='color:red'>" + CSFZH.substring(17) + "</span>";
					} else if (!sfzh.IsDate(CSFZH.substr(6, 8))) {
						errMsg = "身份证不合法:</br>" + CSFZH.substring(0, 6) + "<span style='color:red'>" + CSFZH.substr(6, 8) + "</span>" + CSFZH.substr(14, 3) + "<span style='color:red'>" + CSFZH.substring(17) + "</span>";
					} else if (!sfzh.IsArea(CSFZH.substr(0, 2))) {
						errMsg = "身份证不合法:</br><span style='color:red'>" + CSFZH.substr(0, 6) + "</span>" + CSFZH.substr(6, 11) + "<span style='color:red'>" + CSFZH.substring(17) + "</span>";
					}
				} else {
					errMsg = "身份证不合法,有效身份证为:</br>" + mayid.substring(0, 17) + "<span style='color:red'>" + mayid.substring(17) + "</span>";
				}
			}
			$.alert(errMsg, function() {
				$("#" + inputId).focus();
				if (mayid != "") {
					$("#" + inputId).val(mayid);
				}
			});
			return false;
		}
		return true;
	},
	
	/**
	 * 获取提示文字（中文或藏文）
	 * @param PYM：获取参数编码
	 */
	GetWarnText : function (PYM) {
		var json = {
					"WARN001" : {"Chinese" : "获取验证码", "TibetanCon" : "ལག་ཐོག་ཁ་པར་ནས་བརྟག་བྱེད་ཨང་ལེན་པ།"},
					"WARN002" : {"Chinese" : "秒后重新获取", "TibetanCon" : "སྐར་ཆའི་རྗེས་བསྐྱར་ལེན།"},
					"WARN003" : {"Chinese" : "手机号为空或输入不正确", "TibetanCon" : "ཁ་པར་ཨང་གྲངས་སྟོང་འཇོག་གམ་ནོར་འདུག"},
					"WARN004" : {"Chinese" : "添加失败", "TibetanCon" : "ཁ་སྣོན་ལེགས་གྲུབ་མ་བྱུང་།"},
					"WARN005" : {"Chinese" : "档案新建成功", "TibetanCon" : "ཡིག་ཚགས་གསར་དུ་བསྐྲུན་པ་ཡིན། "},
					"WARN006" : {"Chinese" : "所在街道不能为空", "TibetanCon" : "ཁྲོམ་ལམ་སྟོང་འཇོག་བྱ་མི་རུང་།"},
					"WARN007" : {"Chinese" : "所在省市不能为空", "TibetanCon" : "མངའ་ཁོངས་གྲོང་ཁྱེར་སྟོང་འཇོག་བྱ་མི་རུང་།"},
					"WARN008" : {"Chinese" : "验证码不能为空或输入不正确", "TibetanCon" : "བརྟག་ཞིབ་ཨང་སྟོང་འཇོག་གམ་ནོར་མི་རུང་།"},
					"WARN010" : {"Chinese" : "姓名不能为空", "TibetanCon" : "རུས་མིང་སྟོང་འཇོག་བྱ་མི་རུང་།"},
					"WARN011" : {"Chinese" : "确定", "TibetanCon" : "གཏན་ཁེལ།"},
					"WARN012" : {"Chinese" : "此账户已被绑定，是否继续?", "TibetanCon" : "རྩིས་ཚན་དེ་གཏན་བཅིངས་ཟིན་འདུག་པས་མུ་མཐུད་རྒྱུ་ཡིན་ནམ།"},
					"WARN013" : {"Chinese" : "此账户已被其他的微信账号绑定，解除绑定后才能绑定", "TibetanCon" : "རྩིས་ཚན་དེ་སྐད་འཕྲིན་གཞན་དང་གཏན་བཅིངས་བྱས་་འདུག་པས་དེ་མེད་པ་བཟོས་རྗེས་གཞི་ནས་གཏན་བཅིངས་བྱ་རྒྱུ།"},
					"WARN014" : {"Chinese" : "卡号不能为空", "TibetanCon" : "བྱང་ཨང་སྟོང་འཇོག་བྱ་མི་རུང་།"},
					"WARN015" : {"Chinese" : "请与选择就诊人关系", "TibetanCon" : "ཁྱེད་དང་བསལ་འདེམས་ཀྱི་སྨན་པ་བསྟེན་མཁན་གྱི་འབྲེལ་བ།"},
					"WARN016" : {"Chinese" : "绑定失败", "TibetanCon" : "གཏན་བཅིངས་ཕམ་པ།"},
					"WARN017" : {"Chinese" : "绑定成功", "TibetanCon" : "གཏན་བཅིངས་ལེགས་སྒྲུབ།"},
					"WARN018" : {"Chinese" : "微信id不能为空", "TibetanCon" : "སྐད་འཕྲིན་གྱི་idསྟོང་འཇོག་བྱ་མི་རུང་།"},
				};
		
		return (Language == "TibetanCon" ? json[PYM]["TibetanCon"] : json[PYM]["Chinese"]);
	}
	
});
var pubAct = new PubAct();

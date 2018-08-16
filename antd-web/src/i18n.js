import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "zh": "中文",
        "en": "English",
        "登录":"Login",
        "退出登录":"Logout",
        "管理员登录":"Admin Login",
        "使用手册":"User Guide",
        "任务": "Tasks",
        "主题":"Subject",
        "请选择或输入主题":"Please select or input subject",
        "系统管理": "System Setting",
        "领取设备": "Receive Device",
        "归还设备": "Return Device",
        "取消":"Cancel",
        "返回":"Back",
        "下一步":"Next",
        "修改":"Edit",
        "查询":"Search",
        "新增":"New",
        "提交":"Submit",
        "提交成功":"Submit Success",
        "下载":"Download",
        "通知":"Announcement",
        "收起":"Collapse",
        "展开":"Open",
        "备注":"Comments",
        "已领取":"Received",
        "已归还":"Returned",
        "待归还":"To be returned",
        "借出时间":"Receive Date",
        "删除":"Delete",
        "领取":"Receive",
        "归还":"Return",
        "取还":"Retrieval",
        "保存":"Save",
        "请选择领取或归还":"Please select receive or return",
        "请输入EID":"please input EID",
        "请输入姓名":"please input your name",
        "请输入密码":"please input password",
        "请输入角色":"please input role",
        "请选择角色":"Please select role",
        "请输入员工号": "please input sap number",
        "请输入部门":"please input department",
        "请输入或选择部门":"please input or select department",
        "请输入或选择角色":"please input or select role",
        "请输入或选择项目":"please input or select project",
        "请输入您办公地点的楼号":"please input the building number of your office",
        "请输入您办公地点的座位号":"please input the seat number of your office",
        "姓名":"Name",
        "模块详情页面":"Module Specification Page",
        "头像":"Avatar",
        "角色":"Role",
        "员工号":"Sap Number",
        "楼号":"Facility",
        "座位号":"Seat Number",
        "您的EID":"Your EID",
        "eid":"EID",
        "内容":"Content",
        "用户管理":"User Management",
        "请输入内容":"please input content",
        "详细页面":"Detailed Page",
        "加载中...":"Loading",
        "加载更多":"Load more",
        "借用时间":"Borrow Date",
        "归还时间":"Return Date",
        "设备序列号":"Asset Tag",
        "设备移交":"Device Handover",
        "自EID":"From EID",
        "至EID":"To EID",
        "发送给":"Send to",
        "相关任务":"Related tasks",
        "请输入设备序列号":"please input asset tag",
        "请输入资产编号":"please input asset number",
        "请输入序列号":"Please serial number",
        "指派给角色":"Assign to role",
        "请选择":"Please select",
        "开始日期":"Start date",
        "结束日期":"Due date",
        "请输入结束日期":"please input due date",
        "期望日期":"Due date",
        "请输入期望日期":"please input due date",
        "状态":"Status",
        "EID/姓名":"EID/Name",
        "项目/部门":"Project/Department",
        "设备取还":"Device Retrieval",
        "请输入分类":"please input category",
        "分类":"Category",
        "分类名称":"Category Name",
        "值":"Data",
        "日期":"Date",
        "请输入值":"please input data",
        "操作":"Operation",
        "数据字典":"Data Dictionary",
        "数据字典的管理":"Data Dictionary Management",
        "领取人 填写信息":"Recipients fill in the information",
        "归还人 填写信息":"Return people fill in the information",
        "IT部门 填写设备信息":"IT Dept fill in the device info",
        "确定 领取人":"Determine Recipients",
        "填写设备信息":"Fill in the device info",
        "双方确认并签字":"Both parties confirm and sign",
        "说明":"Instructions",
        "签名完毕": "Submit",
        "擦掉重签":"Clean",
        "机型":"Model",
        "显示器":"Monitor(s)",
        "台式机":"Desktop",
        "笔记本":"Laptop",
        "电脑锁":"Computer Lock",
        "电脑包":"Laptop Bag",
        "鼠标":"Mouse",
        "键盘鼠标":"Keyboard & Mouse",
        "网线":"Cable",
        "电源适配器&电源线": "Power Adapter & Power Cord",
        "请选择台式机或者笔记本":"Please select desktop or laptop",
        "请输入显示器的尺寸，可以输入多个": "please input the size of the monitor, you can input more than one",
        "请输入笔记本型号":"please input the laptop model",
        "请输入或选择笔记本型号":"please input or select laptop model",
        "如有必要， 请输入一些备注信息":"please input some remarks",
        "我发布的通知":"My Announcement",
        "我发布的任务":"Tasks I assigned",
        "设备取还履历":"Device Retrieval History",
        "设备移交履历":"Device Retrieval History",
        "扫码登录":"Scan to Login",
        "账户或密码错误":"Wrong username or password",
        "EID登录":"Login with EID and password",
        "如果忘记EID密码，请联系上级管理员进行密码重置":"If you forget your password, please contact your supervisor to reset your password",
        "操作不熟悉的用户，请在IT人员的指导下完成":"Contact the it staff if necessary.",
        "没有借取记录":"No Retrieval History",
        "IT人员之间的批量设备移交":"Batch equipment retrieval between IT staff",
        "输入一个资产编号后，请按Enter键":"Press [ENTER] after input a asset number",
        "系统用户的增删改查、权限管理":"The system user crud & privilege management",
        "设备取还的查询":"Retrieve Device",
        "普通用户设备取还":"User Equipment Retrieval",
        "IT设备移交":"IT Device Retrieval",
        "暂无数据":"No data",
        "首页":"Home",
        "跳至":"Jump to",
        "希望日期":"Due Date",
        "项目":"Project",
        "部门":"Department",
        "资产编号":"Asset Number",
        "序列号":"serial number",
        "时间":"Date",
        "提交了一个任务":"Assigned a task",
        "用户":"User",
        "预约中":"Appointing",
        "处理中":"Processing",
        "处理完毕":"Processed",
        "智能资产管理助手 - 设备领取、归还 - 无纸化办公实验版": "Smart Asset Management Assistant - Equipment Receipt and Return - Paperless Office Lab Edition",
        "流程处理成功，回执已经发送到您的工作邮箱，请注意查收。":"The process has been successfully processed and the receipt has been sent to your work email. Please check.",
        "服务器成功返回请求的数据。":"The server successfully returned the requested data.",
        "新建或修改数据成功。":"New or modified data is successful.",
        "一个请求已经进入后台排队（异步任务）。":"A request has entered the background queue (asynchronous task).",
        "删除数据成功。":"删除数据成功。",
        "发出的请求有错误，服务器没有进行新建或修改数据的操作。":"The request was issued with an error. The server did not create or modify data.",
        "用户没有权限（令牌、用户名、密码错误）。":"The user does not have permission (token, username, password error).",
        "用户得到授权，但是访问是被禁止的。":"The user is authorized but access is forbidden.",
        "发出的请求针对的是不存在的记录，服务器没有进行操作。":"The request was issued for a non-existent record and the server did not perform the operation.",
        "请求的格式不可得。":"The requested format is not available.",
        "请求的资源被永久删除，且不会再得到的。":"The requested resource is permanently deleted and will no longer be available.",
        "当创建一个对象时，发生一个验证错误。":"A validation error occurred when creating an object.",
        "服务器发生错误，请检查服务器。":"An error occurred on the server. Please check the server.",
        "网关错误。":"Bad gateway.",
        "服务不可用，服务器暂时过载或维护。":"The service is unavailable and the server is temporarily overloaded or maintained.",
        "网关超时。":"Gateway timed out.",
        "文件下载中。。。":"File is downloading...",
        "删除完毕":"Deleted",
        "分析页":"Analysis Page",
        "用户列表":"user list",
        "收货订单":"Receipt Order",
        "返回首页":"Return to Home",
        "抱歉，您访问的页面不在":"Sorry, the page you visited is not exist",
        "抱歉，服务器出错了":"Sorry, the server has gone wrong",
        "获取验证码":"Get Verification Code",
        "提交了":"Submitted",
        "触发401":"Triggered 401",
        "触发403":"Triggered 403",
        "触发500":"Triggered 500",
        "触发404":"Triggered 404",
        "点击EID的“查询”按钮进行验证":"The 'EID' should be verified via LDAP",
        "默认请于期望日期的上午9点钟前处理设备移交":"Device Handover should be finished before 9:00 am of due date",
        "配件":"Accessories",
        "请输入配件信息":"Please enter the accessory information",
      },
    },
    zh: {
      translations: {
        "zh": "中文",
        "en": "English",
        "登录":"登录",
        "退出登录":"退出登录",
        "管理员登录":"管理员登录",
        "使用手册":"使用手册",
        "任务": "任务",
        "主题":"主题",
        "请选择或输入主题":"请选择或输入主题",
        "系统管理": "系统管理",
        "领取设备": "领取设备",
        "归还设备": "归还设备",
        "取消":"取消",
        "返回":"返回",
        "下一步":"下一步",
        "修改":"修改",
        "查询":"查询",
        "新增":"新增",
        "提交":"提交",
        "提交成功":"提交成功",
        "下载":"下载",
        "通知":"通知",
        "收起":"收起",
        "展开":"展开",
        "备注":"备注",
        "已领取":"已领取",
        "已归还":"已归还",
        "待归还":"待归还",
        "借出时间":"借出时间",
        "删除":"删除",
        "领取":"领取",
        "归还":"归还",
        "取还":"取还",
        "保存":"保存",
        "请选择领取或归还":"请选择领取或归还",
        "请输入EID":"请输入EID",
        "请输入姓名":"请输入姓名",
        "请输入密码":"请输入密码",
        "请输入角色":"请输入角色",
        "请选择角色":"请选择角色",
        "请输入员工号":"请输入员工号",
        "请输入部门":"请输入部门",
        "请输入或选择部门":"请输入或选择部门",
        "请输入或选择角色":"请输入或选择角色",
        "请输入或选择项目":"请输入或选择项目",
        "请输入您办公地点的楼号":"请输入您办公地点的楼号",
        "请输入您办公地点的座位号": "请输入您办公地点的座位号",
        "姓名":"姓名",
        "模块详情页面":"模块详情页面",
        "头像":"头像",
        "角色":"角色",
        "员工号":"员工号",
        "楼号":"楼号",
        "座位号":"座位号",
        "您的EID":"您的EID",
        "eid":"EID",
        "内容":"内容",
        "用户管理":"用户管理",
        "请输入内容":"请输入内容",
        "详细页面":"详细页面",
        "加载中...":"加载中...",
        "加载更多":"加载更多",
        "借用时间":"借用时间",
        "归还时间":"归还时间",
        "设备序列号":"设备序列号",
        "设备移交":"设备移交",
        "自EID":"自EID",
        "至EID":"至EID",
        "发送给":"发送给",
        "相关任务":"相关任务",
        "请输入设备序列号":"请输入设备序列号",
        "请输入资产编号":"请输入资产编号",
        "请输入序列号":"请输入序列号",
        "指派给角色":"指派给角色",
        "请选择":"请选择",
        "开始日期":"开始日期",
        "结束日期":"结束日期",
        "期望日期":"期望日期",
        "状态":"状态",
        "EID/姓名":"EID/姓名",
        "项目/部门":"项目/部门",
        "设备取还":"设备取还",
        "请输入分类":"请输入分类",
        "分类":"分类",
        "分类名称":"分类名称",
        "值":"值",
        "日期":"日期",
        "请输入值":"请输入值",
        "操作":"操作",
        "数据字典":"数据字典",
        "数据字典的管理":"数据字典的管理",
        "领取人 填写信息":"领取人 填写信息",
        "归还人 填写信息":"归还人 填写信息",
        "IT部门 填写设备信息":"IT部门 填写设备信息",
        "确定 领取人":"确定 领取人",
        "填写设备信息":"填写设备信息",
        "双方确认并签字":"双方确认并签字",
        "说明":"说明",
        "签名完毕":"签名完毕",
        "擦掉重签":"擦掉重签",
        "机型":"机型",
        "显示器":"显示器",
        "台式机":"台式机",
        "笔记本":"笔记本",
        "电脑锁":"电脑锁",
        "电脑包":"电脑包",
        "鼠标":"鼠标",
        "键盘鼠标":"键盘鼠标",
        "网线":"网线",
        "电源适配器&电源线":"电源适配器&电源线",
        "请选择台式机或者笔记本":"请选择台式机或笔记本",
        "请输入显示器的尺寸，可以输入多个":"请输入显示器的尺寸，可以输入多个",
        "请输入笔记本型号":"请输入笔记本型号",
        "请输入或选择笔记本型号":"请输入或选择笔记本型号",
        "如有必要，请输入一些备注信息":"如有必要，请输入一些备注信息",
        "我发布的通知":"我发布的通知",
        "我发布的任务":"我发布的任务",
        "设备取还履历":"设备取还履历",
        "设备移交履历":"设备移交履历",
        "扫码登录":"扫码登录",
        "账户或密码错误":"账户或密码错误",
        "EID登录":"EID登录",
        "如果忘记EID密码，请联系上级管理员进行密码重置":"如果忘记EID密码，请联系上级管理员进行密码重置",
        "操作不熟悉的用户，请在IT人员的指导下完成":"操作不熟悉的用户，请在IT人员的指导下完成",
        "没有借取记录":"没有借取记录",
        "IT人员之间的批量设备取还":"IT人员之间的批量设备取还",
        "输入一个资产编号后，请按Enter键":"输入一个资产编号后，请按Enter键",
        "系统用户的增删改查、权限管理":"系统用户的增删改查、权限管理",
        "设备取还的查询":"取还设备的查询",
        "普通用户设备取还":"普通用户设备取还",
        "IT设备移交":"IT设备移交",
        "暂无数据":"暂无数据",
        "首页":"首页",
        "跳至":"跳至",
        "希望日期":"希望日期",
        "项目":"项目",
        "部门":"部门",
        "资产编号":"资产编号",
        "序列号":"序列号",
        "时间":"时间",
        "提交了一个任务":"提交了一个任务",
        "用户":"用户",
        "预约中":"预约中",
        "处理中":"处理中",
        "处理完毕":"处理完毕",
        "智能资产管理助手 - 设备领取、归还 - 无纸化办公实验版":"智能资产管理助手 - 设备领取、归还 - 无纸化办公实验版",
        "流程处理成功，回执已经发送到您的工作邮箱，请注意查收。":"流程处理成功，回执已经发送到您的工作邮箱，请注意查收。",
        "服务器成功返回请求的数据。":"服务器成功返回请求的数据。",
        "新建或修改数据成功。":"新建或修改数据成功。",
        "一个请求已经进入后台排队（异步任务）。":"一个请求已经进入后台排队（异步任务）。",
        "删除数据成功。":"删除数据成功。",
        "发出的请求有错误，服务器没有进行新建或修改数据的操作。":"发出的请求有错误，服务器没有进行新建或修改数据的操作。",
        "用户没有权限（令牌、用户名、密码错误）。":"用户没有权限（令牌、用户名、密码错误）。",
        "用户得到授权，但是访问是被禁止的。":"用户得到授权，但是访问是被禁止的。",
        "发出的请求针对的是不存在的记录，服务器没有进行操作。":"发出的请求针对的是不存在的记录，服务器没有进行操作。",
        "请求的格式不可得。":"请求的格式不可得。",
        "请求的资源被永久删除，且不会再得到的。":"请求的资源被永久删除，且不会再得到的。",
        "当创建一个对象时，发生一个验证错误。":"当创建一个对象时，发生一个验证错误。",
        "服务器发生错误，请检查服务器。":"服务器发生错误，请检查服务器。",
        "网关错误。":"网关错误。",
        "服务不可用，服务器暂时过载或维护。":"服务不可用，服务器暂时过载或维护。",
        "网关超时。":"网关超时。",
        "文件下载中。。。":"文件下载中。。。",
        "删除完毕":"删除完毕",
        "分析页":"分析页",
        "用户列表":"用户列表",
        "收货订单":"收货订单",
        "返回首页":"Return to Home",
        "抱歉，您访问的页面不在":"抱歉，您访问的页面不在",
        "抱歉，服务器出错了":"抱歉，服务器出错了",
        "获取验证码":"获取验证码",
        "提交了":"提交了",
        "触发401":"触发401",
        "触发403":"触发403",
        "触发500":"触发500",
        "触发404":"触发404",
        "点击EID的“查询”按钮进行验证":"点击EID的“查询”按钮进行验证",
        "默认请于期望日期的上午9点钟前处理设备移交":"默认请于期望日期的上午9点钟前处理设备移交",
        "配件":"配件",
        "请输入配件信息":"请输入配件信息",
      },
    },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
}});


export default i18n;

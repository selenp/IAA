import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "zh": "中文",
        "en": "English",
        "任务": "Tasks",
        "主题":"Subject",
        "请选择或输入主题":"Please select or enter subject",
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
        "下载":"Download",
        "通知":"Notification",
        "展开":"Unfold",
        "备注":"Note",
        "选填":"(Elective)",
        "已领取":"Received",
        "已归还":"Returned",
        "待归还":"To be returned",
        "借出时间":"Receive Date",
        "删除":"Delete",
        "领取":"Receive",
        "归还":"Return",
        "取环":"Retrieval",
        "保存":"Save",
        "请选择领取或归还":"Please select receive or return",
        "请输入EID":"Please enter EID",
        "请输入姓名":"Please enter your name",
        "请输入密码":"Please enter password",
        "请输入角色":"Please enter role",
        "请选择角色":"Please select role",
        "请输入员工号": "Please enter sap number",
        "请输入部门":"Please enter department",
        "请输入或选择部门":"Please enter or select department",
        "请输入或选择角色":"Please enter or select role",
        "请输入或选择项目":"Please enter or select program",
        "请输入您办公地点的楼号":"Please enter the building number of your office",
        "请输入您办公地点的楼层":"Please enter the floor of your office",
        "请输入您办公地点的座位号":"Please enter the seat number of your office",
        "姓名":"Name",
        "模块详情页面":"Module Specification Page",
        "头像":"avatar",
        "角色":"Role",
        "员工号":"Sap Number",
        "办公地点":"Office Location",
        "楼层":"Floor",
        "座位号":"Seat Number",
        "您的EID":"Your EID",
        "eid":"eid",
        "内容":"Content",
        "用户管理":"User Management",
        "请输入内容":"Please enter content",
        "详细页面":"Detailed Page",
        "加载中...":"Loading",
        "加载更多":"Load more",
        "借用时间":"Borrow Date",
        "归还时间":"Return Date",
        "设备编号":"Device ID",
        "设备移交":"Device Handover",
        "自EID":"From EID",
        "至EID":"To EID",
        "发送给":"Send to",
        "相关任务":"Related tasks",
        "请输入设备编号":"Please enter device ID",
        "请输入资产编号":"Please enter asset number",
        "请输入序列号":"Please serial number",
        "指派给角色":"Assign to role",
        "请选择":"Please select",
        "开始日期":"Start date",
        "结束日期":"Due date",
        "请输入结束日期":"Please enter due date",
        "状态":"Status",
        "EID/姓名":"EID/Name",
        "项目/部门":"Program/Department",
        "设备取还":"Device Retrieval",
        "请输入分类":"Please enter category",
        "分类":"Category",
        "分类名称":"Category Name",
        "值":"Data",
        "日期":"Date",
        "请输入值":"Please enter data",
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
        "如果需要，这里可以放一些关于产品的常见问题说明。":"Some common questions can be here if necessary.",
        "签名完毕": "Signing is complete",
        "擦掉重签":"Wipe off and Resign",
        "机型":"Laptop Model",
        "显示器":"Monitor",
        "台式机":"Desktop",
        "笔记本":"Laptop",
        "电脑锁":"Computer Lock",
        "电脑包":"Laptop Bag",
        "鼠标":"Mouse",
        "键盘鼠标":"Keyboard & Mouse",
        "网线":"Cable",
        "电源适配器&电源线": "Power Adapter & Power Cord",
        "请选择台式机或者笔记本":"Please select desktop or laptop",
        "请输入显示器的尺寸，可以输入多个": "Please enter the size of the monitor, you can enter more than one",
        "请输入笔记本型号":"Please enter the laptop model",
        "请输入或选择笔记本型号":"Please enter or select laptop model",
        "如有必要， 请输入一些备注信息":"Please enter some remarks if necessary",
        "我发布的通知":"My Announcement",
        "我发布的任务":"Missions I assigned",
        "设备取还履历":"Device Retrieval History",
        "扫码登录":"Scan to Login",
        "账户或密码错误":"Wrong username or password",
        "账户密码登录":"Login with username and password",
        "如果忘记密码，请联系上级管理员进行密码重置":"If you forget your password, please contact your supervisor to reset your password",
        "操作不熟悉的用户，请在IT人员的指导下完成":"If you are not familiar with the operation, please follow the guidance of IT staff",
        "没有借取记录":"No Retrieval History",
        "IT人员之间的批量设备取还":"Batch equipment retrieval between IT staff",
        "输入一个资产编号后，请按Enter键":"Press enter after enter a asset number",
        "系统用户的增删改查、权限管理":"The system user crud, privilege management",
        "设备取还的查询":"Retrieve Device",
        "普通用户设备取还":"User Equipment Retrieval",
        "IT设备取还":"IT Device Retrieval",
        "暂无数据":"No data",
        "首页":"Home",
        "跳至":"Jump to",
        "希望日期":"Hope Date",
        "项目":"Program",
        "部门":"Department",
        "资产编号":"Asset Number",
        "序列号":"serial number",
        "时间":"Date",
        "提交了一个任务":"Assigned a task",
        "用户":"User",
      },
    },
    zh: {
      translations: {
        "zh": "中文",
        "en": "English",
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
        "下载":"下载",
        "通知":"通知",
        "展开":"展开",
        "备注":"备注",
        "选填":"选填",
        "已领取":"已领取",
        "已归还":"已归还",
        "待归还":"待归还",
        "借出时间":"借出时间",
        "删除":"删除",
        "领取":"领取",
        "归还":"归还",
        "取环":"取环",
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
        "请输入您办公地点的楼层":"请输入您办公地点的楼层",
        "请输入您办公地点的座位号": "请输入您办公地点的座位号",
        "姓名":"姓名",
        "模块详情页面":"模块详情页面",
        "头像":"头像",
        "角色":"角色",
        "员工号":"员工号",
        "办公地点":"办公地点",
        "楼层":"楼层",
        "座位号":"座位号",
        "您的EID":"您的EID",
        "eid":"eid",
        "内容":"内容",
        "用户管理":"用户管理",
        "请输入内容":"请输入内容",
        "详细页面":"详细页面",
        "加载中...":"加载中...",
        "加载更多":"加载更多",
        "借用时间":"借用时间",
        "归还时间":"归还时间",
        "设备编号":"设备编号",
        "设备移交":"设备移交",
        "自EID":"自EID",
        "至EID":"至EID",
        "发送给":"发送给",
        "相关任务":"相关任务",
        "请输入设备编号":"请输入设备编号",
        "请输入资产编号":"请输入资产编号",
        "请输入序列号":"请输入序列号",
        "指派给角色":"指派给角色",
        "请选择":"请选择",
        "开始日期":"开始日期",
        "结束日期":"结束日期",
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
        "如果需要，这里可以放一些关于产品的常见问题说明。":"如果需要，这里可以放一些关于产品的常见问题说明。",
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
        "扫码登录":"扫码登录",
        "账户或密码错误":"账户或密码错误",
        "账户密码登录":"账户密码登录",
        "如果忘记密码，请联系上级管理员进行密码重置":"如果忘记密码，请联系上级管理员进行密码重置",
        "操作不熟悉的用户，请在IT人员的指导下完成":"操作不熟悉的用户，请在IT人员的指导下完成",
        "没有借取记录":"没有借取记录",
        "IT人员之间的批量设备取还":"IT人员之间的批量设备取还",
        "输入一个资产编号后，请按Enter键":"输入一个资产编号后，请按Enter键",
        "系统用户的增删改查、权限管理":"系统用户的增删改查、权限管理",
        "设备取还的查询":"取还设备的查询",
        "普通用户设备取还":"普通用户设备取还",
        "IT设备取还":"IT设备取还",
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

// 当输入框失去焦点时调用这里的方法验证手机号
export const validatePhone = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入手机号"));
    } else {
      // 定义正则
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value) == true) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    }
  };
  
  // 邮箱验证方法:当输入框失去焦点时调用这里的方法
  export  const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱地址不能为空!"));
      } else {
        // 定义正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱地址!"));
        }
      }
    };
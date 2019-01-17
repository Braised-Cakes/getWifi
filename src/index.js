class Wifi{
  constructor(){
    this.re = {result:null,ori:null}
  }

	get UA(){
    return this._UA || (this._UA=navigator.userAgent);
  }
  set UA(val){
    return null;
  }
  get platformInfo(){
    if(!this._platformInfo){
      let UAIDS = {
        client:{
          weibo: 'weibo',
          weixin: 'micromessenger',
          QQ: 'qq',
          uc:'uc'
        },
        system:{
          ios: 'ios',
          android: 'android'
        }
      };
      let UA = this.UA;
      let regKeys = [], matches=[], ret={};
      Object.keys(UAIDS).forEach((_type) => {
        regKeys = regKeys.concat(Object.keys(UAIDS[_type]).map((item) => {
          return UAIDS[_type][item];
        }));
      });
      matches = UA.toLowerCase().match(new RegExp('('+regKeys.join('|')+')+','ig'));
      if(matches&&matches.length > 0){
        Object.keys(UAIDS).forEach((_type) => {
          let item = UAIDS[_type],
              matcher='other',
              key=null;
          Object.keys(item).some((key) => {
            if(matches.indexOf(item[key]) !== -1){
              matcher = key;
              return true;
            }
            return false;
          });
          ret[_type] = matcher;
        });
      }
      if(ret.system !== 'android'){
          ret.system = 'ios';
      }

      this._platformInfo = ret;
    }
    return this._platformInfo;
  }
  set platformInfo(val){
    return null
  }
  wifi(cb){
      let plat = this.platformInfo;
      switch(plat.client){
        case 'weixin':
        case 'QQ':
          this.weixin(cb);
          break;
        case 'weibo':
           this.weibo(cb)
          
          break;
        default :
          this.other(cb);
          break;
      }  
  }
  weixin(cb){
    let ua = this.UA;
    if(/NetType/.test(ua)){
      //手Q，微信路线
      let type = ua.match(/NetType\/(\S*)/);
      this.re.ori = type[1];
      if(type[1].toLowerCase() == 'wifi'){
        this.re.result = 'wifi';
      }
    }else{
      // QQ浏览器路线
      this.other(cb);
    }
    cb(this.re)
  }
  weibo(cb){

    if(this.platformInfo.system == 'android'){
      this.other(cb);
    }else{
      setTimeout(()=>{
        if(typeof(WeiboJSBridge)=='undefined') return;
        // document.addEventListener("WeiboJSBridgeReady", function(){
        WeiboJSBridge.invoke("getNetworkType",{"param" : "value"} ,(params, success, error)=>{  
          // alert(success)                 
          if(success&&params.network_type.toLowerCase() == 'wifi'){
            this.re.ori = params.network_type.toString();
            this.re.result = 'wifi';
            // resolve(this.re);
            cb(this.re)
          }else{  
            // resolve(this.re);
            // alert(this.re)
            this.re.ori = params.network_type.toString();
            cb(this.re)
          }  
        });
      },300)
    }
  }
  other(cb){
    let connection = window.navigator.connection;
    if(connection&&connection.type){
      
      this.re.ori = connection.type.toString();
      if(connection.type.toString().toLowerCase() == 'wifi'||parseInt(connection.type) == 5){
        this.re.result = 'wifi';
      }
    }
    cb(this.re)
  }
}
let wifi = new Wifi();

export default wifi;

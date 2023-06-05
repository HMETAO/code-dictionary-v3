import {TUIComponents, TUICore} from '../TUIKit';
// import TUICallKit
import {TUICallKit} from '@tencentcloud/call-uikit-vue';


// init TUIKit
const TUIKit = TUICore.init({
    SDKAppID: parseInt(import.meta.env.VITE_IM_SDK_APP_ID)
});
// TUIKit add TUIComponents
TUIKit.use(TUIComponents);
// TUIKit add TUICallKit
TUIKit.use(TUICallKit);


export default TUIKit

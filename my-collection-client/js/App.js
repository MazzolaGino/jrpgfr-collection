import LoggedContent from "./LoggedContent.js";
import UnloggedContent from "./UnloggedContent.js";
import ComponentManager from "./ComponentManager.js";
import Config from "./Config.js";
import CookieManager from "./CookieManager.js";





const cm = new ComponentManager(Config.getLocalUrl(), 'app.html', CookieManager);


cm.addComponent(UnloggedContent, 'login', []);
cm.addComponent(LoggedContent, 'home', []);

cm.load();
sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        llink: async function (oEvent) { 
            var oModel = oEvent.getModel();
            var Name = 'cbe';
					let oFunction = oModel.bindContext(`/${Name}(...)`);
                    var key = oEvent.sPath.match(/'([^']+)'/)?.[1];
                    oFunction.setParameter("ID",key);
                    await oFunction.execute(); 
                    let oContext1 = oFunction.getBoundContext();
						let result1 = oContext1.getObject();
                            result1 = JSON.parse(result1.value);
            // MessageToast.show("Custom handler invoked.");
            var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

            href_For_Product_display.navigate({
                target: { semanticObject: "cbecompdbdynobj", action: "display" },
                params:{
                    ProjectId:`${result1.ProjectId}`
                }
            });
        }
    };
});

sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("panapproval.ext.controller.ListController",{override:{onInit:async function(){},routing:{onAfterBinding:async function(e){var t=this.base.getExtensionAPI().getModel();var a="filteredData";let i=t.bindContext(`/${a}(...)`);await i.execute();let r=i.getBoundContext();let n=r.getObject();var l=[{isEmpty:null,operator:"EQ",validated:"NotValidated",values:["Pending for Approval"]}];debugger;var o=JSON.parse(n.value);var s={PAN_Number:o,status:l};if(s.PAN_Number.length==0)s.PAN_Number=[{isEmpty:null,operator:"EQ",validated:"NotValidated",values:[""]}];let d=await this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").getFilterConditions();d.PAN_Number=s.PAN_Number;await this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").setFilterConditions(d);await sap.ui.getCore().byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR-btnSearch").firePress()}}}})});
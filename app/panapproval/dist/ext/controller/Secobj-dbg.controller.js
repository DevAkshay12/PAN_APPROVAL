sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('panapproval.ext.controller.Secobj', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf panapproval.ext.controller.Secobj
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing:{
				onAfterBinding:async function(){ 
					const url =location.href;
const regex = /PAN_Number='([^']+)'/;
const match = url.match(regex);
const filter_Number = match ? match[1] : null;

					let filter = {PAN_Number:[
						{
							"operator": "EQ",
							"values": [
								filter_Number
							],
							"validated": "NotValidated"
						}
					]};
					sap.ui.getCore().byId('panapproval::PAN_Details_APR_tab1tovendor_dataObjectPage--fe::table::vendtopd::LineItem::PRICEDETAILS').setFilterConditions(filter);
					sap.ui.getCore().byId('panapproval::PAN_Details_APR_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS').setFilterConditions(filter);
					

					let sObj = {sorters : [{descending: false , name:"Property::slNo"}]}; 
					await sap.ui.getCore().byId('panapproval::PAN_Details_APR_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS').setSortConditions(sObj);

					var frag4 = this.base.getView().getContent()[0]
						frag4.attachSectionChange(function(){ 
							var section = this.getScrollingSectionId()
							
								 
								// var val22 = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.getColumns()[1]	
								// var firstcoulmn = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns[1]
								// // var value232 = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0]
								// var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
								// const maxLength = Math.max(...valuevendor.map(item => item.Vendor_Name.length));
								// const width = maxLength * 8 + 20 + "px"; 
   
								// firstcoulmn.setWidth(width)

								// var val22 = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.getColumns()[1]	
								var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
								if(columns != undefined )
								columns.forEach(col =>{
									var colName = col.mProperties.dataProperty;
									var colHeader = col.getHeader();
									var mLength = colHeader.length;		
									var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
												const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
									if(maxLength > mLength)
										mLength = maxLength; 
								const width = mLength * 8 + 20 + "px"; 
   
								col.setWidth(width);
								sap.ui.getCore().byId('panapproval::PAN_Details_APR_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS-innerTable').getColumns()[2].setWidth('350px')
								sap.ui.getCore().byId('panapproval::PAN_Details_APR_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS-innerTable').getColumns()[4].setWidth('350px')
											});	
							
						   });
				}
			}
		}
	});
});

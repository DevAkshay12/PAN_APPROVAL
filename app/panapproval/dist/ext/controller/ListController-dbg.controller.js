sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('panapproval.ext.controller.ListController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
	
		
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf panapproval.ext.controller.ListController
			 */
			
			onInit: async function () {
			
				 
				// sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR-btnSearch').firePress();
				// // you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oModel = this.base.getExtensionAPI().getModel();
				// var Name = 'filteredData';
				// let oFunction = oModel.bindContext(`/${Name}(...)`);
				// await oFunction.execute(); 
				// let oContext1 = oFunction.getBoundContext();
				// 	let result1 = oContext1.getObject();
				// 		result1 = JSON.parse(result1.value);

						// console.log(result1);
				// this.base.getExtensionAPI().refresh();
				// var go_button = sap.ui.getCore().byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR-btnSearch");

				// go_button.attachPress((oEvent) => {
				// 	 

					
					// sap.ui.getCore().byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR::FilterField::PAN_Number-inner").setTokens([PAN123]);
					// var searchfield = sap.ui.getCore().byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR::FilterField::PAN_Number-inner");
					// if (searchfield) {
						//  var data = ["PAN123"];
						// for (let i = 0; i < data.length; i++) {
						// 	sap.ui.getCore().byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR::FilterField::PAN_Number-inner").mAggregations.tokenizer.addToken(new sap.m.Token(`${"ctoken" + i}`, {
						// 		editableParent: true,
						// 		posinset: 1,
						// 		setsize: 1,
						// 		text: `${data[i]}`
						// 	}))

						// }
					// }
				
					 
					// sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.destroyRows();
					// sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.addRow(nRows[0]);
					
					
 
					//w// var PAN_Number=[{isEmpty:null,
					// operator:"EQ",
					// validated:"NotValidated",
					// values:['PAN123']},
					// {isEmpty:null,
					// 	operator:"EQ",
					// 	validated:"NotValidated",
					// 	values:['pan12']}];
					//w// var arr = {PAN_Number:PAN_Number}
					// var tets = this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").getFilterConditions();
					// tets.PAN_Number = PAN_Number;
					//w// this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").setFilterConditions(arr);
					// this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").getFilterConditions();
					// console.log();
					 
				// })
			},
		
			routing:{
			
				onAfterBinding:async function(oEvent){ 
					var oModel = this.base.getExtensionAPI().getModel();
					var Name = 'filteredData';
							let oFunction = oModel.bindContext(`/${Name}(...)`);
							await oFunction.execute(); 
							let oContext1 = oFunction.getBoundContext();
								let result1 = oContext1.getObject();

								var statFilter =[{isEmpty:null,
									operator:"EQ",
									validated:"NotValidated",
									values:['Pending for Approval']}];


								var PAN_Number = JSON.parse(result1.value);
									 var arr = {PAN_Number:PAN_Number,status:statFilter};
									 if(arr.PAN_Number.length == 0)
									  arr.PAN_Number=[{isEmpty:null,
													operator:"EQ",
													validated:"NotValidated",
													values:['']}];
								await	  this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").setFilterConditions(arr);
					//  this.base.getView().getContent()[0].getContent().getContent().mBindingInfos.busy.binding.refresh()
					 await sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR-btnSearch').firePress();



					//  var frag4 = this.base.getView().getContent()[0]
					//  frag4.attachSectionChange(function(){ 
					// 	 var section = this.getScrollingSectionId()
					// 	 if (section == "project1::parentObjectPage--fe::FacetSection::table"){
					// 		  
					// 		 var val22 = sap.ui.getCore().byId('project1::parentObjectPage--fe::FacetSection::table').mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.getColumns()[1]	
					// 		 var value232 = sap.ui.getCore().byId('project1::parentObjectPage--fe::FacetSection::table').mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.items.binding.oCache.getValue()
					// 		 const maxLength = Math.max(...value232.map(item => item.name.length));
					// 		 const width = maxLength * 8 + 20 + "px"; 

					// 		 val22.setWidth(width)
					// 	 }
					// 	});

					 // let fun = function(){
					// 	setTimeout(()=>{
					// 		let dosomething = 'something;'
					// 	},1000)
					// 	return dosomething
					// }
					// await fun();
					//  this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").setFilterConditions(arr);
					//  this.base.getView().getContent()[0].getContent().getContent().mBindingInfos.busy.binding.refresh()

				    // var PAN_Number=[{isEmpty:null,
					// operator:"EQ",
					// validated:"NotValidated",
					// values:['PAN123']},
					// {isEmpty:null,
					// 	operator:"EQ",
					// 	validated:"NotValidated",
					// 	values:['pan12']}];
					//  var arr = {PAN_Number:PAN_Number};
					//  this.base.byId("panapproval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR").setFilterConditions(arr);


					// this.base.byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').destroyColumns()
					// var data = ["PAN123"];
					// let oRows = sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.getRows();
					// let oTable = sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem');
					// let nRows = [];
					
					// for(let i = 0 ;i <oRows.length;i++){
					// 	let cond = data.includes(sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.getRows()[i].mAggregations.cells[0].mProperties.text);
					// 	if(!cond){
					// 		// RemoveRows.push(row);
					// 		// sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.removeRow(`${i}`);
					// 		// nRows.push(sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem').mAggregations._content.getRows()[i]);
					// 		sap.ui.getCore().byId('panapproval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem::Table').getContent().mAggregations._content.removeRow(oRows[i]);
					// 	}
					// }
				}
			}
		}
	});
});

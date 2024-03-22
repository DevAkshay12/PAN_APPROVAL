sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var cdialog;
	// var timeline = sap.suite.ui.commons.TimelineItem;
	
	return ControllerExtension.extend('panapproval.ext.controller.PanDetailsObj', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf panapproval.ext.controller.PanDetailsObj
             */
			onInit: function () { 
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				// this.getView().setVisible(false);
				// this.getView().destroyContent();
				// this.getView().addContent();

			},
			onBeforeRendering:async function(){ 
				
			},
			onAfterRendering:async function(){ 
				// sap.ui.getCore().byId('panapproval::PAN_Details_APRObjectPage--fe::FooterBar').setEnabled(true);
			},
			routing :  {
				
				onBeforeBinding: async function(oBindingContext){ 
					

					this.getView().setVisible(false);
					// let func = function(){
					// 	 
					// }
					var view = this.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].setUploadEnabled(false);
					// this.base.getExtensionAPI().getEditFlow().attachonAfterSave(func);
					var that = this;
					var complete_url = window.location.href;
					   var pieces = complete_url.split("(");
					   var res = pieces[1];
					//    var res = pieces[1];
            		   var res1 = res.split("'");

					   var oModel = this.base.getExtensionAPI().getModel();
					   var Name = 'validateUser';
							   let oFunction = oModel.bindContext(`/${Name}(...)`);
							   oFunction.setParameter("ID",res1[1]);
							   await oFunction.execute(); 
							   let oContext1 = oFunction.getBoundContext();
								   let result1 = oContext1.getObject();
								   var validated = JSON.parse(result1.value);
								   
					   if(validated.status == 'User Found'){

						this.getView().setVisible(true);

						var frag4 = this.base.getView().getContent()[0]
					// 	function resize(id) { 
					// 	let subCol = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations.columns;
					// subCol.forEach(col =>{
					// 	let colName = col.mProperties.dataProperty;
					// 	var colHeader = col.getHeader();
					// 			var mLength = colHeader.length;	
					// 				let valuevendor = sap.ui.getCore().byId(id).mAggregations.content.getContent().mAggregations._content.mBindingInfos.rows.binding.oCache.getAllElements();
					// 				const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
					// 		if(maxLength > mLength)
					// 		mLength = maxLength; 
					// const width = mLength * 8 + 20 + "px"; 

					// col.setWidth(width)
					// 			});	
					// }
					
						frag4.attachSectionChange(function(){ 
							var section = this.getScrollingSectionId()
							// if(section == "panapproval::PAN_Details_APRObjectPage--fe::FacetSection::GeneralDetails1"){ 
							// 	resize("__block1");
							// 	resize("__block2");
							// };

								 
								var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
								if(columns != undefined )
								columns.forEach(col =>{
									let colName = col.mProperties.dataProperty;
									let mLength = colName.length;
												let valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
												const maxLength = Math.max(...valuevendor.map(item => (item[colName]?.length ?? 8)));
										if(maxLength > mLength)
										mLength = maxLength; 
								const width = mLength * 8 + 20 + "px"; 
   
								col.setWidth(width)
											});	
							
						   });

						   debugger
						var baseUrl = this.base.getAppComponent().getManifestObject()._oBaseUri._string;
						//117 and 102
						await $.ajax({
						 url: baseUrl + `odata/v4/pan-approval/PAN_Details_APR/${res1[1]}`,
						//  url: `/odata/v4/pan-approval/PAN_Details_APR/${res1[1]}`,
						 success: function(result) { 
							 that.getView().getContent()[0].getFooter().setVisible(true);
							 if(result.status == 'Approved' ||result.status == 'Rejected'||result.status == 'Justification Needed')
							 that.getView().getContent()[0].getFooter().setVisible(false);
							 
							 
						 },
						 error: function(xhr, status, error) { 
							 // Handle errors if any
							 console.error(error);
						 }
					 });
 
 
					   await $.ajax({
						 url:baseUrl + `odata/v4/pan-approval/PAN_Details_APR/${res1[1]}/tab1toWORKFLOW_HISTORY`,
						//  url:`/odata/v4/pan-approval/PAN_Details_APR/${res1[1]}/tab1toWORKFLOW_HISTORY`,
						 success: function(result) {
							 // Code inside this function will execute after the AJAX call successfully completes
							 console.log(result);
					 
							 // Call a function and pass the result data to it
							 processData(result);
						 },
						 error: function(xhr, status, error) {
							 // Handle errors if any
							 console.error(error);
						 }
					 });
					 
					 // Define a function to process the result data
					  function processData(result) {
						 
						 var dataa = result.value;
						 var data = [];
						 dataa.forEach(element =>{
							 data.push({
								 level : element.level,
								 Notification_Status : element.Notification_Status,
								 Title : element.Title,
								 Employee_ID : element.Employee_ID,
								 Employee_Name : element.Employee_Name,
								 "Begin_Date/_Time" : element.Begin_DateAND_Time,
								 "End_Date/_Time" : element.End_DateAND_Time,
								 Days_Taken : element.Days_Taken,
								 Status : element.Result,
								 By_User : element.Approved_by,
							 });
						 });
 
						 let oSection = that.base.getView().getContent()[0].getSections()[3];
					 
					 //   SORT DATA BY LEVEL
					 let sortedData = data.sort((d1,d2) => (d1.level > d2.level) ? 1 :(d1.level < d2.level) ? -1 : 0 );
 
					 // this.sortedData = sortedData;
 
					 let target = [];
					 let innerArray = [];
					 let level ;
					 let levelp;
					 let len = sortedData.length - 1;
 
					 // SEPARATE DATA BY LEVEL
					 sortedData.forEach((item, index) => {
						 level = item.level;
						 if (levelp != undefined){
							 if(level !== levelp){
								 target.push(innerArray);
								 innerArray = [];
							 }
						 }
						 innerArray.push(item);
						 levelp = item.level;
						 if(index == len) {
							 target.push(innerArray);
						 }
					 });
 
					 // GENERATE TABLE UI
 
					 oSection.destroySubSections();
 
					 oSection.addSubSection(new sap.uxap.ObjectPageSubSection({
						 // title: `Level ${levelArray[0].level}`
					 }));
					 let subSections = oSection.getSubSections();
					 let oSubSection = subSections[subSections.length - 1];
					 
					 
						 oSubSection.addBlock(new sap.m.ScrollContainer({
							 horizontal: true,
							 vertical:true,
							 visible:true,
							 height:"200px"
						 }))
					 
					 let oScroll = oSubSection.getBlocks()[0];
					 oScroll.addContent(new sap.m.HBox({
						 width:"100%",
						 alignItems: "End",
						 alignContent:"End"
					   }));
					   let BsubSections = oScroll.getContent();
					   let ButtonHbox  = BsubSections[BsubSections.length - 1];
					   ButtonHbox.addItem(new sap.m.HBox({
						 width:"90%"
					   }))
					   ButtonHbox.addItem(new sap.m.Button({
						 text:"Comment History",
						 press:async function(oEvent) { 
							 function generateUniqueId() {
								 // Generate a random number
								 var randomNumber = Math.floor(Math.random() * 1000000);
			 
								 // Get the current timestamp
								 var timestamp = new Date().getTime();
			 
								 // Combine timestamp and random number to create a unique ID
								 var uniqueId = timestamp + '-' + randomNumber;
			 
								 return uniqueId;
							 }
							 if(!cdialog){
								 cdialog = new sap.m.Dialog({
									 title:"Approval Comments",
									 endButton: new sap.m.Button({
										 text: "Close",
										 press:async function () { 
											 cdialog.close();
										 },
								 layoutData: new sap.m.FlexItemData({ // Add layoutData for flexible item behavior
									 growFactor: 5,
									 alignSelf: "End" // Align the button to the end (right)
								 })
							 })
							 })
						 }
							 cdialog.addContent(new sap.m.VBox({
								 width:"60vw"
							 }));
 
							 
							 let functionname = 'getcomments';
							 let oFunction = oEvent.getSource().getModel().bindContext(`/${functionname}(...)`);
							 console.log();
							 var complete_url = window.location.href;
							 var pieces = complete_url.split("(");
							 var res = pieces[1];
							 //    var res = pieces[1];
							 var res1 = res.split("'");
							 var panNumber = res1[1];
							 oFunction.setParameter('ID',panNumber);
							 await oFunction.execute();
							 const oContext = oFunction.getBoundContext();
							 let resVal = oContext.getValue();
							 resVal = JSON.parse(resVal.value);
 
							 const data = [];
							 const entry = resVal[0];
							 if (entry ==undefined){
								 var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
									 // id: `${"item" + generateUniqueId()}`,
									 // dateTime: `${data[i].dateTime}`,
									 // title: `${data[i].lname}`,
									 // userNameClickable: false,
									 // userNameClicked: "onUserNameClick",
									 // select: "onPressItems",
									 // userPicture: "Photo",
									 text: 'No Comments Found',
									 // userName: `${data[i].firsname}`,
								 });
								 cdialog.getContent()[0].destroyItems();
								 cdialog.getContent()[0].addItem(oTimelineItem);
							 }
							 else{
								 resVal.forEach(entry => {
									 const createdAt = entry.createdAt;
									 const createdBy = entry.createdBy;
									 const modifiedAt = entry.modifiedAt;
									 const modifiedBy = entry.modifiedBy;
									 const idd = entry.idd;
									 const pannum = entry.PAN_Number;
									 const user = entry.user;
									 const comments = entry.Comments;
									 const status = entry.status;  
									 
									 data.push({
										 firsname : user,
										 lname : status,
										 comment : comments,
										 dateTime : createdAt,
										 // dateTime : "dfghjk",
									 })
								 });
								 cdialog.getContent()[0].destroyItems();
								 for (let i = 0; i < data.length; i++) {
									  
									 // var currentDate = new Date();
									 // var currentDateTime = currentDate.toISOString();
									 var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
										 id: `${"item" + generateUniqueId()}`,
										 dateTime: `${data[i].dateTime}`,
										 title: `${data[i].lname}`,
										 userNameClickable: false,
										 userNameClicked: "onUserNameClick",
										 select: "onPressItems",
										 userPicture: "Photo",
										 text: `${data[i].comment}`,
										 userName: `${data[i].firsname}`,
									 });
									 
									 cdialog.mAggregations.content[0].addItem(oTimelineItem);
								 }
				 
				 
							 }
							 cdialog.open();
 
							 
 
						 }
					   }));
					 
					 target.forEach((levelArray) => {
						 oScroll.addContent(new sap.uxap.ObjectPageSubSection({
							 // title: `Level ${levelArray[0].level}`
						 }));
						 let subSections = oScroll.getContent();
						 let oSubSection = subSections[subSections.length - 1];
						 oSubSection.addBlock(new sap.m.VBox(`Box-${levelArray[0].level}`));
						 let Box = oSubSection.getBlocks()[0];
						 // a++
						 Box.addItem(new sap.m.HBox({
							 alignItems: "Center"
						 }));
 
						 // LINK/TITLE
 
						 let oHBox = Box.getItems()[0];
						 oHBox.addItem(new sap.m.Label({
							 text: `Level ${levelArray[0].level}`,
							 design: "Bold"
						 }));
 
						 oHBox.addItem(new sap.m.HBox({
							 width:"40%"
						 }));
 
 
 
						 oHBox.addItem(new sap.m.Label({
							 text: `Notification: `,
							 // design: "Bold"
						 }));
 
						 oHBox.addItem(new sap.m.Switch(`SwitchLevel--${levelArray[0].level}`,{
							 enabled: false,
							 type: "AcceptReject",
							 state : levelArray[0].Notification_Status === 'true',
							 change: function(oEvent){
								  ;
							 }
						 }));
 
						 // b++
						 Box.addItem(new sap.m.Table({
							 visible:true
						 }));
 
						 let oTable = Box.getItems()[1];
						 
						 // b++
						 // TABLE COLUMNS
 
						 let ColKeys = Object.keys(levelArray[0]);
						 ColKeys = ColKeys.slice(2);
						 let colArray = [];
						 ColKeys.forEach((col)=>{
							 if(!colArray.includes(col)){
								 var oColumn = new sap.m.Column({
									 header: new sap.m.Label({
										 text: col.replace(/_/g," ")
									 }),
									 width : "200px"
								 });
								 oTable.addColumn(oColumn);
								 colArray.push(col)
							 }
						 });
 
						 // Row Insert
 
						 levelArray.forEach((item)=>{
							 let oCells = [];
							 let oRow;
							 let vals = Object.values(item);
							 vals = vals.slice(2);
							 let oCell
 
							 vals.forEach((value) => {
								 oCell = new sap.m.Text({
									 text: value
								 });
								 oCells.push(oCell);
							 });
 
							 oRow = new sap.m.ColumnListItem({
								 cells: oCells
							   });
 
							   oTable.addItem(oRow);
 
						 })
					 })
					 
					 }
					 this.getView().getContent()[0].mAggregations.sections[4].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().setEditable(true);
						 this.getView().getContent()[0].mAggregations.sections[4].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().getFormContainers()[0].getFormElements()[0].getFields()[0].getContent().setEditMode('Editable');
						 this.getView().getContent()[0].mAggregations.sections[4].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getContent().getFormContainers()[0].getFormElements()[0].getFields()[0].getContent().getContentEdit()[0].setEditable(true);
						
						 sap.ui.getCore().byId('panapproval::PAN_Details_APRObjectPage--fe::FooterBar').setEnabled(true);
					 
					 
					   }
					       

					else{

						alert("You are Unauthorized to access this site!!");
					
				}
				},
				onAfterBinding : function(oBindingContext) {
					 
					var pan_numb = oBindingContext.oBinding.sPath;
					const pattern = /'([^']+)'/;
					const matches = pan_numb.match(pattern);
					const panNumber = matches[1];
					var path = this.base.getView().getContent()[0].getSections()[2].mAggregations._grid.getContent()[0].mAggregations._grid.getContent()[0].getContent().getItems()[1].mBindingInfos.items.binding;
					path.filter(
						new sap.ui.model.Filter({
							path: "PAN_Number",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: panNumber
						})
					);
				}
				
			}
		}
		
	});
	
});

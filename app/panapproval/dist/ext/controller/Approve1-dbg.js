// const { resolve } = require("path");

sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    var oBusyDialog = new sap.m.BusyDialog();
    var cont = new sap.m.Text({ text: "   Comments are mandatory!" });
    var cont1 = new sap.m.Text({ text: "Are you sure you want to Approve this form ?" });
    var action = "action";
    var errDialog = new sap.m.Dialog({
        type: sap.m.DialogType.Message,
        // icon:"sap-icon://error",
        state: "Error",
        title: "Error",
        // state: ValueState.Error,
        content: cont,
        beginButton: new sap.m.Button({
            // type: ButtonType.Emphasized,
            text: "OK",
            press: function () {
                errDialog.close();
            }.bind(this)
        })
    });

    return {
        Approve: async function (oEvent) {
            debugger
            let pr = new Promise((resolve) => {
                var confirmDialog = new sap.m.Dialog({
                    type: sap.m.DialogType.Message,
                    // icon:"sap-icon://error",
                    state: "Warning",
                    title: "Warning",
                    // state: ValueState.Error,
                    content: cont1,
                    beginButton: new sap.m.Button({

                        type: sap.m.ButtonType.Emphasized,
                        text: "OK",
                        press: function () {
                            debugger
                            action = "action";
                            confirmDialog.close();
                            // confirmDialog.destroyContent();
                            resolve();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        // type: ButtonType.Emphasized,
                        text: "Close",
                        press: function () {
                            debugger
                            action = null;
                            confirmDialog.close();
                            // confirmDialog.destroyContent();
                            resolve();
                        }.bind(this)
                    })
                });
                confirmDialog.open();
            });
            let pr_res = await pr;

            debugger
            if (action == null)
                return "not confirmed";

            oBusyDialog.open();
            // var baseUrl = oEvent.oModel.sServiceUrl;
            var oModel = oEvent.getModel();
            var Name = 'getuser';
            let oFunction = oModel.bindContext(`/${Name}(...)`);
            var key = oEvent.sPath.match(/'([^']+)'/)?.[1];
            key = { key: key, status: "Approved", urll: window.location.href };
            key = JSON.stringify(key);
            oFunction.setParameter("ID", key);
            await oFunction.execute();
            let oContext1 = oFunction.getBoundContext();
            let result1 = oContext1.getObject();
            result1 = JSON.parse(result1.value);


            if (result1.status == 'mandt') {
                oBusyDialog.close();
                errDialog.open();
                return "errr";
            }

            // let bod = JSON.stringify({
            //     "actionableType": "Task",
            //     "uniqueName": "TSK985780020",
            //     "actionName": "Approve",
            //     "options": {
            //       "comments":"test Comment"
            //     }
            //   });
            //    await $.ajax({
            //         url: "https://btp-dev-0or0hi20.it-cpi024-rt.cfapps.eu10-002.hana.ondemand.com/http/postcall",
            //         type: 'GET',
            //         // data:bod,
            //         // dataType:"json",
            //         // contentType:"application/json",
            //         headers: {
            //             "Authorization": "Basic c2ItODIxY2VlNDctOTIwZC00ZGUwLWJlYzEtMmUyNGVhZDY0ZGRiIWIyOTE1MzF8aXQtcnQtYnRwLWRldi0wb3IwaGkyMCFiMTgyNzIyOmIwYjY5N2RlLTNhOTEtNGVjNi05Y2Q5LWNkYzVmNTg1MjYxOSQ3YTdNNnAwRWJubXpZcDcyZG9ydWFHcEh2WEFVdmpIRExuQXJLMno2NEhzPQ==",
            //             "url":"https://openapi.ariba.com/api/sourcing-approval/v2/prod/action",
            //             "query" : "realm=tataprojects-T&user=VGR&passwordadapter=ThirdPartyUser&apikey=nQcLVavnQ7f2YklQoRtNeVgYFGyyqN4v",
            //             "basis":"Basic MWE4ZWQwOWQtYzdjYy00OWQyLWJhM2EtNzAyMTI0N2Q0YTYyOndvNnJmb2xxNEJmdjBlTGxCYW9jdDcxTkZ5dWFZcnZv"
            //         },
            //         // beforeSend: function(xhr){  xhr.setRequestHeader('Authorization','Basic c2ItODIxY2VlNDctOTIwZC00ZGUwLWJlYzEtMmUyNGVhZDY0ZGRiIWIyOTE1MzF8aXQtcnQtYnRwLWRldi0wb3IwaGkyMCFiMTgyNzIyOmIwYjY5N2RlLTNhOTEtNGVjNi05Y2Q5LWNkYzVmNTg1MjYxOSQ3YTdNNnAwRWJubXpZcDcyZG9ydWFHcEh2WEFVdmpIRExuQXJLMno2NEhzPQ=='); },
            //         success: function(res) {
            //             console.log(res);
            //             alert(res);
            //         },
            //         error: function(xhr, status, error) {
            //              console.error('GET Error:', error);

            //         }
            //     });

            // let Httpreq = new XMLHttpRequest();
            // const url = "https://btp-dev-0or0hi20.it-cpi024-rt.cfapps.eu10-002.hana.ondemand.com/http/postcall"
            // try{
            //     Httpreq.open("GET", url);
            //     Httpreq.send();
            //     Httpreq.onreadystatechange = function (){
            //          
            //     } 
            // } catch(error) {
            //      
            // }


            // await fetch('https://btp-dev-0or0hi20.it-cpi024-rt.cfapps.eu10-002.hana.ondemand.com/http/postcall')
            // .then(response => {
            //   if (response.ok) {
            //     return response.json(); // Parse the response data as JSON
            //   } else {
            //     throw new Error('API request failed');
            //   }
            // })
            // .then(data => {
            //   // Process the response data here
            //   console.log(data); // Example: Logging the data to the console
            // })
            // .catch(error => {
            //   // Handle any errors here
            //   console.error(error); // Example: Logging the error to the console
            // });
            // await $.ajax({
            //     url: baseUrl+`odata/v4/pan-approval${oEvent.sPath}`,
            //     // url: `/odata/v4/pan-approval${oEvent.sPath}`,
            //     method: 'GET',
            //     success: async function(response) {
            //         console.log('1 GET Success:', response);
            //         response.Current_level_of_approval = result1.currentLevel;
            //         response.Sap_workitem_id = result1.workitemId;
            //         if(result1.status == "Approved" && result1.currentLevel == " ")
            //         response.status = result1.status;

            //         if(response.Comments != null){
            //             var p_data = {
            //                 PAN_Number : response.PAN_Number, 
            //                 user : result1.user,
            //                 Comments : response.Comments, 
            //                 status: response.status
            //             };
            //             await $.ajax({
            //                 url: baseUrl+`odata/v4/pan-approval/PAN_Comments_APR`,
            //                 // url: `/odata/v4/pan-approval/PAN_Comments_APR`,
            //                 method: 'POST',
            //                 contentType: 'application/json',
            //                 data: JSON.stringify(p_data),
            //                 success: function(response) {
            //                     console.log('POST Success:', response);

            //                 },
            //                 error: function(xhr, status, error) {
            //                     console.error('POST Error:', error);

            //                 }
            //             });
            //             // window.history.go(-1);
            //             // window.location.reload();
            //         }
            //         delete response.PAN_Number;
            //         delete response.Comments;
            //         var updatee = response;
            //       await  $.ajax({
            //         url: baseUrl+`odata/v4/pan-approval${oEvent.sPath}`,
            //         // url: `/odata/v4/pan-approval${oEvent.sPath}`,
            //             method: 'PUT',
            //             contentType: 'application/json',
            //             data: JSON.stringify(updatee),
            //             success: function(response) {
            //                 console.log('PUT Success:', response);

            //             },
            //             error: function(xhr, status, error) {
            //                 console.error('PUT Error:', error);

            //             }
            //         });

            //     },
            //     error: function(xhr, status, error) {
            //         console.error('1 GET Error:', error);
            //         // Handling errors
            //     }
            // });
            //

            var previousPageUrl = document.referrer;
            console.log(previousPageUrl);
            // var n = window.location.href;

            // window.addEventListener('popstate', function(event) {
            //     window.location.reload();
            // });
            // window.history.back();
            oBusyDialog.close();
            if (result1.status == "er")
                alert("Sorry, we're experiencing technical difficulties. Please try again later.");
            else {
                sap.ui.getCore().byId('panapproval::PAN_Details_APRObjectPage--fe::FooterBar').setEnabled(false);
                sap.ui.getCore().byId('panapproval::PAN_Details_APRObjectPage--fe::FormContainer::ApprovalComments::FormElement::DataField::Comments::Field-edit').setEnabled(false)
            }
            var href_For_Product_display = await sap.ushell.Container.getServiceAsync("Navigation");

            href_For_Product_display.navigate({
                target: { semanticObject: "pan_approval", action: "display" }
            });

            // window.location.href = previousPageUrl;
            if (result1.status != "er") {
                MessageToast.show("PAN Form has been Approved.");
            }
        }
    };
});

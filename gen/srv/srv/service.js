const cds = require('@sap/cds');
const { Readable } = require('stream')
const { jwtDecode } = require('jwt-decode')
const { ajax } = require('ajax');
const { json } = require('stream/consumers');
module.exports = cds.service.impl(async function () {
    let {
        attachments, tab1, tab2, tab3, vendor_data, Fvendor_responseoo, PAYMENT_TERM_DETAILS, WORKFLOW_HISTORY, WORKFLOW_HISTORY_EMP, PAN_PRICE_DETAILS, PAN_Payment_Method_Drop, PAN_Comments,
        PAN_Details_APR, PAN_WEB_EVENT_APR, PAN_TYPE_APR, PAN_vendor_data_APR, PAN_vendor_response_APR, PAN_PAYMENT_TERM_DETAILS_APR, PAN_PRICE_DETAILS_APR, PAN_WORKFLOW_HISTORY_APR, PAN_attachments_APR, PAN_Payment_Method_Drop_APR, PAN_Comments_APR
    } = this.entities;
    const AribaSrv = await cds.connect.to('ARIBA_DEV');
    const ariba = await cds.connect.to('getcall');

    this.on("cbe", async (req) => {
        let data = await SELECT.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`;
        console.log(data);
        return JSON.stringify(data[0]);
    });
    this.on("getcomments", async (req) => {
        let data = await SELECT.from(PAN_Comments_APR).where`PAN_Number = ${req.data.ID}`;
        console.log(data);
        return JSON.stringify(data);

    });
    this.on("validateUser", async (req) => {
        let auth = req?.headers?.authorization;

        if (auth != undefined) {
            let token = auth.split(" ");
            var decoded = jwtDecode(token[1]);
        }
        let wiid = await SELECT.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`;
        console.log("beforevalidate");

        // let dummyRes = await AribaSrv.get(`/sap/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/wiidByUserSet?$filter=( user eq  '${decoded["user_name"]}'  and wiid eq '${wiid[0].Sap_workitem_id}' )`);
        let dummyRes = await AribaSrv.get(`/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/wiidByUserSet?$filter=( user eq  '${decoded["user_name"]}'  and wiid eq '${wiid[0].Sap_workitem_id}' )`);//testing
        //    let dummyRes = [{status : "User Found",user : "one"}];
        console.log("validate");
        console.log(dummyRes[0]);
        return JSON.stringify(dummyRes[0]);

    });
    this.on("filteredData", async (req) => {
        let auth = req?.headers?.authorization;

        if (auth != undefined) {
            let token = auth.split(" ");
            var decoded = jwtDecode(token[1]);
        }
        // var decoded ="dhanushg-v@tataprojects.com"  
        // let url = `/sap/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/wiidByUserSet?$filter=( user eq  '${decoded["user_name"]}' )`;
        let url = `/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/wiidByUserSet?$filter=( user eq  '${decoded["user_name"]}' )`;//for testing
        // console.log(url);
        let dummyRes = await AribaSrv.get(url);
        console.log("dummyRes");
        console.log(dummyRes);
        console.log("dummyRes");
        // let dummyRes = [
        //     {user:"one",workitemId:"1"},{user:"two",workitemId:"2"}
        // ];  
        let ret = [];
        let array = [];

        for (let i = 0; i < dummyRes.length; i++) {
            // array.push(res.workitemId);
            var data = await SELECT`PAN_Number`.from(PAN_Details_APR).where`Sap_workitem_id = ${dummyRes[i].workitemId}`;
            // console.log();

            for (let j = 0; j < data.length; j++) {
                let cond = array.includes(data[j].PAN_Number);
                if (!cond) {
                    array.push(data[j].PAN_Number);
                    ret.push({
                        isEmpty: null,
                        operator: "EQ",
                        validated: "NotValidated",

                        values: [`${data[j].PAN_Number}`]
                    })
                }
            }
        }





        // let ret =[{isEmpty:null,
        //     operator:"EQ",
        //     validated:"NotValidated",
        //     values:['PAN123']},{isEmpty:null,
        //         operator:"EQ",
        //         validated:"NotValidated",
        //         values:['pan12']}];

        // dummyRes.forEach(async dummyres=>{
        //     let res= await SELECT`PAN_Number`.from(PAN_Details_APR).where`Sap_workitem_id=${dummyres.workitemId} `
        //     // console.log("res");
        //     // console.log(res);
        //     ret.push(res);
        // });
        // console.log(JSON.stringify(ret));
        return JSON.stringify(ret);
    });
    //  this.before('READ',PAN_Details_APR,async (req)=>{
    //     let auth = req?.headers?.authorization;

    //     if(auth != undefined){
    //         let token = auth.split(" ");
    //         var decoded = jwtDecode(token[1]);
    //         console.log(decoded["user_name"]);
    //     }

    //     let body ={
    //         "pankey" : "PAN123",
    //         "status" : "status Test",
    //         "url" : " ",
    //         "buttonClicked" : "Approved",
    //         "panToAttachNavi" : []
    //     }

    //     let response = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet',body);
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //     console.log(response);
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    //  });
    // this.on ("getcomments",async (req)=>{
    //     let data = await SELECT.from(PAN_Comments).where `PAN_Number = ${req.data.ID}`;
    //     console.log(data);
    //     return JSON.stringify(data);

    // });
    // const c5re = await cds.connect.to('iflow1');
    // const AribaSrv = await cds.connect.to('ARIBA_DEV');
    // this.before('READ', tab1, async (req) => {
    //     if(req.params.length==0){
    //     try {
    //         await cds.tx(req).run(DELETE(tab1));
    //         await cds.tx(req).run(DELETE(tab2));
    //         await cds.tx(req).run(DELETE(tab3));
    //         await cds.tx(req).run(DELETE(vendor_data));
    //         await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //         await cds.tx(req).run(DELETE(PAN_PRICE_DETAILS));
    //         await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY));
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY_EMP));
    //         await cds.tx(req).run(DELETE(attachments));
    //         await cds.tx(req).run(DELETE(PAN_proj));
    //         resp1 = await c5re.get("/tab1");//("/tab1?$filter=status eq 'New'");
    //         resp2 = await c5re.get('/tab2');
    //         resp10 = await c5re.get('/tab3');
    //         resp3 = await c5re.get('/vendor_data');
    //         var data2 = [];
    //         resp3.value.forEach(element => {
    //             element = {...element,Proposed_Vendor_Code_nav : `${element.Proposed_Vendor_Code} / ${element.Vendor_Name}`}
    //             data2.push(element);
    //         });
    //         resp4 = await c5re.get('/Fvendor_responseoo');
    //         resp9 = await c5re.get('/PAN_PRICE_DETAILS');
    //         resp5 = await c5re.get('/PAYMENT_TERM_DETAILS');
    //         resp6 = await c5re.get('/WORKFLOW_HISTORY');
    //         resp6.value.forEach(element =>{
    //             if(element.Notification_Status == 'on')
    //             element.Notification_Status = "true";
    //         else element.Notification_Status = "false";
    //         });
    //         resp7 = await c5re.get('/WORKFLOW_HISTORY_EMP');
    //         resp8 = await c5re.get('/attachments');
    //         resp11 = await c5re.get('/PAN_proj');
    //         const data = resp1.value;

    //         await INSERT.into(tab1).entries(data);
    //         await INSERT.into(tab2).entries(resp2.value);
    //         await INSERT.into(tab3).entries(resp10.value);
    //         await INSERT.into(vendor_data).entries(data2);
    //         await INSERT.into(Fvendor_responseoo).entries(resp4.value);
    //         await INSERT.into(PAN_PRICE_DETAILS).entries(resp9.value);
    //         await INSERT.into(PAYMENT_TERM_DETAILS).entries(resp5.value);
    //         await INSERT.into(WORKFLOW_HISTORY).entries(resp6.value);
    //         await INSERT.into(WORKFLOW_HISTORY_EMP).entries(resp7.value);
    //         await INSERT.into(attachments).entries(resp8.value);
    //         await INSERT.into(PAN_proj).entries(resp11.value);
    //         return req;
    //     } 

    //     catch (error) {
    //         req.error(500, error.message);
    //     }
    // }
    // // return req;
    // });
    //     this.on('sendforapproval',async(req)=>{ 
    //         console.log(req.data);
    //         let data = JSON.parse(req.data.data);
    //         // req._.odataRes.setHeader("Access-Control-Allow-Origin",'*');
    //         // let body = {
    //         //     "pankey" : "PAN3",
    //         //     "file" : "pan.pdf",
    //         //     "content" : "PGRhdGEgeG1sbnM6eGZhPSJodHRwOi8vd3d3LnhmYS5vcmcvc2NoZW1hL3hmYS1kYXRhLzEuMC8iPjxBVFRBQ0hNRU5UPjxEQVRBIHhmYTpkYXRhTm9kZT0iZGF0YUdyb3VwIj48RklMRU5BTUU+UERGZmlsZTwvRklMRU5BTUU+PENPTlRFTlQ+QVNERkE8L0NPTlRFTlQ+PE1FRElBVFlQRT5QREY8L01FRElBVFlQRT48L0RBVEE+PC9BVFR",
    //         //     "media" : "PDF",
    //         //     "buttonClicked" : "sendforApproval"
    //         //   };
    //         let data_m = await SELECT.from(PAN_Details_APR).where`PAN_Number=${req.data.data}`;
    //         data_m = data[0];
    //         let data1 = await SELECT.from(PAN_WEB_EVENT_APR).where`PAN_Number=${req.data.data}`;
    //         let data2 = await SELECT.from(PAN_TYPE_APR).where`PAN_Number=${req.data.data}`;
    //         let data3 = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number=${req.data.data}`;
    //         // for(let i = 0;i<data3.length;i++){
    //         //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.data} and level=${data3[i].idd}`;
    //         //     data3[i] ={...data,WFtoWFE:data3c};
    //         // };
    //         // let data4 = await SELECT.from(attachments).where`PAN_Number=${req.data.data}`;
    //         let data5 = await SELECT.from(PAN_vendor_data_APR).where`PAN_Number=${req.data.data}`;
    //         for(let i = 0;i<data5.length;i++){
    //             let data5c = await SELECT.from(PAN_vendor_response_APR).where`PAN_Number=${req.data.data} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //             let data5c1 = await SELECT.from(PAN_PAYMENT_TERM_DETAILS_APR).where`PAN_Number=${req.data.data} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //             let data5c2 = await SELECT.from(PAN_PRICE_DETAILS_APR).where`PAN_Number=${req.data.data} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //             data5[i] = {...data,vendtovenr:data5c[0],vendtoptd:data5c1,vendtopd:data5c2};
    //         };
    //         let data6 = await SELECT.from(PAN_proj_APR).where`PAN_Number=${req.data.data}`;
    //         let data7 = await SELECT.from(PAN_Comments_APR).where`PAN_Number=${req.data.data}`;
    //         data_m = {...data_m,tab1totab2:data1,tab1totab3:data2,tab1toWORKFLOW_HISTORY:data3,tab1tovendor_data:data5,tab1topp:data6};

    //         let main_data=[]
    //         let change_sta = await SELECT.from(PAN_attachments_APR).where`PAN_Number=${data.PAN_Number}`;
    //         change_sta.forEach(each=>{
    //             let j = 0;
    //             main_data.push({
    //                 "pankey" :  data.PAN_Number,
    //                 "file" : each.fileName,
    //                 "content" : each.contentS,
    //                 "media" : each.mediaType,
    //                 "remarks" : " "
    //             });
    //         })

    //         let body ={
    //             "pankey" : data.PAN_Number,
    //             "status" : "status Test",
    //             "url" : " ",
    //             "buttonClicked" : data.buttonclicked,
    //             "panToAttachNavi" :main_data
    //         }

    //         // let response = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet',body);
    //         // console.log(response);
    //         // console.log("resssssssssssssssssssssssssssssssssssssssssssssssssssss");
    //         let srv = await UPDATE(tab1,data.PAN_Number).with({"status":"Pending for Approval"});
    //         // let change_stat = await c5re.get(`/tab1?$filter=PAN_Number eq '${data.PAN_Number}'`);
    //         // change_stat.value[0].status = "Pending for Approval";
    //         // await c5re.put(`/tab1/${data.PAN_Number}`,change_stat.value[0]);
    //         let respbody ={
    //             "pankey":data.PAN_Number,
    //             "buttonClicked":data.buttonclicked,
    //             "flag":"X",
    //             "json":JSON.stringify(data_m)
    //         }
    //         // let resp = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',respbody);
    //         // console.log(resp);




    // /////
    //         return JSON.stringify(response);
    //         // return "response"

    //     });


    this.on('getuser', async (req) => {
        let auth = req?.headers?.authorization;

        if (auth != undefined) {
            let token = auth.split(" ");
            var decoded = jwtDecode(token[1]);
        }
        const jsonr = JSON.parse(req.data.ID);
        const urll = jsonr.urll;
        const buttonClicked = jsonr.status;
        req.data.ID = jsonr.key;
        // let data = JSON.parse(req.data.data);
        // req._.odataRes.setHeader("Access-Control-Allow-Origin",'*');
        // let body = {
        //     "pankey" : "PAN3",
        //     "file" : "pan.pdf",
        //     "content" : "PGRhdGEgeG1sbnM6eGZhPSJodHRwOi8vd3d3LnhmYS5vcmcvc2NoZW1hL3hmYS1kYXRhLzEuMC8iPjxBVFRBQ0hNRU5UPjxEQVRBIHhmYTpkYXRhTm9kZT0iZGF0YUdyb3VwIj48RklMRU5BTUU+UERGZmlsZTwvRklMRU5BTUU+PENPTlRFTlQ+QVNERkE8L0NPTlRFTlQ+PE1FRElBVFlQRT5QREY8L01FRElBVFlQRT48L0RBVEE+PC9BVFR",
        //     "media" : "PDF",
        //     "buttonClicked" : "sendforApproval"
        //   };

        let main_data = []
        // let change_sta = await SELECT.from(PAN_attachments_APR).where`PAN_Number=${req.data.ID}`;
        // change_sta.forEach(each=>{
        //     let j = 0;
        //     main_data.push({
        //         "pankey" :  req.data.ID,
        //         "file" : each.fileName,
        //         "content" : each.contentS,
        //         "media" : each.mediaType,
        //         "remarks" : " "
        //     });
        // })







        let Mandtret = {
            user: decoded["user_name"],
            // user :"user_name",
            status: "mandt",
            currentLevel:"",
            workitemId: ""
        }
        let data_m = await SELECT.from(PAN_Details_APR).where`PAN_Number=${req.data.ID}`;
        data_m = data_m[0];
        if(!data_m.Comments)    
          return JSON.stringify(Mandtret); 

         let i1  = parseInt(data_m.Current_level_of_approval);
         i1++;
         data_m.Current_level_of_approval = i1.toString();
         
        const options = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const currentDate = new Date().toLocaleString('en-IN', options);
        let [datePart, timePart] = currentDate.split(', ');
        let [day, month, year] = datePart.split('/');
        let [hour, minute] = timePart.split(':');
        const currentDateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
        let wherecond = `PAN_Number = '${req.data.ID}' and level='${data_m.Current_level_of_approval}'`;
        console.log(wherecond); 
        const startDate = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where(wherecond);
        console.log(startDate);
        var b = startDate[0];
        // console.log(b['Begin_DateAND_Time']);
        // console.log(startDate[0].Begin_DateAND_Time);
        const a = b['Begin_DateAND_Time'];
        [datePart, timePart] = a.split(', ');
        [day, month, year] = datePart.split('/');
        [hour, minute] = timePart.split(':');

        // Create Date objects for both dates
        const targetDateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

        // Calculate the difference in milliseconds
        const differenceMs = currentDateObj - targetDateObj;

        // Convert milliseconds to minutes
        const differenceDays = Math.abs(Math.floor(differenceMs / (1000 * 60 * 60 * 24)));
        console.log("update dates");
        if (buttonClicked != 'Justification Needed')
            startDate.forEach(async data => {
                let res = await UPDATE(PAN_WORKFLOW_HISTORY_APR, { PAN_Number: req.data.ID, idd: data.idd, level: data_m.Current_level_of_approval }).with({
                    "Result": buttonClicked,
                    "End_DateAND_Time": currentDate,
                    "Days_Taken": differenceDays.toString(),
                    "Approved_by": decoded["user_name"]
                });
                console.log(res);
            });
////////comments updated

let comm = await SELECT.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`
// var commentss = null;
if (comm[0].Comments) {
    let ComEnt = {
        PAN_Number: req.data.ID,
        user: decoded["user_name"],
        // user :"user_name",
        Comments: comm[0].Comments,
        status: buttonClicked
    };
    //  commentss = comm[0].Comments;
    await INSERT.into(PAN_Comments_APR).entries(ComEnt);
}






        let data1 = await SELECT.from(PAN_WEB_EVENT_APR).where`PAN_Number=${req.data.ID}`;
        let data2 = await SELECT.from(PAN_TYPE_APR).where`PAN_Number=${req.data.ID}`;
        let data3 = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number=${req.data.ID}`;
        // for(let i = 0;i<data3.length;i++){
        //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.data} and level=${data3[i].idd}`;
        //     data3[i] ={...data,WFtoWFE:data3c};
        // };
        // let data4 = await SELECT.from(attachments).where`PAN_Number=${req.data.data}`;
        let data5 = await SELECT.from(PAN_vendor_data_APR).where`PAN_Number=${req.data.ID}`;
        for (let i = 0; i < data5.length; i++) {
            let data5c = await SELECT.from(PAN_vendor_response_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            let data5c1 = await SELECT.from(PAN_PAYMENT_TERM_DETAILS_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            let data5c2 = await SELECT.from(PAN_PRICE_DETAILS_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            data5[i] = { ...data5[i], vendtovenr: data5c[0], vendtoptd: data5c1, vendtopd: data5c2 };
        };

        let data7 = await SELECT.from(PAN_Comments_APR).where`PAN_Number=${req.data.ID}`;
        data_m = { ...data_m, tab1totab2: data1, tab1totab3: data2, tab1toWORKFLOW_HISTORY: data3, tab1tovendor_data: data5, tab1tocom: data7 };
        let body = {
            "pankey": req.data.ID,
            "status": data_m.status,
            "url": urll,
            "buttonClicked": buttonClicked,
            // "panToAttachNavi" :main_data,
            "json": JSON.stringify(data_m)
        }
        // let dummyRes = [];
        // let dummyRes = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',body);
        try {
            var dummyRes = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet', body);//testing    
        } catch (error) {
            let m = { status: "er" };
            return JSON.stringify(m);
        }


        console.log(dummyRes);
        // https://vhtpds4dci.sap.tataprojects.com:20400/sap/sap/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet
        // console.log("resssssssssssssssssssssssssssssssssssssssssssssssssssss");
        // let srv = await UPDATE(tab1,data.PAN_Number).with({"status":"Pending for Approval"});
        // let change_stat = await c5re.get(`/tab1?$filter=PAN_Number eq '${data.PAN_Number}'`);
        // change_stat.value[0].status = "Pending for Approval";
        // await c5re.put(`/tab1/${data.PAN_Number}`,change_stat.value[0]);

        // const dummyRes={
        //     buttonClicked:"Approved",
        //     status:"Approved",
        //     currentLevel:"0",
        //     workitemId:"000000027515"
        // };
        //    let entries={Result:dummyRes.status};
        //    let reins =  await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number = ${req.data.ID} and level = ${dummyRes.currentLevel}`;
        //     await DELETE.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number = ${req.data.ID} and level = ${dummyRes.currentLevel}`;
        //     reins.forEach(rein =>{
        //         rein.Result = buttonClicked;
        //     });
        //    var task_id = "";
        if (dummyRes.currentLevel == '0') {


            let task_id = await SELECT`task_id`.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`;
            let actionName = "";
            switch (buttonClicked) {
                case 'Approved':
                    actionName = "Approve";
                    break;
                case 'Rejected':
                    actionName = "Deny";
                    break;
                case 'Justification Needed':

                    break;
                default:
                    break;
            }

            let body = {
                "actionableType": "Task",
                "uniqueName": task_id[0].task_id,
                // "uniqueName": 'task1233',
                "actionName": actionName,
                "options": {
                    "comments": "test Comment"
                }
            };
            console.log(body);
            console.log(task_id[0].task_id);
            // ariba.destination.headers.body = JSON.stringify();
            //   ariba.destination.headers.query = "realm=tataprojects-T&user=" + decoded["user_name"] + "&passwordadapter=ThirdPartyUser&apikey=nQcLVavnQ7f2YklQoRtNeVgYFGyyqN4v" 
            ariba.destination.headers.query = "realm=tataprojects-T&user=" + "PANCreator" + "&passwordadapter=ThirdPartyUser&apikey=nQcLVavnQ7f2YklQoRtNeVgYFGyyqN4v";
            if (task_id[0].task_id) {
                try {
                    // console.log("avaneesh post");
                    let res = await ariba.post("/http/postcallscript",body);
                } catch (err) {
                    console.log(err);
                }
            }


        }
        //     else{
        //         const options = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        //         const currentDate = new Date().toLocaleString('en-IN', options);
        //         let [datePart, timePart] = currentDate.split(', ');
        //         let [day, month, year] = datePart.split('/');
        //         let [hour, minute] = timePart.split(':');
        //         const currentDateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
        //         let wherecond = `PAN_Number = '${req.data.ID}' and level='${dummyRes.currentLevel}'`;
        //         const startDate = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where(wherecond);
        //         var b = startDate[0];
        //         const a = b['Begin_DateAND_Time'];
        //          [datePart, timePart] = a.split(', ');
        //          [day, month, year] = datePart.split('/');
        //          [hour, minute] = timePart.split(':');

        //         // Create Date objects for both dates
        //         const targetDateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);

        //         // Calculate the difference in milliseconds
        //         const differenceMs = currentDateObj - targetDateObj;

        //         // Convert milliseconds to minutes
        //         const differenceDays = Math.abs(Math.floor(differenceMs / (1000 * 60 * 60 * 24)));

        //         data3.forEach(async data =>{
        //             await UPDATE(PAN_WORKFLOW_HISTORY_APR,{PAN_Number : req.data.ID,idd:data.idd,level: dummyRes.currentLevel}).with({
        //                 "Result":buttonClicked,
        //                 "End_DateAND_Time":currentDate,
        //                 "Days_Taken":differenceDays.toString(),
        //                 "Approved_by": decoded["user_name"]
        //             });
        //         });
        // };
        let ret = {
            user: decoded["user_name"],
            // user :"user_name",
            status: dummyRes.status,
            currentLevel: dummyRes.currentLevel,
            workitemId: dummyRes.workitemId
        }

        //      let respbody ={
        //     "pankey": req.data.ID,
        //     "buttonClicked":buttonClicked,
        //     "flag":"X",
        //     "json":JSON.stringify(data_m)
        // }
        // let resp = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',respbody);
        // console.log(resp);
        // return JSON.stringify(ret);
        // }
        // let ret = {
        //     user : "user",
        //     status : null,
        //     currentLevel : dummyRes.currentLevel,
        //     workitemId:dummyRes.workitemId
        // }
        // let panD = await SELECT.from(PAN_Details_APR).where`PAN_Number = req.data.ID`
        var status = "Pending for Approval";
if(buttonClicked == "Justification Needed"){
    await UPDATE(PAN_Details_APR, req.data.ID).with({
        "status": buttonClicked,
        "Comments": null
    })
}
else{
    if (data_m.Current_level_of_approval == data_m.total_levels_of_approval )
    status = buttonClicked;
await UPDATE(PAN_Details_APR, req.data.ID).with({
        "status": status,
        "Current_level_of_approval": ret.currentLevel,
        "Sap_workitem_id": ret.workitemId,
        "Comments": null
    })
}
      

        // if (buttonClicked == 'Approved') {
        //     let Udata3 = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number=${req.data.ID}`;
        //     let Udata7 = await SELECT.from(PAN_Comments_APR).where`PAN_Number=${req.data.ID}`;
        //     data_m.tab1toWORKFLOW_HISTORY = Udata3;
        //     data_m.tab1tocom = Udata7;
        //     body.buttonClicked = 'final';
        //     body.json = JSON.stringify(data_m);
        //     try {
        //         var dummyRes1 = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet', body);//testing    
        //     } catch (error) {
        //         let m = { status: "er" };
        //         return JSON.stringify(m);
        //     }
        // }


        return JSON.stringify(ret);
    });
    //     this.on('Comments' ,async (req) => { 

    //         let auth = req?.headers?.authorization;

    // if(auth != undefined){
    //     let token = auth.split(" ");
    //     var decoded = jwtDecode(token[1]);
    // }       
    //         body = {
    //             PAN_Number :req.data.PAN_Number, 
    //             user : decoded["user_name"],
    //             Comments : req.data.data, 
    //             status: "NA"
    //           }
    //       await INSERT.into(PAN_Comments).entries(body);
    //     //    req.data.Comments = " ";
    //        return "done";
    // });

    // this.on('finalApprove',async (req) => {
    // if(('PAN_Number' in req.params[0])&&('IsActiveEntity' in req.params[0])){
    //     let  app_data = JSON.parse(req.data.data);
    //     let data = await SELECT.from(tab1).where`PAN_Number=${app_data.pankey}`;
    //     data = data[0];
    //     let data1 = await SELECT.from(tab2).where`PAN_Number=${app_data.pankey}`;
    //     let data2 = await SELECT.from(tab3).where`PAN_Number=${app_data.pankey}`;
    //     let data3 = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${app_data.pankey}`;
    //     // for(let i = 0;i<data3.length;i++){
    //     //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${app_data.pankey} and level=${data3[i].idd}`;
    //     //     data3[i] ={...data,WFtoWFE:data3c};
    //     // };
    //     let data4 = await SELECT.from(attachments).where`PAN_Number=${app_data.pankey}`;
    //     let data5 = await SELECT.from(vendor_data).where`PAN_Number=${app_data.pankey}`;
    //     for(let i = 0;i<data5.length;i++){
    //         let data5c = await SELECT.from(Fvendor_responseoo).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //         let data5c1 = await SELECT.from(PAYMENT_TERM_DETAILS).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //         let data5c2 = await SELECT.from(PAN_PRICE_DETAILS).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
    //         data5[i] = {...data,vendtovenr:data5c[0],vendtoptd:data5c1,vendtopd:data5c2};
    //     };
    //     let data6 = await SELECT.from(PAN_proj).where`PAN_Number=${app_data.pankey}`;
    // data = {...data,tab1totab2:data1,tab1totab3:data2,tab1toWORKFLOW_HISTORY:data3,tab1topdf:data4,tab1tovendor_data:data5,tab1topp:data6};
    //     // var callback = request.query.callback;
    //     // var jsonp = callback + '(' + data + ');';
    //     // res.send(jsonp);
    //     let body = {
    //         "pankey" : app_data.pankey,
    //         "flag" : app_data.flag,
    //         "json" : JSON.stringify(data),
    //         "buttonClicked" : app_data.buttonClicked
    //         }
    //     // let response = await AribaSrv.post('/sap/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',body);
    //     // console.log(response);
    //     let up = await UPDATE(tab1,app_data.pankey).with({"status":app_data.buttonClicked});
    //     return JSON.stringify("response"); 

    // });

    // this.on("Reject",async(req)=>{
    //     let data = JSON.parse(req.data.data);

    //     let response = await UPDATE(tab1,data.PAN_Number).with({"status":data.buttonClicked});
    //     return JSON.stringify(response);
    // });

    // this.on('getData',async (req) => {
    //     // if(('PAN_Number' in req.params[0])&&('IsActiveEntity' in req.params[0])){
    //         console.log(req.data.ID);
    //         let data = await SELECT.from(tab1).where`PAN_Number=${req.data.ID}`;
    //         // var callback = request.query.callback;
    //         // var jsonp = callback + '(' + data + ');';
    //         // res.send(jsonp);
    //         return data[0].status;  

    // });

    // this.before('READ', tab2, async (req) => { 
    //     try {
    //         resp = await c5re.get('/tab2');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(tab2));
    //         await INSERT.into(tab2).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', vendor_data, async (req) => { 
    //     try {
    //         resp = await c5re.get('/vendor_data');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(vendor_data));
    //         await INSERT.into(vendor_data).entries(data);
    //         // return req;

    //         if(req.params.length== 2){
    //             resp = await c5re.get('/PAYMENT_TERM_DETAILS');
    //             const data = resp.value;
    //             var data1=[]
    //             for(let i=0;i<data.length;i++){
    //                 if ((req.params[0].PAN_Number === data[i].PAN_Number) && (req.params[1].Proposed_Vendor_Code===data[i].Proposed_Vendor_Code)){
    //                         data1.push(data[i]);
    //                 }
    //             }
    //             await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //             await INSERT.into(PAYMENT_TERM_DETAILS).entries(data1);
    //             // resp1 = await c5re.get('/Fvendor_responseoo');
    //             // const data1 = resp1.value;
    //             // await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //             // await INSERT.into(Fvendor_responseoo).entries(data1);
    //             // return req;
    //         }

    // }catch (error) {
    //     req.error(500, err.message);
    // }

    // });
    // this.before('READ', Fvendor_responseoo, async (req) => { 
    //     try {
    //         resp = await c5re.get('/Fvendor_responseoo');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //         await INSERT.into(Fvendor_responseoo).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', PAYMENT_TERM_DETAILS, async (req) => { 
    //     try {
    //         resp = await c5re.get('/PAYMENT_TERM_DETAILS');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //         await INSERT.into(PAYMENT_TERM_DETAILS).entries(data);
    //         // return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', WORKFLOW_HISTORY, async (req) => { 
    //     try {
    //         resp = await c5re.get('/WORKFLOW_HISTORY');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY));
    //         await INSERT.into(WORKFLOW_HISTORY).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', WORKFLOW_HISTORY_EMP, async (req) => { 
    //     try {
    //         resp = await c5re.get('/WORKFLOW_HISTORY_EMP');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY_EMP));
    //         await INSERT.into(WORKFLOW_HISTORY_EMP).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.on('getPdfUrl', async (req) => {
    //      
    //     console.log(re1.params);
    //     const fileLinkValue = req.params;
    //     return fileLinkValue;
    // });

    // this.on("getuserinfo",async (req) =>{
    //     let data = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.ID}`;
    //     return data[0].Employee_ID;
    // });

    // this.before('READ', attachments, async (req) => { 
    //     try {
    //         // req.params.id[0];
    //         const a =await SELECT.from(attachments);
    //         var first = a;
    //         let data = [];
    //         // a.forEach(element => {
    //         //     if()
    //         // });
    //         console.log("hey!");
    //     } catch (error) {

    //     }

    // });


    // this.before('CREATE', 'attachments',async (req) => {
    //      
    //     // console.log('Create called')
    //     // console.log(JSON.stringify(req.data))
    //     req.data.url = `/media/attachments(${req.data.ID})/content`;
    //     req.data.ID1 = req.data.ID;
    //     // const entry = {
    //     //     Enquiry_no :req.data.Enquiry_no,
    //     //     content:req.data.content,
    //     //     fileName:req.data.fileName,
    //     //     mediaType:req.data.mediaType,
    //     // }; 
    // });


    // this.on("READ", attachments, async (req, next) => {
    //     if (!req.data.idd) {
    //         return next();
    //     }
    //     //Fetch the url from where the req is triggered
    //     const url = req._.req.path;
    //     //If the request url contains keyword "content"
    //     // then read the media content
    //     if (url.includes("content")) {
    //         const uid = req.data.idd;
    //         var tx = cds.transaction(req);
    //         // Fetch the media obj from database
    //        var mediaObj1=  await SELECT `content,mediaType`.from (attachments) .where `idd = ${uid}`;
    //         // var mediaObj = await tx.run(
    //         //     SELECT.one.from("MediaFile", ["content", "mediaType"]).where({id:uid})
    //         // );

    //         if (mediaObj1.length <= 0) {
    //             req.reject(404, "Media not found for the ID");
    //             return;
    //         }
    //         var decodedMedia = "";
    //         decodedMedia = new Buffer.from(
    //             mediaObj1[0].content.toString().split(";base64,").pop(),
    //             "base64"
    //         );
    //         return _formatResult(decodedMedia, mediaObj1[0].mediaType);
    //     } else return next();
    // });

    // function _formatResult(decodedMedia, mediaType) {
    //     const readable = new Readable();
    //     const result = new Array();
    //     readable.push(decodedMedia);
    //     readable.push(null);
    //     return {
    //         value: readable,
    //         '*@odata.mediaContentType': mediaType
    //     }
    // }


    // this.before('CREATE', 'attachments',async (req) => {
    // console.log('Create called')
    // console.log(JSON.stringify(req.data))
    // req.data.url = `/media/attachments(${req.data.idd})/content`;


    // await UPDATE(attachments).set({content1:req.data.content}).where({ idd: req.data.idd });
    // req.data.ID1 = req.data.ID;
    // const entry = {
    //     Enquiry_no :req.data.Enquiry_no,
    //     content:req.data.content,
    //     fileName:req.data.fileName,
    //     mediaType:req.data.mediaType,
    // }; 
    // });


    // this.on("READ", attachments, async (req, next) => {
    //     if (!req.data.idd) {
    //         return next();
    //     }
    //     //Fetch the url from where the req is triggered
    //     const url = req._.req.path;
    //     //If the request url contains keyword "content"
    //     // then read the media content
    //     if (url.includes("content")) {
    //         const uid = req.data.idd;
    //         console.log("attachments read is working")
    //         var tx = cds.transaction(req);
    //         // Fetch the media obj from database
    //         var query = await SELECT.from(attachments,uid).columns(`contentS`);
    //        var mediaObj1=  await SELECT `contentS,mediaType`.from (attachments) .where `idd = ${uid}`;
    //         // var mediaObj = await tx.run(
    //         //     SELECT.one.from("attachments", ["contentS", "mediaType"]).where({idd:uid})
    //         // );

    //         if (mediaObj1.length <= 0) {
    //             req.reject(404, "Media not found for the ID");
    //             return;
    //         }
    //         var decodedMedia = "";
    //         decodedMedia = new Buffer.from(
    //             mediaObj1[0].contentS.toString().split(";base64,").pop(),
    //             "base64"
    //         );
    //         return _formatResult(decodedMedia, mediaObj1[0].mediaType);
    //     } else return next();
    // });

    // function _formatResult(decodedMedia, mediaType) {
    //     const readable = new Readable();
    //     const result = new Array();
    //     readable.push(decodedMedia);
    //     readable.push(null);
    //     return {
    //         value: readable,
    //         '*@odata.mediaContentType': mediaType
    //     }
    // }


    // this.on('getattachments', async (req) => {
    //       console.log(req?.data);
    //       return "function succesfully executed";

    // });




    this.before('CREATE', 'PAN_attachments_APR', req => {

        console.log('Create called')
        console.log(JSON.stringify(req.data))
        // req.data.fileName = req.data.ID
        req.data.url = `odata/v4/pan-approval/PAN_attachments_APR(ID=${req.data.ID},PAN_Number='${req.data.PAN_Number}')/content`
        req.data.fileName = req._.odataReq._body.fileName;
        req.data.mediaType = req._.odataReq._body.mediaType;
        // req.data.IsActiveEntity=true
    })

    this.after('CREATE', 'PAN_attachments_APR', req => {

        console.log(req);
    })

    this.before('READ', 'PAN_attachments_APR', async req => {





        //check content-type
        console.log('content-type: ', req.headers['content-type'])
        req.data.url = `odata/v4/pan-approval/PAN_attachments_APR(ID=${req.data.ID},PAN_Number='${req.data.PAN_Number}')/content`

    });

});
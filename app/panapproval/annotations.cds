using PanApproval as service from '../../srv/service';

annotate service.PAN_Details_APR with @(
    UI.CreateHidden : true,
    UI.DeleteHidden :true,
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : PAN_Number,
            Label : 'PAN Number',
        },{
            $Type : 'UI.DataField',
            Value : SBG,
            Label : 'SBG',
        },{
            $Type : 'UI.DataField',
            Value : SBU,
            Label : 'SBU',
        },{
            $Type : 'UI.DataField',
            Value : BUORPurchasing_Group,
            Label : 'BU/Purchasing Group',
        },{
            $Type : 'UI.DataField',
            Value : Plant_Code,
            Label : 'Plant Code',
        },
        {
            $Type : 'UI.DataField',
            Value : submitted_by,
            Label : 'Submitted by',
        },
        {
            $Type : 'UI.DataField',
            Value : submitted_date,
            Label : 'Submitted date',
        },],
    UI.SelectionPresentationVariant #tableView : {
    
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    }
);
annotate service.PAN_Details_APR with @(
    UI.HeaderInfo:{
        TypeName:'PAN Details',
        TypeNamePlural:'PAN Details',
        Title:{
            $Type:'UI.DataField',
            Value:PAN_Number
        }
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Details',
            ID : 'GeneralDetails1',
            Facets : [
            {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralDetails',
            Target : '@UI.FieldGroup#GeneralDetails',
                Label : ' ',
        },
                {
            $Type : 'UI.ReferenceFacet',
            Label : 'WEB EVENT',
            ID : '_',
            Target : 'tab1totab2/@UI.LineItem#_',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'PAN TYPE',
                    ID : 'PANTYPE',
                    Target : 'tab1totab3/@UI.LineItem#PANTYPE',
                },
                ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Details',
            ID : 'VendorData',
            Target : 'tab1tovendor_data/@UI.LineItem#VendorData',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Approval/Reject Comments',
            ID : 'ApprovalComments',
            Target : '@UI.FieldGroup#ApprovalComments',
        },
    ],
    UI.FieldGroup #GeneralDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : PAN_Number,
                Label : 'PAN Number',
            },{
                $Type : 'UI.DataField',
                Value : SBG,
                Label : 'SBG',
            },{
                $Type : 'UI.DataField',
                Value : SBU,
                Label : 'SBU',
            },{
                $Type : 'UI.DataField',
                Value : BUORPurchasing_Group,
                Label : 'BU/Purchasing Group',
            },{
                $Type : 'UI.DataField',
                Value : Plant_Code,
                Label : 'Plant Code',
            },{
                $Type : 'UI.DataField',
                Value : Project_Description,
                Label : 'Project Description',
            },{
                $Type : 'UI.DataField',
                Value : PR_NumberBKTsBKT,
                Label : 'PR Number(s)',
            },{
                $Type : 'UI.DataField',
                Value : Subject_of_ProposalOROrder,
                Label : 'Subject of Proposal/Order',
            },{
                $Type : 'UI.DataField',
                Value : Previous_PAN_References,
                Label : 'Previous PAN References',
            },{
                $Type : 'UI.DataField',
                Value : Split_OrderORNo_of_vendors,
                Label : 'Split Order/No of vendors',
            },{
                $Type : 'UI.DataField',
                Value : Order_Location_OR_Plant,
                Label : 'Order Location / Plant',
            },{
                $Type : 'UI.DataField',
                Value : Base_line_spend,
                Label : 'Base line spend',
            },{
                $Type : 'UI.DataField',
                Value : Project_CurrencyORBase_Currency,
                Label : 'Project Currency/Base Currency',
            },{
                $Type : 'UI.DataField',
                Value : Order_CurrencyORBid_currency,
                Label : 'Order Currency/Bid currency',
            },{
                $Type : 'UI.DataField',
                Value : Final_proposed_Value,
                Label : 'Final proposed Value',
            },{
                $Type : 'UI.DataField',
                Value : Savings_achieved_btw_initial_and_final_quote,
                Label : 'Savings achieved btw initial and final quote',
            },{
                $Type : 'UI.DataField',
                Value : Savings_against_base_line_spend_of_RFP,
                Label : 'Savings against base line spend of RFP',
            },{
                $Type : 'UI.DataField',
                Value : Number_of_Vendors_Shortlisted_for_RFP,
                Label : 'Number of Vendors Shortlisted for RFP',
            },{
                $Type : 'UI.DataField',
                Value : Number_of_Vendors_Technically_Qualified,
                Label : 'Number of Vendors Technically Qualified',
            },{
                $Type : 'UI.DataField',
                Value : Required_at_Site_Date,
                Label : 'Required at Site Date',
            },{
                $Type : 'UI.DataField',
                Value : RFP_Number,
                Label : 'RFP Number',
            },{
                $Type : 'UI.DataField',
                Value : RFP_Publish_Date,
                Label : 'RFP Publish Date',
            },{
                $Type : 'UI.DataField',
                Value : Time_Taken_for_FinalizationDASHIn_DAYS,
                Label : 'Time Taken for Finalization-In DAYS',
            },
            {
                $Type : 'UI.DataField',
                Value : number_of_vendors_invited,
                Label : 'Number of Vendors Invited',
            },],
    }
);
annotate service.PAN_vendor_data_APR with @(
      UI.HeaderInfo:{
        TypeName:'Vendor Details',
        TypeNamePlural:'Vendor Details',
         Title:{
            $Type:'UI.DataField',
            Value:Proposed_Vendor_Code
        },
        Description:{
            $Type:'UI.DataField',
            Value:Vendor_Name
        }
    },
    UI.LineItem #VendorData : [
        {
            $Type : 'UI.DataField',
            Value : Awarded_Vendor,
            Label : 'Awarded Vendor',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Name,
            Label : 'Vendor Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Location,
            Label : 'Awarded Vendor',
        },
        {
            $Type : 'UI.DataField',
            Value : Client_Approved,
            Label : 'Client Approved',
        },
        {
            $Type : 'UI.DataField',
            Value : Original_quote,
            Label : 'Original quote',
        },
        {
            $Type : 'UI.DataField',
            Value : Final_Quote,
            Label : 'Final Quote',
        },
        {
            $Type : 'UI.DataField',
            Value : Order_amount_OR_Split_order_amount,
            Label : 'Order amount / Split order amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_Amount,
            Label : 'Discount Amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_percentage,
            Label : 'Discount percentage',
        },
        {
            $Type : 'UI.DataField',
            Value : Rank,
            Label : 'Rank',
        },
        {
            $Type : 'UI.DataField',
            Value : Technically_Approved,
            Label : 'Technically Approved',
        },]
);
annotate service.PAN_attachments_APR with @(
    UI.LineItem #ATTACHMENTSINTERNALTOPANFORAPPROVERS : [
         {
        $Type : 'UI.DataFieldForAnnotation',
        Target: '@UI.FieldGroup#filecontent',
        Label : 'test',
    },]
);

annotate service.PAN_WORKFLOW_HISTORY_APR with @(
    UI.LineItem #WORKFLOWHISTORY : [
        {
            $Type : 'UI.DataField',
            Value : Title,
            Label : 'Title',
        },{
            $Type : 'UI.DataField',
            Value : Employee_ID,
            Label : 'Employee ID',
        },{
            $Type : 'UI.DataField',
            Value : Employee_Name,
            Label : 'Employee Name',
        },{
            $Type : 'UI.DataField',
            Value : Result,
            Label : 'Result',
        },{
            $Type : 'UI.DataField',
            Value : Begin_DateAND_Time,
            Label : 'Begin Date& Time',
        },{
            $Type : 'UI.DataField',
            Value : End_DateAND_Time,
            Label : 'End Date& Time',
        },{
            $Type : 'UI.DataField',
            Value : Days_Taken,
            Label : 'Days Taken',
        },{
            $Type : 'UI.DataField',
            Value : Remarks,
            Label : 'Remarks',
        },
        {
            $Type : 'UI.DataField',
            Value : Approved_by,
            Label : 'Approved by',
        },]
);
annotate service.PAN_vendor_data_APR with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Response',
            ID : 'VendorResponse',
            Target : '@UI.FieldGroup#VendorResponse',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Terms and Conditions Compared with',
            ID : 'TermsandConditionsComparedwith',
            Target : '@UI.FieldGroup#TermsandConditionsComparedwith',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Payment Term Details',
            ID : 'PAYMENT_TERM_DETAILS',
            Target : 'vendtoptd/@UI.LineItem#PAYMENT_TERM_DETAILS',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Others Terms And Conditions',
            ID : 'OTHERSTERMSANDCONDITIONS',
            Target : '@UI.FieldGroup#OTHERSTERMSANDCONDITIONS',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Price Details',
            ID : 'PRICEDETAILS',
            Target : 'vendtopd/@UI.LineItem#PRICEDETAILS',
        },
       
    ],
    UI.FieldGroup #VendorResponse : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Proposed_Vendor_Name,
                Label : 'Proposed Vendor Name',
            },{
                $Type : 'UI.DataField',
                Value : Supplier_Origin_State,
                Label : 'Supplier Origin State',
            },{
                $Type : 'UI.DataField',
                Value : Destination_State_BKTShipDASHto_LocationBKT,
                Label : 'Destination State (Ship-to Location)',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_GST_Number,
                Label : 'Vendor GST Number',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_CE_Score,
                Label : 'Vendor CE Score',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_CE_Date,
                Label : 'Vendor CE Date',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_PE_Score,
                Label : 'Vendor PE Score',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_PE_Date,
                Label : 'Vendor PE Date',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Contact_PersonDASH1,
                Label : 'Vendor Contact Person 1',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Contact_PersonDASH2,
                Label : 'Vendor Contact Person 2',
            },{
                $Type : 'UI.DataField',
                Value : Technical_Committee_who_cleared_the_proposal,
                Label : 'Technical Committee who cleared the proposal',
            },{
                $Type : 'UI.DataField',
                Value : Commercial_Committee_who_cleared_the_proposal,
                Label : 'Commercial Committee who cleared the proposal',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_References_to_be_displayed_in_Order,
                Label : 'Vendor References to be displayed in Order',
            },{
                $Type : 'UI.DataField',
                Value : Incoterms,
                Label : 'Incoterms',
            },{
                $Type : 'UI.DataField',
                Value : Order_Value_BKTIn_Project_CurrencyBKT,
                Label : 'Order Value (In Project Currency)',
            },{
                $Type : 'UI.DataField',
                Value : Order_Value_BKTIn_Bid_CurrencyBKT,
                Label : 'Order Value (In Bid Currency)',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Final_Quotation_Date,
                Label : 'Vendor Final Quotation Date',
            },{
                $Type : 'UI.DataField',
                Value : Vendor_Final_Quotation_Amount,
                Label : 'Vendor Final Quotation Amount',
            },{
                $Type : 'UI.DataField',
                Value : Project_CurrencyORBase_Currency,
                Label : 'Project Currency/Base Currency',
            },{
                $Type : 'UI.DataField',
                Value : Order_CurrencyORBid_currency,
                Label : 'Order Currency/Bid Currency',
            },
            ],
    }
);
annotate service.PAN_vendor_data_APR with @(
    UI.FieldGroup #TermsandConditionsComparedwith : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC,
                Label : 'Number of Back to back Terms agreed with Vendor as per GPC / GCC',
            },{
                $Type : 'UI.DataField',
                Value : Details_of_deviated_or_better_terms_agreed_with_the_Vendor,
                Label : 'Details of deviated or better terms agreed with the Vendor',
            },{
                $Type : 'UI.DataField',
                Value : Market_Scenario_and_Demand,
                Label : 'Market Scenario and Demand',
            },{
                $Type : 'UI.DataField',
                Value : Companys_Position_and_Market_dynamics_of_this_purchase,
                Label : 'Companys Position and Market dynamics of this purchase',
            },{
                $Type : 'UI.DataField',
                Value : Should_Be_Cost_estimated,
                Label : 'Should Be Cost estimated',
            },{
                $Type : 'UI.DataField',
                Value : Highlights_of_this_proposal_and_Price_Justification_for_this_proposal,
                Label : 'Highlights of this proposal and Price Justification for this proposal',
            },{
                $Type : 'UI.DataField',
                Value : Price_Escalation_Agreed_if_any,
                Label : 'Price Escalation Agreed if any',
            },{
                $Type : 'UI.DataField',
                Value : Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor,
                Label : 'Particulars of any Free Service / Supply Guarantees / Warranty from Vendor',
            },{
                $Type : 'UI.DataField',
                Value : Transportation,
                Label : 'Transportation',
            },{
                $Type : 'UI.DataField',
                Value : Logistics_Cost,
                Label : 'Logistics Cost',
            },{
                $Type : 'UI.DataField',
                Value : Delivery_Schedule,
                Label : 'Delivery Schedule',
            },{
                $Type : 'UI.DataField',
                Value : Tax_Details,
                Label : 'Tax Details',
            },{
                $Type : 'UI.DataField',
                Value : Additional_Remarks,
                Label : 'Additional Remarks',
            },{
                $Type : 'UI.DataField',
                Value : ABG,
                Label : 'ABG',
            },{
                $Type : 'UI.DataField',
                Value : ABG_Value,
                Label : 'ABG Value',
            },{
                $Type : 'UI.DataField',
                Value : CPBG,
                Label : 'CPBG',
            },{
                $Type : 'UI.DataField',
                Value : CPBG_Value,
                Label : 'CPBG Value',
            },],
    }
);

annotate service.PAN_PAYMENT_TERM_DETAILS_APR with @(
    
    UI.LineItem #PAYMENT_TERM_DETAILS : [
        {
            $Type : 'UI.DataField',
            Value : iddd,
            Label : 'Payment Terms',
        },{
            $Type : 'UI.DataField',
            Value : Percentage,
            Label : 'Percentage',
        },{
            $Type : 'UI.DataField',
            Value : Description,
            Label : 'Description',
        },{
            $Type : 'UI.DataField',
            Value : Due_date,
            Label : 'Due date',
        },{
            $Type : 'UI.DataField',
            Value : Mandatory_Documents_OR_Submissions,
            Label : 'Mandatory Documents / Submissions',
        },{
            $Type : 'UI.DataField',
            Value : To_be_certified_in_Company,
            Label : 'To be Certified in Company',
        },{
            $Type : 'UI.DataField',
            Value :    Payment_methord,
            Label : 'Payment Method',
        },
        {
            $Type : 'UI.DataField',
            Value : slNo,
            Label : 'slNo',
            ![@UI.Hidden],
        },
        ],
);

annotate service.PAN_vendor_data_APR with @(
    UI.FieldGroup #OTHERSTERMSANDCONDITIONS : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Scope_and_Responsibilities,
                Label : 'Scope and Responsibilities',
            },{
                $Type : 'UI.DataField',
                Value : Commercial_Terms,
                Label : 'Commercial Terms',
            },{
                $Type : 'UI.DataField',
                Value : Compliance_Terms,
                Label : 'Compliance Terms',
            },{
                $Type : 'UI.DataField',
                Value : Others,
                Label : 'Others',
            },],
    }
);

annotate service.PAN_Details_APR with {
    PAN_Number @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    SBG @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    SBU @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    BUORPurchasing_Group @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Plant_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    PR_NumberBKTsBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Split_OrderORNo_of_vendors @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Base_line_spend @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Project_CurrencyORBase_Currency @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Order_CurrencyORBid_currency @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Final_proposed_Value @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Order_Value_BKTIn_Project_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Order_Value_BKTIn_Bid_CurrencyBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Savings_achieved_btw_initial_and_final_quote @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Savings_against_base_line_spend_of_RFP @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Number_of_Vendors_Shortlisted_for_RFP @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    RFP_Number @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    RFP_Publish_Date @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_Final_Quotation_Amount @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_Name @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Proposed_Vendor_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Original_quote @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Final_Quote @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Proposed_Vendor_Name @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Destination_State_BKTShipDASHto_LocationBKT @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_GST_Number @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_CE_Score @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_CE_Date @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Technical_Committee_who_cleared_the_proposal @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Shortlisted_Vendors_Response_summary @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Incoterms @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    ABG @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    CPBG @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Scope_and_Responsibilities @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Commercial_Terms @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Compliance_Terms @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Others @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    HSN_OR_SAC_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Item_Code @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Item_Short_Description @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    UOM @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Quantity @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Unit_Price @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Amount @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Indian_Tax_PER @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Delivery_Schedule @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_Contact_PersonDASH1 @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Project_Description @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Subject_of_ProposalOROrder @Common.FieldControl : #ReadOnly
};

annotate service.PAN_WEB_EVENT_APR with @(
    UI.LineItem #_ : [
        {
            $Type : 'UI.DataField',
            Value : eventNo,
            Label : 'Event No',
        },{
            $Type : 'UI.DataField',
            Value : number,
            Label : 'Doc ID',
        },{
            $Type : 'UI.DataField',
            Value : date,
            Label : 'Date',
        },{
            $Type : 'UI.DataField',
            Value : numberOfVendorsParticipated,
            Label : 'Number Of Vendors Participated',
        },{
            $Type : 'UI.DataField',
            Value : l1AmountObtained,
            Label : 'L1 Amount Obtained',
        },]
);

annotate service.PAN_Details_APR with {
    Previous_PAN_References @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    SOP_Type @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Asset_Type @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Nature_of_Transaction @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Order_Location_OR_Plant @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Number_of_Vendors_Technically_Qualified @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Required_at_Site_Date @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Time_Taken_for_FinalizationDASHIn_DAYS @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_Final_Quotation_Date @Common.FieldControl : #ReadOnly
};
annotate service.PAN_attachments_APR with {
    fileName @Common.FieldControl : #ReadOnly
};

annotate service.PAN_attachments_APR with {
    mediaType @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Title @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Employee_ID @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Employee_Name @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Notification_Status @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Result @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Begin_DateAND_Time @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    End_DateAND_Time @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Days_Taken @Common.FieldControl : #ReadOnly
};
annotate service.PAN_WORKFLOW_HISTORY_APR with {
    Remarks @Common.FieldControl : #ReadOnly
};

annotate service.PAN_Details_APR with @(
    UI.FieldGroup #ApprovalComments : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : Comments,
                Label : 'Comments',
            },],
    }
);
annotate service.PAN_vendor_data_APR with {
    Supplier_Origin_State @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_PE_Score @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_PE_Date @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_Contact_PersonDASH2 @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Commercial_Committee_who_cleared_the_proposal @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Vendor_References_to_be_displayed_in_Order @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Details_of_deviated_or_better_terms_agreed_with_the_Vendor @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Companys_Position_and_Market_dynamics_of_this_purchase @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Should_Be_Cost_estimated @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Highlights_of_this_proposal_and_Price_Justification_for_this_proposal @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Price_Escalation_Agreed_if_any @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Transportation @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Logistics_Cost @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Tax_Details @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    Additional_Remarks @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    ABG_Value @Common.FieldControl : #ReadOnly
};
annotate service.PAN_vendor_data_APR with {
    CPBG_Value @Common.FieldControl : #ReadOnly
};
annotate service.PAN_PRICE_DETAILS_APR with {
    Quantity_Over_Delivery_Tolerance @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with {
    Comments @UI.MultiLineText : true
};

annotate service.PAN_PRICE_DETAILS_APR with @(
    UI.LineItem #PRICEDETAILS : [
            {
                $Type : 'UI.DataField',
                Value : HSN_OR_SAC_Code,
                Label : 'HSN / SAC Code',
            },{
                $Type : 'UI.DataField',
                Value : Item_Code,
                Label : 'Item Code',
            },{
                $Type : 'UI.DataField',
                Value : Item_Short_Description,
                Label : 'Item Short Description',
            },{
                $Type : 'UI.DataField',
                Value : UOM,
                Label : 'UOM',
            },{
                $Type : 'UI.DataField',
                Value : Quantity,
                Label : 'Quantity',
            },{
                $Type : 'UI.DataField',
                Value : Unit_Price,
                Label : 'Unit Price',
            },{
                $Type : 'UI.DataField',
                Value : Amount,
                Label : 'Amount',
            },{
                $Type : 'UI.DataField',
                Value : Indian_Tax_PER,
                Label : 'Indian Tax %',
            },{
                $Type : 'UI.DataField',
                Value : Quantity_Over_Delivery_Tolerance,
                Label : 'Quantity Over Delivery Tolerance',
            },]
);
annotate service.PAN_vendor_data_APR with {
    Scope_and_Responsibilities @UI.MultiLineText : true
};
annotate service.PAN_vendor_data_APR with {
    Commercial_Terms @UI.MultiLineText : true
};
annotate service.PAN_vendor_data_APR with {
    Compliance_Terms @UI.MultiLineText : true
};
annotate service.PAN_vendor_data_APR with {
    Others @UI.MultiLineText : true
};

annotate service.PAN_attachments_APR with @(UI.FieldGroup #filecontent: {Data: [
    {
        $Type: 'UI.DataField',
        Value: content,
        Label: 'content',
        
    },
    {
        $Type: 'UI.DataField',
        Value: fileName,
        Label: 'fileName',
    },
  
]});


annotate service.PAN_TYPE_APR with @(
    UI.LineItem #PANTYPE : [
        {
            $Type : 'UI.DataField',
            Value : typeNo,
            Label : 'Type No',
        },{
            $Type : 'UI.DataField',
            Value : required,
            Label : 'Required',
        },{
            $Type : 'UI.DataField',
            Value : submittedOn,
            Label : 'Submitted On',
        },{
            $Type : 'UI.DataField',
            Value : receivedOn,
            Label : 'Received On',
        },{
            $Type : 'UI.DataField',
            Value : timeTakenForApproval,
            Label : 'Time Taken For Approval',
        },]
);
annotate service.PAN_WORKFLOW_HISTORY_APR with @(
    UI.LineItem #WorkflowHistory : [
        {
            $Type : 'UI.DataField',
            Value : level,
            Label : 'level',
        },{
            $Type : 'UI.DataField',
            Value : Title,
            Label : 'Title',
        },{
            $Type : 'UI.DataField',
            Value : Employee_ID,
            Label : 'Employee ID',
        },{
            $Type : 'UI.DataField',
            Value : Employee_Name,
            Label : 'Employee Name',
        },{
            $Type : 'UI.DataField',
            Value : Notification_Status,
            Label : 'Notification Status',
        },{
            $Type : 'UI.DataField',
            Value : End_DateAND_Time,
            Label : 'End Date and Time',
        },{
            $Type : 'UI.DataField',
            Value : Begin_DateAND_Time,
            Label : 'Begin Date and Time',
        },{
            $Type : 'UI.DataField',
            Value : Days_Taken,
            Label : 'Days Taken',
        },{
            $Type : 'UI.DataField',
            Value : Approved_by,
            Label : 'Approved by',
        },]
);
annotate service.PAN_Details_APR with @(
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                    {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : PAN_Number,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : '',
                        },
                    ],
                },
                ],
        },
    }
);


annotate service.PAN_Details_APR with {
    number_of_vendors_invited @Common.FieldControl : #ReadOnly
};
annotate service.PAN_Details_APR with @(
    UI.Identification : []
);
annotate service.PAN_Details_APR with {
    Comments @Common.FieldControl : #Mandatory
};

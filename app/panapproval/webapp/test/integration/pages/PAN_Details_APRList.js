sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'panapproval',
            componentId: 'PAN_Details_APRList',
            contextPath: '/PAN_Details_APR'
        },
        CustomPageDefinitions
    );
});
sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'panapproval',
            componentId: 'PAN_Details_APRObjectPage',
            contextPath: '/PAN_Details_APR'
        },
        CustomPageDefinitions
    );
});
sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'panapproval/test/integration/FirstJourney',
		'panapproval/test/integration/pages/PAN_Details_APRList',
		'panapproval/test/integration/pages/PAN_Details_APRObjectPage'
    ],
    function(JourneyRunner, opaJourney, PAN_Details_APRList, PAN_Details_APRObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('panapproval') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePAN_Details_APRList: PAN_Details_APRList,
					onThePAN_Details_APRObjectPage: PAN_Details_APRObjectPage
                }
            },
            opaJourney.run
        );
    }
);
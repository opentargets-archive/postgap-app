import GoogleAnalytics from 'react-ga';

const reportAnalyticsEvent = options => {
    // report to analytics if production
    if (window.location.hostname === 'genetics.opentargets.io') {
        GoogleAnalytics.event(options);
    }
};

export default reportAnalyticsEvent;

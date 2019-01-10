import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';

import withPageAnalytics from './HOCs/withPageAnalytics';
import HomePage from './pages/HomePage';
import DiseasePage from './pages/DiseasePage';
import GenePage from './pages/GenePage';
import VariantPage from './pages/VariantPage';
import LocusPage from './pages/LocusPage';
import Footer from './components/Footer/Footer';
import Banner from './components/Banner/Banner';
// import CornerRibbon from './components/CornerRibbon/CornerRibbon';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    {/* <CornerRibbon label="beta" /> */}

                    <Switch>
                        <Route exact path="/" component={null} />
                        <Route path="/*" component={Banner} />
                    </Switch>

                    <Layout.Content
                        style={{
                            background: '#ECECEC',
                            minHeight: 'calc(100vh - 40px - 200px)', // Banner=40; Footer=200
                        }}
                    >
                        <Route
                            exact
                            path="/"
                            component={withPageAnalytics(HomePage)}
                        />
                        <Route
                            path="/disease/:efoId"
                            component={withPageAnalytics(DiseasePage)}
                        />
                        <Route
                            path="/gene/:geneId"
                            component={withPageAnalytics(GenePage)}
                        />
                        <Route
                            path="/variant/:variantId"
                            component={VariantPage}
                        />
                        <Route
                            path="/locus"
                            component={withPageAnalytics(LocusPage)}
                        />
                    </Layout.Content>

                    <Switch>
                        <Route exact path="/" component={null} />
                        <Route path="/*" component={Footer} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;

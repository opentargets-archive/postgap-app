import React, { Component } from 'react';
import { Card, Row, Col, Slider, Checkbox, Menu, Layout } from 'antd';

class Browser extends Component {
    render() {
        return (
            <div>
                <Card title='Nav (assembly; chrom; location)'/>
                <Card title='G'/>
                <Card title='G2V'/>
                <Card title='V'/>
                <Card title='V2LeadV'/>
                <Card title='LeadV'/>
                <Card title='LeadV2D'/>
                <Card title='D'/>
            </div>
        );
    }
}

export default Browser;

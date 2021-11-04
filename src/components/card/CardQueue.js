import React from 'react'
import {Row, Col} from 'react-bootstrap';
import Images from '../share/Image';

export default function CardQueue(props) {
    console.log(props.props)
    return (
        <div className = 'queue'>
            <Row>
                <Col sm={4}>
                    <img
                        src = {Images.ICON_CLIENT}
                        alt = ''
                    />
                </Col>
                <Col sm={8}>
                    <div>Name: {props.props.name}</div>
                    <div>Transaction: {props.props.transaction/1000}</div>
                </Col>
            </Row>
        </div>
    )
}

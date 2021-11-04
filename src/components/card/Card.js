import React, {useContext, useState, useEffect} from 'react'
import { AtmContext } from '../context/AtmContext'
import Images from '../share/Image'
import '../../App.css'
import {Row, Col} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card(props) {
    const {removeAtm} = useContext(AtmContext)

     // remove atm
     const handleRemoveAtm = async() => {
        try{
            const data = removeAtm(props.props.id)
            if(data){   
                toast.success('remove atm success !')
            }
        }catch(err){
            console.log(err.message)
        }
    }
    return (
        <div className='card_atm'>
            <div>
                <div className='card_close' onClick={handleRemoveAtm}>
                    <img
                        src = {Images.ICON_CLOSE}
                        alt = 'close'
                    />
                </div>
                <div className='atm_img'>
                    <img
                        src = {Images.ICON_ATM}
                        alt = 'atm'
                    />
                </div>
                <div className='content'>
                    {props.props.status === 'Free'? (
                        <p className='free'>{props.props.status}</p>
                    ):(
                        <p>{props.props.status}</p>
                    )}
                    <h4>Missouri</h4>
                </div>
            </div>
            <div className='card_content'>
                {props.props.status === 'Busy' ? (
                    <Row>
                        <Col sm = {4} className='img_client'>
                            <img
                                src = {Images.ICON_CLIENT}
                                alt = 'client'
                            />  
                        </Col>
                        <Col sm = {8}> 
                            <h3>{props.props.client}</h3>
                            <div>Pending</div>
                            <div>transactions:{props.props.transaction}</div>
                        </Col>
                    </Row>
                ):(
                    <div></div>
                )}
            </div>
        </div>
    )
}

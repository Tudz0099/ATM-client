import React, {useState, useContext, useEffect} from 'react'
import { AtmContext } from './context/AtmContext';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Loading from './share/Loading';
import Card from './card/Card'
import CardQueue from './card/CardQueue';
import '../App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const {getAtm, postAtm} = useContext(AtmContext)

    const [atm, setAtm] = useState()
    const [queue, setQueue] = useState()
    const [processedClient, setProcessedClient] = useState()
    const [loading, setLoading] = useState(true)

    // get atm
    useEffect(() => {
        const interval = setInterval(() => {
            getAtm()
            .then((data)=> {
                setAtm(data.atm)
                setQueue(data.queue)
                setProcessedClient(data.processedClient)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }, 1000);
        return () => clearInterval(interval);
      }, []);


    // post atm
    const handlePostAtm = async() => {
        try{
            postAtm()
            .then((data) => {
                setAtm(data)
                toast.success('add atm success !')
            })
        }catch(err){
            console.log(err.message)
            toast.warning(err.message)
        }
    }


    return (
        <Container className='home'>
            <Row>
                <Col xs={8}>
                    <Button className='btn_add' size="sm" onClick={handlePostAtm}>Add new ATM</Button>
                    <div className=' card_wraps'>
                        {
                            loading ? (
                                <Loading/>
                            ):(
                                    atm.map(item => (
                                        <div key={item.id}>
                                            <Card props = {item}/>
                                        </div>
                                    ))
                            )
                        }
                    </div>
                </Col>
                <Col xs={4}>
                    <h4>Queue</h4>
                    <div className='queue_list'>
                        {
                            !queue ? (
                                <div className = 'quete'>No waiting clients in queue.</div>
                            ):(
                                queue.map(item => (
                                    <div key={item.id}>
                                        <CardQueue props = {item}/>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </Col>
            </Row>
            <Row className='mt-5'>
                <h3>Processed client</h3>
                <div>
                    {
                        loading ? (
                            <Loading/>
                        ):(
                            <div>
                                {processedClient}
                            </div>
                        )
                    }
                </div>
            </Row>
            <ToastContainer />
        </Container>
    )
}

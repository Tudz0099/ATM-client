import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
import Home from '../components/Home'
import NavigationBar from '../components/NavigationBar'
import { AuthContext } from '../components/context/AuthContext'

export default function Dashboard() {
    const {authState: {isAuthenticated, authLoading}} = useContext(AuthContext)   
    if(authLoading){
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    return (
        <div>
            <Route 
            render={() => isAuthenticated ? (
                <>
                   <NavigationBar/>
                   <Home/>
                </>
            ) : (
                <Redirect to='/login' />
            )
        }
      />
        </div>
    )
}

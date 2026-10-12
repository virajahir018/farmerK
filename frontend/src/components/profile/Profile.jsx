import React from 'react'
import { FaUser } from 'react-icons/fa'
import LogOut from './LogOut'

export default function Profile({ setIsLogin }) {
    return (
        <div>
            <FaUser />
            <LogOut setIsLogin={setIsLogin} />
        </div>
    )
}

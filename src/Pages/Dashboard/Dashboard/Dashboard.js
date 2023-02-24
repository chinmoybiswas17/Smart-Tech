import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h2 className=' text-3xl text-center'>Hello <span className='text-primary font-bold'>{user?.displayName} !</span></h2>
            <br />
            <h2 className=' text-2xl text-center'>Welcome to Smart Tech!</h2>
        </div>
    );
};

export default Dashboard;
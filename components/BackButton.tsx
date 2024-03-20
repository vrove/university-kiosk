import React from 'react';
import Link from 'next/link'
import './components.css'

interface BackButtonProps {
    to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
    return (
        <Link href={to} className='back-button'>
            <button className='font-bold'>
                Back
            </button>
        </Link>
    );
};

export default BackButton;
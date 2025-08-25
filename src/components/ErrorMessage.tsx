import React from 'react';

interface Props {
    message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
    return <p>Error: {message}</p>;
};

export default ErrorMessage;
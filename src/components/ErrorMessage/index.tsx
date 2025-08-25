import React from "react";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <p data-testid="error-message">Error: {message}</p>;
};

export default ErrorMessage;
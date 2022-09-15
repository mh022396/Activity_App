interface ServerError{
    statusCode: number;
    message: string;
    details: string;
}

export default ServerError;
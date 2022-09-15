import { Message } from "semantic-ui-react";

interface Props {
    errors: string[];
}

const ValidationErrors = ({errors}: Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error, i) => (
                        <Message.Item key={i}>
                            {error}
                        </Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    );
}

export default ValidationErrors;
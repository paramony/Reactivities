import { Dimmer, Loader } from "semantic-ui-react";

export interface Props {
    inverted?: Boolean,
    content?: string
}

const LoadingComponent = ({ inverted = true, content = "Loading..." }: Props) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    );
}

export default LoadingComponent;
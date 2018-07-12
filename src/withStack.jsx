import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Wrapper extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return React.createElement(
            this.props.component,
            Object.assign({}, this.props, {
                ref: this.context.refPage
            })
        );
    }
}

Wrapper.contextTypes = {
    refPage: PropTypes.func
};

// withStack就是把context中的refPage进行接力
export default Component => {
    return props => <Wrapper component={Component} {...props} />;
};

import React from 'react';
import withStack from '../withStack';
import {Link} from 'react-router-dom';
class Top extends React.Component {
    constructor(props) {
        super(props);
    }

    // 页面进入完成 transition结束
    componentDidEnter() {}
    // 页面退出完成 transition结束
    componentDidExit() {} // 页面再一次到最上层
    componentDidTop() {}
    // 页面从最上层下来
    componentDidHide() {}

    render() {
        return (
            <div>
                <ul>
                    {['/a', '/b', '/c'].map((item, index) => (
                        <li key={index}>
                            <Link to={item}>{item}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default withStack(Top);

// @flow
/**
 * @file [A]
 * @author [wangyang65]
 * @email [wangyang65@baidu.com]
 * @create date 2018-07-12 11:15:02
 */
/* eslint-disable babel/new-cap,operator-linebreak,fecs-export-on-declare */
import React, {Component} from 'react';
import styled from 'styled-components';
import withStack from '../withStack';
import {Link} from 'react-router-dom';
const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: red;
`;
type Props = {};
type State = {};
class A extends Component<Props, State> {
    state: State;

    static defaultProps = {};

    // 页面进入完成 transition结束
    componentDidEnter() {
        console.log('A::componentDidEnter');
    }
    // 页面退出完成 transition结束
    componentDidExit() {} // 页面再一次到最上层
    componentDidTop() {}
    // 页面从最上层下来
    componentDidHide() {
        console.log('A::componentDidHide');
    }

    render() {
        return (
            <Wrapper>
                <Link to={'/a/aa'}>go AA</Link>
            </Wrapper>
        );
    }
}
export default withStack(A);

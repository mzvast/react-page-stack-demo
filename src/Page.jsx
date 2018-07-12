// @flow
/**
 * @file [Page]
 * @author [wangyang65]
 * @email [wangyang65@baidu.com]
 * @create date 2018-07-11 11:41:01
 */
/* eslint-disable babel/new-cap,operator-linebreak,fecs-export-on-declare */
import React, {Component} from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
// 首先定义transition
// const Slide = ({children, ...props}) => (
//     <CSSTransition classNames={'page'} {...props}>
//         {children}
//     </CSSTransition>
// );

type Props = {
    children: any,
    // onEnter: Function,
    // onEntering: Function,
    onEntered: Function,
    // onExit: Function,
    // onExiting: Function,
    onExited: Function
    // onTop: Function,
    // onHide: Function
};
type State = {};
class Page extends Component<Props, State> {
    state: State;
    page: any;

    static defaultProps = {};

    // 通过context传递refPage
    getChildContext() {
        return {
            refPage: (c: any) => {
                this.page = c;
            }
        };
    }

    componentDidEnter = () => {
        if (this.props.onEntered) {
            this.props.onEntered(this);
        }
        if (this.page && this.page.componentDidEnter) {
            console.log('Page::componentDidEnter');
            this.page.componentDidEnter();
        }
    };

    componentDidExit = () => {
        if (this.props.onExited) {
            this.props.onExited(this);
        }
        if (this.page && this.page.componentDidExit) {
            console.log('Page::componentDidExit');
            this.page.componentDidExit(this);
        }
    };
    // 其他的hook也进行相同处理
    componentDidTop = () => {
        if (this.page && this.page.componentDidTop) {
            console.log('Page::componentDidTop');
            this.page.componentDidTop(this);
        }
    };
    componentDidHide = () => {
        if (this.page && this.page.componentDidHide) {
            console.log('Page::componentDidHide');
            this.page.componentDidHide(this);
        }
    };

    render() {
        const {children, ...props} = this.props;
        return (
            // <Slide
            //     timeout={300}
            //     {...props}
            //     onEntered={this.componentDidEnter}
            //     onExited={this.componentDidExit}
            // >
            //     {props.children}
            // </Slide>

            <CSSTransition
                {...props}
                classNames={'page'}
                timeout={300}
                onEntered={this.componentDidEnter}
                onExited={this.componentDidExit}
            >
                {children}
            </CSSTransition>
        );
    }
}

Page.childContextTypes = {
    refPage: PropTypes.func
};

export default Page;

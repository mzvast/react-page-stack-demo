// @flow
/**
 * @file [Stack]
 * @author [mzvast]
 * @email [mzvast@gmail.com]
 * @create date 2018-07-11 11:29:42
 */
/* eslint-disable babel/new-cap,operator-linebreak,fecs-export-on-declare */
import React, {PureComponent} from 'react';
import {Link, Route, withRouter, Switch} from 'react-router-dom';
// import styled from 'styled-components';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Page from './Page';
type Props = {
    history: any,
    location: any,
    appRoute: any
};
type State = {
    stack: Array<any>
};

class Stack extends PureComponent<Props, State> {
    state: State = {
        stack: [] // 这里放置各个page element
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        // 第一个页面先push进去
        // console.log('props.location', props.location);
        const homePageLocation = {
            hash: '',
            pathname: '/',
            search: '',
            state: undefined
        };
        // this.state.stack.push(this.getPage(props.location));
        if (this.props.location.pathname !== '/') {
            this.state.stack.push(this.getPage(homePageLocation)); // 强制将home压入
        }
        this.state.stack.push(this.getPage(props.location));
    }

    componentStack = []; // 这里放置各个page component

    // 对route中返回的page element进行包裹，加上transition等效果
    getPage(location) {
        return (
            <Page
                key={location.pathname}
                // onEnter={this.onEnter}
                // onEntering={this.onEntering}
                onEntered={this.onEntered}
                // onExit={this.onExit}
                // onExiting={this.onExiting}
                onExited={this.onExited}
            >
                {React.createElement(this.props.appRoute, {location})}
            </Page>
        );
    }

    // 根据location的变化更新Stack
    componentWillReceiveProps(nextProps) {
        console.log(
            'Stack::nextProps.history.action',
            nextProps.history.action,
            nextProps.history
        );

        // 后退的时候，直接pop最上面的page
        if (nextProps.history.action === 'POP') {
            this.pop();
        } else {
            if (nextProps.history.action === 'REPLACE') {
                this.pop();
            }
            // action === 'PUSH' 跳转新页面的时候，直接push
            this.state.stack.push(this.getPage(nextProps.location));
        }
    }

    pop() {
        // console.log('this.state.stack.length:', this.state.stack.length);
        if (this.state.stack.length === 1) {
            return; // 保留Home永不销毁
        } else if (this.state.stack.length === 2) {
            window.history.replaceState(null, null, '/'); // 子页面刷新改写返回页面url
        }
        this.state.stack.pop();
    }

    /* Enter */

    // onEnter() {}

    // onEntering() {}

    // push新页面的时候，触发之前页面的componentDidHide
    onEntered = component => {
        this.componentStack.push(component);
        const prevTopComponent = this.componentStack[
            this.componentStack.length - 2
        ];
        if (prevTopComponent && prevTopComponent.componentDidHide) {
            prevTopComponent.componentDidHide();
        }
        console.log('Stack::onEntered', this.componentStack);
    };
    /* Enter */
    // onExit() {}

    // onExiting() {}

    // pop页面的时候，触发下一个页面的componentDidTop
    onExited = component => {
        this.componentStack.splice(this.componentStack.indexOf(component), 1);
        // this.componentStack.pop(); // todo: why not pop()
        const topComponent = this.componentStack[
            this.componentStack.length - 1
        ];
        if (topComponent && topComponent.componentDidTop) {
            topComponent.componentDidTop();
        }
        console.log('Stack::onExited', this.componentStack);
    };
    render() {
        return <TransitionGroup>{this.state.stack}</TransitionGroup>;
    }
}

export default withRouter(Stack);

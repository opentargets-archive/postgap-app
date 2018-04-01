// See https://github.com/apollographql/react-apollo/issues/450

import React from 'react';

const shallowEqual = (a, b) => a === b;

// const shallowEqual = (a, b) => {
//     if (a === b) return true
//     for (var i in a) if (!(i in b)) return false
//     for (var i in b) if (a[i] !== b[i]) return false
//     return true
//   }

const withDebouncedProps = ({
  debounce = 0,
  propNames = [],
}) => WrappedComponent =>
  class WithDebouncedProps extends React.Component {
    static displayName = `withDebouncedProps(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    constructor(props) {
      super(props);
      this.state = this.generateNextState(props, { debouncing: false });
    }

    generateNextState(props, state) {
      return propNames.reduce(
        (nextState, propName) => ({
          ...nextState,
          [`${propName}Debounced`]: props[propName],
        }),
        state
      );
    }

    componentWillReceiveProps(nextProps, prevProps) {
      if (shallowEqual(nextProps, prevProps)) {
        return;
      }

      clearTimeout(this.timeout);

      if (!this.state.debouncing) {
        this.setState({ debouncing: true });
      }

      this.timeout = setTimeout(
        () =>
          this.setState({
            ...this.generateNextState(nextProps, this.state),
            debouncing: false,
          }),
        debounce
      );
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

export default withDebouncedProps;

import React from 'react';
import CommonDataProvider from '../providers/CommonDataProvider';

export default function withCommonDataDataProvider(WrappedComponent: any) {
  return class extends React.Component {
    override render() {
      return (
        <CommonDataProvider
          doRender={(additionalProps: any) => (
            <WrappedComponent {...this.props} {...additionalProps} />
          )}
        />
      );
    }
  };
}

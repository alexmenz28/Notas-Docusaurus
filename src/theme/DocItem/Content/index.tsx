import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocItem/Content';
import type {Props} from '@theme/DocItem/Content';
import DocMetaStrip from '../../../components/DocMetaStrip';

export default function DocItemContentWrapper(props: Props): ReactNode {
  return (
    <>
      <DocMetaStrip />
      <Content {...props} />
    </>
  );
}

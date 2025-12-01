import { Modal } from '@arco-design/web-react';
import './index.scss';

export type ConfirmOptions = Parameters<typeof Modal.confirm>[0];

export function showConfirm(options: ConfirmOptions) {
  const {
    okButtonProps = { style: { minWidth: '60px' } },
    cancelButtonProps = { style: { minWidth: '60px' } },
    style = { padding: '20px 28px', width: '400px' },
    content,
    ...rest
  } = options || {};

  return Modal.confirm({
    okButtonProps,
    cancelButtonProps,
    style,
    content: <div className="aa-confirm-content">{content}</div>,
    ...rest,
  });
}

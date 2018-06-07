import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import moment from 'moment';
import SignaturePad from 'react-signature-pad-wrapper';

import Result from 'components/Result';

import styles from './style.less';

import formImageIT from './Laptop-of-Accountability-IT.png';

class Step3 extends React.PureComponent {
  componentDidMount() {
    this.bgImage.onload = () => {
      this.redrawCanvas();
    };
  }

  onFinish() {
    const { dispatch, data } = this.props;

    const image = this.signaturePad.toDataURL('image/png');
    dispatch({
      type: 'transfer/uploadTransferSignature',
      id: data.id,
      io: 'borrow',
      payload: image,
    });
  }

  redrawCanvas() {
    const { data } = this.props;
    const ctx = this.signaturePad.canvas.getContext('2d');
    ctx.drawImage(this.bgImage, 0, 0);
    ctx.font = '16px Courier';
    ctx.fillText(data.fromEid, 210, 130);
    ctx.fillText(moment(data.borrowDate).format('YYYY-MM-DD HH:mm'), 210, 150);

    ctx.fillText(data.toEid, 590, 130);

    // asset tags
    if (data.assetTags) {
      const tags = data.assetTags.split(',');
      for (const i in tags) {
        const tag = tags[i];

        ctx.fillText(tag, i % 2 === 0 ? 110 : 480, 215 + parseInt(i / 2, 10) * 35);
      }
    }
  }

  render() {
    const { submitting } = this.props;

    const actions = (
      <Fragment>
        <Button onClick={() => this.redrawCanvas()}>擦掉重签</Button>
        <Button type="primary" onClick={() => this.onFinish()} loading={submitting}>
          签名完毕
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        style={{ width: '100%' }}
        description={
          <div className={styles.sigWrapper}>
            <img src={formImageIT} ref={ref => (this.bgImage = ref)} />
            <SignaturePad ref={ref => (this.signaturePad = ref)} />
            <div className={styles.signatureCover} />
          </div>
        }
        actions={actions}
      />
    );
  }
}

export default connect(({ transfer, loading }) => ({
  data: transfer.step,
  submitting: loading.effects['transfer/uploadTransferSignature'],
}))(Step3);

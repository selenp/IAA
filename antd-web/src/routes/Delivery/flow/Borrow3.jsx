import React, { Fragment } from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import { Button } from 'antd';
import moment from 'moment';
import SignaturePad from 'react-signature-pad-wrapper';

import Result from 'components/Result';

import styles from './style.less';

import formImage from '../../../assets/template-delivery-borrow.png';

class Step3 extends React.PureComponent {
  componentDidMount() {
    this.bgImage.onload = () => {
      this.redrawCanvas();
    };
  }

  onFinish() {
    const { dispatch, data, t } = this.props;
    const image = this.signaturePad.toDataURL('image/png');
    dispatch({
      type: 'delivery/uploadDeliverySignature',
      id: data.id,
      io: 'borrow',
      payload: image,
      t,
    });
  }

  redrawCanvas() {
    const { data } = this.props;
    const ctx = this.signaturePad.canvas.getContext('2d');
    ctx.drawImage(this.bgImage, 0, 0);
    ctx.font = '16px Courier';
    ctx.fillText(data.eid, 180, 130);
    ctx.fillText(data.businessUnit, 180, 168);

    ctx.fillText(data.projectName || '', 520, 149);
    ctx.fillText(data.locationBuilding || '', 520, 168);
    ctx.fillText(data.locationSeat || '', 520, 187);

    ctx.fillText(data.assetTag, 180, 293);
    ctx.fillText(data.serialTag ? data.serialTag.toUpperCase() : '', 520, 293);

    ctx.fillText('*', data.machineType === 'laptop' ? 277 : 611, 312);

    if (data.machineType === 'laptop') {
      ctx.fillText(data.laptopModel || '', 180, 330);

      ctx.fillText(data.acPowerAdapter ? '*' : '', 342, 360);
      ctx.fillText(data.securityCable ? '*' : '', 342, 395);
      ctx.fillText(data.mouse ? '*' : '', 342, 425);
      ctx.fillText(data.bag ? '*' : '', 342, 457);
    } else if (data.machineType === 'desktop') {
      ctx.fillText(data.monitorSize, 600, 360);
      ctx.fillText(data.mouseKeyboard ? '*' : '', 673, 396);
      ctx.fillText(data.lanCable ? '*' : '', 673, 426);
    }


    ctx.fillText(moment(data.borrowDate).format('YYYY-MM-DD HH:mm'), 185, 955);
  }

  render() {
    const { t } = this.props;
    const { submitting } = this.props;
    const actions = (
      <Fragment>
        <Button onClick={() => this.redrawCanvas()}>{t('擦掉重签')}</Button>
        <Button type="primary" onClick={() => this.onFinish()} loading={submitting}>
          {t('签名完毕')}
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        style={{ width: '100%' }}
        description={
          <div className={styles.sigWrapper}>
            <img src={formImage} ref={ref => (this.bgImage = ref)} />
            <SignaturePad ref={ref => (this.signaturePad = ref)} />
            <div className={styles.signatureCover} />
          </div>
        }
        actions={actions}
      />
    );
  }
}

export default connect(({ delivery, loading }) => ({
  data: delivery.step,
  submitting: loading.effects['delivery/uploadDeliverySignature'],
}))(translate("translations")(Step3));

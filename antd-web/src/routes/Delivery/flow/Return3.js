import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import moment from 'moment';
import SignaturePad from 'react-signature-pad-wrapper'

import Result from 'components/Result';

import styles from './style.less';

import formImage from './Laptop-of-Accountability-Form.png';

class Step3 extends React.PureComponent {

  componentDidMount() {
    this.bgImage.onload = () => {
      this.redrawCanvas()
    }
  }

  redrawCanvas () {
    const { data } = this.props;
    const ctx = this.signaturePad.canvas.getContext("2d");
      ctx.drawImage(this.bgImage, 0, 0);
      ctx.font = "16px Courier";
      ctx.fillText(data.eid, 210, 125);
      ctx.fillText(data.fullname, 210, 150);
      ctx.fillText(data.projectName, 210, 175);
      ctx.fillText(data.businessUnit, 210, 200);
      ctx.fillText(data.location, 210, 225);
      ctx.fillText(moment(data.effectiveDate).format('YYYY-MM-DD HH:mm'), 210, 250);

      ctx.fillText(data.assetTag, 590, 125);
      ctx.fillText(data.serialTag, 590, 175);
      ctx.fillText(data.laptopModel, 590, 225);

      ctx.fillText(data.acPowerAdapter?'Yes':'No', 390, 350);
      ctx.fillText(data.securityCable?'Yes':'No', 390, 385);
      ctx.fillText(data.bag?'Yes':'No', 390, 420);
      ctx.fillText(data.mouse?'Yes':'No', 390, 455);
      ctx.fillText(data.lanCable?'Yes':'No', 390, 480);
  }


  render() {
    const { dispatch, data, submitting } = this.props;
    const onFinish = () => {
      const image = this.signaturePad.toDataURL("image/png");
      dispatch({
        type: 'delivery/uploadDeliverySignature',
        id: data.id,
        io: 'return',
        payload: image,
      });
    };

    const actions = (
      <Fragment>
        <Button
          onClick={() => this.redrawCanvas()}
        >擦掉重签
        </Button>
        <Button
          type="primary"
          onClick={() => this.onFinish()}
          loading={submitting}
        >签名完毕
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        description={(
          <div className={styles.sigWrapper}>
            <img src={formImage}  ref={(ref) => this.bgImage = ref} />
            <SignaturePad ref={(ref) => this.signaturePad = ref} />
          </div>
        )}
        actions={actions}
      />
    );
  }
}

export default connect(({ delivery }) => ({
  data: delivery.step,
}))(Step3);

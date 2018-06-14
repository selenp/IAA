import React, { createElement } from 'react';
import { translate } from "react-i18next";
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

const Exception = ({ t, className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{t(title || config[pageType].title)}</h1>
        <div className={styles.desc}>{t(desc || config[pageType].desc)}</div>
        <div className={styles.actions}>
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: '/',
              },
              <Button type="primary">{t("返回首页")}</Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default translate("translations")(Exception);


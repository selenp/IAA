import React from 'react';
import { translate } from "react-i18next";
import { Dropdown, Icon, List, Menu, Tag } from 'antd';
import { Link } from 'dva/router';
import moment from 'moment';

const progressTitle = {
  reserved: '预约中',
  processing: '处理中',
  finished: '处理完毕',
};
const progressColor = {
  reserved: 'geekblue',
  processing: 'red',
  finished: 'gold',
};

const MoreBtn = ({
  t,
  item,
  changeProgress,
}) => (
  <Dropdown
    overlay={
      <Menu>
        {Object.keys(progressTitle).map(k => (
          <Menu.Item key={k}>
            <a onClick={() => changeProgress(item, k)}>{t(progressTitle[k])}</a>
          </Menu.Item>
        ))}
      </Menu>
    }
  >
    <a>
      <Tag color={progressColor[item.progress]}>{t(progressTitle[item.progress])}</Tag>{' '}
      <Icon type="down" />
    </a>
  </Dropdown>
);

const TaskItem = ({
  t,
  item,
  changeProgress,
}) => (
  <List.Item
    key={item.id}
    actions={[<MoreBtn t={t} item={item} changeProgress={changeProgress} />]}
    style={{ marginLeft: 20 }}
  >
    <List.Item.Meta
      title={
        <span>
          {
            item.progress === 'finished' ? (
              <div>
                {t('用户')}
                <span>{` ${item.eid} `}</span>
                {t('提交了一个任务')}
                {` "${t(item.category)}" `}
              </div>
            ) : (
              <Link to={`/transfer/borrow/info?task=${item.id}`}>
                {t('用户')}
                <span>{` ${item.eid} `}</span>
                {t('提交了一个任务')}
                {` "${t(item.category)}" `}
              </Link>
            )
                }
          &nbsp;
          <span>{`${t('希望日期')} ${moment(item.dueDate).format('YYYY-MM-DD')}`}</span>
        </span>
      }
      description={<pre>{item.content}</pre>}
    />
  </List.Item>
);

export default translate("translations")(TaskItem);

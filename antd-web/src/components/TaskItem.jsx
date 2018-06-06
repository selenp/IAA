import React from 'react';
import {
  Dropdown,
  Icon,
  List,
  Menu,
  Tag,
} from 'antd';
import { Link } from 'dva/router';
import moment from 'moment';

const progressTitle = {
  reserved:'预约中',
  processing:'处理中',
  finished: '处理完毕',
};
const progressColor = {
  reserved:'geekblue',
  processing:'red',
  finished: 'gold',
};

const MoreBtn = ({item, changeProgress}) => (
  <Dropdown overlay={(
    <Menu>
      {
        Object.keys(progressTitle).map((k) => (
          <Menu.Item
            key={k}
          >
            <a onClick={() => changeProgress(item, k)}>{progressTitle[k]}</a>
          </Menu.Item>
        ))
      }
    </Menu>
  )}
  >
    <a>
      <Tag color={progressColor[item.progress]}>{progressTitle[item.progress]}</Tag> <Icon type="down" />
    </a>
  </Dropdown>
);

const TaskItem = ({item, changeProgress}) => (
  <List.Item
    key={item.id}
    actions={[<MoreBtn item={item} changeProgress={changeProgress} />]}
    style={{ marginLeft: 20 }}
  >
    <List.Item.Meta
      title={
        <span>
          <Link to={`/transfer/borrow/info?task=${item.id}`}>
              用户
            <span>{item.eid}</span>
                  提交了一个任务：
            {item.category}
          </Link>
                    &nbsp;
          <span>{`希望日期 ${moment(item.createdDate).format('YYYY-MM-DD')}`}</span>
        </span>
          }
      description={
        <pre>
          {item.content}
        </pre>
              }
    />
  </List.Item>
);

export default TaskItem;

import React from 'react';
import { List } from 'antd';
import moment from 'moment';

const AnnouncementItem = ({ item }) => (
  <List.Item key={item.id} style={{ marginLeft: 20 }}>
    <List.Item.Meta
      title={
        <span>
          <span>{item.eid}</span>
          <span>{` - ${moment(item.dueDate).format('YYYY-MM-DD')}`}</span>
        </span>
      }
      description={<pre>{item.content}</pre>}
    />
  </List.Item>
);

export default AnnouncementItem;

import React from 'react';
import { translate } from "react-i18next";
import { Button, List } from 'antd';
import moment from 'moment';

const AnnouncementItem = ({
  t,
  item,
  deleteAnnouncement,
}) => (
  <List.Item
    key={item.id}
    actions={[
      deleteAnnouncement && (
      <Button
        type="dashed"
        size="small"
        onClick={() => deleteAnnouncement(item, !item.deleteFlag)}
      >
        {t(item.deleteFlag ? '取消归档' : '归档')}
      </Button>
),
]}
    style={{ marginLeft: 20 }}
  >
    <List.Item.Meta
      title={
        <span>
          <span>{item.eid}</span>
          <span>{` - ${moment(item.dueDate).format('YYYY-MM-DD')}`}</span>
        </span>
      }
      description={<pre style={{textDecoration: item.deleteFlag ? 'line-through' : 'none'}}>{item.content}</pre>}
    />
  </List.Item>
);

export default translate("translations")(AnnouncementItem);

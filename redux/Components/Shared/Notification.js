import React from 'react';
import { notification } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const openNotification = (title, message, color) => {
    notification.open({
      message: title,
      description: message,
      icon: <ExclamationCircleOutlined style={{ color: color }} />,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
};

export default React.memo(openNotification)
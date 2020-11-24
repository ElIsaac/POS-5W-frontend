import React from 'react'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal;
export default function Confirmacion(texto, funcion, id, datos) {
    
        return confirm({
          title: texto,
          icon: <ExclamationCircleOutlined />,
          content: 'Esta accion es irreversible',
          onOk() {
            funcion(id, datos)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      
}

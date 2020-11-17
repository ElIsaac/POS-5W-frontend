import React, { useState, useEffect } from 'react'
import { Table, Input, notification } from 'antd';



import cobrarProductos, { buscarProducto, buscarProductos } from '../../api/cajero'
import { obtenerToken } from '../../api/auth'

import Titulo from '../Titulo'

export const Cobrar = (props) => {
  const [productos, setProductos] = useState([])
  const [productoEnLista, setProductoEnLista] = useState([])
  const [productosID, setProductosID] = useState([])  


  useEffect(() => {
    var token = obtenerToken()
    buscarProductos(token).then(res => {
      setProductos(res)
    })
  }, [])



  const { Search } = Input


  const onSearch = (value) => {
    const resultado = productos.find((producto) => {
      if (producto._id === value.trim()) {
        return producto
      } 
    })
    if(resultado){
      setProductoEnLista([
        ...productoEnLista,
        resultado
      ])
      setProductosID([
        ...productosID,
        {id:resultado._id}
      ])
    }else {
      notification["error"]({
        message: "Producto no encontrado"
    })
    }
    console.log(productoEnLista)
    console.log(setProductosID)

  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
    },
  ];

  return (
    <>
      < Titulo titulo="Panel de cobro" history={props.history} />
      <div>
        <Table columns={columns} dataSource={productoEnLista} size="middle" />
      </div>
      <Search
        placeholder="Ingrese"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </>
  )
}

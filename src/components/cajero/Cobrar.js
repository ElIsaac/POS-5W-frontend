import React, { useState, useEffect } from 'react'
import { Table, Input, notification } from 'antd';
import { saveAs } from 'file-saver'
import axios from 'axios';

import config from '../../api/config'
import { buscarProductos } from '../../api/cajero';
import { obtenerToken, cerrarSesion } from '../../api/auth';

import Confirmacion from '../Confirmacion'
import Titulo from '../Titulo';


const token = obtenerToken();

export const Cobrar = (props) => {
  const [productos, setProductos] = useState([])
  const [productoEnLista, setProductoEnLista] = useState([])
  const [productosID, setProductosID] = useState([])
  const [cobrar, setCobrar] = useState(true)


  useEffect(() => {
    

    buscarProductos(token).then(res => {
      try {
        const arr=[]
      res.map((i)=>{
        arr.push({
          _id: i._id,
          nombre: i.nombre,
          precio:i.precio,
          key:i._id
        })
        return null;
      })
      setProductos(arr)
      } catch {
        
        cerrarSesion()
        window.location.reload(true);
        
      }
    })
  }, [])


  const onSearch = (value) => {
    const resultado = productos.find((producto) => {
      if (producto._id === value.trim()) {
        return producto
      } else {
        return null
      }
    })
    if (resultado) {
      setProductoEnLista([
        ...productoEnLista,
        
        {key: new Date(),
        nombre: resultado.nombre,
        precio: resultado.precio,
        _id: resultado._id}
       
        
      ])
      setProductosID([
        ...productosID,
        { id: resultado._id }
      ])
    } else {
      notification["error"]({
        message: "Producto no encontrado"
      })
    }
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
      <br />
      <button
        type="button"
        className="btn btn-info btn-block"
        onClick={() => setCobrar(!cobrar)}
      >
        {
          cobrar ? "Ver todos los productos" : "Ver la Pantalla de cobro"
        }
        <br />
      </button>
      <br />
      {
        cobrar
          ?
          <PantallaCobrar columns={columns} setProductosID={setProductosID} setProductoEnLista={setProductoEnLista} productoEnLista={productoEnLista} onSearch={onSearch} productosID={productosID} />
          :
          <TodosLosProductos columns={columns} productos={productos} />
      }

    </>
  )
}

function PantallaCobrar({ columns, productoEnLista, onSearch, productosID, setProductoEnLista, setProductosID }) {

  const { Search } = Input

  const cobrarProductos = async (productosID) => {

    const cuerpo={ "productos": productosID }
    const configurar={
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      responseType: 'blob'
    }

    axios.post(`http://${config.nombre}/cobrar`, cuerpo, configurar)
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'ticket.pdf');
        setProductoEnLista([])
        setProductosID([])
      }).catch(err => console.log(err))



  }
  return (
    <>
      <div>
        <Table columns={columns} dataSource={productoEnLista} size="middle" />
      </div>
      <Search
        placeholder="Ingrese"
        enterButton="Buscar"
        size="large"
        onSearch={onSearch}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => Confirmacion("Desea cobrar estos productos",cobrarProductos,productosID,)}
      >
        Cobrar productos
      </button>
    </>
  )
}

function TodosLosProductos({ columns, productos }) {

  return (
    <div className="container">
      <Table columns={columns} dataSource={productos} size="small" />
    </div>
  )

}
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idvend,setIdVend] = useState('');
  const [nombre,setNombre] = useState('');
  const [correoe,setCorreoE] = useState('');
  const [totalComision,setTotalComision] = useState('');

  // const getUser = async () => {
  //    try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const saveVendedor = async () => {
    if (!nombre.trim() || !correoe.trim() || !totalcomision.trim()) {
      alert("Nombre, Correo y Total Comisión obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://192.168.1.113:3000/api/vendedor`, {
        nombre,
        correoe,
        totalcomision
      });
      alert("Vendedor agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const updateVendedor = async (id) => {
    if (!nombre.trim() || !correoe.trim() || !totalcomision.trim()) {
      alert("Nombre, Correo y Total Comisión obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://192.168.1.113:3000/api/vendedor/${id}`, {
        nombre,
        correoe,
        totalcomision
      });
      alert("Vendedor actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const deleteVendedor = async (id) => {
    setLoading(true);
    try {
      if (confirm("Está seguro de eliminar el Vendedor")) {
        const response = await axios.delete(`http://192.168.1.113:3000/api/vendedor/${id}`);
        alert("Vendedor eliminado correctamente ...")  
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const getVendedor = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.1.113:3000/api/vendedor`);
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const getVendedorPorId = async (id) => {
    try{
      const response = await axios.get(`http://192.168.1.113:3000/api/vendedor/${id}`);
      setData(response.data) 
      setNombre(response.data.nombre);
      setCorreoe(response.data.correoe);
      setTotalComision(response.data.totalcomision);
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getVendedor(); // al renderizar
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'blue'}]}
        onPress={saveVendedor}
      >
        <Text style={{color:'yellow'}}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'orange'}]}
        onPress={()=>updateVendedor(sid)}
      >
        <Text style={{color:'yellow'}}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'red'}]}
        onPress={()=>deleteVendedor(sid)}
      >
        <Text style={{color:'yellow'}}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'green'}]}
        onPress={()=>getVendedor()}
      >
        <Text style={{color:'yellow'}}>Listar Clientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'green'}]}
        onPress={()=>getVendedorPorId(sid)}
      >
        <Text style={{color:'yellow'}}>Buscar por Id</Text>
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder='id vendedor'
          style={styles.inputs}
          onChangeText={idvend => setIdVend(idvend)}
          value={idvend}
        />
        <TextInput
          placeholder='Ingrese nombre'
          style={styles.inputs}
          onChangeText={nombre => setNombre(nombre)}
          value={nombre}
        />
        <TextInput
          placeholder='Ingrese email'
          style={styles.inputs}
          onChangeText={correoe => setCorreoE(correoe)}
          value={correoe}
        />
        <TextInput
          placeholder='Total Comisión'
          style={styles.inputs}
          onChangeText={totalComision => settotalComision(totalComision)}
          value={totalComision}
        />
      </View>

      {isLoading ? <ActivityIndicator size="large" color="black" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, {backgroundColor: item.id % 2 == 1 ? 'orange' : 'gray'}]}
              onPress={()=>{
                if (confirm(`Está seguro de eliminar el vendedor ${item.nombre} ${item.apellidos}?`)){
                  alert("Vendedor borrado (simulado)")
                }
              }}
            >
              <Text>{item.nombre}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    borderRadius:10,
    padding:10,
    justifyContent: "center",
    alignItems: "center",
    height:40,
    marginBottom:10,
  }
})
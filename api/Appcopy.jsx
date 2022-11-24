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
  const url_api = 'http://10.0.1.196:3000/api/vendedor';

  const saveVendedor = async () => {
    if (!nombre.trim() || !correoe.trim() || !totalComision.trim()) {
      alert("Nombre, Correo y Total Comisión obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(url_api, {
        nombre,
        correoe,
        totalComision
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
    if (!nombre.trim() || !correoe.trim() || !totalComision.trim()) {
      alert("Nombre, Correo y Total Comisión obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${url_api}/${id}`, {
        nombre,
        correoe,
        totalComision
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
        const response = await axios.delete(`${url_api}/${id}`);
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
      const response = await axios.get(url_api);
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
      const response = await axios.get(`url_api/${id}`);
      setData(response.data) 
      setNombre(response.data.nombre);
      setCorreoE(response.data.correoe);
      setTotalComision(response.data.totalComision);
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
        <Text style={{color:'yellow'}}>Listar Vendedores</Text>
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
          onChangeText={totalComision => setTotalComision(totalComision)}
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

function VentaScreen({ route }) {

  const [data, setData] = useState('');

  const onSubmit = data => {
    setData(data);
    return(
      data,
      console.log(data),
      console.log(`Número de Cuenta: ${data.idventa}`),
      console.log(`Número de identificacion: ${data.zona}`),
      console.log(`Titular de Cuenta: ${data.fecha}`),
      console.log(`Fecha: ${data.valorventa}`)
    );
  };

  // console.log(onSubmit(data));

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      idventa: '',
      zona: '',
      fecha: '',
      valorventa: '',
    }
  })

  const handleResult = (data) => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text key={data.cuenta} style={styles.text}>
          idventa: {data.idventa}
        </Text>
        <Text key={data.identificacion} style={styles.text}>
          zona: {data.zona}
        </Text>
        <Text key={data.titular} style={styles.text}>
          fecha: {data.fecha}
        </Text>
        <Text key={data.fecha} style={styles.text}>
          valorventa: {data.valorventa}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Bienvenid@</Text>

      {/* ================================================= */}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /[0-9]+/g,
          maxLength: 11,
          minLength: 10
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.idventa?.type == 'minLength' || errors.idventa?.type == 'maxLength' || errors.idventa?.type == 'required' || errors.idventa?.type == 'pattern' ? 'red' : 'green' }]}
            placeholder="Id Venta"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='idventa'
      />
      {errors.idventa?.type == 'required' && <Text style={{ color: 'red' }}>El idventa es obligatorio</Text>}
      {errors.idventa?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten números</Text>}
      {errors.idventa?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 5 caracteres</Text>}
      {errors.idventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 3 caracteres</Text>}


      {/* setDatoCuenta(mcuenta) */}
      {/* ================================================= */}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /[a-z/A-Z]+/g,
          // maxLength:11,
          // minLength:10

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs,{borderColor:errors.zona?.type == 'required' || errors.zona?.type == 'pattern' ? 'red' : 'green'}]}
            placeholder="Norte o Sur"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='zona'
      />

      {errors.zona?.type == 'required' && <Text style={{ color: 'red' }}>La zona es obligatorio</Text>}
      {errors.zona?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten letras</Text>}
      {/* {errors.zona?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 11 caracteres</Text>} */}
      {/* {errors.zona?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

      {/* ================================================= */}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /([1-2]{1}[0-9]{3}[\/](01|([0]{1}[1-9]{1})|10|11|12)[\/](01|([0]{1}[1-9]{1})|([1-2]{1}[1-9]{1})|10|20|30|31|32))/g,
          // maxLength: 10,
          // minLength: 10

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs, { borderColor: errors.fecha?.type == 'minLength' || errors.fecha?.type == 'maxLength' || errors.fecha?.type == 'required' || errors.fecha?.type == 'pattern' ? 'red' : 'green' }]}
            placeholder="(AAAA/MM/DD)"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='fecha'
      />
      {errors.fecha?.type == 'required' && <Text style={{ color: 'red' }}>Solo números Fecha en números</Text>}
      {errors.fecha?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo formato fecha</Text>}
      {/* {errors.fecha?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 10 caracteres</Text>} */}
      {/* {errors.fecha?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

      {/* ================================================= */}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /[0-9]+/g,
          // maxLength:9,
          minLength: 6

        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.inputs,{borderColor:errors.valorventa?.type == 'minLength' || errors.valorventa?.type == 'required' || errors.valorventa?.type == 'pattern' ? 'red' : 'green'}]}
            placeholder="Valor venta"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='valorventa'
      />
      {errors.valorventa?.type == 'required' && <Text style={{ color: 'red' }}>El valor de la venta es requerido</Text>}
      {errors.valorventa?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten números</Text>}
      {/* {errors.saldo?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 100 millones</Text>} */}
      {errors.valorventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 2 millones</Text>}

      {/* ================================================= */}


      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 5, borderRadius: 10, marginTop: 10, width: 100, textAlign: 'center' }}

        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: 'white' }}>Enviar</Text>
      </TouchableOpacity>

      {/* ================================================= */}

      {/* <Text>Datos</Text>
      {handleResult(data)} */}
    </View>
  );
}

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
  },
  inputs: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    marginTop: 5,
    minWidth: 200,
    textAlign: "center",
    padding: 5,
  }
})
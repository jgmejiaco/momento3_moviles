import { ActivityIndicator, FlatList, StyleSheet, Text, Button, View, TextInput,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

function UserScreen({ navigation }) {
  const [fullname, setFullname] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  // =================================================
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={styles.inputs}
        onChangeText={value => setFullname(value)}
        value={fullname}
        placeholder="Usuario"
      />
      <TextInput
        style={styles.inputs}
        onChangeText={value => setRol(value)}
        value={rol}
        placeholder="Rol"
      />
      <TextInput
        style={styles.inputs}
        onChangeText={value => setPassword(value)}
        value={password}
        placeholder="Contraseña"
      />
      
      <Button
        title="Iniciar Sesión"
        onPress={() => {
          if (fullname == "admin" && rol == "admon" && password == 123 ) 
          {
            setFullname("");
            setRol("");
            setPassword("");
            navigation.navigate('Ventas', { fullname: fullname })
          }
        }}
      />
    </View>
  );
}

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

function VentaScreen({ route }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [idventa,setIdVenta] = useState('');
  // const [zona,setZona] = useState('');
  // const [fecha,setFecha] = useState('');
  // const [valorventa,setValorVenta] = useState('');
  const url_api_venta = 'http://172.18.48.57:3000/api/venta';

  const saveVenta = (data) => {
    // if (!idventa.trim() || !zona.trim() || !fecha.trim() || !valorventa.trim()) {
    //   alert("idventa, zona, fecha y valorventa obligatorios");
    //   return;
    // }
    setLoading(true);
    let idventa = data.idventa;
    let zona = data.idventa;
    let fecha = data.fecha;
    let valorventa = data.valorventa;
    try {
      const response = axios.post(url_api_venta, {
        idventa,
        zona,
        fecha,
        valorventa
      });
      setData(response.data)
      console.log(data.idventa);
      alert("Venta agregada correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const updateVenta = async (id) => {
    if (!idventa.trim() || !zona.trim() || !fecha.trim() || !valorventa.trim()) {
      // alert("idventa, zona, fecha y valorventa obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${url_api_venta}/${id}`, {
        idventa,
        zona,
        fecha,
        valorventa
      });
      alert("Venta actualizada correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const deleteVenta = async (id) => {
    setLoading(true);
    try {
      if (confirm("Está seguro de eliminar la Venta")) {
        const response = await axios.delete(`${url_api_venta}/${id}`);
        alert("Venta eliminada correctamente ...")  
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const getVenta = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url_api_venta);
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  const getVentaPorId = async (id) => {
    try{
      const response = await axios.get(`url_api_venta/${id}`);
      setData(response.data) 
      setNombre(response.data.idventa);
      setCorreoE(response.data.zona);
      setTotalComision(response.data.fecha);
      setTotalComision(response.data.valorventa);
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getVenta(); // al renderizar
  }, []);

  const onSubmit = data => {
    setData(data);
    return(
      data,
      console.log(data),
      console.log(`idventa: ${data.idventa}`),
      console.log(`zona: ${data.zona}`),
      console.log(`fecha: ${data.fecha}`),
      console.log(`valorventa: ${data.valorventa}`)
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
  });

  // const handleResult = (data) => {
  //   return (
  //     <View style={{ marginTop: 20 }}>
  //       <Text key={data.idventa} style={styles.text}>
  //         Id Venta: {data.idventa}
  //       </Text>
  //       <Text key={data.zona} style={styles.text}>
  //         zona: {data.zona}
  //       </Text>
  //       <Text key={data.fecha} style={styles.text}>
  //         fecha: {data.fecha}
  //       </Text>
  //       <Text key={data.valorventa} style={styles.text}>
  //         Fecha: {data.valorventa}
  //       </Text>
  //       <Text key={data.saldo} style={styles.text}>
  //         Saldo: {data.saldo}
  //       </Text>
  //     </View>
  //   );
  // };

  // ============================================================================================================
  // ============================================================================================================
  // ============================================================================================================

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'blue'}]}
        onPress={handleSubmit(saveVenta)}
      >
        <Text style={{color:'yellow'}}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'orange'}]}
        onPress={()=>updateVenta(sid)}
      >
        <Text style={{color:'yellow'}}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'red'}]}
        onPress={()=>deleteVenta(sid)}
      >
        <Text style={{color:'yellow'}}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'green'}]}
        onPress={()=>getVenta()}
      >
        <Text style={{color:'yellow'}}>Listar Ventas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttons,{backgroundColor:'green'}]}
        onPress={()=>getVentaPorId(sid)}
      >
        <Text style={{color:'yellow'}}>Buscar Venta por Id</Text>
      </TouchableOpacity>

      {/* ============================================================================================================ */}
      {/* ============================================================================================================ */}

      <View>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[0-9]+/g,
            // maxLength: 11,
            // minLength: 10
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.idventa?.type == 'required' || errors.idventa?.type == 'pattern' ? 'red' : 'green' }]}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder='id Venta'
              // onChangeText={idventa => setIdVenta(idventa)}
              // value={idventa}
            />
          )}
          name='idventa'
        />
        {errors.idventa?.type == 'required' && <Text style={{ color: 'red' }}>El idventa es obligatorio</Text>}
        {errors.idventa?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten números</Text>}
        {/* {errors.idventa?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 11 caracteres</Text>} */}
        {/* {errors.idventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

        

        {/* setDatoCuenta(mcuenta) */}
        {/* ================================================= */}
        {/* <TextInput
          placeholder='id Venta'
          style={styles.inputs}
          onChangeText={idvend => setIdVenta(idventa)}
          value={idventa}
        /> */}

        {/* ============================================================================================================ */}
        {/* ============================================================================================================ */}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[a-z/A-Z]+/g,
            // maxLength: 11,
            // minLength: 10
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.zona?.type == 'required' || errors.zona?.type == 'pattern' ? 'red' : 'green' }]}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder='Norte o Sur'
              // onChangeText={zona => setZona(zona)}
              // value={zona}
            />
          )}
          name='zona'
        />
        {errors.zona?.type == 'required' && <Text style={{ color: 'red' }}>El zona es obligatorio</Text>}
        {errors.zona?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten letras</Text>}
        {/* {errors.idventa?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 11 caracteres</Text>} */}
        {/* {errors.idventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

        {/* <TextInput
          placeholder='Norte o Sur'
          style={styles.inputs}
          onChangeText={zona => setZona(zona)}
          value={zona}
        /> */}

        {/* ============================================================================================================ */}
        {/* ============================================================================================================ */}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /([1-2]{1}[0-9]{3}[\/](01|([0]{1}[1-9]{1})|10|11|12)[\/](01|([0]{1}[1-9]{1})|([1-2]{1}[1-9]{1})|10|20|30|31|32))/g,
            maxLength: 10,
            minLength: 10
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.fecha?.type == 'minLength' || errors.fecha?.type == 'maxLength' || errors.fecha?.type == 'required' || errors.fecha?.type == 'pattern' ? 'red' : 'green' }]}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="(AAAA/MM/DD)"
              // onChangeText={fecha => setFecha(fecha)}
              // value={fecha}
            />
          )}
          name='fecha'
        />
        {errors.fecha?.type == 'required' && <Text style={{ color: 'red' }}>El fecha es obligatorio</Text>}
        {errors.fecha?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten fecha</Text>}
        {/* {errors.idventa?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 11 caracteres</Text>} */}
        {/* {errors.idventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

        

        {/* <TextInput
          placeholder='Fecha'
          style={styles.inputs}
          onChangeText={fecha => setFecha(fecha)}
          value={fecha}
        /> */}


        {/* ============================================================================================================ */}
        {/* ============================================================================================================ */}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /[0-9]+/g,
            // maxLength: 10,
            // minLength: 6
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.inputs, { borderColor: errors.valorventa?.type == 'minLength' || errors.valorventa?.type == 'required' || errors.valorventa?.type == 'pattern' ? 'red' : 'green' }]}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Valor Venta"
              // onChangeText={valorventa => setValorVenta(valorventa)}
              // value={valorventa}
            />
          )}
          name='valorventa'
        />
        {errors.valorventa?.type == 'required' && <Text style={{ color: 'red' }}>El valor venta es obligatorio</Text>}
        {errors.valorventa?.type == 'pattern' && <Text style={{ color: 'red' }}>Solo se permiten números</Text>}
        {/* {errors.idventa?.type == 'maxLength' && <Text style={{ color: 'red' }}>Máximo 11 caracteres</Text>} */}
        {/* {errors.idventa?.type == 'minLength' && <Text style={{ color: 'red' }}>Mínimo 10 caracteres</Text>} */}

        {/* <TextInput
          placeholder='Valor Venta'
          style={styles.inputs}
          onChangeText={valorventa => setValorVenta(valorventa)}
          value={valorventa}
        /> */}
      </View>

      {/* ============================================================================================================ */}
      {/* ============================================================================================================ */}

      {isLoading ? <ActivityIndicator size="large" color="black" /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.buttons, {backgroundColor: item.id % 2 == 1 ? 'orange' : 'gray'}]}
              onPress={()=>{
                if (confirm(`Está seguro de eliminar la venta ${item.idventa}?`)){
                  alert("Venta borrada (simulado)")
                }
              }}
            >
              <Text>{item.idventa}</Text>
            </TouchableOpacity>

          )}
        />
      )}
    </View>
  );
}
//-------------------------------------FIN VENTA--------------------------------------------//

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

function VendedorScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [idvend,setIdVend] = useState('');
  // const [nombre,setNombre] = useState('');
  // const [correoe,setCorreoE] = useState('');
  // const [totalComision,setTotalComision] = useState('');
  const url_api_vendedor = 'http://192.168.1.69:3000/api/vendedor';

  const saveVendedor = async () => {
    if (!nombre.trim() || !correoe.trim() || !totalComision.trim()) {
      alert("Nombre, Correo y Total Comisión obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(url_api_vendedor, {
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
      const response = await axios.put(`${url_api_vendedor}/${id}`, {
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
        const response = await axios.delete(`${url_api_vendedor}/${id}`);
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
      const response = await axios.get(url_api_vendedor);
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
      const response = await axios.get(`url_api_vendedor/${id}`);
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
} // FIN VENDEDOR

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen
        name="Inicio"
        component={UserScreen}
        options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Ventas" component={VentaScreen} />
      <Tab.Screen name="Vendedores" component={VendedorScreen} />

    </Tab.Navigator>
  );
}

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Ventas' }} />
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// =======================================================================================================
// =======================================================================================================
// =======================================================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  }
});
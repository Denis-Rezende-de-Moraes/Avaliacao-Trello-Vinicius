import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, Button } from 'react-native';

import { ListItem, Icon, Overlay, Input } from 'react-native-elements';
import { database } from './configs/firebase';

export default function TodoScreen({ navigation, route }) {

    const { current, next } = route.params;

    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);

    const table = "task";

    const toggleOvelay = () => setVisible(!visible);

    const add = () => {
        database.collection(table).add({
            title: title,
            status: current
        });
        setVisible(false);
    }

    const remove = (id) => {
        database.collection(table).doc(id).delete();
        setVisible(false);
    }

    const up = (id) => {
        database.collection(table).doc(id).update({
            status: next
        });
    }

    useEffect(() => {
        database.collection(table).where('status', '=', current).onSnapshot(query => {

            const items = [];

            query.forEach(doc => {
                items.push({ ...doc.data(), id: doc.id })
            });

            setData(items);
        });
    }, [])

    const renderItem = ({ item }) => <ListItem bottomDivider title={item.title} rightElement={<View>
        <Button title="remover" onPress={() => remove(item.id)} />
        {next && <Button title="Alterar" onPress={() => up(item.id)} />}
    </View>} />

    return (
        <View>
            <FlatList data={data} keyExtractor={item => String(item.id)} renderItem={renderItem} />
            <Icon name="add" onPress={toggleOvelay} color="red" reverse style={{
                position: 'absolute',
                right: 20,
                bottom: 20
            }} />
            <Overlay overlayStyle={{
                width: 300
            }} visible={visible} onBackdropPress={toggleOvelay}>
                <Text>Cadastrar a tarefa</Text>
                <Input value={title} onChangeText={setTitle} placeholder="tarefa" />
                <Button title="Adicionar" onPress={add} />
            </Overlay>
        </View>
    )
}
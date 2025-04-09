import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  FlatList,
  StatusBar,
} from 'react-native';
import CustomHeader from '../../Component/CustomHeader/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Themes/Colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type RedeemItem = {
  code: string;
  percentage: string;
  createdAt: any;
  id: string;
};

const Reedem_His: React.FC = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState<RedeemItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const snapshot = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('redeemed_discounts')
            .orderBy('createdAt', 'desc')
            .get();

          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as RedeemItem[];

          setHistory(data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const renderItem = ({ item }: { item: RedeemItem }) => {
    const date = item.createdAt?.toDate?.().toLocaleString() ?? 'Unknown';
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.codeText}>Code: {item.code}</Text>
        <Text style={styles.percentageText}>{item.percentage}</Text>
        <Text style={styles.dateText}>Used on: {date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
          <StatusBar hidden={true} translucent={true} animated={true} />
        
      <View style={styles.Container}>
        <CustomHeader
          title="Redeem History"
          onBackPress={() => navigation.goBack()}
        />
          <View style={{marginBottom:"7%"}} />
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : history.length === 0 ? (
          <Text style={styles.noDataText}>No Data Found</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White4,
    marginVertical: Platform.OS === 'ios' ? '2%' : '10%',
    marginHorizontal: '3%',
  },
  loadingText: {
    marginTop: 30,
    alignSelf: 'center',
    color: 'gray',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginTop: 30,
  },
  itemContainer: {
    marginTop:"1%",
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Green,
  },
  percentageText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});

export default Reedem_His;

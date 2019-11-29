import React, { PropTypes } from 'react';
import {
	Text,
	View,
	FlatList,
	TouchableOpacity
} from 'react-native';
//import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/Info';
import Card from "../components/Card";

const Info = ({ info, similarProducts, otherProducts, viewProduct }) => {
	//const director = _.filter(info.casts.crew, { department: 'Directing', job: 'Director' });
	//const releaseDate = moment(info.release_date).format('LL');
	const budget = (info.price === 0 ? 'n/a' : numeral(info.price).format('$ 0,0'));

	return (
		<View style={styles.container}>
			<View style={styles.overview}>
				<Text style={styles.label}>
					Overview
				</Text>
				<Text style={styles.overviewText}>
					{info.product.desc}
				</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>OFF Date</Text>
				<Text style={styles.value}>{moment(info.startdate).format('LL')} - {moment(info.enddate).format('LL')}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Store</Text>
				<Text style={styles.value}>{info.store.name}-{info.store.desc}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Price</Text>
				<Text style={styles.value}>{budget}</Text>
			</View>

			<View style={[styles.labelRow, { paddingBottom: 7 }]}>
				<Text style={styles.label}>Similar Products</Text>
			</View>
			<FlatList
				horizontal={true}
				key={2}
				style={styles.flatListCats}
				data={similarProducts}
				//contentContainerStyle={styles.flatListBRecContainer}
				renderItem={({ item }) => {

					return (
						//<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>

						<Card key={item._id} off={item} viewProduct={viewProduct} />
						//<CardTwo info={item} viewOffsList={this._viewOffsList}></CardTwo>
						//</TouchableOpacity>
					)
				}}
				//numColumns={2}
				keyExtractor={(item, index) => index.toString()}
			//onEndReached={this.handelMore}
			//onEndReachedThreshold={1}
			//ListFooterComponent={this.renderFooterIndicator}
			//refreshing={this.state.refreshing}
			//onRefresh={this.handleRefresh}
			/>

			<View style={[styles.labelRow, { paddingBottom: 7 }]}>
				<Text style={styles.label}>Other Store Offs</Text>
			</View>
			<FlatList
				horizontal={true}
				showsHorizontalScrollIndicator
				key={3}
				style={styles.flatListCats}
				data={otherProducts}
				//contentContainerStyle={styles.flatListBRecContainer}
				renderItem={({ item }) => {

					return (
						//<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>

						<Card key={item._id} off={item} viewProduct={viewProduct} />
						//<CardTwo info={item} viewOffsList={this._viewOffsList}></CardTwo>
						//</TouchableOpacity>
					)
				}}
				//numColumns={2}
				keyExtractor={(item, index) => index.toString()}
			//onEndReached={this.handelMore}
			//onEndReachedThreshold={1}
			//ListFooterComponent={this.renderFooterIndicator}
			//refreshing={this.state.refreshing}
			//onRefresh={this.handleRefresh}
			/>


		</View>
	);
};



export default Info;

import React from 'react';
import Expo from 'expo';
import {
    View, Text, ScrollView, TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    Picker, Alert, FlatList, NativeModules
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import Header from '../../commons/Header';
import Footer from '../../commons/Footer';
import { connect } from 'react-redux';
import stylesCommon from '../../../styles';
import { Ionicons } from '@expo/vector-icons';
import { loadSupplierListDataFromSqlite } from '../../../actions/supplierAction';

import {
    loadPaymentSupplierById,
    PaymentSupplierUpdate,
    PaymentSupplierChange,
    PaymentSupplierDelete,
} from '../../../actions/paymentSupplierActions.js';
import db from '../../../database/sqliteConfig';
import moment from '../../../../Shared/utils/moment';
import {
    formatMoney,
    formatNumber,
    unformat
} from '../../../../Shared/utils/format';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import paymentTemplate, { css, sendEmail, sendMessage } from '../../../../Shared/templates/paymentSupplier';
import loadAsset from '../../../utils/loadAsset';
import { fontUrl, URL } from '../../../../env';

const { RNPrint } = NativeModules;
class EditPaymentSupplier extends React.Component {
    state = {
        id: '',
        isExpanded: true,
        isExpandedTotal: true,
        supplierId: '',
        debtSuppliers: {},
        debtSupplierId: null,
        createdDate: '',
        title: '',
        pay: 0,
        newDebt: 0,
        oldDebt: 0,
        editMode: false,
        fontPath: null,
        loaded: false
    }
    async componentWillMount() {
        console.log('this.props.paymentSupplier = ', this.props.paymentSupplier);
        this.props.loadPaymentSupplierById(this.props.paymentSupplier.id);

        this.setState({ loaded:false });

        if (!this.props.suppliers || this.props.suppliers.length == 0) {
            this.props.loadSupplierListDataFromSqlite();
        }
        const fontAsset = await loadAsset("vuarial", "ttf", fontUrl);
        this.setState({
            fontPath: fontAsset.localUri            
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps.loaded = ', nextProps.loaded);
        this.setState({
            id: nextProps.id,
            supplierId: nextProps.supplierId,
            createdDate: moment(nextProps.createdDate, moment.ISO_8601).format('DD-MM-YYYY'),
            pay: nextProps.pay,
            debtSuppliers: nextProps.debt,
            debtSupplierId: nextProps.debtSupplierId,
            oldDebt: nextProps.oldDebt,
            newDebt: nextProps.newDebt,
            title: nextProps.title,
        });
    }

    onSave() {
        if (this.state.debtSupplierId == null) return;
        Alert.alert(
            'Xác Nhận',
            'Bạn chắc chắn muốn lưu Phiếu Thu',
            [
                {
                    text: 'Xác Nhận',
                    onPress: () => {
                        const {
                            id, createdDate, title, supplierId, pay,
                            newDebt, oldDebt
                        } = this.state;
                        this.props.PaymentSupplierUpdate({
                            id,
                            createdDate,
                            title,
                            supplierId,
                            pay,
                            newDebt,
                            oldDebt,
                            debtSupplierId: this.state.debtSupplierId,
                            user: this.props.user
                        });
                    }
                },
                { text: 'Hủy', onPress: () => console.log('cancel Pressed') },
            ]
        );
    }    

    onSupplierChanged(supplierId) {
        this.props.loadDebtSuppliersFromSqlite(supplierId);
        this.setState({ supplierId });
    }

    editModeToggle() {
        this.setState({ editMode: !this.state.editMode });
    }

    renderHeaderQuocte() {
        if (this.state.isExpanded) {
            return (
                <ScrollView>
                    <View style={styles.controlContainer}>
                        <Text style={styles.label} >Ngày tháng</Text>
                        <View style={styles.groupControl}>
                            <DatePicker
                                enabled={this.state.editMode}
                                style={{ width: 200 }}
                                date={this.state.createdDate}
                                mode="date"
                                placeholder="Chọn ngày lập Phiếu Thu"
                                format="DD-MM-YYYY"
                                minDate="01-01-2008"
                                maxDate="01-01-3056"
                                confirmBtnText="Xác Nhận"
                                cancelBtnText="Hủy Bỏ"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(createdDate) => {
                                    this.setState({ createdDate });
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.controlContainer}>
                        <Text style={styles.label} >Nhà Cung Cấp</Text>
                        <View style={styles.groupControl}>
                            <Picker
                                enabled={false}
                                selectedValue={this.state.supplierId}
                                onValueChange={
                                    (itemValue, itemIndex) => {
                                        this.setState({ supplierId: itemValue });
                                    }
                                }
                            >
                                <Picker.Item key={0} label="" value={null} />
                                {this.props.suppliers && this.props.suppliers.map((item) => (
                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                                ))
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.controlContainer}>
                        <Text style={styles.label} >Tiêu đề</Text>
                        <View style={styles.groupControl}>
                            <TextInput
                                editable={this.state.editMode}
                                disableFullscreenUI
                                underlineColorAndroid={'transparent'}
                                style={styles.textInput}
                                blurOnSubmit
                                value={this.state.title}
                                onChangeText={text => this.setState({ title })}
                                type="Text"
                                name="title"
                                placeholder="Tiêu đề Phiếu Thu"
                            />
                        </View>
                    </View>
                </ScrollView>
            );
        }
        return <View />;
    }

    renderToTal() {
        if (this.state.isExpandedTotal) {
            return (
                <View style={{ height: 180 }}>                    
                    <View style={styles.totalControlGroup}>
                        <Text style={styles.label} >Nợ Cũ</Text>
                        <Text style={styles.label}>{formatNumber(this.state.oldDebt)}</Text>
                    </View>
                    <View style={styles.totalControlGroup}>
                        <Text style={styles.label} >Thanh Toán</Text>
                        <View style={[styles.groupControl, { width: 180 }]}>
                            <TextInput
                                editable={this.state.editMode}
                                disableFullscreenUI
                                keyboardType='numeric'
                                underlineColorAndroid={'transparent'}
                                style={[styles.textInput, { textAlign: 'right', fontSize: 15 }]}
                                blurOnSubmit
                                value={formatNumber(this.state.pay)}
                                onChangeText={text => {
                                    const pay = unformat(text);
                                    const newDebt = this.state.oldDebt - pay;
                                    this.setState({
                                        newDebt,
                                        pay
                                    });
                                }}
                                type="Text"
                                name="pay"
                                placeholder="Thanh Toán"
                            />
                        </View>
                    </View>
                    <View style={styles.totalControlGroup}>
                        <Text style={styles.label} >Tổng Nợ</Text>
                        <Text style={styles.label} >{formatNumber(this.state.newDebt)}</Text>

                    </View>
                </View>
            );
        }
        return (
            <View />
        );
    }
    //Tham khảo select (picker) react native: 
    //https://facebook.github.io/react-native/docs/picker.html
    render() {
        return (
            <View style={styles.container}>
                <Header>
                    <Text style={styles.headTitle} >Sửa Phiếu Thu</Text>
                </Header>
                <View style={styles.body}>

                    {this.renderHeaderQuocte()}

                    {this.renderToTal()}


                </View>
                <Footer>
                    <View style={styles.FooterGroupButton} >
                        <TouchableOpacity
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#7f8c8d' } : { backgroundColor: '#2ecc71' }]}
                            onPress={this.editModeToggle.bind(this)}
                        >
                            <Ionicons name="ios-apps-outline" size={25} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!this.state.editMode}
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#16a085' } : { backgroundColor: '#7f8c8d' }]}
                            onPress={this.onSave.bind(this)}
                        >
                            <Ionicons name="ios-checkmark-circle" size={25} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.editMode}
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#7f8c8d' } : { backgroundColor: '#2ecc71' }]}
                            onPress={async () => {
                                if (!this.state.fontPath) return;

                                if (this.state.id == '') {
                                    Alert.alert(
                                        'Thông Báo',
                                        'Bạn cần lưu Phiếu Thu trước khi in',
                                        [
                                            { text: 'Ok' },
                                        ]
                                    );
                                } else {
                                    
                                    let supplierName = '';
                                    this.props.suppliers.forEach((supplier) => {
                                        if (supplier.id == this.state.supplierId) {
                                            supplierName = supplier.name;
                                        }
                                    });

                                    let options = {
                                        html: paymentTemplate(supplierName, this.state.id,
                                            this.state.createdDate, this.state.oldDebt,
                                             this.state.pay, this.state.newDebt,
                                            ),
                                        css: css(),
                                        fileName: "invoice",
                                        fonts: [this.state.fontPath]
                                    };
                                    try {
                                        const results = await RNHTMLtoPDF.convert(options).catch(
                                            e => console.log(e)
                                        );
                                        const jobName = await RNPrint.print(results.filePath);
                                    }
                                    catch (e) {
                                        console.log('errors: ', e);
                                    }
                                }
                            }}
                        >
                            <Ionicons name="ios-print-outline" size={25} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.editMode}
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#7f8c8d' } : { backgroundColor: '#2ecc71' }]}
                            onPress={() => {
                                let supplierPhone = '';
                                let supplierName = '';
                                this.props.suppliers.forEach((supplier) => {
                                    if (supplier.id == this.state.supplierId) {
                                        supplierPhone = supplier.phone;
                                        supplierName = supplier.name;
                                    }
                                });
                                sendMessage(
                                    supplierPhone, supplierName, this.state.createdDate, 
                                    this.state.oldDebt, this.state.pay, this.state.newDebt
                                );
                            }}
                        >
                            <Ionicons name="ios-send-outline" size={25} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.editMode}
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#7f8c8d' } : { backgroundColor: '#2ecc71' }]}
                            onPress={() => {
                                let supplierEmail = '';
                                let supplierName = '';
                                this.props.suppliers.forEach((supplier) => {
                                    if (supplier.id == this.state.supplierId) {
                                        supplierEmail = supplier.email;
                                        supplierName = supplier.name;
                                    }
                                });
                                sendEmail(
                                    supplierEmail, supplierName, this.state.createdDate, 
                                    this.state.oldDebt, this.state.pay, this.state.newDebt
                                );
                            }}
                        >
                            <Ionicons name="ios-mail-outline" size={25} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={!this.state.editMode}
                            style={[styles.Btn, this.state.editMode ? { backgroundColor: '#d35400' } : { backgroundColor: '#7f8c8d' }]}
                            onPress={() => {
                                const {
                                    id, createdDate, title, supplierId, pay,
                                    newDebt, oldDebt
                                } = this.state;
                                this.props.PaymentSupplierDelete({
                                    id, createdDate, title, supplierId, pay,
                                    newDebt, oldDebt
                                });
                            }}
                        >
                            <Ionicons name="ios-trash-outline" size={25} color="#c0392b" />
                        </TouchableOpacity>
                    </View>
                </Footer>
            </View>
        );
    }
}
const styles = {
    container: stylesCommon.container,
    body: stylesCommon.body,
    headTitle: stylesCommon.headTitle,
    listItem: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginTop: 2,
        marginBottom: 2,
        overflow: 'hidden',
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '400',
        paddingBottom: 2,
        paddingLeft: 10,
        paddingTop: 2,
    },
    InputContainer: {
        paddingBottom: 30,
        marginLeft: 10,
        marginRight: 10
    },
    controlContainer: {
        padding: 5,
        justifyContent: 'center',
        borderColor: '#7f8c8d',
        borderRadius: 10,
        borderWidth: 0.2,
        marginTop: 5,
        height: 75,
    },
    groupControl: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 2,
        marginTop: 2,
        padding: 2,
        borderColor: 'rgba(41, 128, 185,1.0)',
        backgroundColor: '#FFFFFF'
    },
    textInput: {
        color: '#000000',
        fontSize: 15
    },
    errorStyle: {
        color: 'rgba(231, 76, 60,1.0)',
        fontSize: 18
    },
    label: {
        fontSize: 15,
        color: '#34495e',
        fontWeight: '500'
    },
    titleButton: {
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        color: '#FFFFFF'
    },
    Btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#16a085',
        paddingTop: 3,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 8,
        borderRadius: 5,
        marginLeft: 5,
    },
    FooterGroupButton: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    PaymentSupplierDetailItemContainer: {
        flexDirection: 'row',
    },
    paymentSupplierDetailRemoveBtn: {

    },
    totalControlGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1'
    }
};
const mapStateToProps = (state, ownProps) => {
    const {
        id,
        supplierId,
        createdDate,
        title,        
        pay,
        oldDebt,
        newDebt,
        debtSupplierId,
        loaded,
        error,        
    } = state.paymentSupplier;
    const { suppliers } = state.suppliers;
    const { isAuthenticated, user } = state.auth;
    return {
        id,
        supplierId,
        createdDate,
        title,
        pay,
        oldDebt,
        newDebt,
        debtSupplierId,
        loaded,
        error,
        suppliers,
        user,
    };
};
export default connect(mapStateToProps, {
    loadPaymentSupplierById,
    loadSupplierListDataFromSqlite,
    PaymentSupplierUpdate,
    PaymentSupplierChange,
    PaymentSupplierDelete,
})(EditPaymentSupplier);

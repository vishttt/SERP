import { SQLite } from 'expo';
import axios from 'axios';
import { URL } from '../../env';
import SqlService from './sqliteService';
import { loadMenusData } from '../actions/menuAction';

const db = SQLite.openDatabase("SERP1.1.0.db", "1.1", "SERP Database", 200000);
/*
 Hệ thống sẽ tạo ra các bảng sqlite chứa các dữ liệu thường xuyên sử dụng nhất nhằm tăng
 trải nghiệm của người dùng đối với phẩn mềm
 Khi ứng dụng dc khởi động nó sẽ tự động gửi các version hiện tại của cơ sở dữ liệu đã có trên mobile
 lên server, server sẽ kiểm tra dữ liệu đã mới dc cập nhật chưa, Server chỉ trả về tập dữ liệu cần thiết 
 chứ không trả về toàn bộ dữ liệu
 */
export const resetDatabase = async () => {
  SqlService.query(
    'drop table if exists menus;');
  SqlService.query(
    'drop table if exists userMenus;');
  SqlService.query(
    'drop table if exists roles;');
  SqlService.query(
    'drop table if exists units;');
  SqlService.query(
    'drop table if exists warehouses;');
  SqlService.query(
    'drop table if exists categories;');
  SqlService.query(
    'drop table if exists products;');
  SqlService.query(
    'drop table if exists customerGroups;');
  SqlService.query(
    'drop table if exists customers;');
};

export const createDatabaseSqlite = async () => {
  resetDatabase();
  SqlService.query(
    'drop table if exists dataVersions;');
  // db.transaction(
  //   tx => {
  //     tx.executeSql('delete from dataVersions where id = 1');
  //   }
  // )
  SqlService.query(
    `create table if not exists
         menus (
           id integer primary key not null,
           name text,
           parentId integer
          );`);
  SqlService.query(`create table if not exists
         userMenus (
           menuId integer,
           userId integer,
           parentId,
           name text
          );`);
  SqlService.query(`create table if not exists
         roles (
           id integer primary key not null,
           name text
          );`);
  SqlService.query(`create table if not exists
         categories (
           id integer primary key not null,
           name text,
           description text,
           imageUrl text
          );`);
  SqlService.query(`create table if not exists
         units (
           id integer primary key not null,
           name text,
           rate real
          );`);
  SqlService.query(`create table if not exists
         warehouses (
           id integer primary key not null,
           name text,
           description text,
           address text
          );`);
  SqlService.query(`create table if not exists
         products (
           id integer primary key not null,
           categoryId integer,
           unitId integer,
           typeCargoId integer,
           name text,
           description text,
           imageUrl text,
           isPublic integer,
           purchasePrice real,
           salePrice real,
           minQuantity real,
           isAvaiable integer
          );`);
  SqlService.query(`create table if not exists
         customerGroups (
           id integer primary key not null,
           name text,
           description text
          );`);
  SqlService.query(`create table if not exists
         customers (
           id integer primary key not null,
           customerGroupId integer,
           bankId integer,
           companyId integer,
           name text,
           address text,
           imageUrl text,
           phone text,
           email text,
           overdue integer,
           minQuantity real
          );`);
  SqlService.query(`create table if not exists
         dataVersions (
           id integer primary key not null,
           menus integer,
           userMenus integer,
           categories integer,
           roles integer,
           units integer,
           warehouses integer,
           products integer,
           customerGroups integer,
           customers integer
          );`);
};

export const getCurrentDataVersion = async () => await SqlService.select('dataVersions', '*');

export const updateOrInsertDataVersion = async (data) => {
  const avaiabledDataVersion = await SqlService.select('dataVersions', '*', `id = ${data.id}`);

  const newDataVersion = [
    data.id, data.menusVersion, data.userMenusVersion, data.categoriesVersion,
    data.rolesVersion, data.unitsVersion, data.warehousesVersion, data.productsVersion,
    data.customerGroupsVersion, data.customersVersion
  ];
  if (avaiabledDataVersion.length == 0) {
    SqlService.insert('dataVersions', [
      'id', 'menus', 'userMenus', 'categories', 'roles', 'units', 'warehouses',
      'products', 'customerGroups', 'customers'
    ], newDataVersion);
  } else {
    console.log("avaiabledDataVersion.length", avaiabledDataVersion.length);

    db.transaction(
      tx.executeSql(
        `UPDATE dataVersions 
        SET menus = '${data.menusVersion}',
         userMenus = '${data.userMenusVersion}',
         categories = '${data.categoriesVersion}',
         roles = '${data.rolesVersion}',
         units = '${data.unitsVersion}',
         warehouses = '${data.warehousesVersion}',
         products = '${data.productsVersion}',
         customerGroups = '${data.customerGroupsVersion}',
         customers = '${data.customersVersion}'
         WHERE id = ${data.id};`
      )
    )
  }
if (data.userMenus && data.userMenus.length > 0) {
  console.log("remove old userMenus table")
  SqlService.query(
    'drop table if exists userMenus;');
  console.log("re-create userMenus table")
  SqlService.query(`create table if not exists
         userMenus (
           menuId integer,
           userId integer,
           parentId,
           name text
          );`);
  console.log("insert menus")
  data.userMenus.forEach(async (item) => {
    SqlService.insert('userMenus', ['userId', 'menuId', 'name', 'parentId'], [item.userId, item.menuId, item.name, item.parentId]);
  }, this);
}

if (data.categories) {
  data.categories.forEach(async (item) => {
    // console.log("categories item = ", item);
    const avaiabledData = await SqlService.select('categories', '*', `id = ${item.id}`);
    if (avaiabledData.length == 0) {
      SqlService.insert('categories', ['id', 'name', 'description', 'imageUrl'],
        [item.id, item.name, item.description, item.imageUrl]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update categories 
          set name = ${item.name},
          description = ${item.description},
          imageUrl = ${item.imageUrl}
          where id = ${item.id} 
          `)
        },
        null,
        console.log("error when update category")
      );
    }
  }, this);
}

if (data.units) {
  data.units.forEach(async (item) => {
    const avaiabledData = await SqlService.select('units', '*', `id = ${item.id}`);
    if (avaiabledData.length == 0) {
      SqlService.insert('units', ['id', 'name', 'rate'],
        [item.id, item.name, item.rate]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update units 
          set name = ${item.name},
          rate = ${item.rate}
          where id = ${item.id} 
          `)
        },
        null,
        console.log("error when update units")
      );
    }
  }, this);
}
if (data.roles) {
  data.roles.forEach(async (item) => {
    const avaiabledData = await SqlService.select('roles', '*', `id = ${item.id}`);
    // console.log('avaiabledData in units', avaiabledData)
    if (avaiabledData.length == 0) {
      // console.log("go insert roles");
      SqlService.insert('roles', ['id', 'name'],
        [item.id, item.name]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update roles 
          set name = ${item.name} 
          where id = ${item.id} 
          `);
        },
        null,
        console.log("error when update roles")
      );      
    }
  }, this);
}

if (data.warehouses) {
  data.warehouses.forEach(async (item) => {
    const avaiabledData = await SqlService.select('warehouses', '*', `id = ${item.id}`);
    if (avaiabledData.length == 0) {
      SqlService.insert('warehouses', ['id', 'name', 'description', 'address'],
        [item.id, item.name, item.description, item.address]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update warehouses 
          set name = ${item.name},
          description = ${item.description},
          address = ${item.address}
          where id = ${item.id} 
          `);
        },
        null,
        console.log("error when update warehouses")
      );
    }
  }, this);
}

if (data.customers) {
  data.customers.forEach(async (item) => {
    const avaiabledData = await SqlService.select('customers', '*', `id = ${item.id}`);
    if (avaiabledData.length == 0) {
      SqlService.insert('customers', [
        'id', 'customerGroupId',
        'name', 'bankId', 'companyId', 'address',
        'imageUrl', 'phone', 'email', 'overdue', 'excessDebt'
      ], [
          item.id, item.customerGroupId, item.name, item.bankId, item.companyId, item.address,
          item.imageUrl, item.phone, item.email, item.overdue, item.excessDebt
        ]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update customers 
          set name = ${item.name},
          customerGroupId = ${item.customerGroupId},
          bankId = ${item.bankId},
          companyId = ${item.companyId},
          address = ${item.address},
          imageUrl = ${item.imageUrl},
          phone = ${item.phone},
          email = ${item.email},
          overdue = ${item.overdue},
          excessDebt = ${item.excessDebt} 
          where id = ${item.id} 
          `);
        },
        null,
        console.log("error when update customers")
      );
    }
  }, this);
}

if (data.products) {
  data.products.forEach(async (item) => {
    const avaiabledData = await SqlService.select('products', '*', `id = ${item.id}`);
    if (avaiabledData.length == 0) {
      SqlService.insert('products', [
        'id', 'categoryId', 'unitId', 'typeCargoId', 'name', 'description',
        'imageUrl', 'isPublic', 'purchasePrice', 'salePrice', 'minQuantity', 'isAvaiable'
      ], [
          item.id, item.categoryId, item.unitId, item.typeCargoId, item.name, item.description,
          item.imageUrl, item.isPublic, item.purchasePrice, item.salePrice, item.minQuantity, item.isAvaiable
        ]);
    } else {
      db.transaction(
        tx => {
          tx.executeSql(`
          update products 
          set categoryId = ${item.categoryId},
          unitId = ${item.unitId},
          typeCargoId = ${item.typeCargoId},
          name = ${item.name},
          description = ${item.description},
          isPublic = ${item.isPublic},
          imageUrl = ${item.imageUrl},
          purchasePrice = ${item.purchasePrice},
          salePrice = ${item.salePrice},
          minQuantity = ${item.minQuantity},
          isAvaiable = ${item.isAvaiable}
          where id = ${item.id} 
          `);
        },
        null,
        console.log("error when update products")
      );
    }
  }, this);
}
};

export const checkDataVersion = async (userId, store) => {
  // console.log("go checkDataVersion");

  try {
    await SqlService.select('dataVersions', '*', `id = 1`).then(
      async (currentVersion) => {
        // debugger;
        if (!currentVersion[0]) currentVersion[0] = { id: 0, menus: 0, userMenus: 0, roles: 0, units: 0, warehouses: 0, categories: 0, products: 0, customerGroups: 0, customers: 0 };
        const { id, menus, userMenus, roles, units, warehouses, categories,
          products, customerGroups, customers } = currentVersion[0];

        const data = await axios.post(`${URL}/api/data/checkDataVersion`, {
          id,
          menus,
          userMenus,
          roles,
          units,
          warehouses,
          products,
          categories,
          customerGroups,
          customers,
          userId
        });
        // console.log('data = ', data);

        await updateOrInsertDataVersion(data.data);
        console.log('begin dispatch menuActions');
        store.dispatch(loadMenusData());

        // await getCurrentDataVersion().then(
        //   newData =>
        //     console.log("dataversion after updateOrInsert =", newData)
        // );
        // SqlService.select('userMenus', '*').then(
        //   result => console.log("userMenus = ", result)
        // );
        // SqlService.select('units', '*').then(
        //   result => console.log("units = ", result)
        // );
        // SqlService.select('roles', '*').then(
        //   result => console.log("roles = ", result)
        // );
        // SqlService.select('categories', '*').then(
        //   result => console.log('categories = ', result)
        // );
      }
    );
  } catch (err) {
    console.log(err);
  }
};
